import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { UIProvider } from "../../context/UIContext";

export default function PageWrapper() {
  return (
    <UIProvider>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 md:ml-64 min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
          <Navbar />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </UIProvider>
  );
}
