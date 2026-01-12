import {
    LayoutDashboard,
    User,
    Briefcase,
    FileText,
    Mail,
    LogOut,
    X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Applications", icon: Briefcase, path: "/applications" },
    { name: "Resumes", icon: FileText, path: "/resume" },
    { name: "Send Mail", icon: Mail, path: "/mail" },
];

export default function Sidebar() {
    const { logout } = useAuth();
    const { sidebarOpen: open, closeSidebar } = useUI();

    const renderNav = (closeOnClick = false) => (
        <nav className="px-4 space-y-2">
            {menu.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => closeOnClick && closeSidebar()}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                          isActive
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`
                    }
                >
                    <item.icon size={18} />
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );

    return (
        <>
            {/* Mobile overlay (controlled by UI context) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => closeSidebar()}
                />
            )}

            {/* Desktop sidebar (unchanged) */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen fixed left-0 top-0 hidden md:block">
                <div className="p-6 text-2xl font-bold text-blue-600 dark:text-blue-400">EmailTracker</div>

                {renderNav(false)}

                <div className="absolute bottom-6 left-4 right-4">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar (floating above content) */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 dark:border-gray-700 border-r z-50 transform transition-transform duration-200 md:hidden ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
            >
                <div className="p-6 flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">EmailTracker</div>
                    <button
                        onClick={() => closeSidebar()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                {renderNav(true)}

                <div className="absolute bottom-6 left-4 right-4">
                    <button
                        onClick={() => {
                            closeSidebar();
                            logout();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
