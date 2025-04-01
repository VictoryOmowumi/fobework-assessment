
const Goals = () => {
 
  const goals = [
    { 
      id: 1, 
      name: 'Emergency Fund', 
      target: 10000, 
      saved: 6500, 
      deadline: 'Dec 2023',
      icon: '🛡️',
      priority: 'High'
    },
    { 
      id: 2, 
      name: 'Vacation to Japan', 
      target: 5000, 
      saved: 2300, 
      deadline: 'Jun 2024',
      icon: '✈️',
      priority: 'Medium'
    },
    { 
      id: 3, 
      name: 'New Car', 
      target: 25000, 
      saved: 8500, 
      deadline: 'Dec 2025',
      icon: '🚗',
      priority: 'Low'
    },
  ];

  const suggestedGoals = [
    { name: 'Retirement Fund', category: 'Long-term', popularity: '35%' },
    { name: 'Home Down Payment', category: 'Mid-term', popularity: '25%' },
    { name: 'Education Fund', category: 'Long-term', popularity: '20%' },
    { name: 'Wedding', category: 'Short-term', popularity: '15%' },
  ];

  const calculatePercentage = (saved: number, target: number): number => {
    return Math.min(Math.round((saved / target) * 100), 100);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <p className="text-accent-foreground">Track and manage your financial objectives</p>
        </div>
        <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1">
          <span className="text-xl">+</span> New Goal
        </button>
      </div>

      {/* Main Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {goals.map(goal => {
          const percentage = calculatePercentage(goal.saved, goal.target);
          const remaining = goal.target - goal.saved;
          const monthlySaving = remaining / Math.max(1, monthsUntilDeadline(goal.deadline));

          return (
            <div key={goal.id} className="bg-accent rounded-xl shadow-md overflow-hidden border border-border  hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <h2 className="text-xl font-semibold">{goal.name}</h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        goal.priority === 'High' ? 'bg-red-100 text-red-800' :
                        goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {goal.priority} Priority
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Target: ${goal.target.toLocaleString()}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress: {percentage}%</span>
                    <span>${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        percentage >= 75 ? 'bg-green-500' :
                        percentage >= 50 ? 'bg-blue-500' :
                        percentage >= 25 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center mt-6">
                  <div className="p-2 bg-muted-foreground rounded-lg">
                    <p className="text-sm text-gray-500">Remaining</p>
                    <p className="font-semibold">${remaining.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-muted-foreground rounded-lg">
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-semibold">{goal.deadline}</p>
                  </div>
                  <div className="p-2 bg-muted-foreground rounded-lg">
                    <p className="text-sm text-gray-500">Monthly</p>
                    <p className="font-semibold">${Math.round(monthlySaving).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Goals Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold  mb-6">Suggested Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestedGoals.map((goal, index) => (
            <div key={index} className="bg-accent p-5 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-2">{goal.name}</h3>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{goal.category}</span>
                <span>{goal.popularity} users</span>
              </div>
              <button className="mt-4 w-full py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                Add Goal
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State (commented out for my reference)
      <div className="text-center py-12 bg-muted-foreground rounded-xl">
        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No goals yet</h3>
        <p className="text-gray-500 mb-4">Create your first savings goal to get started</p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Create Goal
        </button>
      </div> */}
    </div>
  );
};

// Helper function to calculate months until deadline
function monthsUntilDeadline(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffInMonths = (deadlineDate.getFullYear() - today.getFullYear()) * 12 + 
                      (deadlineDate.getMonth() - today.getMonth());
  return Math.max(0, diffInMonths);
}

export default Goals;