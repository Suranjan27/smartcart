import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cart || []);
  const { isAuthenticated, logout, user } = useAuthStore();
  
  // 🌙 Initialize state: check localStorage first, then system preference
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 🔄 This effect handles the actual class switching on the <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#16213E]/90 border-b border-[#194F70]/20 dark:border-[#FFB400]/20">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Logo - Uses your custom text colors */}
        <Link to="/" className="text-lg font-semibold text-[#194F70] dark:text-[#FFB400]">
          SmartCart
        </Link>

        <div className="flex items-center gap-4">
          {/* 🌙 Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
          </button>

          {/* 🛒 Cart Link */}
          <Link to="/cart" className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-[#194F70] dark:bg-[#FFB400] text-white dark:text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 👤 Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-xs text-neutral-500">Hi, {user?.name}</span>
              <button 
                onClick={logout}
                className="text-xs font-medium text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-[#194F70] dark:text-[#FFB400]">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;