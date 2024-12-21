import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  console.log("Received request method:", req.method);

  try {
    await client.connect();
    const db = client.db("Customer");
    const transactionsCollection = db.collection("Transactions");
    const receiptsCollection = db.collection("Receipts");

    if (req.method === "POST") {
      // Log total number of receipts
      const totalReceipts = await receiptsCollection.countDocuments();
      console.log(`Total Receipts: ${totalReceipts}`);

      // Fetch all receipts with detailed logging
      const receipts = await receiptsCollection.find({}).toArray();
      console.log("Sample Receipt:", receipts[0] || "No receipts found");

      // Convert receipts to transaction objects with extensive logging
      const transactions = receipts.map((receipt, index) => {
        const transaction = {
          orderId: receipt._id.toString(),
          dateTime: receipt.dateRecorded || new Date().toISOString(),
          orderType: receipt.kind || 'Unknown',
          customerName: receipt.fullName || 'Anonymous',
          status: receipt.balance === 'sampleP' ? 'Pending' : 'Complete',
          paymentStatus: receipt.deposit === 'sampleP' ? 'Unpaid' : 'Paid',
          amount: receipt.price || '0',
          receiptRef: receipt._id
        };

        // Log each transaction transformation
        console.log(`Transaction ${index + 1}:`, transaction);

        return transaction;
      });

      console.log(`Total Transactions to be inserted: ${transactions.length}`);

      // Upsert each transaction
      const bulkOperations = transactions.map((transaction) => ({
        updateOne: {
          filter: { orderId: transaction.orderId },
          update: { $set: transaction },
          upsert: true
        }
      }));

      if (bulkOperations.length > 0) {
        const result = await transactionsCollection.bulkWrite(bulkOperations);
        console.log("Bulk Write Result:", result);
      }

      res.status(200).json({ 
        message: "Transactions updated successfully!", 
        count: bulkOperations.length,
        receiptsCount: totalReceipts
      });
    } 
    else if (req.method === "GET") {
      // Fetch all transactions with detailed logging
      const transactions = await transactionsCollection.find({}).toArray();
      
      console.log(`Total Transactions Retrieved: ${transactions.length}`);
      if (transactions.length > 0) {
        console.log("Sample Transaction:", transactions[0]);
      }

      res.status(200).json(transactions);
    } 
    else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Detailed Error in transactions API:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    res.status(500).json({ 
      error: "Failed to process transactions.", 
      details: error.message,
      stack: error.stack 
    });
  } finally {
    await client.close();
  }
}

