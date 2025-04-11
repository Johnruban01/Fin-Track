"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

export default function CategoryPieChart({ transactions }: Props) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Expenses by Category</h2>
        <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
      </div>
    );
  }

  const expenseByCategory: Record<string, number> = {};

  transactions.forEach((tx) => {
    if (tx.type === "EXPENSE") {
      expenseByCategory[tx.category] = (expenseByCategory[tx.category] || 0) + tx.amount;
    }
  });

  const categories = Object.keys(expenseByCategory);
  const amounts = Object.values(expenseByCategory);

  // Generate a more sophisticated color palette
  const generateColors = (count: number) => {
    const baseColors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316', '#64748b', '#84cc16'
    ];
    return Array.from({ length: count }, (_, i) => 
      baseColors[i % baseColors.length]
    );
  };

  const data = {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: generateColors(categories.length),
      borderColor: '#1e293b',
      borderWidth: 1,
      hoverBorderWidth: 2,
      hoverOffset: 10
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#64748b',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
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
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Expenses by Category</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
      </div>
      <div className="h-80 relative">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}