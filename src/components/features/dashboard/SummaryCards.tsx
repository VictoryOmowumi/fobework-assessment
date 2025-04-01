import React from "react";
import SummaryCard from "./SummaryCard";
import { FiTrendingUp, FiDollarSign, FiPieChart, FiCreditCard } from "react-icons/fi";

interface KPI {
  netWorth: { value: number; change: string; changeType: string };
  investments: { value: number; change: string; changeType: string };
  savings: { value: number; change: string; changeType: string };
  monthlySpend: { value: number; change: string; changeType: string };
}

interface SummaryCardsProps {
  kpi: KPI;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ kpi }) => {
  if (!kpi?.netWorth) {
    return <p className="text-muted-foreground">Loading KPI data...</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <SummaryCard
        title="Net Worth"
        value={`$${kpi.netWorth?.value?.toLocaleString?.() || 0}`}
        change={kpi.netWorth?.change || "+0%"}
        icon={<FiTrendingUp className="w-5 h-5" />}
        color="text-primary"
      />
      <SummaryCard
        title="Investments"
        value={`$${kpi.investments?.value?.toLocaleString?.() || 0}`}
        change={kpi.investments?.change || "+0%"}
        icon={<FiPieChart className="w-5 h-5" />}
        color="text-[#656EC2]"
      />
      <SummaryCard
        title="Savings"
        value={`$${kpi.savings?.value?.toLocaleString?.() || 0}`}
        change={kpi.savings?.change || "+0%"}
        icon={<FiCreditCard className="w-5 h-5" />}
        color="text-[#FED728]"
      />
      <SummaryCard
        title="Monthly Spend"
        value={`$${kpi.monthlySpend?.value?.toLocaleString?.() || 0}`}
        change={kpi.monthlySpend?.change || "0%"}
        icon={<FiDollarSign className="w-5 h-5" />}
        color="text-[#D4CDFF]"
      />
    </div>
  );
};

export default SummaryCards;