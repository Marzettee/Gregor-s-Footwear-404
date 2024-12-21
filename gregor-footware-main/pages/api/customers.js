import { MongoClient, ObjectId } from "mongodb";

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
      res.status(500).json({ message: "Failed to save customer info.", error: error.message });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("CustomerInfo");

      // Fetch documents with archive set to false
      const customers = await collection.find({ archive: false }).toArray();

      res.status(200).json(customers);
    } catch (error) {
      console.error("Error fetching customer info:", error);
      res.status(500).json({ message: "Failed to fetch customer info.", error: error.message });
    } finally {
      await client.close();
    }
  } else if (req.method === "PUT") {
    try {
      await client.connect();
      const database = client.db("Customer");
      const collection = database.collection("CustomerInfo");

      // Extract id and update data from the request body
      const { id, ...updateData } = req.body;

      // Log the id and update data for debugging
      console.log("Received id:", id);
      console.log("Update Data:", updateData);

      // Convert id to ObjectId
      const objectId = new ObjectId(id);

      // Try to find the customer by id
      const customer = await collection.findOne({ _id: objectId });

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Perform the update
      const result = await collection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );

      // If no document was updated, return a 404 response
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json({ message: "Customer info updated successfully!" });
    } catch (error) {
      console.error("Error updating customer info:", error);
      res.status(500).json({ message: "Failed to update customer info.", error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
