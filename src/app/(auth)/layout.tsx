import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Login - FinTrack',
  description: 'Sign in to your FinTrack account',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <div className="flex flex-col lg:flex-row h-screen w-full">
          {/* Left Side - Form Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-gray-800">
            <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="bg-blue-600 text-white p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome to FinTrack
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Financial clarity at your fingertips
                </p>
              </div>
              {children}
            </div>
          </div>

          {/* Right Side - Visual Section */}
          <div className="hidden lg:block w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="max-w-lg space-y-8 text-center">
                <div className="relative">
                  <div className="absolute -inset-4">
                    <div
                      className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
                      style={{
                        background:
                          'linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)',
                      }}
                    ></div>
                  </div>
                  <img
                    src="/dashboard-preview.jpg"
                    alt="FinTrack Dashboard Preview"
                    className="relative rounded-xl shadow-2xl border-8 border-white/10"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-white">
                    Your Financial Dashboard
                  </h2>
                  <p className="text-lg text-blue-100">
                    Track, analyze, and optimize your finances in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}