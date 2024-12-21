import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await client.connect();
    const db = client.db("Customer");
    const collection = db.collection("Transactions");

    const totalTransaction = await collection.countDocuments();

    res.status(200).json({ totalTransaction });
  } catch (error) {
    console.error("Failed to fetch receipts count:", error);
    res.status(500).json({ error: "Failed to fetch receipts count" });
  } finally {
    await client.close();
  }
}
