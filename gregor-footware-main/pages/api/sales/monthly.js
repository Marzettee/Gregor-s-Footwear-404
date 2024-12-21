import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      const currentYear = new Date().getFullYear();
      const selectedMonth = req.query.month ? parseInt(req.query.month) : null;

      // Always query for the full year's data
      const startDate = `${currentYear}-01-01`;
      const endDate = `${currentYear + 1}-01-01`;

      // Find matching receipts for the full year
      const receipts = await collection
        .find({
          dateRecorded: {
            $gte: startDate,
            $lt: endDate
          }
        })
        .toArray();

      let monthlySales = Array(12).fill(0);
      let filteredReceipts = receipts;

      // If a specific month is selected, filter receipts for that month
      if (selectedMonth !== null) {
        filteredReceipts = receipts.filter(receipt => {
          const receiptMonth = new Date(receipt.dateRecorded).getMonth();
          return receiptMonth === selectedMonth;
        });
      }

      // Calculate sales for each month from the full year's data
      receipts.forEach((receipt) => {
        const { price, dateRecorded } = receipt;
        const month = new Date(dateRecorded).getMonth();
        monthlySales[month] += parseFloat(price || 0);
      });

      const totalSales = filteredReceipts.reduce((total, receipt) => 
        total + parseFloat(receipt.price || 0), 0);
      
      const totalOrders = filteredReceipts.length;
      const totalCustomers = new Set(filteredReceipts.map(r => r.fullName)).size;

      const productsCount = {};
      const servicesCount = {};

      filteredReceipts.forEach((receipt) => {
        const { price, kind, stockNumber } = receipt;

        if (kind) {
          productsCount[kind] = productsCount[kind] || { quantity: 0, price: 0 };
          productsCount[kind].quantity++;
          productsCount[kind].price += parseFloat(price || 0);
        }

        if (stockNumber) {
          servicesCount[stockNumber] = servicesCount[stockNumber] || { quantity: 0, price: 0 };
          servicesCount[stockNumber].quantity++;
          servicesCount[stockNumber].price += parseFloat(price || 0);
        }
      });

      const topProducts = Object.entries(productsCount)
        .map(([name, { quantity, price }]) => ({ name, quantity, price }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      const topServices = Object.entries(servicesCount)
        .map(([name, { quantity, price }]) => ({ name, quantity, price }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      res.status(200).json({
        graph: {
          labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
          ],
          data: monthlySales,
        },
        totalSales,
        totalOrders,
        totalCustomers,
        bestSellingProducts: topProducts,
        bestSellingServices: topServices,
        selectedMonth: selectedMonth
      });
    } catch (error) {
      console.error("Error fetching monthly sales data:", error);
      res.status(500).json({ 
        message: "Failed to fetch monthly sales data.", 
        error: error.message 
      });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}