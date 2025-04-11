"use client"
import React, { useEffect, useState } from "react";
import { FiHome, FiInfo, FiMail, FiUser, FiBell, FiSearch, FiSettings, FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu } from "./DropDownMenu";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [hasNotifications, setHasNotifications] = useState(false); // Add this line
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
      {/* Notification Dropdown */}
      <DropdownMenu
        trigger={
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
            <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {hasNotifications && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        }
        align="right"
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Notifications
          </p>
        </div>
        <div className="py-1">
          {hasNotifications ? (
            // Render notifications if they exist
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              You have new notifications
            </a>
          ) : (
            <div className="px-4 py-3 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No notifications yet
              </p>
            </div>
          )}
        </div>
        {hasNotifications && (
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <a
              href="#"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all notifications
            </a>
          </div>
        )}
      </DropdownMenu>

      {/* Profile Dropdown */}
      <DropdownMenu
        trigger={
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-600 flex items-center justify-center">
              <FiUser className="w-4 h-4 text-blue-600 dark:text-gray-300" />
            </div>
            <span className="hidden lg:inline-block font-medium text-sm">John</span>
          </div>
        }
        align="right"
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-900 dark:text-white">Signed in as</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            John.ruban.162@gmail.com
          </p>
        </div>
        <div className="py-1">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiUser className="mr-2 w-4 h-4" />
            Profile
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiSettings className="mr-2 w-4 h-4" />
            Settings
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiMail className="mr-2 w-4 h-4" />
            Messages
          </a>
        </div>
        <div className="py-1 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              // Add your sign out logic here
              console.log('Signing out...');
            }}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiLogOut className="mr-2 w-4 h-4" />
            Sign out
          </button>
        </div>
      </DropdownMenu>
    </div>
      </nav>
    </header>
  );
}