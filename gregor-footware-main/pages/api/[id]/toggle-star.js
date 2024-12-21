import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id } = req.query;
      const { Starred } = req.body;

      if (!id || !Starred) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("Receipts");

      // Update the starred state
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { Starred } }
      );

      if (result.matchedCount === 0) {
        throw new Error("Receipt not found");
      }

      res.status(200).json({ message: "Starred state updated successfully." });
    } catch (error) {
      console.error("Error updating star state:", error);
      res.status(500).json({ message: "Failed to update star state.", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
