import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
const Investments = () => {
  // Dummy data
  const portfolio = {
    totalValue: 44500,
    allocation: [
      { name: "Stocks", value: 26400, percentage: 59.3, change: 4.2 },
      { name: "Bonds", value: 8900, percentage: 20.0, change: -0.5 },
      { name: "Cash", value: 9200, percentage: 20.7, change: 0.1 },
    ],
  };

  const investments = [
    {
      id: 1,
      name: "Tech Growth Fund",
      symbol: "TGF",
      shares: 15,
      value: 8450,
      change: 2.3,
    },
    {
      id: 2,
      name: "Global Index",
      symbol: "GLX",
      shares: 42,
      value: 12600,
      change: -1.2,
    },
    {
      id: 3,
      name: "Green Energy ETF",
      symbol: "GEE",
      shares: 28,
      value: 7560,
      change: 5.7,
    },
    {
      id: 4,
      name: "Dividend Aristocrats",
      symbol: "DVA",
      shares: 35,
      value: 5890,
      change: 0.8,
    },
  ];

  const colors = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Investment Portfolio</h1>

      <div className="grid  lg:gap-6 grid-cols-1  lg:grid-cols-3 mb-8">
        <div className="bg-card rounded-lg shadow p-6 col-span-2">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-muted-foreground">
              Portfolio Allocation
            </h2>
            <div className="text-sm text-gray-500">
              Total Value:{" "}
              <span className="font-medium text-muted-foreground">
                ${portfolio.totalValue.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chart Container - Left Side */}
            <div className="flex-1 min-h-[300px] flex items-center justify-center w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolio.allocation}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="50%"
                    paddingAngle={2}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {portfolio.allocation.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Value",
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend and Details - Right Side */}
            <div className="flex-1">
              <div className="space-y-6">
                {portfolio.allocation.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    {/* Color indicator and name */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            item.name === "Stocks"
                              ? "#3B82F6"
                              : item.name === "Bonds"
                              ? "#F59E0B"
                              : "#10B981",
                        }}
                      ></div>
                      <span className="font-medium text-muted-foreground">
                        {item.name}
                      </span>
                    </div>

                    {/* Values and change */}
                    <div className="text-right">
                      <div className="font-semibold">
                        ${item.value.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm">
                        <span className="text-gray-500">
                          {item.percentage}%
                        </span>
                        <span
                          className={`inline-flex items-center ${
                            item.change >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {item.change >= 0 ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance summary */}
              <div className="mt-8 p-4 bg-accent rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Today's Change
                  </span>
                  <span className="font-medium text-green-500">
                    +$245 (0.55%)
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    YTD Return
                  </span>
                  <span className="font-medium text-green-500">+8.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card shadow rounded-lg p-4 mt-4 lg:mt-0">
          <h2 className="font-semibold text-lg mb-4">Portfolio Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Total Value</p>
              <p className="text-3xl font-medium">
                ${portfolio.totalValue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Today's Change</p>
              <p className="text-lg font-medium text-green-500">
                +$245 (0.55%)
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">YTD Return</p>
              <p className="text-lg font-medium text-green-500">+8.2%</p>
            </div>
            <div className="pt-4">
              <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden mb-5 ">
        <div className="p-4 border-b flex flex-col space-y-2 lg:flex-row justify-between lg:items-center">
          <h2 className="font-semibold text-lg">Your Investments</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary rounded hover:bg-primary text-accent">
              Stocks
            </button>
            <button className="px-3 py-1 text-sm bg-primary rounded hover:bg-primary text-accent">
              ETFs
            </button>
            <button className="px-3 py-1 text-sm bg-primary rounded hover:bg-primary text-accent">
              Bonds
            </button>
          </div>
        </div>

        <div className="divide-y">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="p-4 hover:bg-background grid grid-cols-3 md:grid-cols-4"
            >
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
                <p
                  className={
                    investment.change >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {investment.change >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(investment.change)}%
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
