import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line
} from 'recharts';
import { CalculatorTab, ChartDataPoint } from '../types';
import { 
  Briefcase, TrendingUp, DollarSign, Umbrella, Home, 
  PieChart as PieIcon, Calculator as CalcIcon, ChevronRight, Menu, X, Info, Share2, Check, ChevronDown, ChevronUp
} from 'lucide-react';

// --- Types & Config ---

type ToolCategory = 'Planning' | 'Investment' | 'Withdrawal' | 'Loans' | 'Tax';

interface ToolConfig {
  id: CalculatorTab;
  label: string;
  category: ToolCategory;
  icon: any;
}

const TOOLS: ToolConfig[] = [
  // Planning
  { id: 'risk-profile', label: 'Risk Profiler', category: 'Planning', icon: PieIcon },
  { id: 'insurance', label: 'Life Insurance (HLV)', category: 'Planning', icon: Umbrella },
  // Investment
  { id: 'sip', label: 'SIP Calculator', category: 'Investment', icon: TrendingUp },
  { id: 'lumpsum', label: 'Lumpsum Growth', category: 'Investment', icon: DollarSign },
  { id: 'retirement-accum', label: 'Retirement Planner', category: 'Investment', icon: Briefcase },
  // Withdrawal
  { id: 'swp', label: 'SWP / Retirement Calculator', category: 'Withdrawal', icon: TrendingUp },
  // Loans
  { id: 'emi', label: 'EMI Calculator', category: 'Loans', icon: CalcIcon },
  { id: 'home-afford', label: 'Home Affordability', category: 'Loans', icon: Home },
  // Tax
  { id: 'tax', label: 'Salary & Tax', category: 'Tax', icon: DollarSign },
];

const COLORS = ['#0047AB', '#DC2626', '#10B981', '#F59E0B', '#8B5CF6'];

// --- Helper Functions ---

const formatINR = (val: number) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const formatShort = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return formatINR(val);
};

const calculateFV = (pv: number, rate: number, years: number) => pv * Math.pow(1 + rate / 100, years);
const calculatePV = (fv: number, rate: number, years: number) => fv / Math.pow(1 + rate / 100, years);

// --- URL Params Helper ---
const useUrlParams = (toolId: string, params: Record<string, any>, setters: Record<string, (v: any) => void>) => {
  // Load from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const urlTool = searchParams.get('tool');
    
    if (urlTool === toolId) {
      Object.keys(params).forEach(key => {
        const urlValue = searchParams.get(key);
        if (urlValue !== null && setters[key]) {
          const parsed = parseFloat(urlValue);
          if (!isNaN(parsed)) {
            setters[key](parsed);
          } else if (urlValue === 'true' || urlValue === 'false') {
            setters[key](urlValue === 'true');
          } else {
            setters[key](urlValue);
          }
        }
      });
    }
  }, [toolId]);

  const generateShareUrl = useCallback(() => {
    const baseUrl = window.location.href.split('?')[0];
    const searchParams = new URLSearchParams();
    searchParams.set('tool', toolId);
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    return `${baseUrl}?${searchParams.toString()}`;
  }, [toolId, params]);

  return { generateShareUrl };
};

// --- Share Button Component ---
const ShareButton = ({ onClick }: { onClick: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
      {copied ? 'Link Copied!' : 'Share'}
    </button>
  );
};

// --- Advanced Section Component ---
const AdvancedSection = ({ isOpen, onToggle, children }: { isOpen: boolean; onToggle: () => void; children: React.ReactNode }) => (
  <div className="border-t border-slate-100 mt-4 pt-4">
    <button
      onClick={onToggle}
      className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors w-full"
    >
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      Advanced Options
    </button>
    {isOpen && (
      <div className="mt-4 space-y-4 animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

// --- Main Component ---

const Calculator: React.FC = () => {
  const [activeTool, setActiveTool] = useState<CalculatorTab>('sip');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load tool from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const urlTool = searchParams.get('tool') as CalculatorTab;
    if (urlTool && TOOLS.some(t => t.id === urlTool)) {
      setActiveTool(urlTool);
    }
  }, []);

  // Scroll to top on tool change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSidebarOpen(false);
    setShowAdvanced(false);
  }, [activeTool]);

  const renderTool = () => {
    switch (activeTool) {
      case 'risk-profile': return <RiskProfiler />;
      case 'sip': return <SIPCalculator showAdvanced={showAdvanced} />;
      case 'lumpsum': return <LumpsumCalculator showAdvanced={showAdvanced} />;
      case 'retirement-accum': return <RetirementAccumulation showAdvanced={showAdvanced} />;
      case 'swp': return <SWPCalculator showAdvanced={showAdvanced} />;
      case 'emi': return <EMICalculator showAdvanced={showAdvanced} />;
      case 'home-afford': return <HomeAffordability showAdvanced={showAdvanced} />;
      case 'insurance': return <InsuranceCalculator />;
      case 'tax': return <TaxCalculator />;
      default: return <SIPCalculator showAdvanced={showAdvanced} />;
    }
  };

  const categories = Array.from(new Set(TOOLS.map(t => t.category)));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header for Sidebar */}
      <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-20 z-30">
        <span className="font-bold text-slate-800">{TOOLS.find(t => t.id === activeTool)?.label}</span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 rounded-md">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:h-auto md:min-h-[calc(100vh-5rem)]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        pt-20 md:pt-8 pb-8 overflow-y-auto
      `}>
        <div className="px-6 mb-8">
          <h2 className="text-2xl font-display font-bold text-brand-blue">Financial<br/>Toolkit</h2>
          <p className="text-xs text-slate-400 mt-2">Professional planning suite</p>
        </div>

        <div className="space-y-6 px-4">
          {categories.map(cat => (
            <div key={cat}>
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{cat}</h3>
              <div className="space-y-1">
                {TOOLS.filter(t => t.category === cat).map(tool => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all
                        ${isActive 
                          ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue'
                        }`}
                    >
                      <Icon size={18} />
                      {tool.label}
                      {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        {/* Tool Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
           <div>
             <h1 className="text-3xl font-bold text-slate-900 mb-2">{TOOLS.find(t => t.id === activeTool)?.label}</h1>
             <p className="text-slate-500">
               Calculate, plan, and optimize your financial future.
             </p>
           </div>
           {['sip', 'lumpsum', 'swp', 'emi', 'retirement-accum', 'home-afford'].includes(activeTool) && (
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium">Advanced Mode</span>
                  <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${showAdvanced ? 'bg-brand-blue' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${showAdvanced ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
             </div>
           )}
        </div>

        {/* Tool Component Render */}
        <div className="animate-fade-in">
          {renderTool()}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-slate-100 rounded-lg text-xs text-slate-500 leading-relaxed flex gap-3">
          <Info className="flex-shrink-0 h-4 w-4 mt-0.5" />
          <p>
            The results provided by these calculators are based on the inputs provided and illustrative assumptions. 
            They are meant for educational purposes only and do not constitute financial advice. 
            Actual returns and tax liabilities may vary. Please consult a professional advisor before making investment decisions.
          </p>
        </div>
      </main>
      
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// ==========================================
// INDIVIDUAL CALCULATOR COMPONENTS
// ==========================================

// 1. RISK PROFILER - Quiz-based assessment
interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

const RISK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How old are you?",
    options: [
      { label: "Under 35 years", score: 4 },
      { label: "35-44 years", score: 3 },
      { label: "45-54 years", score: 2 },
      { label: "55 years or above", score: 1 },
    ],
  },
  {
    id: 2,
    question: "What is the nature of your income?",
    options: [
      { label: "Self Employed with steady cash flow", score: 3 },
      { label: "Salaried Employee with established firm", score: 4 },
      { label: "Self Employed with irregular cash flow", score: 1 },
      { label: "Salaried Employee with Startup", score: 2 },
    ],
  },
  {
    id: 3,
    question: "How much of your current income goes towards servicing loans?",
    options: [
      { label: "30-50%", score: 2 },
      { label: "More than 50%", score: 1 },
      { label: "10-30%", score: 3 },
      { label: "0-10%", score: 4 },
    ],
  },
  {
    id: 4,
    question: "How soon do you think you will start dipping into your investments?",
    options: [
      { label: "Not for another 10 years", score: 4 },
      { label: "Within next 3 years", score: 1 },
      { label: "In 3-7 years", score: 2 },
      { label: "In 8-10 years", score: 3 },
    ],
  },
  {
    id: 5,
    question: "If market corrects and one of your investments loses 30% within weeks, what would you do?",
    options: [
      { label: "Sell the investments to avoid further decline", score: 1 },
      { label: "Buy more - it looks better at current prices", score: 3 },
      { label: "Hold on and wait for it to bounce back", score: 2 },
    ],
  },
  {
    id: 6,
    question: "If market downfall continues, how long will you hold before cashing in?",
    options: [
      { label: "Another 6 months", score: 3 },
      { label: "At least a year", score: 4 },
      { label: "A month", score: 1 },
      { label: "Another 3 months", score: 2 },
    ],
  },
  {
    id: 7,
    question: "If you have surplus now, how would you be willing to invest?",
    options: [
      { label: "Wait for market to recover 20%", score: 2 },
      { label: "Invest in stock markets? No thanks, I'm out", score: 1 },
      { label: "Deploy some money in a staggered manner even if markets dip further", score: 3 },
      { label: "I don't mind putting in large chunk of surplus right away", score: 4 },
    ],
  },
  {
    id: 8,
    question: "Which outcome is most acceptable to you?",
    options: [
      { label: "Avg: 7.5% | Best: 12% | Worst: -5%", score: 1 },
      { label: "Avg: 9% | Best: 18% | Worst: -12%", score: 2 },
      { label: "Avg: 12% | Best: 25% | Worst: -20%", score: 3 },
      { label: "Avg: 15% | Best: 40% | Worst: -35%", score: 4 },
    ],
  },
];

const getRiskProfile = (score: number) => {
  if (score < 20) {
    return {
      profile: "Conservative",
      equityRange: "10-25%",
      debtRange: "75-90%",
      equityMid: 17.5,
      color: "text-green-600",
      bg: "bg-green-50",
      borderColor: "border-green-200",
      description: "You prioritize capital preservation over high returns. Focus on stable, low-risk investments.",
    };
  } else if (score <= 25) {
    return {
      profile: "Moderate",
      equityRange: "40-60%",
      debtRange: "40-60%",
      equityMid: 50,
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "You seek a balance between growth and stability. A diversified portfolio suits you best.",
    };
  } else if (score <= 30) {
    return {
      profile: "Aggressive",
      equityRange: "60-80%",
      debtRange: "20-40%",
      equityMid: 70,
      color: "text-orange-600",
      bg: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "You are willing to accept higher volatility for potentially greater long-term returns.",
    };
  } else {
    return {
      profile: "Very Aggressive",
      equityRange: "80-100%",
      debtRange: "0-20%",
      equityMid: 90,
      color: "text-red-600",
      bg: "bg-red-50",
      borderColor: "border-red-200",
      description: "You have high risk tolerance and seek maximum growth. You can handle significant market swings.",
    };
  }
};

const RiskProfiler = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(RISK_QUIZ_QUESTIONS.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const totalScore = useMemo(() => {
    return answers.reduce((sum: number, ans, idx) => {
      if (ans !== null) {
        return sum + RISK_QUIZ_QUESTIONS[idx].options[ans].score;
      }
      return sum;
    }, 0);
  }, [answers]);

  const riskProfile = useMemo(() => getRiskProfile(totalScore), [totalScore]);

  const allAnswered = answers.every((a) => a !== null);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentQuestion < RISK_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers(new Array(RISK_QUIZ_QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const allocation = useMemo(() => {
    const equity = riskProfile.equityMid;
    return [
      { name: "Equity", value: equity },
      { name: "Debt/Fixed Income", value: 100 - equity },
    ];
  }, [riskProfile]);

  // Results View
  if (showResults) {
    return (
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Score Breakdown */}
        <div className="card-input space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Your Responses</h3>
            <button
              onClick={handleRestart}
              className="px-4 py-2 text-sm font-medium text-brand-blue bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
            >
              Retake Quiz
            </button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {RISK_QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOption = answers[idx] !== null ? q.options[answers[idx]!] : null;
              return (
                <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                      {q.id}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">{q.question}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800">
                          {selectedOption?.label || "Not answered"}
                        </span>
                        <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded">
                          +{selectedOption?.score || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-slate-700">Total Score</span>
              <span className="text-2xl font-extrabold text-brand-blue">{totalScore} / 32</span>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="card-result flex flex-col items-center justify-center text-center p-8 lg:sticky lg:top-24">
          <div className={`px-6 py-3 rounded-full font-bold text-lg mb-6 ${riskProfile.bg} ${riskProfile.color} border ${riskProfile.borderColor}`}>
            {riskProfile.profile} Investor
          </div>

          <div className="h-56 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#0047AB" />
                  <Cell fill="#94a3b8" />
                </Pie>
                <Tooltip formatter={(val: number) => `${val}%`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <div className="text-xs text-blue-600 uppercase font-bold mb-1">Equity</div>
                <div className="text-xl font-bold text-brand-blue">{riskProfile.equityRange}</div>
              </div>
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Debt</div>
                <div className="text-xl font-bold text-slate-700">{riskProfile.debtRange}</div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{riskProfile.description}</p>
          </div>
        </div>
      </div>
    );
  }

  // Quiz View
  const question = RISK_QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / RISK_QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {currentQuestion + 1} of {RISK_QUIZ_QUESTIONS.length}
          </span>
          <span className="text-sm font-bold text-brand-blue">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-blue transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card-input p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue text-white text-xl font-bold flex items-center justify-center">
            {question.id}
          </span>
          <h2 className="text-xl font-bold text-slate-800">{question.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => {
            const isSelected = answers[currentQuestion] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                  ${isSelected
                    ? "border-brand-blue bg-blue-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected ? "border-brand-blue bg-brand-blue" : "border-slate-300"}`}
                  >
                    {isSelected && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <span className={`text-base ${isSelected ? "font-semibold text-brand-blue" : "text-slate-700"}`}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <button
            onClick={goPrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all
              ${currentQuestion === 0
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            Previous
          </button>

          {currentQuestion < RISK_QUIZ_QUESTIONS.length - 1 ? (
            <button
              onClick={goNext}
              disabled={answers[currentQuestion] === null}
              className={`px-6 py-3 rounded-lg font-bold transition-all
                ${answers[currentQuestion] === null
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-brand-blue text-white hover:bg-blue-700 shadow-md"
                }`}
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleShowResults}
              disabled={!allAnswered}
              className={`px-6 py-3 rounded-lg font-bold transition-all
                ${!allAnswered
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 shadow-md"
                }`}
            >
              View Results
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {RISK_QUIZ_QUESTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuestion(idx)}
            className={`w-3 h-3 rounded-full transition-all
              ${idx === currentQuestion
                ? "bg-brand-blue scale-125"
                : answers[idx] !== null
                ? "bg-green-500"
                : "bg-slate-300 hover:bg-slate-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

// 2. SIP CALCULATOR (Step-up + Post-SIP Horizon)
const SIPCalculator = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(0);
  const [postSipYears, setPostSipYears] = useState(0); // NEW: Post-SIP investment horizon

  const params = { monthly, rate, years, stepUp, postSipYears };
  const setters = { monthly: setMonthly, rate: setRate, years: setYears, stepUp: setStepUp, postSipYears: setPostSipYears };
  const { generateShareUrl } = useUrlParams('sip', params, setters);

  const result = useMemo(() => {
    let invested = 0;
    let value = 0;
    const monthlyRate = rate / 12 / 100;
    let currentSip = monthly;
    const data: any[] = [];

    // Phase 1: SIP Contribution Period
    for (let y = 1; y <= years; y++) {
      let yearlyInv = 0;
      for (let m = 1; m <= 12; m++) {
        value += currentSip;
        yearlyInv += currentSip;
        value *= (1 + monthlyRate);
      }
      invested += yearlyInv;
      data.push({ 
        year: y, 
        invested: Math.round(invested), 
        value: Math.round(value),
        phase: 'Contribution'
      });
      if (showAdvanced) currentSip *= (1 + stepUp / 100);
    }

    const corpusAtEndOfSIP = value;

    // Phase 2: Post-SIP Growth Period (no contributions)
    if (showAdvanced && postSipYears > 0) {
      for (let y = 1; y <= postSipYears; y++) {
        for (let m = 1; m <= 12; m++) {
          value *= (1 + monthlyRate);
        }
        data.push({ 
          year: years + y, 
          invested: Math.round(invested), 
          value: Math.round(value),
          phase: 'Growth Only'
        });
      }
    }

    return { invested, corpusAtEndOfSIP, finalCorpus: value, data, hasPostSip: postSipYears > 0 && showAdvanced };
  }, [monthly, rate, years, stepUp, postSipYears, showAdvanced]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <InputCurrency label="Monthly Investment" value={monthly} setValue={setMonthly} min={500} max={1000000} step={500} />
        <InputSlider label="Expected Return (p.a)" value={rate} setValue={setRate} min={4} max={30} unit="%" />
        <InputSlider label="SIP Duration" value={years} setValue={setYears} min={1} max={40} unit="Yrs" />
        
        {showAdvanced && (
          <div className="pt-4 border-t border-slate-100 animate-fade-in space-y-6">
            <InputSlider label="Annual Step-up" value={stepUp} setValue={setStepUp} min={0} max={20} unit="%" />
            <p className="text-xs text-slate-400 -mt-4">Increase your SIP amount by {stepUp}% every year.</p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <InputSlider label="Post-SIP Horizon" value={postSipYears} setValue={setPostSipYears} min={0} max={30} unit="Yrs" />
              <p className="text-xs text-blue-600 mt-2">
                After SIP ends, let your corpus grow for {postSipYears} more years without any withdrawals.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 self-start">
        {/* Primary Result */}
        <ResultSummary 
          title={result.hasPostSip ? "Final Corpus (After Growth)" : "Estimated Corpus"} 
          value={result.finalCorpus} 
          subtitle={`Total Invested: ${formatShort(result.invested)} | Gain: ${formatShort(result.finalCorpus - result.invested)}`} 
        />

        {/* Secondary Result - Only show if post-SIP is enabled */}
        {result.hasPostSip && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">At SIP End (Year {years})</div>
              <div className="text-lg font-bold text-slate-800">{formatShort(result.corpusAtEndOfSIP)}</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 text-center">
              <div className="text-xs text-blue-600 uppercase font-bold mb-1">Extra Growth</div>
              <div className="text-lg font-bold text-brand-blue">{formatShort(result.finalCorpus - result.corpusAtEndOfSIP)}</div>
            </div>
          </div>
        )}

        <div className="card-result p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={result.data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0047AB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0047AB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" tick={{fontSize: 10}} label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `${v/100000}L`} tick={{fontSize: 10}} width={40} />
              <Tooltip 
                formatter={(v: number) => formatShort(v)}
                labelFormatter={(label) => {
                  const item = result.data.find(d => d.year === label);
                  return `Year ${label} (${item?.phase || 'Contribution'})`;
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#0047AB" fill="url(#colorVal)" name="Total Value" />
              <Area type="monotone" dataKey="invested" stroke="#94a3b8" fill="none" name="Invested Amount" />
              {result.hasPostSip && (
                <Line 
                  type="monotone" 
                  dataKey={(d: any) => d.phase === 'Growth Only' ? d.value : null}
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={false}
                  name="Growth Phase"
                />
              )}
              <Legend />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {result.hasPostSip && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 text-sm">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
              <p className="text-indigo-800">
                <strong>Two-Phase Growth:</strong> Your SIP runs for {years} years (building {formatShort(result.corpusAtEndOfSIP)}), 
                then compounds for {postSipYears} more years to reach {formatShort(result.finalCorpus)}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. LUMPSUM with Reverse Calculation
const LumpsumCalculator = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);
  const [mode, setMode] = useState<'future' | 'present'>('future'); // NEW: Toggle mode
  const [targetFuture, setTargetFuture] = useState(500000); // For reverse calculation

  const params = { amount, rate, years, mode, targetFuture };
  const setters = { 
    amount: setAmount, 
    rate: setRate, 
    years: setYears, 
    mode: setMode as any, 
    targetFuture: setTargetFuture 
  };
  const { generateShareUrl } = useUrlParams('lumpsum', params, setters);

  const result = useMemo(() => {
    if (mode === 'future') {
      // Present → Future (existing)
      const val = calculateFV(amount, rate, years);
      const data = [];
      for(let i=0; i<=years; i++) {
        data.push({ year: i, value: Math.round(calculateFV(amount, rate, i)), invested: amount });
      }
      return { 
        displayValue: val, 
        data, 
        subtitle: `Growth of ${formatShort(amount)} over ${years} years`,
        investedToday: amount,
        futureValue: val
      };
    } else {
      // Future → Present (new reverse calculation)
      const requiredToday = calculatePV(targetFuture, rate, years);
      const data = [];
      for(let i=0; i<=years; i++) {
        data.push({ year: i, value: Math.round(calculateFV(requiredToday, rate, i)), invested: requiredToday });
      }
      return { 
        displayValue: requiredToday, 
        data, 
        subtitle: `Invest today to achieve ${formatShort(targetFuture)} in ${years} years`,
        investedToday: requiredToday,
        futureValue: targetFuture
      };
    }
  }, [amount, rate, years, mode, targetFuture]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>

        {/* Mode Toggle */}
        {showAdvanced && (
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-3">Calculation Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('future')}
                className={`py-3 px-4 rounded-lg text-sm font-bold transition-all border-2
                  ${mode === 'future' 
                    ? 'border-brand-blue bg-blue-50 text-brand-blue' 
                    : 'border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                Present → Future
              </button>
              <button
                onClick={() => setMode('present')}
                className={`py-3 px-4 rounded-lg text-sm font-bold transition-all border-2
                  ${mode === 'present' 
                    ? 'border-brand-blue bg-blue-50 text-brand-blue' 
                    : 'border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                Future → Present
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {mode === 'future' 
                ? "Calculate how much your investment will grow." 
                : "Calculate how much to invest today to reach your goal."}
            </p>
          </div>
        )}

        {mode === 'future' ? (
          <InputCurrency label="Invest Today" value={amount} setValue={setAmount} min={5000} max={10000000} step={5000} />
        ) : (
          <InputCurrency label="Target Future Amount" value={targetFuture} setValue={setTargetFuture} min={50000} max={100000000} step={50000} />
        )}
        
        <InputSlider label="Expected Return (p.a)" value={rate} setValue={setRate} min={4} max={30} unit="%" />
        <InputSlider label="Time Period" value={years} setValue={setYears} min={1} max={40} unit="Yrs" />
      </div>

      <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 self-start">
        <ResultSummary 
          title={mode === 'future' ? "Future Value" : "Required Investment Today"}
          value={result.displayValue} 
          subtitle={result.subtitle} 
        />

        {mode === 'present' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Invest Today</div>
              <div className="text-lg font-bold text-brand-blue">{formatShort(result.investedToday)}</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 text-center">
              <div className="text-xs text-green-600 uppercase font-bold mb-1">Your Target</div>
              <div className="text-lg font-bold text-green-700">{formatShort(result.futureValue)}</div>
            </div>
          </div>
        )}

        <div className="card-result p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.data}>
              <defs>
                <linearGradient id="colorLumpsum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={mode === 'future' ? "#0047AB" : "#10B981"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={mode === 'future' ? "#0047AB" : "#10B981"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `${(v/100000).toFixed(1)}L`} width={45} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Area type="monotone" dataKey="value" stroke={mode === 'future' ? "#0047AB" : "#10B981"} fill="url(#colorLumpsum)" name="Value" />
              <Area type="monotone" dataKey="invested" stroke="#94a3b8" fill="none" name="Principal" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {mode === 'present' && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 text-sm">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800">
                <strong>Goal Planning:</strong> To accumulate {formatShort(targetFuture)} in {years} years at {rate}% p.a., 
                you need to invest <strong>{formatShort(result.investedToday)}</strong> today.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 4. RETIREMENT ACCUMULATION with Step-Up SIP
const RetirementAccumulation = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [expenses, setExpenses] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preRate, setPreRate] = useState(12);
  const [postRate, setPostRate] = useState(8);
  const [lifeExp, setLifeExp] = useState(85);
  
  // NEW: Step-up SIP options
  const [enableStepUp, setEnableStepUp] = useState(false);
  const [sipStepUp, setSipStepUp] = useState(10);
  const [stepUpDuration, setStepUpDuration] = useState(0); // 0 = entire SIP duration

  const params = { age, retireAge, expenses, inflation, preRate, postRate, lifeExp, enableStepUp, sipStepUp, stepUpDuration };
  const setters = { 
    age: setAge, retireAge: setRetireAge, expenses: setExpenses, inflation: setInflation, 
    preRate: setPreRate, postRate: setPostRate, lifeExp: setLifeExp, 
    enableStepUp: setEnableStepUp, sipStepUp: setSipStepUp, stepUpDuration: setStepUpDuration 
  };
  const { generateShareUrl } = useUrlParams('retirement-accum', params, setters);

  const result = useMemo(() => {
    const yearsToRetire = retireAge - age;
    const yearsInRetire = lifeExp - retireAge;
    
    // Expenses at retirement
    const fvExpenseMonth = calculateFV(expenses, inflation, yearsToRetire);
    const annualExpense = fvExpenseMonth * 12;

    // Corpus needed at 60 to fund till 85
    const realRate = ((1 + postRate/100) / (1 + inflation/100)) - 1;
    let corpus = 0;
    if (Math.abs(realRate) < 0.001) corpus = annualExpense * yearsInRetire;
    else corpus = annualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetire)) / realRate);

    // Without Step-Up: Standard SIP Required
    const monthlyRate = preRate/12/100;
    const months = yearsToRetire * 12;
    const standardSip = corpus * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);

    // With Step-Up: Month-by-month calculation
    let stepUpSip = standardSip;
    let totalInvestedWithStepUp = 0;
    let corpusWithStepUp = 0;

    if (showAdvanced && enableStepUp && sipStepUp > 0) {
      // Iteratively find the starting SIP that achieves the corpus with step-up
      // Using binary search
      let low = 1000;
      let high = standardSip * 2;
      
      while (high - low > 100) {
        const mid = (low + high) / 2;
        let testCorpus = 0;
        let currentSip = mid;
        const effectiveStepUpYears = stepUpDuration > 0 ? Math.min(stepUpDuration, yearsToRetire) : yearsToRetire;
        
        for (let y = 1; y <= yearsToRetire; y++) {
          for (let m = 1; m <= 12; m++) {
            testCorpus += currentSip;
            testCorpus *= (1 + monthlyRate);
          }
          if (y < effectiveStepUpYears) {
            currentSip *= (1 + sipStepUp / 100);
          }
        }
        
        if (testCorpus < corpus) {
          low = mid;
        } else {
          high = mid;
        }
      }
      
      stepUpSip = Math.round((low + high) / 2);
      
      // Calculate total invested with step-up
      let currentSip = stepUpSip;
      const effectiveStepUpYears = stepUpDuration > 0 ? Math.min(stepUpDuration, yearsToRetire) : yearsToRetire;
      
      for (let y = 1; y <= yearsToRetire; y++) {
        totalInvestedWithStepUp += currentSip * 12;
        for (let m = 1; m <= 12; m++) {
          corpusWithStepUp += currentSip;
          corpusWithStepUp *= (1 + monthlyRate);
        }
        if (y < effectiveStepUpYears) {
          currentSip *= (1 + sipStepUp / 100);
        }
      }
    }

    const totalInvestedStandard = standardSip * months;

    return { 
      corpus, 
      standardSip, 
      stepUpSip: showAdvanced && enableStepUp ? stepUpSip : standardSip,
      fvExpenseMonth,
      totalInvestedStandard,
      totalInvestedWithStepUp: showAdvanced && enableStepUp ? totalInvestedWithStepUp : totalInvestedStandard,
      corpusWithStepUp: showAdvanced && enableStepUp ? corpusWithStepUp : corpus,
      savings: totalInvestedStandard - (showAdvanced && enableStepUp ? totalInvestedWithStepUp : totalInvestedStandard)
    };
  }, [age, retireAge, expenses, inflation, preRate, postRate, lifeExp, enableStepUp, sipStepUp, stepUpDuration, showAdvanced]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputSlider label="Current Age" value={age} setValue={setAge} min={20} max={60} unit="" />
          <InputSlider label="Retire Age" value={retireAge} setValue={setRetireAge} min={40} max={70} unit="" />
        </div>
        <InputCurrency label="Current Monthly Expense" value={expenses} setValue={setExpenses} min={10000} max={500000} step={5000} />
        
        <div className="pt-4 border-t border-slate-100">
          <InputSlider label="Expected Inflation" value={inflation} setValue={setInflation} min={4} max={10} unit="%" />
          <InputSlider label="Pre-Retirement Return" value={preRate} setValue={setPreRate} min={6} max={15} unit="%" />
        </div>

        {showAdvanced && (
          <>
            <div className="pt-4 border-t border-slate-100 animate-fade-in grid grid-cols-2 gap-4">
              <InputSlider label="Life Expectancy" value={lifeExp} setValue={setLifeExp} min={70} max={100} unit="Yrs" />
              <InputSlider label="Post-Retire Return" value={postRate} setValue={setPostRate} min={5} max={10} unit="%" />
            </div>

            {/* NEW: Step-Up SIP Section */}
            <div className="pt-4 border-t border-slate-100 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-slate-700">Enable Step-Up SIP</label>
                <button 
                  onClick={() => setEnableStepUp(!enableStepUp)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${enableStepUp ? 'bg-brand-blue' : 'bg-slate-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${enableStepUp ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {enableStepUp && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 space-y-4 animate-fade-in">
                  <InputSlider label="Annual Step-Up Rate" value={sipStepUp} setValue={setSipStepUp} min={1} max={25} unit="%" />
                  <InputSlider 
                    label="Step-Up Duration (0 = Full Period)" 
                    value={stepUpDuration} 
                    setValue={setStepUpDuration} 
                    min={0} 
                    max={retireAge - age} 
                    unit="Yrs" 
                  />
                  <p className="text-xs text-blue-600">
                    Start with a lower SIP and increase by {sipStepUp}% every year 
                    {stepUpDuration > 0 ? ` for ${stepUpDuration} years` : ' until retirement'}.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="lg:col-span-6 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
        <ResultSummary 
          title="Required Corpus" 
          value={result.corpus} 
          subtitle={`At age ${retireAge} to sustain till ${lifeExp}`} 
        />
        
        <div className="card-result p-6 text-center bg-blue-50 border border-blue-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase">
            {showAdvanced && enableStepUp ? "Starting SIP (with Step-Up)" : "Monthly SIP Required"}
          </h4>
          <div className="text-3xl font-bold text-brand-blue my-2">{formatShort(result.stepUpSip)}</div>
          <p className="text-xs text-slate-500">To achieve this goal starting today</p>
          
          {showAdvanced && enableStepUp && (
            <div className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-xs text-slate-500">Without Step-Up</div>
                <div className="text-sm font-bold text-slate-600">{formatShort(result.standardSip)}/mo</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Total to Invest</div>
                <div className="text-sm font-bold text-slate-600">{formatShort(result.totalInvestedWithStepUp)}</div>
              </div>
            </div>
          )}
        </div>

        {showAdvanced && enableStepUp && result.savings < 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
            <h4 className="text-sm font-bold text-green-700 mb-2">💡 Step-Up Advantage</h4>
            <p className="text-sm text-green-800">
              By starting with {formatShort(result.stepUpSip)} and stepping up by {sipStepUp}% annually, 
              you invest <strong>{formatShort(Math.abs(result.savings))} less</strong> overall compared to a flat SIP approach.
            </p>
          </div>
        )}

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Inflation Impact</h4>
          <p className="text-sm text-slate-600">
            Your <strong>{formatINR(expenses)}</strong> lifestyle today will cost <strong>{formatShort(result.fvExpenseMonth)}</strong> per month when you retire.
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. SWP CALCULATOR
const SWPCalculator = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(30000);
  const [rate, setRate] = useState(8);
  const [stepUp, setStepUp] = useState(0);

  const params = { corpus, withdrawal, rate, stepUp };
  const setters = { corpus: setCorpus, withdrawal: setWithdrawal, rate: setRate, stepUp: setStepUp };
  const { generateShareUrl } = useUrlParams('swp', params, setters);

  const result = useMemo(() => {
    let balance = corpus;
    let currentWithdrawal = withdrawal;
    const monthlyRate = rate / 12 / 100;
    const data = [];
    let years = 0;
    let totalWithdrawn = 0;

    // Simulate for max 100 years
    for (let m = 1; m <= 1200; m++) {
      if (balance <= 0) break;
      
      // Interest accrues
      balance = balance * (1 + monthlyRate);
      // Withdrawal happens
      balance -= currentWithdrawal;
      totalWithdrawn += currentWithdrawal;

      if (m % 12 === 0) {
        years++;
        data.push({ year: years, balance: Math.max(0, Math.round(balance)), withdrawal: Math.round(currentWithdrawal) });
        if (showAdvanced) currentWithdrawal *= (1 + stepUp/100);
      }
    }

    return { years, totalWithdrawn, data };
  }, [corpus, withdrawal, rate, stepUp, showAdvanced]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <InputCurrency label="Total Corpus" value={corpus} setValue={setCorpus} min={500000} max={50000000} step={100000} />
        <InputCurrency label="Monthly Withdrawal" value={withdrawal} setValue={setWithdrawal} min={5000} max={500000} step={1000} />
        <InputSlider label="Expected Return (p.a)" value={rate} setValue={setRate} min={4} max={15} unit="%" />
        {showAdvanced && (
          <div className="pt-4 animate-fade-in">
            <InputSlider label="Annual Withdrawal Increase" value={stepUp} setValue={setStepUp} min={0} max={10} unit="%" />
          </div>
        )}
      </div>

      <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 self-start">
        <ResultSummary 
          title="Sustainability" 
          value={result.years} 
          subtitle="Years until corpus depletes"
          isCurrency={false}
          suffix="Years"
        />
        <div className="card-result p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} width={40} />
              <Tooltip formatter={(v: number) => formatShort(v)} />
              <Area type="monotone" dataKey="balance" stroke="#DC2626" fill="#fee2e2" name="Remaining Balance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 6. EMI CALCULATOR
const EMICalculator = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [stepUp, setStepUp] = useState(0);

  const params = { loan, rate, tenure, stepUp };
  const setters = { loan: setLoan, rate: setRate, tenure: setTenure, stepUp: setStepUp };
  const { generateShareUrl } = useUrlParams('emi', params, setters);

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    
    let emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    let balance = loan;
    let totalInterest = 0;
    let totalPaid = 0;
    let actualMonths = 0;
    let currentEMI = emi;

    const data = [];

    for (let m = 1; m <= 360; m++) {
      if (balance <= 10) break;
      
      const interest = balance * r;
      let principal = currentEMI - interest;
      
      if (balance < principal) {
        principal = balance;
        currentEMI = principal + interest;
      }
      
      balance -= principal;
      totalInterest += interest;
      totalPaid += currentEMI;
      actualMonths++;

      if (m % 12 === 0) {
        data.push({ year: m/12, principal: Math.round(loan - balance), interest: Math.round(totalInterest) });
        if (showAdvanced) currentEMI *= (1 + stepUp/100);
      }
    }

    return { emi, totalInterest, totalPaid, actualMonths, data };
  }, [loan, rate, tenure, stepUp, showAdvanced]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <InputCurrency label="Loan Amount" value={loan} setValue={setLoan} min={100000} max={100000000} step={50000} />
        <InputSlider label="Interest Rate" value={rate} setValue={setRate} min={6} max={15} step={0.1} unit="%" />
        <InputSlider label="Tenure" value={tenure} setValue={setTenure} min={1} max={30} unit="Yrs" />
        {showAdvanced && (
          <div className="pt-4 animate-fade-in">
            <InputSlider label="Annual EMI Increase (Prepayment)" value={stepUp} setValue={setStepUp} min={0} max={20} unit="%" />
            <p className="text-xs text-slate-400 mt-2">Increasing EMI by {stepUp}% annually reduces tenure from {tenure} years to {(result.actualMonths/12).toFixed(1)} years.</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 self-start">
        <ResultSummary 
          title="Monthly EMI" 
          value={result.emi} 
          subtitle={`Total Interest Payable: ${formatShort(result.totalInterest)}`} 
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 text-center">
            <div className="text-xs text-slate-500 uppercase font-bold">Total Payment</div>
            <div className="text-lg font-bold text-slate-800">{formatShort(result.totalPaid)}</div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 text-center">
            <div className="text-xs text-slate-500 uppercase font-bold">Loan Duration</div>
            <div className="text-lg font-bold text-slate-800">{(result.actualMonths/12).toFixed(1)} Yrs</div>
          </div>
        </div>
        <div className="card-result p-4 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis hide />
              <Tooltip formatter={(v: number) => formatShort(v)} />
              <Legend />
              <Bar dataKey="principal" stackId="a" fill="#0047AB" name="Principal Paid" />
              <Bar dataKey="interest" stackId="a" fill="#94a3b8" name="Interest Paid" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 8. HOME AFFORDABILITY with Additional Costs
const HomeAffordability = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [income, setIncome] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [emiRatio, setEmiRatio] = useState(40);
  
  // NEW: Additional Costs
  const [stampDuty, setStampDuty] = useState(5);
  const [registration, setRegistration] = useState(1);
  const [gst, setGst] = useState(0); // 0 for ready possession, 5% for under construction
  const [interiorCost, setInteriorCost] = useState(500000);
  const [otherCharges, setOtherCharges] = useState(100000);

  const params = { income, rate, tenure, downPaymentPct, emiRatio, stampDuty, registration, gst, interiorCost, otherCharges };
  const setters = { 
    income: setIncome, rate: setRate, tenure: setTenure, downPaymentPct: setDownPaymentPct, 
    emiRatio: setEmiRatio, stampDuty: setStampDuty, registration: setRegistration, 
    gst: setGst, interiorCost: setInteriorCost, otherCharges: setOtherCharges 
  };
  const { generateShareUrl } = useUrlParams('home-afford', params, setters);

  const result = useMemo(() => {
    // 1. Max Affordable EMI
    const maxEMI = income * (emiRatio / 100);
    
    // 2. Max Loan (PV of MaxEMI)
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const maxLoan = maxEMI * ((Math.pow(1+r, n) - 1) / (r * Math.pow(1+r, n)));
    
    // 3. Max Property Value (Loan + Downpayment)
    const propertyValue = maxLoan / (1 - downPaymentPct/100);
    const requiredDownPayment = propertyValue * (downPaymentPct/100);

    // 4. Additional Costs Calculation
    const stampDutyAmount = propertyValue * (stampDuty / 100);
    const registrationAmount = propertyValue * (registration / 100);
    const gstAmount = propertyValue * (gst / 100);
    const totalAdditionalCosts = stampDutyAmount + registrationAmount + gstAmount + interiorCost + otherCharges;

    // 5. Total Acquisition Cost
    const totalAcquisitionCost = propertyValue + totalAdditionalCosts;
    const totalUpfrontRequired = requiredDownPayment + totalAdditionalCosts;

    return { 
      maxLoan, 
      propertyValue, 
      requiredDownPayment, 
      maxEMI,
      stampDutyAmount,
      registrationAmount,
      gstAmount,
      totalAdditionalCosts,
      totalAcquisitionCost,
      totalUpfrontRequired
    };
  }, [income, rate, tenure, downPaymentPct, emiRatio, stampDuty, registration, gst, interiorCost, otherCharges]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <InputCurrency label="Monthly Net Income" value={income} setValue={setIncome} min={20000} max={1000000} step={5000} />
        <InputSlider label="Down Payment" value={downPaymentPct} setValue={setDownPaymentPct} min={10} max={50} unit="%" />
        
        <div className="pt-4 border-t border-slate-100">
          <InputSlider label="Interest Rate" value={rate} setValue={setRate} min={6} max={12} step={0.1} unit="%" />
          <InputSlider label="Loan Tenure" value={tenure} setValue={setTenure} min={5} max={30} unit="Yrs" />
        </div>

        {showAdvanced && (
          <>
            <InputSlider label="Max EMI (% of Income)" value={emiRatio} setValue={setEmiRatio} min={20} max={60} unit="%" />

            {/* NEW: Additional Costs Section */}
            <div className="pt-4 border-t border-slate-100 animate-fade-in">
              <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Home size={16} />
                Additional Acquisition Costs
              </h4>
              
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputSlider label="Stamp Duty" value={stampDuty} setValue={setStampDuty} min={0} max={10} step={0.5} unit="%" />
                  <InputSlider label="Registration" value={registration} setValue={setRegistration} min={0} max={3} step={0.5} unit="%" />
                </div>
                
                <InputSlider 
                  label="GST (Under Construction)" 
                  value={gst} 
                  setValue={setGst} 
                  min={0} 
                  max={12} 
                  step={1} 
                  unit="%" 
                />
                <p className="text-xs text-orange-600 -mt-2">Set to 0% for ready-to-move properties, 5% for affordable housing, 12% for others.</p>
                
                <InputCurrency label="Interior & Furnishing" value={interiorCost} setValue={setInteriorCost} min={0} max={5000000} step={50000} />
                <InputCurrency label="Other Charges (Society, Parking, etc.)" value={otherCharges} setValue={setOtherCharges} min={0} max={1000000} step={10000} />
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 self-start">
        <ResultSummary 
          title="Max Property Budget" 
          value={result.propertyValue} 
          subtitle={`Based on a max EMI of ${formatINR(result.maxEMI)}/mo`} 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-500 mb-1">Eligible Loan</div>
            <div className="text-xl font-bold text-slate-800">{formatShort(result.maxLoan)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-500 mb-1">Down Payment</div>
            <div className="text-xl font-bold text-brandRed">{formatShort(result.requiredDownPayment)}</div>
          </div>
        </div>

        {showAdvanced && (
          <>
            {/* Additional Costs Breakdown */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <h4 className="text-sm font-bold text-orange-800 mb-4 flex items-center gap-2">
                📋 Additional Costs Breakdown
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Stamp Duty ({stampDuty}%)</span>
                  <span className="font-medium">{formatShort(result.stampDutyAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Registration ({registration}%)</span>
                  <span className="font-medium">{formatShort(result.registrationAmount)}</span>
                </div>
                {gst > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">GST ({gst}%)</span>
                    <span className="font-medium">{formatShort(result.gstAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Interior & Furnishing</span>
                  <span className="font-medium">{formatShort(interiorCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Other Charges</span>
                  <span className="font-medium">{formatShort(otherCharges)}</span>
                </div>
                <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between font-bold text-orange-800">
                  <span>Total Additional Costs</span>
                  <span>{formatShort(result.totalAdditionalCosts)}</span>
                </div>
              </div>
            </div>

            {/* Total Acquisition Summary */}
            <div className="bg-white p-6 rounded-xl border-2 border-brand-blue">
              <h4 className="text-sm font-bold text-brand-blue mb-4">💰 Complete Acquisition Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Property Price</span>
                  <span className="font-bold">{formatShort(result.propertyValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">+ Additional Costs</span>
                  <span className="font-bold">{formatShort(result.totalAdditionalCosts)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-bold text-slate-800">Total Acquisition Cost</span>
                  <span className="text-xl font-extrabold text-brand-blue">{formatShort(result.totalAcquisitionCost)}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 pt-2 mt-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Upfront Required (Down Payment + Costs)</span>
                    <span className="font-bold text-brandRed">{formatShort(result.totalUpfrontRequired)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 mt-1">
                    <span>Loan Amount</span>
                    <span className="font-bold">{formatShort(result.maxLoan)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 9. INSURANCE (HLV)
const InsuranceCalculator = () => {
  const [income, setIncome] = useState(1500000); // Annual
  const [age, setAge] = useState(30);
  const [liabilities, setLiabilities] = useState(2500000);
  const [existingCover, setExistingCover] = useState(5000000);
  const [savings, setSavings] = useState(1000000);

  const params = { income, age, liabilities, existingCover, savings };
  const setters = { income: setIncome, age: setAge, liabilities: setLiabilities, existingCover: setExistingCover, savings: setSavings };
  const { generateShareUrl } = useUrlParams('insurance', params, setters);

  const result = useMemo(() => {
    const retirementAge = 60;
    const yearsLeft = Math.max(0, retirementAge - age);
    
    const investibleSurplus = income * 0.70;
    const realRate = 0.04;
    const pvIncome = investibleSurplus * ((1 - Math.pow(1+realRate, -yearsLeft)) / realRate);
    
    const requiredCover = pvIncome + liabilities - savings;
    const gap = Math.max(0, requiredCover - existingCover);

    return { requiredCover, gap };
  }, [income, age, liabilities, existingCover, savings]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <InputCurrency label="Annual Net Income" value={income} setValue={setIncome} min={500000} max={10000000} step={100000} />
        <InputSlider label="Current Age" value={age} setValue={setAge} min={20} max={55} unit="Yrs" />
        <InputCurrency label="Outstanding Loans" value={liabilities} setValue={setLiabilities} min={0} max={50000000} step={100000} />
        <div className="pt-4 border-t border-slate-100">
          <InputCurrency label="Existing Insurance" value={existingCover} setValue={setExistingCover} min={0} max={50000000} step={500000} />
          <InputCurrency label="Current Savings" value={savings} setValue={setSavings} min={0} max={10000000} step={100000} />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 self-start">
        <div className="card-result p-8 text-center bg-white border-t-4 border-brandRed">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Additional Insurance Needed</h3>
          <div className="text-4xl md:text-5xl font-extrabold text-brandRed my-4 tracking-tight">
            {formatShort(result.gap)}
          </div>
          <p className="text-slate-500 text-sm">To fully secure your family's future</p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4">Coverage Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total Human Life Value</span>
              <span className="font-bold">{formatShort(result.requiredCover + savings - liabilities)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">+ Liability Protection</span>
              <span className="font-bold">{formatShort(liabilities)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">- Existing Assets & Cover</span>
              <span className="font-bold text-green-600">-{formatShort(savings + existingCover)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold">
              <span>Net Gap</span>
              <span>{formatShort(result.gap)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 10. TAX CALCULATOR
const TaxCalculator = () => {
  const [ctc, setCtc] = useState(1200000);

  const params = { ctc };
  const setters = { ctc: setCtc };
  const { generateShareUrl } = useUrlParams('tax', params, setters);

  const result = useMemo(() => {
    const stdDeduction = 75000;
    const taxable = Math.max(0, ctc - stdDeduction);
    
    let tax = 0;
    
    if (taxable <= 700000) {
      tax = 0;
    } else {
      if (taxable > 300000) tax += Math.min(taxable - 300000, 400000) * 0.05;
      if (taxable > 700000) tax += Math.min(taxable - 700000, 300000) * 0.10;
      if (taxable > 1000000) tax += Math.min(taxable - 1000000, 200000) * 0.15;
      if (taxable > 1200000) tax += Math.min(taxable - 1200000, 300000) * 0.20;
      if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
    }
    
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const monthlyInHand = (ctc - totalTax) / 12;
    
    return { totalTax, monthlyInHand, stdDeduction };
  }, [ctc]);

  const handleShare = () => {
    navigator.clipboard.writeText(generateShareUrl());
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-input space-y-8">
        <div className="flex justify-end">
          <ShareButton onClick={handleShare} />
        </div>
        <InputCurrency label="Annual Salary (CTC)" value={ctc} setValue={setCtc} min={300000} max={5000000} step={50000} />
        
        <div className="bg-yellow-50 p-4 rounded-lg text-xs text-yellow-800 border border-yellow-100">
          Note: Estimates based on FY 2024-25 New Tax Regime. Includes Standard Deduction of ₹75,000.
        </div>
      </div>
      
      <div className="card-result p-8 space-y-6 lg:sticky lg:top-24 self-start">
        <div className="text-center">
          <h3 className="text-slate-500 font-bold uppercase tracking-wide text-xs mb-2">Estimated Monthly Take-Home</h3>
          <div className="text-4xl font-extrabold text-slate-800">{formatINR(Math.round(result.monthlyInHand))}</div>
        </div>
        
        <div className="border-t border-dashed border-slate-200 my-4"></div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Gross Annual</span>
            <span className="font-bold">{formatINR(ctc)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Standard Deduction</span>
            <span>- {formatINR(result.stdDeduction)}</span>
          </div>
          <div className="flex justify-between text-sm text-red-600">
            <span>Total Tax + Cess</span>
            <span>- {formatINR(Math.round(result.totalTax))}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-slate-200">
            <span>Net Annual Income</span>
            <span>{formatINR(Math.round(ctc - result.totalTax))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SHARED UI COMPONENTS
// ==========================================

const ResultSummary = ({ title, value, subtitle, isCurrency = true, suffix = '' }: any) => (
  <div className="bg-white rounded-2xl shadow-xl border-t-4 border-brand-blue overflow-hidden p-8 text-center">
    <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">{title}</h3>
    <div className="text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
      {isCurrency ? formatShort(value) : value} {suffix}
    </div>
    {subtitle && <p className="text-slate-400 text-sm font-medium">{subtitle}</p>}
  </div>
);

const InputSlider = ({ label, value, setValue, min, max, step = 1, unit }: any) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <span className="text-brand-blue font-bold bg-blue-50 px-3 py-1 rounded-md text-sm">
        {value} {unit}
      </span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value} 
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
    />
    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
      <span>{min}{unit}</span>
      <span>{max}{unit}</span>
    </div>
  </div>
);

const InputCurrency = ({ label, value, setValue, min, max, step }: any) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Math.min(max, Number(e.target.value)))}
        className="w-full pl-8 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none font-bold text-slate-800 transition-all"
      />
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value} 
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue mt-3"
    />
  </div>
);

export default Calculator;
