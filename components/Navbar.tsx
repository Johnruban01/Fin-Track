import React from "react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100 text-black shadow-md p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">FinTrack</h1>
        <ul className="flex space-x-6">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
        </ul>
      </nav>
    </div>
  );
}
