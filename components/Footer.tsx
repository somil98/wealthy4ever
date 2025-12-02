import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';

// Instagram SVG Icon component
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer: React.FC = () => {
  const whatsappLink = "https://wa.me/919819169655";
  const instagramLink = "https://www.instagram.com/wealthy4ever.in?igsh=YXp4c3p6OGU3Mmly&utm_source=qr";
  const linkedinLink = "https://www.linkedin.com/company/wealthy4ever";
  const location = useLocation();

  // Scroll to top when navigating to tools
  const handleToolClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <img 
                src="/logo_with_text.png" 
                alt="Wealthy4ever" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Empowering families to build generational wealth through disciplined investment strategies and smart financial planning.
            </p>
            <div className="flex space-x-4">
               <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><InstagramIcon size={20}/></a>
               <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20}/></a>
               <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><MessageCircle size={20}/></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Asset%20Allocation" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brandRed transition-colors">Asset Allocation</a></li>
              <li><a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Financial%20Planning" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brandRed transition-colors">Financial Planning</a></li>
              <li><a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Goal-Based%20Investing" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brandRed transition-colors">Goal-Based Investing</a></li>
              <li><a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Wealth%20Creation" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brandRed transition-colors">Wealth Creation</a></li>
              <li><a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Portfolio%20Review" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brandRed transition-colors">Portfolio Review</a></li>
              <li><a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Wealth%20Protection" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brandRed transition-colors">Wealth Protection</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Tools</h3>
            <ul className="space-y-4">
              <li><Link to="/tools?tool=risk-profile" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">Risk Profiler</Link></li>
              <li><Link to="/tools?tool=insurance" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">Life Insurance (HLV)</Link></li>
              <li><Link to="/tools?tool=sip" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">SIP Calculator</Link></li>
              <li><Link to="/tools?tool=lumpsum" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">Lumpsum Growth</Link></li>
              <li><Link to="/tools?tool=retirement-accum" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">Retirement Planner</Link></li>
              <li><Link to="/tools?tool=swp" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">SWP Calculator</Link></li>
              <li><Link to="/tools?tool=emi" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">EMI Calculator</Link></li>
              <li><Link to="/tools?tool=home-afford" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">Home Affordability</Link></li>
              <li><Link to="/tools?tool=tax" onClick={handleToolClick} className="text-sm hover:text-brandRed transition-colors">Salary & Tax</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm group">
                <Phone className="h-5 w-5 text-brandRed" />
                <a 
                  href="https://wa.me/919819169655" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group-hover:text-white transition-colors hover:underline"
                >
                  +91 9819169655
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <Mail className="h-5 w-5 text-brandRed" />
                <a 
                  href="mailto:nikunj.w4e@gmail.com"
                  className="group-hover:text-white transition-colors hover:underline"
                >
                  nikunj.w4e@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Wealthy4ever Advisory. All rights reserved.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of Service</a>
             <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;