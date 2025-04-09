// components/DashboardSidebar.tsx
"use client";

import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-6">FinTrack</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="hover:text-blue-600 block">Dashboard</Link>
        <Link href="/transactions" className="hover:text-blue-600 block">Transactions</Link>
        <Link href="/settings" className="hover:text-blue-600 block">Settings</Link>
      </nav>
    </aside>
  );
}
