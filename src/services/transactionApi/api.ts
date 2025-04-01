import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: "income" | "expense" | "investment";
}

interface DashboardData {
  balance: number;
  income: number;
  expense: number;
  investments: number;
  savings: number;
  monthlySpend: number;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    
  
    try {
      const response = await axios.get<Transaction[]>(
        "https://67ebb966aa794fb3222b5f31.mockapi.io/api/v1/transactions"
      );
      
      const dashboardResponse = await axios.get<DashboardData>(
        "https://67ebb966aa794fb3222b5f31.mockapi.io/api/v1/dashboardData"
      );
   
      setTransactions(response.data);
      setDashboardData(dashboardResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, dashboardData, loading, error, refresh: fetchTransactions };
};