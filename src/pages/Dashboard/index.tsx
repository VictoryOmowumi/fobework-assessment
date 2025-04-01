
import SummaryCards from '../../components/features/dashboard/SummaryCards';
import PortfolioAllocation from '../../components/features/dashboard/PortfolioAllocation';
import RecentTransactions from '../../components/features/dashboard/RecentTransactions';
import SavingsGoals from '../../components/features/dashboard/SavingsGoals';
import { FiRefreshCw } from 'react-icons/fi';
import BalanceCard from '../../components/features/dashboard/BalanceCard';
import { useTransactions } from '../../services/transactionApi/api';
import { Skeleton } from '../../components/ui/skeleton';
import SendModal from '../../components/features/modals/SendModal';
import ReceiveModal from '../../components/features/modals/ReceiveModal';
const Dashboard = () => {
  const user = "Ayinla Abdulazeez";
  const { dashboardData, loading, error, refresh } = useTransactions();
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>

        {/* Balance Card Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4">
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Summary Cards Skeleton */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Allocation Skeleton */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <Skeleton className="h-48 w-full" />
          </div>

          {/* Recent Transactions Skeleton */}
          <div className="bg-card rounded-xl border border-border p-6">
            <Skeleton className="h-48 w-full" />
          </div>

          {/* Savings Goals Skeleton */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start  gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-bold text-foreground text-wrap md:text-nowrap">{greeting}, {user}</h1>
          <p className="text-sm text-muted-foreground">
          Let's dive into your finances.
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-end w-full gap-3">
          <span className="text-sm text-muted-foreground">Last updated: Today</span>
          <button onClick={refresh} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1">
            Refresh <FiRefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4">
          <BalanceCard data={dashboardData ? dashboardData[0].balanceCard : { balance: 0, income: 0, expenses: 0 }} />
        </div>
      {/* Summary Cards */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4">
        <SummaryCards kpi={dashboardData ? dashboardData[0].kpi : {}} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Allocation */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
        <PortfolioAllocation data={dashboardData ? dashboardData[0].portfolio : null} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-xl border border-border p-6">
          <RecentTransactions />
        </div>

        {/* Savings Goals */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
          <SavingsGoals goals= {dashboardData ? dashboardData[0].savingGoals : null} />
        </div>
      </div>

      <SendModal />
      <ReceiveModal />
    </div>
  );
};

export default Dashboard;