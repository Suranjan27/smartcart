import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#194F70]/10 dark:border-[#FFB400]/10 bg-white dark:bg-[#16213E] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter text-[#194F70] dark:text-[#FFB400]">
              SMART<span className="opacity-40">CART</span>
            </Link>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Premium tech and lifestyle accessories curated for the modern developer. Built with passion and high-performance code.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[#194F70] dark:text-[#FFB400] hover:scale-110 transition-transform"><Github size={18} /></a>
              <a href="#" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[#194F70] dark:text-[#FFB400] hover:scale-110 transition-transform"><Linkedin size={18} /></a>
              <a href="#" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[#194F70] dark:text-[#FFB400] hover:scale-110 transition-transform"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-bold text-neutral-600 dark:text-neutral-300">
              <li><Link to="/" className="hover:text-[#194F70] dark:hover:text-[#FFB400] transition-colors">Home Collection</Link></li>
              <li><Link to="/cart" className="hover:text-[#194F70] dark:hover:text-[#FFB400] transition-colors">Your Bag</Link></li>
              <li><Link to="/login" className="hover:text-[#194F70] dark:hover:text-[#FFB400] transition-colors">Member Access</Link></li>
              <li><a href="#" className="hover:text-[#194F70] dark:hover:text-[#FFB400] transition-colors">Special Offers</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-sm font-bold text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-[#194F70] dark:text-[#FFB400]" /> Asansol, West Bengal</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-[#194F70] dark:text-[#FFB400]" /> +91 000 000 0000</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-[#194F70] dark:text-[#FFB400]" /> hello@smartcart.ai</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6">Newsletter</h4>
            <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">Stay updated with 2026 tech drops.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full h-12 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent focus:border-[#194F70] dark:focus:border-[#FFB400] outline-none transition-all text-xs font-bold"
              />
              <button className="absolute right-2 top-2 h-8 px-4 bg-[#194F70] dark:bg-[#FFB400] text-white dark:text-black text-[10px] font-black rounded-lg uppercase tracking-widest">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
          <p>© {currentYear} SmartCart AI. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;