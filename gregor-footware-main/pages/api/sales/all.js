import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      // Fetch all receipts
      const receipts = await collection.find({}).toArray();

      if (!receipts || receipts.length === 0) {
        return res.status(404).json({ message: "No receipts found." });
      }

      // Aggregations for Total Sales, Orders, and Customers
      let totalSales = 0;
      let totalOrders = receipts.length;
      let totalCustomers = new Set();
      let salesByYear = {};
      let productsCount = {};
      let servicesCount = {};

      receipts.forEach((receipt) => {
        const { price, fullName, dateRecorded, kind, stockNumber } = receipt;

        totalSales += parseFloat(price || 0);
        totalCustomers.add(fullName); // Unique customers
        const year = new Date(dateRecorded).getFullYear();
        salesByYear[year] = (salesByYear[year] || 0) + parseFloat(price || 0);

        // Count and sum for products
        if (kind) {
          productsCount[kind] = productsCount[kind] || { quantity: 0, price: 0 };
          productsCount[kind].quantity++;
          productsCount[kind].price += parseFloat(price || 0);
        }

        // Count and sum for services
        if (stockNumber) {
          servicesCount[stockNumber] = servicesCount[stockNumber] || { quantity: 0, price: 0 };
          servicesCount[stockNumber].quantity++;
          servicesCount[stockNumber].price += parseFloat(price || 0);
        }
      });

      // Prepare labels and data for the graph
      const labels = Object.keys(salesByYear).sort();
      const data = labels.map((year) => salesByYear[year]);

      // Sort and get top 5 for products and services
      const topProducts = Object.entries(productsCount)
        .map(([name, { quantity, price }]) => ({ name, quantity, price }))
        .sort((a, b) => b.price - a.price) // Sort by total price descending
        .slice(0, 5); // Get top 5

      const topServices = Object.entries(servicesCount)
        .map(([name, { quantity, price }]) => ({ name, quantity, price }))
        .sort((a, b) => b.price - a.price) // Sort by total price descending
        .slice(0, 5); // Get top 5

      // Send response
      res.status(200).json({
        graph: { labels, data },
        totalSales,
        totalOrders,
        totalCustomers: totalCustomers.size,
        bestSellingProducts: topProducts,
        bestSellingServices: topServices,
      });
    } catch (error) {
      console.error("Error fetching sales data:", error);
      res.status(500).json({ message: "Failed to fetch sales data.", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
