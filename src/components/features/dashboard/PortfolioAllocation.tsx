
import PortfolioChart from './PortfolioChart';
import { TrendingUp } from 'lucide-react';
interface PortfolioProps {
  data: {
    allocation: {
      label: string;
      value: number;
      color: string;
    }[];
    trend: {
      text: string;
      change: string;
      changeType: string;
    };
  } | null;
}

const PortfolioAllocation: React.FC<PortfolioProps> = ({ data }) => {

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Portfolio Allocation</h2>
        <select className="bg-background border border-border rounded-md px-3 py-1 text-sm">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>
      <PortfolioChart data={data?.allocation || []} />
      <p className="flex gap-2  text-gray-400 font-medium leading-none mt-5">
        Trending up by 5.2% this month{" "}
        <TrendingUp className="h-4 w-4 text-green-500" />
      </p>
    </div>
  );
};

export default PortfolioAllocation;