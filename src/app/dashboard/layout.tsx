// app/dashboard/layout.tsx
import DashboardSidebar from "../../../components/DashboardSidebar";
import Navbar from "../../../components/Navbar";
import "@/app/globals.css"; // if you use global styles

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
