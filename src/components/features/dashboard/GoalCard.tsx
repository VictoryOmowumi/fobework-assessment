';

interface GoalCardProps {
  title: string;
  current: number;
  target: number;
  deadline: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, current, target, deadline }) => {
  const progress = Math.min((current / target) * 100, 100);
  const progressText = `${progress.toFixed(0)}%`;

  return (
    <div className="bg-background rounded-lg border border-border p-4 h-full">
     
      <h3 className="font-medium text-foreground">{title}</h3>
      
      <div className="mt-4 mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{progressText}</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Saved</p>
          <p className="font-medium">${current.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Target</p>
          <p className="font-medium">${target.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Deadline</p>
          <p className="font-medium">{deadline}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Remaining</p>
          <p className="font-medium">${(target - current).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;