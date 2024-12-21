import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfToday = new Date(startOfToday);
      endOfToday.setDate(startOfToday.getDate() + 1);

      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7); // End of the week (Saturday)

      // Fetch receipts for today
      const todayReceipts = await collection
        .find({
          dateRecorded: {
            $gte: startOfToday.toISOString(),
            $lt: endOfToday.toISOString(),
          },
        })
        .toArray();

      // Fetch receipts for the current week
      const weeklyReceipts = await collection
        .find({
          dateRecorded: {
            $gte: startOfWeek.toISOString(),
            $lt: endOfWeek.toISOString(),
          },
        })
        .toArray();

      // Calculate daily totals for Today
      const todayTotals = {
        totalSales: 0,
        totalOrders: todayReceipts.length,
        totalCustomers: new Set(todayReceipts.map(r => r.fullName)).size,
        productsCount: {},
        servicesCount: {},
      };

      todayReceipts.forEach((receipt) => {
        const { price, kind, stockNumber } = receipt;
        const parsedPrice = parseFloat(price || 0);

        todayTotals.totalSales += parsedPrice;

        if (kind) {
          todayTotals.productsCount[kind] = todayTotals.productsCount[kind] || { quantity: 0, price: 0 };
          todayTotals.productsCount[kind].quantity++;
          todayTotals.productsCount[kind].price += parsedPrice;
        }

        if (stockNumber) {
          todayTotals.servicesCount[stockNumber] = todayTotals.servicesCount[stockNumber] || { quantity: 0, price: 0 };
          todayTotals.servicesCount[stockNumber].quantity++;
          todayTotals.servicesCount[stockNumber].price += parsedPrice;
        }
      });

      // Calculate weekly graph data
      const weeklyGraph = Array(7).fill(0); // Array to hold sales totals for each day
      weeklyReceipts.forEach((receipt) => {
        const { price, dateRecorded } = receipt;
        const receiptDate = new Date(dateRecorded);
        const dayIndex = receiptDate.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
        weeklyGraph[dayIndex] += parseFloat(price || 0);
      });

      // Prepare top 5 lists for Today
      const topProductsToday = Object.entries(todayTotals.productsCount)
        .map(([name, { quantity, price }]) => ({ name, quantity, price }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      const topServicesToday = Object.entries(todayTotals.servicesCount)
        .map(([name, { quantity, price }]) => ({ name, quantity, price }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      res.status(200).json({
        graph: {
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          data: weeklyGraph,
        },
        totalSales: todayTotals.totalSales,
        totalOrders: todayTotals.totalOrders,
        totalCustomers: todayTotals.totalCustomers,
        bestSellingProducts: topProductsToday,
        bestSellingServices: topServicesToday,
        today: {
          totalSales: todayTotals.totalSales,
          totalOrders: todayTotals.totalOrders,
          totalCustomers: todayTotals.totalCustomers,
          bestSellingProducts: topProductsToday,
          bestSellingServices: topServicesToday,
        },
      });
    } catch (error) {
      console.error("Error fetching today's sales data:", error);
      res.status(500).json({ message: "Failed to fetch today's sales data.", error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
