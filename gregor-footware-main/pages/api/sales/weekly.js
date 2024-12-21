import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Function to get the date range for a specific week in a month
const getWeekDates = (year, month, week) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Calculate start and end dates for the specific week
  const startDate = new Date(firstDay);
  startDate.setDate(1 + (week - 1) * 7);
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  // Ensure we don't go beyond the last day of the month
  if (endDate > lastDay) {
    endDate.setDate(lastDay.getDate() + 1);
  }

  return { 
    startDate: startDate.toISOString().split('T')[0], 
    endDate: endDate.toISOString().split('T')[0] 
  };
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      const currentYear = new Date().getFullYear();
      const selectedMonth = req.query.month ? parseInt(req.query.month) : null;
      const selectedWeek = req.query.week ? parseInt(req.query.week) : null;

      // Validate input
      if (selectedMonth === null || selectedWeek === null) {
        return res.status(400).json({ message: "Month and week are required" });
      }

      // Get date range for the specific week
      const { startDate, endDate } = getWeekDates(currentYear, selectedMonth, selectedWeek);

      // Find matching receipts
      const receipts = await collection
        .find({
          dateRecorded: {
            $gte: startDate,
            $lt: endDate
          }
        })
        .toArray();

      // Prepare weekly data (7 days)
      let weeklySales = Array(7).fill(0);

      // Calculate sales for each day of the week
      receipts.forEach((receipt) => {
        const receiptDate = new Date(receipt.dateRecorded);
        const dayOfWeek = receiptDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        const price = parseFloat(receipt.price || 0);
        
        weeklySales[dayOfWeek] += price;
      });

      const totalSales = receipts.reduce((total, receipt) => 
        total + parseFloat(receipt.price || 0), 0);
      
      const totalOrders = receipts.length;
      const totalCustomers = new Set(receipts.map(r => r.fullName)).size;

      const productsCount = {};
      const servicesCount = {};

      receipts.forEach((receipt) => {
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
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          data: weeklySales,
        },
        totalSales,
        totalOrders,
        totalCustomers,
        bestSellingProducts: topProducts,
        bestSellingServices: topServices,
        selectedMonth,
        selectedWeek
      });
    } catch (error) {
      console.error("Error fetching weekly sales data:", error);
      res.status(500).json({ 
        message: "Failed to fetch weekly sales data.", 
        error: error.message 
      });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}