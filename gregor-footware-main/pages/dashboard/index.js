"use client";

import Navbar from "@/components/Navbar";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [totalReceipts, setTotalReceipts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pieDataFetch, setPieDataFetch] = useState(null);
  const [pieStock, setPieStock] = useState(null);
  const [barDataFetch, setBarDataFetch] = useState(null);
  const [transNo, setTransNo] = useState(0);

  useEffect(() => {
    const fetchTrans = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/transaction"
        );
        const data = await response.json();
        setTransNo(data.totalTransaction);
      } catch (error) {
        console.error("Error fetching total receipts:", error);
      }
    };

    fetchTrans();
  }, []);

  useEffect(() => {
    const fetchStockCounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/serviceDisplay"
        );
        const data = await response.json();

        if (data.kindCounts) {
          console.log(data.kindCounts);

          const labels = data.kindCounts.map((item) => item._id);
          const values = data.kindCounts.map((item) => item.count);

          setPieStock({
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "#68D391", // Green
                  "#F6AD55", // Orange
                  "#ED64A6", // Pink
                  "#38B2AC", // Teal
                  "#63B3ED", // Light Blue
                  "#FBD38D", // Yellow
                  "#6B46C1", // Purple
                  "#F687B3", // Light Pink
                  "#ECC94B", // Gold
                  "#38B2AC", // Teal (Different shade for variety)
                  "#9B2D20", // Red
                ],

                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching kind counts:", error);
      }
    };

    fetchStockCounts();
  }, []);

  useEffect(() => {
    const fetchKindCounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/salesDisplay"
        );
        const data = await response.json();

        if (data.kindCounts) {
          console.log(data.kindCounts);

          const labels = data.kindCounts.map((item) => item._id).filter(Boolean);
          const values = data.kindCounts.map((item) => item.count).filter((count) => count !== undefined);

          setBarDataFetch({
            labels: labels,
            datasets: [
              {
                label: '', // Set to empty string
                data: values,
                backgroundColor: [
                  "#68D391", "#F6AD55", "#ED64A6", "#38B2AC", 
                  "#63B3ED", "#FBD38D", "#6B46C1", "#F687B3", 
                  "#ECC94B", "#38B2AC", "#9B2D20"
                ],
                borderWidth: 1,
              },
            ],
          });


          setPieDataFetch({
            labels: labels,
            datasets: [
              {
                label: "Product Sales by Kind",
                data: values,
                backgroundColor: [
                  "#68D391", // Green
                  "#F6AD55", // Orange
                  "#ED64A6", // Pink
                  "#38B2AC", // Teal
                  "#63B3ED", // Light Blue
                  "#FBD38D", // Yellow
                  "#6B46C1", // Purple
                  "#F687B3", // Light Pink
                  "#ECC94B", // Gold
                  "#38B2AC", // Teal (Different shade for variety)
                  "#9B2D20", // Red
                ],

                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching kind counts:", error);
      }
    };

    fetchKindCounts();
  }, []);

  useEffect(() => {
    // Fetch data from the API
    async function fetchSalesData() {
      try {
        const response = await fetch("/api/sales/all");
        const data = await response.json();
        
        if (response.ok) {
          setTotalCustomers(data.totalCustomers); // Set total customers
        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSalesData();
  }, []);

  useEffect(() => {
    // Fetch total receipts from the API
    const fetchReceipts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/receiptCount"
        );
        const data = await response.json();
        setTotalReceipts(data.totalReceipts);
      } catch (error) {
        console.error("Error fetching total receipts:", error);
      }
    };

    fetchReceipts();
  }, []);

  if (!pieDataFetch) {
    return <div>Loading...</div>;
  }

  if (!pieStock) {
    return <div>Loading...</div>;
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        right: 50,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable the legend completely
      },
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="bg-base-200 flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          {/* Statistics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="stat bg-white shadow-md rounded-lg p-4">
              <div className="stat-title text-gray-500">
                Total Receipts Issued
              </div>
              <div className="stat-value text-2xl font-bold">
                {totalReceipts ? totalReceipts : "Loading."}
              </div>
            </div>
            <div className="stat bg-white shadow-md rounded-lg p-4">
              <div className="stat-title text-gray-500">
                Recent Transactions
              </div>
              <div className="stat-value text-2xl font-bold">
                {transNo ? transNo : "Loading."}
              </div>
            </div>
            <div className="stat bg-white shadow-md rounded-lg p-4">
              <div className="stat-title text-gray-500">Total Customers</div>
              <div className="stat-value text-2xl font-bold">
                {totalCustomers ? totalCustomers : "Loading."}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
            {/* Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">Product Sales</h2>
              <div className="flex-grow">
                <Pie data={pieDataFetch} options={pieOptions} />
              </div>
            </div>



            {/* Services Sales Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">Services Sales</h2>
              <div className="flex-grow">
                <Pie data={pieStock} options={pieOptions} />
              </div>
            </div>
            {/* Bar Chart - Now Expanded */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">
                Best Selling Products
              </h2>
              <div className="flex-grow">
                <Bar data={barDataFetch} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}