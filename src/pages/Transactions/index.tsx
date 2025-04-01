import { useState, useEffect } from 'react';
import TransactionList from '../../components/features/transactions/TransactionList';
import TransactionStats from '../../components/features/transactions/TransactionStats';
import { transactions as dummyTransactions } from '../../utils/dummydata';
import { FiRefreshCw,  FiSearch } from 'react-icons/fi';

const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: 'this-month',
    category: '',
    search: ''
  });
  interface Transaction {
    id: string;
    transactionDate: string;
    status: string;
    category: string;
    amount: number;
    currency: string;
    transactionType: string;
    paymentMethod: string;
    recipient: {
      name: string;
      accountNumber: string;
    };
  }

  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Filter transactions based on all criteria including date range
  useEffect(() => {
    interface Transaction {
      id: string;
      transactionDate: string;
      status: string;
      category: string;
      recipient: {
      name: string;
      accountNumber: string;
      };
    }

   

    const filterByDateRange = (transaction: Transaction): boolean => {
      const transactionDate = new Date(transaction.transactionDate);
      const now = new Date();
      
      switch(filters.dateRange) {
      case 'this-month':
        return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
        );
      case 'last-month': {
        const lastMonth = new Date(now);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return (
        transactionDate.getMonth() === lastMonth.getMonth() &&
        transactionDate.getFullYear() === lastMonth.getFullYear()
        );
      }
      case 'this-year':
        return transactionDate.getFullYear() === now.getFullYear();
      case 'last-year':
        return transactionDate.getFullYear() === now.getFullYear() - 1;
      case 'all':
        return true;
      default:
        return true;
      }
    };

    const filtered = dummyTransactions.filter(transaction => {
      // Date range filter
      if (!filterByDateRange(transaction)) return false;
      
      // Status filter
      if (filters.status && transaction.status !== filters.status) return false;
      
      // Category filter
      if (filters.category && transaction.category !== filters.category) return false;
      
      // Search filter
      if (filters.search && 
          !transaction.recipient.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !transaction.id.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    setFilteredTransactions(filtered);
  }, [filters]);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Transactions
          </h1>
          <p className="text-sm text-gray-500">Track your financial activity</p>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[300px]">
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 border border-slate-400 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:border-slate-700 rounded-lg w-full bg-card focus:outline-none focus:ring-[1px] focus:ring-slate-600"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select 
            className="border border-slate-400 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:border-slate-700 rounded-lg px-3 py-2 bg-card"
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-year">This Year</option>
            <option value="last-year">Last Year</option>
            <option value="all">All Time</option>
          </select>
          
          <button 
            onClick={handleRefresh}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <TransactionStats transactions={filteredTransactions} />
      <TransactionList transactions={filteredTransactions} loading={loading} />
    </div>
  );
};

export default Transactions;