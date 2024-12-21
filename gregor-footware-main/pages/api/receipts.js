import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { color } = data;

      if (!color) {
        return res.status(400).json({ message: "Color is required." });
      }

      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      // Fetch the latest receipt number for the given color
      const lastReceipt = await collection
        .find({ color }) // Filter by color
        .sort({ receiptNumber: -1 }) // Sort by receiptNumber in descending order
        .limit(1) // Get the most recent receipt
        .toArray();

      // Determine the next receipt number
      const nextNumber =
        lastReceipt.length > 0 ? parseInt(lastReceipt[0].receiptNumber) + 1 : 1;
      const receiptNumber = nextNumber.toString().padStart(4, "0"); // Format as 4 digits (e.g., 0001)

      // Add the new receipt with the calculated receipt number
      const newReceipt = { ...data, receiptNumber, createdAt: new Date() };

      const result = await collection.insertOne(newReceipt);
      res.status(200).json({
        message: "Receipt saved successfully!",
        result,
        receipt: newReceipt,
      });
    } catch (error) {
      console.error("Error saving receipt:", error);
      res.status(500).json({ message: "Failed to save receipt.", error });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    try {
      await client.connect();
      const { starred } = req.query; // Extract query parameter
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      // Create filter based on query parameter
      let filter = {};
      if (starred === "true") {
        filter = { Starred: "True" };
      } else if (starred === "false") {
        filter = { Starred: "False" };
      }

      // Fetch documents based on the filter
      const receipts = await collection.find(filter).toArray();

      res.status(200).json(receipts);
    } catch (error) {
      console.error("Error fetching receipts:", error);
      res.status(500).json({ message: "Failed to fetch receipts.", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
