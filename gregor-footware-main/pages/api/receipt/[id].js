import { MongoClient, ObjectId } from "mongodb";

// Reuse a single MongoDB client instance for better performance
let client;
let clientPromise;

const uri = process.env.MONGODB_URI; // Ensure you have this environment variable set
if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  console.log("Received ID:", id);

  // Validate the provided ID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    // Connect to the database
    await clientPromise; // Use the already initialized client
    const database = client.db("Customer");
    const collection = database.collection("Receipts");

    // Fetch the receipt with the specified ID
    const receipt = await collection.findOne({ _id: new ObjectId(id) });

    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found." });
    }

    res.status(200).json(receipt);
  } catch (error) {
    console.error("Error fetching receipt:", error);
    res.status(500).json({ message: "Failed to fetch receipt.", error });
  }
}
