import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, PieChart, TrendingUp, CheckCircle2, Handshake, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "Clarice D'Cunha",
    role: "Retired",
    text: <>Being a retired person, I was in search of an investment that would be <strong>safe</strong> and at the same time, fetch me <strong>good returns</strong>. They showed me the investment options that <strong>met all my goals</strong>. Who knew you could start financial planning at the <strong>age of 60</strong>? My best wishes. Keep growing!</>,
    avatar: "CD",
  },
  {
    name: "Malav Shah",
    role: "Lawyer",
    text: <>WEALTHY4EVER always looks for the best way to <strong>maximize the return</strong> on my investment at <strong>minimum risk</strong>. They are <strong>knowledgeable and trustworthy</strong> financial planners. Having worked with them over the last <strong>8 years</strong>, I am very confident about my finances today. They have taken care of my investments <strong>as their own</strong>.</>,
    avatar: "MS",
  },
  {
    name: "Maitri Shah",
    role: "CA Professional",
    text: <>I always thought Financial Planners essentially sell you insurance plans. My first meeting with them <strong>changed my perspective</strong>. The idea of financial planning made a lot of sense. It was simple – <strong>you invest based on your goals</strong>. I rate them very high and <strong>strongly recommend them</strong>!</>,
    avatar: "MS",
  },
  {
    name: "Somil Shah",
    role: "Engineer",
    text: <>Not being from a financial background, I was always scared to discuss about finance. Since then, <strong>everything has become so simple</strong>. With their pointed questions, I could figure exactly what my <strong>financial goals</strong> were in life and how I could reach them. They are <strong>super organized</strong> and thorough professionals.</>,
    avatar: "SS",
  },
  {
    name: "Kishor Solanki",
    role: "Human Resource Manager",
    text: <>I was reluctant to engage in fee based financial planning. But eventually, I realized that there is a lot of unwanted information around. WEALTHY4EVER professionals are <strong>very patient</strong>. Their help in <strong>goal setting</strong>, mapping investing surplus to different goals, has made my financial life <strong>clear and growth oriented</strong>.</>,
    avatar: "KS",
  },
  {
    name: "Parinda Vedsen",
    role: "Interior Designer",
    text: <>I always thought that managing finance was my husband's lookout. But after attending W4E's <strong>Women's Special Seminar</strong>, my perspective <strong>completely changed</strong>. They <strong>simplified everything</strong> for me. Just like I design interior designs for homes, WEALTHY4EVER <strong>designs and executes financial plans</strong>.</>,
    avatar: "PV",
  },
  {
    name: "Parin Sheth",
    role: "Debt-market Analyst",
    text: <>My profession demands me to look at the markets all day long. But now, having a <strong>professional handling all of that is a relief</strong>! Now I am <strong>stress-free</strong> and can focus more on my work. I am able to give more time to the <strong>people who are important</strong> to me.</>,
    avatar: "PS",
  },
  {
    name: "Aldrin Kanchan",
    role: "Canada based Marketing Head",
    text: <>I am currently working in Canada and wanted to invest into Indian markets. They have answered my calls even at <strong>2am IST</strong> just to answer my questions. They are <strong>always there to help</strong> you in any situation without any excuse. It just took me <strong>3 days to start implementing</strong> their financial advice.</>,
    avatar: "AK",
  },
  {
    name: "Sharal D'Souza",
    role: "Staff Nurse, London",
    text: <>People have family doctors who know their health inside out. In the same way, WEALTHY4EVER is my <strong>family doctor for finances</strong>. Based on my risk profile, they suggest <strong>solutions personalized for me</strong>. I am very <strong>confident about my financial health</strong> because of them.</>,
    avatar: "SD",
  },
  {
    name: "Hetvi Doshi",
    role: "Actuaries Professional",
    text: <>I was in a mess and had no knowledge of Financial Planning. Now I am <strong>on track</strong> and can see some money at my disposal even for emergencies. One major thing I learned is that you <strong>save so much time</strong> that you otherwise would have spent worrying. I am <strong>hopeful and confident</strong> for a brighter future.</>,
    avatar: "HD",
  },
  {
    name: "N P Polyprints",
    role: "Printing Business",
    text: <>We are a printing partnership firm and WEALTHY4EVER has been planning our finances for <strong>more than 10 years</strong>. In this lockdown, our factory was shut. However, we still weren't affected because we had kept <strong>emergency funds</strong> over the last 7-8 years. They have <strong>financial solutions for everything</strong>.</>,
    avatar: "NP",
  },
  {
    name: "Nishit Doshi",
    role: "Counselor & Teacher",
    text: <>I used to invest money on my own without mapping them to my goals. They showed me <strong>exactly how much I needed to invest</strong> and made a small <strong>one-page Financial Plan</strong>. They also provided me with an app where I can view <strong>all my investments and insurance</strong> in a single click.</>,
    avatar: "ND",
  },
];

// Testimonials Carousel Component
const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Show 3 testimonials at a time on desktop
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length]);
    }
    return result;
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brandRed mb-4">
            <Quote size={24} />
            <span className="text-sm font-bold tracking-wider uppercase">Client Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by <span className="text-brand-blue">850+ Families</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hear from our clients who have transformed their financial lives with Wealthy4ever.
          </p>
        </div>

        {/* Desktop Carousel - 3 cards */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={`${testimonial.name}-${idx}`}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote size={32} className="text-brand-blue/20" />
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-800 leading-relaxed mb-6 flex-grow text-sm">
                  "{testimonial.text}"
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-brand-blue hover:shadow-xl transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-brand-blue hover:shadow-xl transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Carousel - 1 card */}
        <div className="md:hidden">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <Quote size={32} className="text-brand-blue/20 mb-4" />
            <p className="text-slate-800 leading-relaxed mb-6">
              "{TESTIMONIALS[currentIndex].text}"
            </p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center text-white font-bold">
                {TESTIMONIALS[currentIndex].avatar}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{TESTIMONIALS[currentIndex].name}</h4>
                <p className="text-sm text-slate-500">{TESTIMONIALS[currentIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={goToPrev}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-brand-blue w-6' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Pagination Dots */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-brand-blue w-8' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
              Trusted by 850+ Families Since 1998
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
              <a 
                href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20get%20started%20with%20Wealthy4ever"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-8 py-4 bg-brandRed text-white font-bold rounded-xl hover:bg-brandRed-hover transition-all shadow-lg shadow-red-900/20"
              >
                Get Started
              </a>
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

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">₹75Cr+</p>
              <p className="text-slate-600 text-sm">Assets Under Management</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">850+</p>
              <p className="text-slate-600 text-sm">Families Trusting Us</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">₹400Cr+</p>
              <p className="text-slate-600 text-sm">Insurance Book Size</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">3000+</p>
              <p className="text-slate-600 text-sm">Claims Settled</p>
            </div>
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
          {/* Card 1 - Financial Advisory */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group">
            <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <PieChart size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Financial Advisory</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Comprehensive financial planning, wealth creation strategies, goal-based investing, and strategic asset allocation tailored to your needs.
            </p>
            <Link to="/about" className="text-brand-blue font-semibold flex items-center gap-1 hover:underline">Learn More <ArrowRight size={16}/></Link>
          </div>

          {/* Card 2 - Insurance Solutions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brandRed text-white text-xs font-bold px-3 py-1 rounded-bl-lg">99.8% CLAIMS</div>
            <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Insurance Solutions</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Life, health, personal accident, critical illness, fire, marine, and corporate insurance with 100% life insurance claim settlement.
            </p>
            <a href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20know%20about%20insurance%20solutions" className="text-brand-blue font-semibold flex items-center gap-1 hover:underline">Get Protected <ArrowRight size={16}/></a>
          </div>

          {/* Card 3 - Investment Products */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group">
            <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Investment Products</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Mutual Funds, Portfolio Management Services (PMS), Fixed Deposits, and our exclusive MARS (Mutual Funds Automated Reallocation System).
            </p>
            <Link to="/tools" className="text-brand-blue font-semibold flex items-center gap-1 hover:underline">Calculate Returns <ArrowRight size={16}/></Link>
          </div>
        </div>
      </div>

      {/* Trusted Partnerships Section */}
      <div className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand-blue mb-4">
              <Handshake size={24} />
              <span className="text-sm font-bold tracking-wider uppercase">Our Partners</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Trusted Partnerships with India's Leading Insurers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                {['New India Assurance', 'Bajaj Allianz', 'HDFC ERGO', 'Star Health', 'TATA AIG'].map((partner) => (
                  <span key={partner} className="px-4 py-2 bg-red-50 text-brandRed rounded-full text-sm font-medium">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

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
                 <a 
                   href="https://wa.me/919819169655?text=Hi%2C%20I%20would%20like%20to%20talk%20to%20an%20advisor"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-white text-brand-blue font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-50 transition-colors"
                 >
                    Talk to an Advisor
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;