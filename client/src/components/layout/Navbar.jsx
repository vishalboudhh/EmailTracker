import { useMemo, useState, useEffect } from "react";
import { Bell, Search, LogOut, User, MoonIcon, Sun, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useUI } from "../../context/UIContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { sidebarOpen, toggleSidebar } = useUI();

  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("dark-mode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false;
    } catch (e) {
      console.log(e);
      return false;
    }
  });

  // Apply theme on mount and when isDark changes
  useEffect(() => {
    const html = document.documentElement;
    
    // Apply theme immediately
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    
    // Save to localStorage (skip on initial mount to avoid overwriting)
    try {
      localStorage.setItem("dark-mode", isDark ? "true" : "false");
    } catch (e) {
      console.error("Failed to save theme preference:", e);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const displayName = useMemo(() => {
    if (!user) return "User";
    return user.name || user.email?.split("@")[0] || "User";
  }, [user]);

  const role = user?.title || user?.role || "MERN Developer";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">

        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 leading-tight">
              Email Tracker
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-300 hidden sm:block">
              Track your applications efficiently
            </p>
          </div>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 relative">
          {/* Notification */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <MoonIcon size={18} />}
          </button>

          {/* User menu */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium truncate max-w-[120px]">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">
                {role}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {initial}
            </div>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-48 bg-white dark:bg-gray-800 dark:border-gray-700 border rounded-lg shadow-lg overflow-hidden text-gray-900 dark:text-gray-100">
              <button
                className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <User size={16} />
                <Link to={'/profile'}>
                  Profile
                </Link>
              </button>
              <button
                onClick={logout}
                className="w-full px-4 py-3 text-sm flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
