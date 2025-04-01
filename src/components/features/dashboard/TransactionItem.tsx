';
import {  FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
}

interface TransactionItemProps {
  transact: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transact }) => {
  const isIncome = transact.type === 'income';
  const isInvestment = transact.type === 'investment';

  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          isIncome ? 'bg-green-500/10 text-green-500' :
          isInvestment ? 'bg-primary/10 text-primary' :
          'bg-red-500/10 text-red-500'
        }`}>
          {isIncome ? (
            <FiArrowDownLeft className="w-4 h-4" />
          ) : (
            <FiArrowUpRight className="w-4 h-4" />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{transact.description}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(transact.date), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
      <p className={`font-medium ${
        isIncome ? 'text-green-500' :
        isInvestment ? 'text-primary' :
        'text-red-500'
      }`}>
        {isIncome ? '+' : '-'}${transact.amount.toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionItem;