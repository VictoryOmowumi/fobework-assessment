import React from "react";
import GoalCard from "./GoalCard";

interface Goal {
  id: string;
  name: string;
  saved: number;
  target: number;
  remaining: number;
  deadline: string;
}

interface SavingsGoalsProps {
  goals: Goal[];
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold ">Savings Goals</h2>
        <button className="text-sm text-primary hover:underline">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals?.map((goal) => (
          <GoalCard
            key={goal.id}
            title={goal.name}
            current={goal.saved}
            target={goal.target}
            deadline={new Date(goal.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          />
        ))}
      </div>
    </>
  );
};

export default SavingsGoals;
