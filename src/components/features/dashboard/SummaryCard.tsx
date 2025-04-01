';

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <p className={`text-sm mt-3 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {change || "0%"} from last month
      </p>
    </div>
  );
};

export default SummaryCard;