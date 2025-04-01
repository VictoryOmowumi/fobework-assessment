import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
const Investments = () => {
  // Dummy data
  const portfolio = {
    totalValue: 44500,
    allocation: [
      { name: 'Stocks', value: 26400, percentage: 59.3, change: 4.2 },
      { name: 'Bonds', value: 8900, percentage: 20.0, change: -0.5 },
      { name: 'Cash', value: 9200, percentage: 20.7, change: 0.1 },
    ],
  };

  const investments = [
    { id: 1, name: 'Tech Growth Fund', symbol: 'TGF', shares: 15, value: 8450, change: 2.3 },
    { id: 2, name: 'Global Index', symbol: 'GLX', shares: 42, value: 12600, change: -1.2 },
    { id: 3, name: 'Green Energy ETF', symbol: 'GEE', shares: 28, value: 7560, change: 5.7 },
    { id: 4, name: 'Dividend Aristocrats', symbol: 'DVA', shares: 35, value: 5890, change: 0.8 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Investment Portfolio</h1>
      
      <div className="grid gap-6 grid-cols-1  md:grid-cols-3 mb-8">
        <div className="bg-card rounded-lg shadow p-4 col-span-2">
          <h2 className="font-semibold text-lg mb-4">Portfolio Allocation</h2>
          <div className="flex items-center justify-center h-48">
            {/* Placeholder for pie chart - would be replaced with actual chart component */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolio.allocation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {portfolio.allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : index === 1 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
               
              </PieChart>
            </ResponsiveContainer>

            
          </div>
          <div className="mt-4 grid gap-2">
            {portfolio.allocation.map(item => (
              <div key={item.name} className="flex justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ 
                      backgroundColor: item.name === 'Stocks' ? '#3B82F6' : 
                                      item.name === 'Bonds' ? '#F59E0B' : '#10B981' 
                    }}
                  ></div>
                  <span>{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">${item.value.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-gray-500">{item.percentage}%</span>
                  <span className={`ml-2 text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-4">Portfolio Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Total Value</p>
              <p className="text-3xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's Change</p>
              <p className="text-xl font-bold text-green-500">+$245 (0.55%)</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">YTD Return</p>
              <p className="text-xl font-bold text-green-500">+8.2%</p>
            </div>
            <div className="pt-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Your Investments</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary rounded hover:bg-primary">Stocks</button>
            <button className="px-3 py-1 text-sm bg-primary rounded hover:bg-primary">ETFs</button>
            <button className="px-3 py-1 text-sm bg-primary rounded hover:bg-primary">Bonds</button>
          </div>
        </div>
        
        <div className="divide-y">
          {investments.map(investment => (
            <div key={investment.id} className="p-4 hover:bg-background grid grid-cols-3 md:grid-cols-4">
              <div>
                <p className="font-medium">{investment.name}</p>
                <p className="text-sm text-gray-500">{investment.symbol}</p>
              </div>
              <div className="text-right md:text-center">
                <p className="text-gray-500 text-sm">Shares</p>
                <p>{investment.shares}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Value</p>
                <p>${investment.value.toLocaleString()}</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-gray-500 text-sm">Today</p>
                <p className={investment.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {investment.change >= 0 ? '↑' : '↓'} {Math.abs(investment.change)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Investments;