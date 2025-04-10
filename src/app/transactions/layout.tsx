// app/dashboard/layout.tsx
import DashboardSidebar from "../../../components/DashboardSidebar";
import Navbar from "../../../components/Navbar";
// import "@/app/globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar (fixed width) */}
      <aside className="w-64 hidden md:block">
        <DashboardSidebar />
      </aside>

      {/* Main content with top navbar */}
      <div className="flex-1 flex flex-col">
        <div className="h-16">
          <Navbar />
        </div>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

