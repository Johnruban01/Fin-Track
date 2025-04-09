import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening:</p>
        </header>

        {/* Stats section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
            <p className="text-2xl font-bold">₹25,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Income</h3>
            <p className="text-2xl font-bold text-green-500">₹15,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Expenses</h3>
            <p className="text-2xl font-bold text-red-500">₹10,000</p>
          </div>
        </section>

        {/* Recent activity section */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Groceries</span>
                <span className="text-red-500">-₹500</span>
              </li>
              <li className="flex justify-between">
                <span>Freelance Payment</span>
                <span className="text-green-500">+₹5000</span>
              </li>
              <li className="flex justify-between">
                <span>Electricity Bill</span>
                <span className="text-red-500">-₹1200</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
