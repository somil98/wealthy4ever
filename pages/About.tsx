import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Shield, 
  TrendingUp, 
  Users, 
  Calendar, 
  Award,
  Briefcase,
  Heart,
  Building,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation";

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-brand-blue">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-blue-500/20 rounded-full blur-3xl transform rotate-12"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brandRed"></span>
              Since 1998
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              About <span className="text-blue-200">WEALTHY4EVER</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A dynamic and client-focused personal financial planning and advisory firm with a legacy of over two decades, 
              empowering individuals and families to achieve financial independence, security, and long-term wealth.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white py-12 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-blue mb-1">₹75Cr+</p>
              <p className="text-slate-600 text-sm">Assets Under Management</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-blue mb-1">850+</p>
              <p className="text-slate-600 text-sm">Families Trusting Us</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-blue mb-1">₹400Cr+</p>
              <p className="text-slate-600 text-sm">Insurance Book Size</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-blue mb-1">3000+</p>
              <p className="text-slate-600 text-sm">Claims Settled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brandRed font-bold tracking-wider uppercase text-sm">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              "Making money work for you"
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Our goal is to empower your finances to work as hard as you do. Whether you're just starting your wealth journey 
              or managing a legacy portfolio, we help you create a financial ecosystem that can sustain and grow your wealth <strong>4EVER</strong>.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">The Story Behind Our Brand</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-blue font-bold text-sm">W</span>
                  </div>
                  <p className="text-slate-600 text-sm">The "<strong>W</strong>" in red and blue symbolizes market ups and downs—we're with you through both.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brandRed/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brandRed font-bold text-sm">4</span>
                  </div>
                  <p className="text-slate-600 text-sm">The "<strong>4</strong>" subtly forms a "+" sign—stay positive, we're here <strong>for</strong> you.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-slate-600 text-xs">◐</span>
                  </div>
                  <p className="text-slate-600 text-sm">The shadow in the logo represents our role—always beside you, helping illuminate your financial path.</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <img 
                src="/logo.webp" 
                alt="Wealthy4ever Logo" 
                className="w-full max-w-xs mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Journey Timeline */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brandRed font-bold tracking-wider uppercase text-sm">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Two Decades of Trust & Growth
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 h-full">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-blue text-white mb-6">
                  <Calendar size={24} />
                </div>
                <p className="text-brandRed font-bold text-lg mb-2">1998</p>
                <h3 className="text-xl font-bold text-white mb-3">Foundation</h3>
                <p className="text-slate-400">
                  Founded in Mumbai with a <strong className="text-slate-300">Wealth Protection</strong> approach, 
                  laying the groundwork for comprehensive financial advisory services.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 h-full">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-blue text-white mb-6">
                  <TrendingUp size={24} />
                </div>
                <p className="text-brandRed font-bold text-lg mb-2">2007</p>
                <h3 className="text-xl font-bold text-white mb-3">Evolution</h3>
                <p className="text-slate-400">
                  Expanded services to include <strong className="text-slate-300">Wealth Creation</strong>, 
                  offering complete financial solutions for growth and protection.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 h-full">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-blue text-white mb-6">
                  <Users size={24} />
                </div>
                <p className="text-brandRed font-bold text-lg mb-2">2017</p>
                <h3 className="text-xl font-bold text-white mb-3">New Generation</h3>
                <p className="text-slate-400">
                  Second generation joined, bringing <strong className="text-slate-300">fresh perspectives and digital-first strategies</strong> 
                  while maintaining traditional values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Team */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brandRed font-bold tracking-wider uppercase text-sm">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Meet the People Behind Your Success
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center group hover:shadow-xl transition-shadow">
            <img 
              src="/photos/nikunj_shah.webp" 
              alt="Nikunj Nilesh Shah"
              className="h-20 w-20 rounded-full object-cover mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-slate-900 mb-1">Nikunj Nilesh Shah</h3>
            <p className="text-brandRed font-medium mb-4">CFP, CWM & QPFP</p>
            <p className="text-slate-600 text-sm">
              Driving digital transformation and handling policy issuance with modern efficiency.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center group hover:shadow-xl transition-shadow">
            <img 
              src="/photos/nilesh_shah.webp" 
              alt="Nilesh Jayantilal Shah"
              className="h-20 w-20 rounded-full object-cover mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-slate-900 mb-1">Nilesh Jayantilal Shah</h3>
            <p className="text-brandRed font-medium mb-4">Head of Marketing & Claims</p>
            <p className="text-slate-600 text-sm">
              Leading marketing initiatives and ensuring seamless claims settlement for clients.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center group hover:shadow-xl transition-shadow">
            <img 
              src="/photos/dipika_shah.webp" 
              alt="Dipika Nilesh Shah"
              className="h-20 w-20 rounded-full object-cover mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-slate-900 mb-1">Dipika Nilesh Shah</h3>
            <p className="text-brandRed font-medium mb-4">Head of Operations</p>
            <p className="text-slate-600 text-sm">
              Managing the backend office and staff operations with precision and care.
            </p>
          </div>
        </div>
      </div>

      {/* Products & Services */}
      <div className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brandRed font-bold tracking-wider uppercase text-sm">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Products & Services
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Financial Advisory */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Financial Advisory</h3>
              <ul className="space-y-3">
                {[
                  'Comprehensive Financial Planning',
                  'Wealth Creation Strategies',
                  'Wealth Protection Plans',
                  'Portfolio Reviews & Rebalancing',
                  'Goal-Based Investing',
                  'Strategic Asset Allocation'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand-blue mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Insurance Solutions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="h-14 w-14 bg-red-50 rounded-xl flex items-center justify-center text-brandRed mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Insurance Solutions</h3>
              <ul className="space-y-3">
                {[
                  'Life Insurance',
                  'Health Insurance',
                  'Personal Accident & Critical Illness',
                  'Fire & Building Insurance',
                  'Marine Insurance',
                  'Corporate/Group Insurance'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brandRed mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Investment Products */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="h-14 w-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Investment Products</h3>
              <ul className="space-y-3">
                {[
                  'Guaranteed Return Plans',
                  'Mutual Funds',
                  'Portfolio Management Services (PMS)',
                  'Fixed and Recurring Deposits',
                  'MARS (Automated Reallocation)'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Settlement Ratios */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-brand-blue to-blue-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Award size={32} />
              </div>
              <div>
                <p className="text-5xl font-bold">100%</p>
                <p className="text-blue-200">Life Insurance Claim Settlement</p>
              </div>
            </div>
            <p className="text-blue-100">
              Our commitment to families during difficult times is unwavering. We ensure every legitimate life insurance claim is settled promptly.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-brandRed to-red-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Award size={32} />
              </div>
              <div>
                <p className="text-5xl font-bold">99.8%</p>
                <p className="text-red-200">General Insurance Claim Settlement</p>
              </div>
            </div>
            <p className="text-red-100">
              Industry-leading claim settlement ratio for health, vehicle, and property insurance claims, ensuring peace of mind for our clients.
            </p>
          </div>
        </div>
      </div>

      {/* Trusted Partnerships */}
      <div className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brandRed font-bold tracking-wider uppercase text-sm">Our Partners</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Working with India's Best
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-2 w-2 bg-brand-blue rounded-full"></span>
                Life Insurance Partners
              </h3>
              <div className="flex flex-wrap gap-3">
                {['LIC', 'TATA AIA', 'ICICI Prudential', 'HDFC Life', 'Kotak Life'].map((partner) => (
                  <span key={partner} className="px-4 py-2 bg-blue-50 text-brand-blue rounded-full text-sm font-medium">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-2 w-2 bg-brandRed rounded-full"></span>
                General Insurance Partners
              </h3>
              <div className="flex flex-wrap gap-3">
                {['New India Assurance', 'Bajaj Allianz', 'HDFC ERGO', 'Niva Bupa', 'TATA AIG'].map((partner) => (
                  <span key={partner} className="px-4 py-2 bg-red-50 text-brandRed rounded-full text-sm font-medium">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Partnered AMCs */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-green-600 rounded-full"></span>
              Partnered AMCs
            </h3>
            <div className="flex flex-wrap gap-3">
              {['AXIS Mutual Fund', 'BAJAJ Mutual Fund', 'HDFC Mutual Fund', 'KOTAK Mutual Fund', 'SBI Mutual Fund'].map((partner) => (
                <span key={partner} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-blue rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45,-76C58,-69,68,-59,76,-47C84,-35,90,-21,89,-7C88,7,80,21,71,33C62,45,52,55,41,63C30,71,18,77,5,76C-8,75,-19,67,-29,58C-39,49,-48,39,-56,28C-64,17,-71,5,-70,-6C-69,-17,-60,-28,-50,-37C-40,-46,-29,-53,-18,-59C-7,-65,6,-70,20,-74Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="relative z-10 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start your wealth journey?</h2>
              <p className="text-blue-100 text-lg max-w-lg">Connect with us today and let our 25+ years of experience guide your financial future.</p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-blue font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Talk to an Advisor
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

