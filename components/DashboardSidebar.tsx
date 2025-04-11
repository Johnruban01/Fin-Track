"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiDollarSign, FiSettings, FiPieChart, FiUser } from "react-icons/fi";
import { getUser } from "../lib/getUser";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FiHome className="w-5 h-5" />,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: <FiDollarSign className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <FiPieChart className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-10">
      <div className="p-6">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="bg-blue-600 text-white p-2 rounded-lg mr-2">
            <FiDollarSign className="w-6 h-6" />
          </span>
          FinTrack
        </h2>
      </div>

      <nav className="mt-6 px-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-large">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
            <FiUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <p className="font-medium">John</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}