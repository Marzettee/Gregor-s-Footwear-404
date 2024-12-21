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
    const collection = db.collection("CustomerInfo");

    const customers = await collection
      .find({ archive: false }, { projection: { satisfaction: 1 } })
      .toArray();

    const satisfactionValues = customers.map(
      (customer) => customer.satisfaction
    );
    const totalSatisfaction = satisfactionValues.reduce(
      (acc, value) => acc + value,
      0
    );
    const averageSatisfaction =
      satisfactionValues.length > 0
        ? totalSatisfaction / satisfactionValues.length
        : 0;

    res.status(200).json({ averageSatisfaction });
  } catch (error) {
    console.error("Failed to fetch customer satisfaction:", error);
    res.status(500).json({ error: "Failed to fetch customer satisfaction" });
  } finally {
    await client.close();
  }
}
