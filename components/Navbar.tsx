"use client"
import React, { useEffect, useState } from "react";
import { FiHome, FiInfo, FiMail, FiUser, FiBell, FiSearch } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { name: "Home", path: "/dashboard", icon: <FiHome className="w-5 h-5" /> },
    { name: "About", path: "/dashboard/about", icon: <FiInfo className="w-5 h-5" /> },
    { name: "Contact", path: "/dashboard/contact", icon: <FiMail className="w-5 h-5" /> },
  ];

  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm h-16">
        {/* Empty header while loading */}
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo/Brand */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <FiHome className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">FinTrack</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-2 ${
                pathname === item.path
                  ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">    
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
            <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-600 flex items-center justify-center">
              <FiUser className="w-4 h-4 text-blue-600 dark:text-gray-300" />
            </div>
            <span className="hidden lg:inline-block font-medium text-sm">John</span>
          </div>
        </div>
      </nav>
    </header>
  );
}