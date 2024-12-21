import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync transactions from receipts
  const syncTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/transaction", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Immediately fetch updated transactions
        await fetchTransactions();
        alert(`Synchronized ${data.count || 0} transactions`);
      } else {
        setError(data.error || "Failed to sync transactions");
      }
    } catch (error) {
      console.error("Sync error:", error);
      setError("Network error during synchronization");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/transaction");
      const data = await response.json();
      
      if (response.ok) {
        // Sort transactions by date in descending order
        const sortedData = data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setTransactions(sortedData);
      } else {
        setError(data.error || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error while fetching transactions");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter transactions by date
  const filterTransactions = () => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dateTime);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return transactionDate >= start && transactionDate <= end;
      } else if (start) {
        return transactionDate >= start;
      } else if (end) {
        return transactionDate <= end;
      }
      return true;
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Transactions</h1>
        </div>
  
        <div className="flex items-center justify-between mb-6">

          {/* Date Filter Section */}
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="input input-bordered w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <span className="text-lg font-medium">→</span>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="input input-bordered w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          {/* Sync Transactions Button */}
          <button
            onClick={syncTransactions}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Syncing..." : "Sync Transactions"}
          </button>
  

        </div>
  
        {/* Error Handling */}
        {error && (
          <div className="alert alert-error mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
  
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
  
        {/* Transactions Table */}
        {!isLoading && (
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Type</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions().map((transaction) => (
              <tr key={transaction.orderId}>
                <td>{transaction.orderId}</td>
                <td>{new Date(transaction.dateTime).toLocaleDateString()}</td>
                <td>{transaction.orderType}</td>
                <td>{transaction.customerName}</td>
                <td>
                  <span
                    className={`badge ${
                      transaction.status === "Complete"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.paymentStatus}</td>
                <td>P{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
      </div>
    </>
  );
  

}
