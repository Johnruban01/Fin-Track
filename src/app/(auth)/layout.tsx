// app/login/layout.tsx
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Login - FinTrack',
  description: 'Sign in to your FinTrack account',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${inter.className} h-full bg-gray-50`}>
        <div className="flex flex-col lg:flex-row h-screen w-full">
          {/* Left Side - Form Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
            <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
              <div className="text-center">
                <div className="flex justify-center">
                 
                </div>
                <h1 className="mt-4 text-3xl font-bold text-gray-900">Welcome back</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Track smarter. Spend wiser.
                </p>
              </div>
              {children}
            </div>
          </div>

          {/* Right Side - Visual Section */}
          <div className="hidden lg:block w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-500 opacity-95"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="max-w-lg space-y-8 text-center">
                <div className="relative">
                  <div className="absolute -inset-4">
                    <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter" style={{ background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)' }}></div>
                  </div>
                  <img
                    src="/dashboard-preview.jpg"
                    alt="FinTrack Dashboard Preview"
                    className="relative rounded-xl shadow-2xl border-8 border-white/10"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-white">Financial clarity in minutes</h2>
                  <p className="text-lg text-indigo-100">
                    Get instant insights into your spending patterns and financial health
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}