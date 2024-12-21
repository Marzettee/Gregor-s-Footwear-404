import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Sales() {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [viewMode, setViewMode] = useState('all');

  useEffect(() => {
    fetchAllSales();
  }, []);

  const fetchAllSales = async () => {
    setLoading(true);
    setError(null);
    setViewMode('all');
    setSelectedMonth(null);
    setSelectedWeek(null);

    try {
      const response = await fetch("/api/sales/all");
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }
      const data = await response.json();
      setSalesData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlySales = async (month = null) => {
    setLoading(true);
    setError(null);
    setViewMode('monthly');
    setSelectedMonth(month);
    setSelectedWeek(null);

    try {
      const response = await fetch(`/api/sales/monthly${month !== null ? `?month=${month}` : ''}`);
      if (!response.ok) {
        throw new Error("Failed to fetch monthly sales data");
      }
      const data = await response.json();
      setSalesData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklySales = async (month, week) => {
    setLoading(true);
    setError(null);
    setViewMode('weekly');
    setSelectedMonth(month);
    setSelectedWeek(week);

    try {
      const response = await fetch(`/api/sales/weekly?month=${month}&week=${week}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weekly sales data");
      }
      const data = await response.json();
      setSalesData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodaySales = async () => {
    setLoading(true);
    setError(null);
    setViewMode('today');
    setSelectedMonth(null);
  
    try {
      const response = await fetch("/api/sales/today");
      if (!response.ok) {
        throw new Error("Failed to fetch today's sales data");
      }
      const data = await response.json();
      console.log(data)
      setSalesData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₱" + value.toLocaleString(),
        },
      },
    },
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      <Navbar />
      <div className="bg-base-100 p-6 overflow-x-hidden max-w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales Overview</h1>
          <div className="space-x-4">
            <button
              onClick={fetchAllSales}
              className={`text-black hover:underline focus:outline-none ${viewMode === 'all' ? 'font-bold underline' : ''}`}
            >
              All (Annually)
            </button>            
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className={`text-black hover:underline focus:outline-none ${viewMode === 'monthly' ? 'font-bold underline' : ''}`}>
                Monthly ▼
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {monthNames.map((month, index) => (
                  <li key={index} onClick={() => fetchMonthlySales(index)}>
                    <a>{month}</a>
                  </li>
                ))}
              </ul>
            </div>
            {selectedMonth !== null && (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className={`text-black hover:underline focus:outline-none ${viewMode === 'weekly' ? 'font-bold underline' : ''}`}>
                  Weeks ▼
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {[1, 2, 3, 4].map((week) => (
                    <li key={week} onClick={() => fetchWeeklySales(selectedMonth, week)}>
                      <a>Week {week}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={fetchTodaySales}
              className={`text-black hover:underline focus:outline-none ${viewMode === 'today' ? 'font-bold underline' : ''}`}
            >
              Today
            </button>
          </div>
        </div>

        {/* Main Content */}
        {!loading && salesData && (
          <>
            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              {/* Sales Graph Section */}
              <div className="flex-1 bg-base-200 p-6 rounded-lg shadow h-auto">
                <h2 className="font-bold mb-4">
                  {viewMode === 'all' && 'Annual Sales Graph'}
                  {viewMode === 'monthly' && `Sales Graph - ${monthNames[selectedMonth]} ${new Date().getFullYear()}`}
                  {viewMode === 'weekly' && `Sales Graph - ${monthNames[selectedMonth]} Week ${selectedWeek}`}
                  {viewMode === 'today' && `Sales Graph - Today (${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })})`}
                </h2>
                <div className="h-64">
                  <Line
                    data={{
                      labels: salesData.graph.labels,
                      datasets: [
                        {
                          label: "Sales Graph",
                          data: salesData.graph.data,
                          borderColor: "#3182CE",
                          backgroundColor: "rgba(49, 130, 206, 0.2)",
                          borderWidth: 2,
                          pointRadius: 4,
                          pointBackgroundColor: "#2C5282",
                        },
                      ],
                    }}
                    options={graphOptions}
                  />
                </div>
              </div>

              {/* Statistics Column */}
              <div className="flex-1 h-auto grid grid-cols-2 gap-5">
                {[
                  { 
                    label: "Total Sales", 
                    value: `₱${viewMode === 'today' ? salesData.today.totalSales.toLocaleString() : salesData.totalSales.toLocaleString()}` 
                  },
                  { 
                    label: "Total Items Sold", 
                    value: viewMode === 'today' ? salesData.today.totalOrders : salesData.totalOrders 
                  },
                  { 
                    label: "Total Orders", 
                    value: viewMode === 'today' ? salesData.today.totalOrders : salesData.totalOrders 
                  },
                  { 
                    label: "Total Customers", 
                    value: viewMode === 'today' ? salesData.today.totalCustomers : salesData.totalCustomers 
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow flex flex-col justify-center h-full relative"
                  >
                    <p className="absolute top-6 left-5 text-xl font-semibold text-black">
                      {stat.label}
                    </p>
                    <p className="absolute bottom-6 left-5 text-3xl font-semibold text-black">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Best Selling Products and Services */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Best Selling Products */}
              <div>
                <h2 className="font-bold mb-2">Best Selling Products</h2>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(viewMode === 'today' ? salesData.today.bestSellingProducts : salesData.bestSellingProducts).map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>₱{product.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Best Selling Services */}
              <div>
                <h2 className="font-bold mb-2">Best Selling Services</h2>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(viewMode === 'today' ? salesData.today.bestSellingServices : salesData.bestSellingServices).map((service, index) => (
                      <tr key={index}>
                        <td>{service.name}</td>
                        <td>{service.quantity}</td>
                        <td>₱{service.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}