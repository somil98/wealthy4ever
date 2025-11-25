import React from 'react';
import { Mail, Phone, MapPin, TrendingUp, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="bg-white text-brand-blue p-1.5 rounded-md">
                 <TrendingUp className="h-5 w-5" />
               </div>
               <span className="font-bold text-xl text-white tracking-tight">
                 WEALTHY<span className="text-brandRed">4</span>EVER
               </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Empowering families to build generational wealth through disciplined investment strategies and smart financial planning.
            </p>
            <div className="flex space-x-4">
               <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20}/></a>
               <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20}/></a>
               <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20}/></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm hover:text-brandRed transition-colors">Portfolio Management</a></li>
              <li><a href="#" className="text-sm hover:text-brandRed transition-colors">Retirement Planning</a></li>
              <li><a href="#" className="text-sm hover:text-brandRed transition-colors">Tax Consultancy</a></li>
              <li><a href="#" className="text-sm hover:text-brandRed transition-colors">Estate Planning</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Tools</h3>
            <ul className="space-y-4">
              <li><a href="#/tools" className="text-sm hover:text-brandRed transition-colors">SIP Calculator</a></li>
              <li><a href="#/tools" className="text-sm hover:text-brandRed transition-colors">Retirement Projector</a></li>
              <li><a href="#" className="text-sm hover:text-brandRed transition-colors">Goal Planner</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm group">
                <MapPin className="h-5 w-5 text-brandRed mt-0.5" />
                <span className="group-hover:text-white transition-colors">
                  Wealthy4ever Towers,<br/>Financial District, Mumbai - 400051
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <Phone className="h-5 w-5 text-brandRed" />
                <span className="group-hover:text-white transition-colors">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <Mail className="h-5 w-5 text-brandRed" />
                <span className="group-hover:text-white transition-colors">advisor@wealthy4ever.in</span>
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