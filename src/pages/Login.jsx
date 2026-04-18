import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
// Import your new illustration
import LoginIllustration from "../assets/login&signup.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const mockUser = { email, name: email.split("@")[0] };
      login(mockUser);
      navigate("/"); 
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#EED36D]/10 dark:bg-[#1A1A2E]">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white dark:bg-[#16213E] rounded-[2.5rem] border border-[#194F70]/10 dark:border-[#FFB400]/10 shadow-2xl overflow-hidden transition-all duration-500">
        
        {/* LEFT SIDE: New Illustration Section */}
        <div className="hidden md:flex md:w-1/2 bg-[#EED36D]/20 dark:bg-black/20 p-12 items-center justify-center relative">
          <div className="relative z-10 w-full text-center">
            <img 
              src={LoginIllustration} 
              alt="Login showcase" 
              className="max-w-full h-auto object-contain drop-shadow-2xl"
            />
            <div className="mt-8 space-y-2">
              <h3 className="text-2xl font-black text-[#194F70] dark:text-[#FFB400] uppercase tracking-tighter">
                Welcome to SmartCart
              </h3>
              <p className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.3em]">
                Your gateway to premium tech and accessories.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-[#194F70] dark:text-[#FFB400] tracking-tighter uppercase">
              Member Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-100 dark:border-neutral-700 focus:border-[#194F70] dark:focus:border-[#FFB400] outline-none transition-all text-sm font-bold"
                placeholder="alex@smartcart.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-100 dark:border-neutral-700 focus:border-[#194F70] dark:focus:border-[#FFB400] outline-none transition-all text-sm font-bold"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full h-16 bg-[#194F70] dark:bg-[#FFB400] text-white dark:text-black font-black text-lg rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98] uppercase tracking-widest"
            >
              Log In
            </button>
          </form>
          
          {/* Signup section deleted as requested */}
        </div>
      </div>
    </div>
  );
};

export default Login;