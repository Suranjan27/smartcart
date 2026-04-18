import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader"; 
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Theme persistence and Splash screen timer
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Force loader to stay for exactly 3 seconds as requested
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  // Show the custom animated loader first
  if (showSplash) {
    return <Loader />;
  }

  return (
    /* Main wrapper with your specific theme colors */
    <div className="min-h-screen bg-[#EED36D] dark:bg-[#1A1A2E] text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;