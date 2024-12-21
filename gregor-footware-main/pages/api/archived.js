import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("CustomerInfo");

      const result = await collection.insertOne(data);
      res.status(200).json({ message: "Customer info saved successfully!", result });
    } catch (error) {
      console.error("Error saving customer info:", error);
      res.status(500).json({ message: "Failed to save customer info.", error });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("CustomerInfo");

      // Fetch documents with archive set to true
      const customers = await collection.find({ archive: true }).toArray();

      res.status(200).json(customers);
    } catch (error) {
      console.error("Error fetching customer info:", error);
      res.status(500).json({ message: "Failed to fetch customer info.", error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
