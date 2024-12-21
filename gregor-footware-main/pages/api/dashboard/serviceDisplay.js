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
    const collection = db.collection("Receipts");

    const kindCounts = await collection
      .aggregate([
        {
          $match: {
            stockNumber: { $exists: true, $ne: "" },
          },
        },
        { $group: { _id: "$stockNumber", count: { $sum: 1 } } },
      ])
      .toArray();

    if (kindCounts.length === 0) {
      console.log("No data found for the given query");
      return res.status(200).json({ kindCounts: [] });
    }

    console.log("kindCounts:", kindCounts);

    res.status(200).json({ kindCounts });
  } catch (error) {
    console.error("Failed to fetch kind counts:", error);
    res.status(500).json({ error: "Failed to fetch kind counts" });
  } finally {
    await client.close();
  }
}
