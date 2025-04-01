';
import TransactionItem from './TransactionItem';
import { useTransactions } from '../../../services/transactionApi/api';

const RecentTransactions = () => {
  const { transactions, loading, error } = useTransactions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!transactions || transactions.length === 0)
    return <div>No transactions available</div>;

// Sort transactions by date in descending order and get the most recent 5 transactions
const recentTransactions = transactions
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);
 
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transact={transaction} />
        ))}
      </div>
      <button className="mt-4 w-full py-2 text-sm text-primary hover:bg-accent rounded-md">
        View All Transactions
      </button>
    </>
  );
};

export default RecentTransactions;