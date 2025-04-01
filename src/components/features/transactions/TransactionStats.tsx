import React from 'react';
import { FiTrendingUp, FiTrendingDown} from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { ResponsiveContainer } from 'recharts';
import logo from '@/assets/logo-2.svg';
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

const TransactionStats = ({ transactions }) => {
  // Current balance data
  const calculateBalances = () => {
    let currentBalance = 0;
    let availableBalance = 0;

    transactions.forEach(transaction => {
      if (transaction.category === 'Income') {
        currentBalance += transaction.amount;
        if (transaction.status === 'Successful') {
          availableBalance += transaction.amount;
        }
      } else {
        currentBalance -= transaction.amount;
        if (transaction.status === 'Successful') {
          availableBalance -= transaction.amount;
        }
      }
    });

    return { currentBalance, availableBalance };
  };

  const { currentBalance, availableBalance } = calculateBalances();

  // Calculate summary stats
  const inflow = transactions
    .filter(t => t.category === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const outflow = transactions
    .filter(t => t.category !== 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const successfulCount = transactions.filter(t => t.status === 'Successful').length;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  const generateRandomData = () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return months.map(month => {
      const inflow = Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000;
      const outflow = Math.floor(Math.random() * (inflow - 5000 + 1)) + 5000;
      return { month, inflow, outflow };
    });
  };

  const monthlyTrendData = generateRandomData();
  const chartData = {
    labels: monthlyTrendData.map(data => data.month),
    datasets: [
      {
        label: 'Inflow',
        data: monthlyTrendData.map(data => data.inflow),
        backgroundColor: "#BFA7F2",
        borderRadius: 4,
        borderSkipped: false
      },
      {
        label: 'Outflow',
        data: monthlyTrendData.map(data => data.outflow),
        backgroundColor: "#9810fae0",
        borderRadius: 0,
        borderSkipped: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `₦${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#6b7280' }
      },
      y: {
        stacked: true,
        grid: {
          display: false,
          color: '#e5e7eb',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          callback: (value) => `$${value / 1000}k`
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-800 dark:text-slate-200 print:hidden mb-6">
      {/* Left Column - Balance and Summary Cards */}
      <div className="col-span-1 flex flex-col gap-4 h-full">
        {/* Current Balance Card */}
        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-6 rounded-xl shadow min-h-56 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">Current Balance</h3>
            <img src={logo} alt="Logo" className=" w-12 " /> 
          </div>
          <div className="mt-auto">
            <p className="text-3xl font-bold">${currentBalance.toLocaleString()}</p>
            <p className="text-purple-100 mt-2">Available: ${availableBalance.toLocaleString()}</p>
          </div>
        </div>

        {/* Transactions Summary Card */}
        <div className="bg-card p-6 rounded-lg shadow flex flex-col min-h-48">
          <h3 className="text-lg font-medium mb-4">Transactions Summary</h3>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <FiTrendingUp className="mr-2" />
                <span className="text-sm">Inflow</span>
              </div>
              <p className="text-xl font-semibold mt-1">+${inflow.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <div className="flex items-center text-red-600 dark:text-red-400">
                <FiTrendingDown className="mr-2" />
                <span className="text-sm">Outflow</span>
              </div>
              <p className="text-xl font-semibold mt-1">-${outflow.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Total Transactions: <span className="font-medium">{transactions.length}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Chart Area */}
      <div className="col-span-2 bg-card p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Inflow vs Outflow</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded">
              This Month
            </button>
            <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded">
              This Year
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <Bar data={chartData} options={chartOptions} />
          </ResponsiveContainer>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">Successful</p>
            <p className="text-xl font-semibold mt-1">{successfulCount}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">Pending</p>
            <p className="text-xl font-semibold mt-1">{pendingCount}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            <p className="text-sm text-purple-600 dark:text-purple-400">Categories</p>
            <p className="text-xl font-semibold mt-1">
              {new Set(transactions.map(t => t.category)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStats;