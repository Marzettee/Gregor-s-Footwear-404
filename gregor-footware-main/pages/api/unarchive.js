// /api/archive.js
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("CustomerInfo");

      // Update the 'archived' field
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { archive: false } }
      );

      res.status(200).json({ message: "Customer unarchived successfully!", result });
    } catch (error) {
      console.error("Error archiving customer:", error);
      res.status(500).json({ message: "Failed to unarchive customer.", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
