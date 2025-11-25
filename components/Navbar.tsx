import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Calculator } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Financial Tools', path: '/tools' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-brand-blue text-white p-2 rounded-lg transform group-hover:scale-105 transition-transform">
                 <TrendingUp className="h-6 w-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-brand-blue">
                WEALTHY<span className="text-brandRed">4</span>EVER
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-white bg-brand-blue shadow-lg shadow-blue-500/30' 
                    : 'text-slate-600 hover:text-brand-blue hover:bg-blue-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-brandRed text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-red-500/30 hover:bg-brandRed-hover transition-colors">
              Book Consultation
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-blue focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full mt-4 bg-brandRed text-white px-5 py-3 rounded-lg text-base font-bold shadow-md">
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;