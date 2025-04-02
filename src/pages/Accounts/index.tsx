import { Plus } from 'lucide-react';
import TransactionList from '../../components/features/transactions/TransactionList';
import { transactions as dummyTransactions } from '../../utils/dummydata';
const Accounts = () => {
  // Enhanced dummy data with status and icons
  const accounts = [
    { 
      id: 1, 
      name: 'Main Checking', 
      balance: 8450.32, 
      type: 'checking', 
      accountNumber: '****4582',
      status: 'active',
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      id: 2, 
      name: 'Savings Account', 
      balance: 12500.00, 
      type: 'savings', 
      accountNumber: '****3021',
      status: 'active',
      color: 'bg-green-100 text-green-800'
    },
    { 
      id: 3, 
      name: 'Investment Account', 
      balance: 32450.78, 
      type: 'investment', 
      accountNumber: '****7845',
      status: 'active',
      color: 'bg-purple-100 text-purple-800'
    },
  ];

    const loading = false; 

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Accounts</h1>
          <p className="text-muted-foreground">Overview of all your financial accounts</p>
        </div>
        <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1">
          <Plus className="w-5 h-5" />
          Add New Account
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {accounts.map(account => (
          <div key={account.id} className="bg-card rounded-xl  border border-border hover:shadow-sm transition-shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{account.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${account.color}`}>
                  {account.accountNumber}
                </span>
              </div>
              
              
              <div className="flex justify-between items-end mt-4">
              <div className="">
                <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                <p className="text-3xl font-bold ">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
                
                <span className="text-xs px-2 py-1 bg-gray-100 text-fuchsia-600 rounded-full">
                  {account.status}
                </span>
              </div>
            </div>
            
            {/* Account type specific footer */}
            <div className={`${account.type === 'checking' ? 'bg-blue-50' : account.type === 'savings' ? 'bg-green-50' : 'bg-purple-50'} text-neutral-800 px-6 py-3`}>
              <p className="text-xs ">
                {account.type === 'checking' ? 'Daily transactions available' :
                 account.type === 'savings' ? 'Earning 3.5% APY' :
                 'Market value updated daily'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        </div>
        

        <TransactionList transactions={dummyTransactions} loading={loading} />
        
        <div className="p-4 border-t border-border text-center">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Empty State (commented out for my reference)
      <div className="text-center py-12 bg-muted-foreground rounded-xl">
        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No accounts yet</h3>
        <p className="text-gray-500 mb-4">Add your first account to get started</p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add Account
        </button>
      </div> */}
    </div>
  );
};

export default Accounts;