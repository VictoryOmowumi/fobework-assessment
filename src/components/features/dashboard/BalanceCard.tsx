import {
  FiArrowUpRight,
  FiArrowDownLeft,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import balanceImg from "../../../assets/balance.svg";
import { useAppDispatch } from "../../../store/store";
import { toggleSendModal, toggleReceiveModal } from "../../../store/financeSlice";
interface BalanceCardProps {
  data: {
    balance: number;
    income: number;
    expenses: number;
  };
}

const BalanceCard = ({ data }: BalanceCardProps) => {
  const dispatch = useAppDispatch();
  if (!data || typeof data.balance !== "number" || typeof data.income !== "number" || typeof data.expenses !== "number") {
    return <div className="text-red-500">Invalid data</div>;
  }
  return (
    <div className="bg-gradient-to-br from-[#8942FE]/90 to-[#656EC2]/90 backdrop-blur-md border border-white/10 rounded-xl p-2 md:p-6 text-white shadow-lg flex justify-between">
      <div className="flex flex-col justify-between">
        {/* Balance Display */}
        <div className="mb-6">
          <p className="text-3xl font-bold">${data.balance.toLocaleString()}</p>
          <p className="text-sm opacity-80">My Balance</p>
        </div>

        {/* Income/Expense Row */}
        <div className="flex justify-between mb-8 gap-5">
          <div className="flex gap-2 items-center">
            <div className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-primary/70 dark:bg-primary/20 rounded-md">
              <FiArrowUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-base md:text-lg font-semibold">${data.income.toLocaleString()}</p>
              <p className="text-xs opacity-80">Income</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-primary/70 dark:bg-primary/20 rounded-md">
              <FiArrowDown className="w-5 h-8 text-red-500" />
            </div>
            <div className="">
              <p className="text-base md:text-lg font-semibold">${data.expenses.toLocaleString()}</p>
              <p className="text-xs opacity-80">Expense</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button  onClick={() => dispatch(toggleSendModal())} className="text-sm md:text-base  text-nowrap flex-1 flex items-center justify-center gap-2 bg-white/80 text-primary dark:text-white dark:bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 px-4 rounded-lg transition-all">
            <FiArrowUpRight className="w-4 h-4" />
            <span>Send Funds</span>
          </button>
          <button  onClick={() => dispatch(toggleReceiveModal())} className="text-sm md:text-base flex-1 flex items-center justify-center gap-2 bg-white/80 text-primary dark:text-white dark:bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 px-4 rounded-lg transition-all">
            <FiArrowDownLeft className="w-4 h-4" />
            <span>Receive</span>
          </button>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 justify-end">
        <img src={balanceImg} alt="Balance" className="" />
      </div>
    </div>
  );
};

export default BalanceCard;
