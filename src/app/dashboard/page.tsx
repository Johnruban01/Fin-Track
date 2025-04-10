"use client";
import React, { useState, useEffect } from "react";
import api from "../../../core/axios";
import { getUserId } from "../../../lib/getUserId";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  userId: string;
  date?: string;
}

export default function DashboardPage() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const userId = getUserId(); // Get user ID from local storage or context

  const fetchTransactions = async () => { 
    try {
      setIsLoading(true);
      const response = await api.get("/transaction", {
        params: { userId: userId, limit: 5 } // Added limit for recent transactions
      });

      const transactions = response.data;
      const incomeTransactions = transactions.filter((tx: Transaction) => tx.type === "INCOME");
      const expenseTransactions = transactions.filter((tx: Transaction) => tx.type === "EXPENSE");
      
      const incomeTotal = incomeTransactions.reduce((sum: number, tx: Transaction) => sum + tx.amount, 0);
      const expensesTotal = expenseTransactions.reduce((sum: number, tx: Transaction) => sum + tx.amount, 0);
      const balance = incomeTotal - expensesTotal;
      
      setIncome(incomeTotal);
      setExpense(expensesTotal);
      setTotal(balance);
      setRecentTransactions(transactions.slice(0, 5)); // Get most recent 5 transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        {/* Stats section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Balance</h3>
                <p className="text-3xl font-bold mt-2">
                  {isLoading ? 'Loading...' : formatCurrency(total)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {total >= 0 ? 'You are doing great!' : 'Consider reducing expenses'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Income</h3>
                <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">
                  {isLoading ? 'Loading...' : formatCurrency(income)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {income > 0 ? `+${formatCurrency(income)} this month` : 'No income recorded'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Expenses</h3>
                <p className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">
                  {isLoading ? 'Loading...' : formatCurrency(expense)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {expense > 0 ? `-${formatCurrency(expense)} this month` : 'No expenses recorded'}
            </p>
          </div>
        </section>

        {/* Recent activity section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Loading transactions...
            </div>
          ) : recentTransactions.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentTransactions.map((tx) => (
                <li key={tx.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        tx.type === "INCOME" 
                          ? "bg-green-50 dark:bg-green-900/20" 
                          : "bg-red-50 dark:bg-red-900/20"
                      }`}>
                        {tx.type === "INCOME" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{tx.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tx.category} • {tx.date || 'No date'}
                        </p>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      tx.type === "INCOME" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    }`}>
                      {tx.type === "INCOME" ? '+' : '-'}{formatCurrency(tx.amount)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No transactions found. Add your first transaction!
            </div>
          )}
          
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 text-right">
            <button 
              onClick={fetchTransactions}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All Transactions →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}