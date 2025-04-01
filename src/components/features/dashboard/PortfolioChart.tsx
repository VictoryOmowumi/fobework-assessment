import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PortfolioData {
  label: string;
  value: number;
  color: string;
}

interface PortfolioChartProps {
  data: PortfolioData[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  const chartData = data.map((entry) => ({
    ...entry,
    name: entry.label,
  }));
  return (

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ label, percent }) =>
              `${label} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Amount",
            ]}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
  );
};

export default PortfolioChart;
