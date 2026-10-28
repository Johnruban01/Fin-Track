import type { Metadata } from "next";
import { FiTrendingUp, FiPieChart, FiShield } from "react-icons/fi";

export const metadata: Metadata = {
  title: "FinTrack",
  description: "Track your income and expenses",
};

const features = [
  { icon: FiPieChart, text: "See spending broken down by category" },
  { icon: FiTrendingUp, text: "Monthly income vs. expenses at a glance" },
  { icon: FiShield, text: "Your data stays private to your account" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Form side */}
      <div className="flex w-full flex-col justify-center bg-white px-6 py-12 dark:bg-gray-900 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <FiTrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              FinTrack
            </span>
          </div>
          {children}
        </div>
      </div>

      {/* Brand side */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-slate-950 lg:flex">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 w-full max-w-md px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Total balance</p>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
                +12.4%
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white">₹48,250</p>

            <div className="mt-6 flex h-24 items-end gap-2">
              {[35, 55, 40, 70, 50, 85, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-md bg-gradient-to-t from-blue-600/40 to-blue-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-xs text-slate-400">Income</p>
                <p className="mt-1 text-lg font-semibold text-emerald-400">₹65,000</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-xs text-slate-400">Expenses</p>
                <p className="mt-1 text-lg font-semibold text-rose-400">₹16,750</p>
              </div>
            </div>
          </div>

          <h2 className="mt-10 text-3xl font-bold leading-tight text-white">
            Know where every rupee goes.
          </h2>
          <p className="mt-3 text-slate-400">
            Log income and spends in seconds, see them by category, and stay on top of your month.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}