import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Use environment variables for sensitive data
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const db = client.db("Customer");
      const transactionsCollection = db.collection("Transactions");

      // Fetch all transactions
      const transactions = await transactionsCollection.find({}).toArray();

      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to fetch transactions." });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}