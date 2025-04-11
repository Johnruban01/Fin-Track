// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import Providers from '../../components/Providers';
import { AuthProvider } from '../../context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FinTrack – Smart Expense Tracker',
  description: 'Track your expenses and income with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen w-full`}>
      <AuthProvider>
          <main>{children}</main>
      </AuthProvider>
      </body>
    </html>
  );
}
