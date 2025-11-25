import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, PieChart, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full overflow-hidden">
      {/* Modern Hero Section */}
      <div className="relative bg-brand-blue">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-blue-500/20 rounded-full blur-3xl transform rotate-12"></div>
            <div className="absolute top-[20%] -left-[10%] w-[40%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brandRed"></span>
              Trusted by 500+ Families
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Optimize Your Growth With <br/>
              <span className="text-blue-200">Expert Wealth Strategy</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
              Wealthy4ever provides a smart, all-in-one solution for managing family wealth, planning retirement, and scaling your personal portfolio.
              <br/><br/>
              <span className="italic font-display text-blue-200">"Making money work for you"</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/tools"
                className="inline-flex justify-center items-center px-8 py-4 bg-white text-brand-blue font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Use Free Tools
              </Link>
              <button className="inline-flex justify-center items-center px-8 py-4 bg-brandRed text-white font-bold rounded-xl hover:bg-brandRed-hover transition-all shadow-lg shadow-red-900/20">
                Get Started
              </button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative z-10 hidden lg:block">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <p className="text-blue-100 text-sm">Portfolio Growth</p>
                    <h3 className="text-white text-2xl font-bold">+18.4% <span className="text-sm font-normal text-green-300">▲ YTD</span></h3>
                 </div>
                 <div className="bg-brandRed p-3 rounded-lg text-white">
                    <TrendingUp size={24} />
                 </div>
              </div>
              {/* Mock Chart Visualization */}
              <div className="h-48 flex items-end justify-between gap-2">
                 {[40, 65, 55, 80, 70, 90, 100].map((h, i) => (
                    <div key={i} className="w-full bg-blue-400/30 rounded-t-sm hover:bg-blue-400/50 transition-colors relative group">
                        <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md"></div>
                    </div>
                 ))}
              </div>
              <div className="mt-6 flex justify-between text-white/60 text-xs">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce-slow">
               <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 size={24} />
               </div>
               <div>
                  <p className="text-slate-500 text-xs">Goal Reached</p>
                  <p className="text-slate-900 font-bold">₹ 1.5 Cr Saved</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-medium mb-6">TRUSTED PARTNER FOR GROWING TEAMS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {['Oracle', 'Sony', 'Samsung', 'Tata', 'Reliance'].map((brand) => (
               <span key={brand} className="text-xl font-bold text-slate-400">{brand}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brandRed font-bold tracking-wider uppercase text-sm">Value Add Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Delegate, automate & integrate with <span className="text-brand-blue">Wealthy4ever</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We combine traditional wisdom with modern tools to help you build a legacy that lasts forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group">
            <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <PieChart size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Portfolio Management</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Diversify your investments across equity, debt, and gold to minimize risk and maximize returns tailored to your risk profile.
            </p>
            <div className="text-brand-blue font-semibold flex items-center gap-1">Learn More <ArrowRight size={16}/></div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brandRed text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">SIP & Compounding</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Discover the magic of compounding. Even small monthly investments can grow into a significant corpus over time.
            </p>
            <Link to="/tools" className="text-brand-blue font-semibold flex items-center gap-1 hover:underline">Calculate Returns <ArrowRight size={16}/></Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group">
            <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Retirement Planning</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Ensure your golden years are stress-free. We help you calculate exactly how much you need to maintain your lifestyle.
            </p>
            <Link to="/tools" className="text-brand-blue font-semibold flex items-center gap-1 hover:underline">Start Planning <ArrowRight size={16}/></Link>
          </div>
        </div>
      </div>

      {/* Stats/CTA Section */}
      <div className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-brand-blue rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                 <svg width="400" height="400" viewBox="0 0 200 200">
                    <path fill="currentColor" d="M45,-76C58,-69,68,-59,76,-47C84,-35,90,-21,89,-7C88,7,80,21,71,33C62,45,52,55,41,63C30,71,18,77,5,76C-8,75,-19,67,-29,58C-39,49,-48,39,-56,28C-64,17,-71,5,-70,-6C-69,-17,-60,-28,-50,-37C-40,-46,-29,-53,-18,-59C-7,-65,6,-70,20,-74Z" transform="translate(100 100)" />
                 </svg>
              </div>
              
              <div className="relative z-10 mb-8 md:mb-0">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to secure your future?</h2>
                 <p className="text-blue-100 text-lg max-w-lg">Join Wealthy4ever today and let us help you build a robust financial roadmap tailored to your needs.</p>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                 <button className="bg-white text-brand-blue font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-50 transition-colors">
                    Talk to an Advisor
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;