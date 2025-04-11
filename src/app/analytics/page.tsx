"use client";
import React, { useEffect, useState } from "react";
import CategoryPieChart from "../../../components/CategoryPieChart";
import MonthlyBarChart from "../../../components/MonthlyBarChart";
import TopCategoriesList from "../../../components/TopCategoriesList";
import { getUserId } from "../../../lib/getUserId";
import api from "../../../core/axios";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  userId: string;
  date: string;
}

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const userId = getUserId();
        const response = await api.get("/transaction", {
          params: { userId },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryPieChart transactions={transactions} />
        <MonthlyBarChart transactions={transactions} />
      </div>

      <TopCategoriesList transactions={transactions} />
    </div>
  );
}