"use client";
import React from "react";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  userId: string;
  date: string;
}

type Props = {
  transactions: Transaction[];
};

export default function TopCategoriesList({ transactions }: Props) {
  if (!Array.isArray(transactions)) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Top Spending Categories</h2>
        <p className="text-red-500">Invalid data format</p>
      </div>
    );
  }

  const expenses = transactions.filter((tx) => tx.type === "EXPENSE");

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Top Spending Categories</h2>
        <p className="text-gray-500 dark:text-gray-400">No expenses recorded</p>
      </div>
    );
  }

  const categoryTotals: Record<string, number> = {};
  expenses.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalExpenses = expenses.reduce((sum, tx) => sum + tx.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Top Spending Categories</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total: {formatCurrency(totalExpenses)}
        </span>
      </div>
      
      <div className="space-y-4">
        {sortedCategories.map(([category, amount], index) => {
          const percentage = Math.round((amount / totalExpenses) * 100);
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 dark:text-white">
                  {category}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {formatCurrency(amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                {percentage}% of total
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}