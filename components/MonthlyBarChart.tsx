"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

export default function MonthlyBarChart({ transactions }: Props) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Monthly Income & Expenses</h2>
        <p className="text-gray-500 dark:text-gray-400">No transaction data available</p>
      </div>
    );
  }

  const monthlyMap: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", { month: "short", year: "numeric" });

    if (!monthlyMap[month]) {
      monthlyMap[month] = { income: 0, expense: 0 };
    }

    if (tx.type === "INCOME") {
      monthlyMap[month].income += tx.amount;
    } else {
      monthlyMap[month].expense += tx.amount;
    }
  });

  const labels = Object.keys(monthlyMap);
  const incomeData = labels.map(month => monthlyMap[month].income);
  const expenseData = labels.map(month => monthlyMap[month].expense);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: '#10b981',
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: '#059669',
        barThickness: 20,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: '#ef4444',
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: '#dc2626',
        barThickness: 20,
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#64748b',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#64748b'
        }
      },
      y: {
        grid: {
          color: '#e2e8f0',
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          callback: (value: any) => `₹${value.toLocaleString()}`
        },
        beginAtZero: true
      }
    },
    animation: {
      delay: (context: any) => {
        if (context.type === 'data' && context.mode === 'default') {
          return context.dataIndex * 50;
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Monthly Income & Expenses</h2>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Income</span>
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Expense</span>
        </div>
      </div>
      <div className="h-80 relative">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}