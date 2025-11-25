import React, { useState, useEffect, useMemo } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { CalculatorTab, ChartDataPoint } from '../types';
import { 
  Briefcase, TrendingUp, DollarSign, Umbrella, Home, 
  PieChart as PieIcon, Calculator as CalcIcon, ChevronRight, Menu, X, Info
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
  { id: 'swp', label: 'SWP Generator', category: 'Withdrawal', icon: TrendingUp },
  { id: 'retirement-dist', label: 'Retirement Income', category: 'Withdrawal', icon: Briefcase },
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

// --- Main Component ---

const Calculator: React.FC = () => {
  const [activeTool, setActiveTool] = useState<CalculatorTab>('sip');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
      case 'lumpsum': return <LumpsumCalculator />;
      case 'retirement-accum': return <RetirementAccumulation showAdvanced={showAdvanced} />;
      case 'swp': return <SWPCalculator showAdvanced={showAdvanced} />;
      case 'retirement-dist': return <RetirementDistribution showAdvanced={showAdvanced} />;
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
           {['sip', 'swp', 'emi', 'retirement-accum', 'retirement-dist', 'home-afford'].includes(activeTool) && (
             <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium">Advanced Mode</span>
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${showAdvanced ? 'bg-brand-blue' : 'bg-slate-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${showAdvanced ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
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

// 1. RISK PROFILER
const RiskProfiler = () => {
  const [age, setAge] = useState(30);
  const [horizon, setHorizon] = useState(10);
  const [attitude, setAttitude] = useState<'conservative'|'moderate'|'aggressive'>('moderate');

  const allocation = useMemo(() => {
    let equity = 0;
    // Simple rule of thumb: 100 - age, adjusted by attitude
    let baseEquity = Math.max(0, 110 - age); // slightly aggressive base
    
    if (attitude === 'conservative') baseEquity -= 20;
    if (attitude === 'aggressive') baseEquity += 10;
    
    // Horizon adjustment
    if (horizon < 3) baseEquity = Math.min(baseEquity, 20);
    else if (horizon < 5) baseEquity = Math.min(baseEquity, 40);

    equity = Math.min(Math.max(baseEquity, 0), 100);
    const debt = 100 - equity;
    
    return [
      { name: 'Equity', value: equity },
      { name: 'Debt/Fixed Income', value: debt },
    ];
  }, [age, horizon, attitude]);

  const getLabel = () => {
    const eq = allocation[0].value;
    if (eq > 75) return { text: 'Aggressive Growth', color: 'text-red-600', bg: 'bg-red-50' };
    if (eq > 50) return { text: 'Balanced Growth', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (eq > 30) return { text: 'Moderate Stability', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'Conservative Income', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const labelStyle = getLabel();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-input">
        <InputSlider label="Current Age" value={age} setValue={setAge} min={18} max={80} unit="Yrs" />
        <InputSlider label="Investment Horizon" value={horizon} setValue={setHorizon} min={1} max={40} unit="Yrs" />
        
        <div className="mt-6">
          <label className="block text-sm font-bold text-slate-700 mb-3">Risk Attitude</label>
          <div className="grid grid-cols-3 gap-2">
            {(['conservative', 'moderate', 'aggressive'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setAttitude(t)}
                className={`py-3 px-2 rounded-lg text-sm font-bold capitalize transition-all border-2
                  ${attitude === t ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {attitude === 'conservative' && "You prioritize safety of capital over high returns."}
            {attitude === 'moderate' && "You want a balance between growth and stability."}
            {attitude === 'aggressive' && "You are willing to take risks for maximum long-term growth."}
          </p>
        </div>
      </div>

      <div className="card-result flex flex-col items-center justify-center text-center p-8">
        <div className={`px-4 py-2 rounded-full font-bold text-sm mb-6 ${labelStyle.bg} ${labelStyle.color}`}>
          {labelStyle.text}
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#0047AB" />
                <Cell fill="#94a3b8" />
              </Pie>
              <Tooltip formatter={(val: number) => `${val}%`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 text-sm text-slate-600">
          Suggested Allocation: <strong>{allocation[0].value}% Equity</strong> and <strong>{allocation[1].value}% Debt</strong>.
        </div>
      </div>
    </div>
  );
};

// 2. SIP CALCULATOR (Step-up)
const SIPCalculator = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(0);

  const result = useMemo(() => {
    let invested = 0;
    let value = 0;
    const monthlyRate = rate / 12 / 100;
    let currentSip = monthly;
    const data: ChartDataPoint[] = [];

    for (let y = 1; y <= years; y++) {
      let yearlyInv = 0;
      for (let m = 1; m <= 12; m++) {
        value += currentSip;
        yearlyInv += currentSip;
        value *= (1 + monthlyRate);
      }
      invested += yearlyInv;
      data.push({ year: y, invested: Math.round(invested), value: Math.round(value) });
      if (showAdvanced) currentSip *= (1 + stepUp / 100);
    }
    return { invested, value, data };
  }, [monthly, rate, years, stepUp, showAdvanced]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <InputCurrency label="Monthly Investment" value={monthly} setValue={setMonthly} min={500} max={1000000} step={500} />
        <InputSlider label="Expected Return (p.a)" value={rate} setValue={setRate} min={4} max={30} unit="%" />
        <InputSlider label="Time Period" value={years} setValue={setYears} min={1} max={40} unit="Yrs" />
        {showAdvanced && (
           <div className="pt-4 border-t border-slate-100 animate-fade-in">
             <InputSlider label="Annual Step-up" value={stepUp} setValue={setStepUp} min={0} max={20} unit="%" />
             <p className="text-xs text-slate-400 mt-2">Increase your SIP amount by {stepUp}% every year.</p>
           </div>
        )}
      </div>

      <div className="lg:col-span-7 space-y-6">
        <ResultSummary 
           title="Estimated Corpus" 
           value={result.value} 
           subtitle={`Total Invested: ${formatShort(result.invested)} | Gain: ${formatShort(result.value - result.invested)}`} 
        />
        <div className="card-result p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.data}>
               <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0047AB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0047AB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" tick={{fontSize: 10}} label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `${v/100000}L`} tick={{fontSize: 10}} width={40} />
              <Tooltip formatter={(v: number) => formatShort(v)} />
              <Area type="monotone" dataKey="value" stroke="#0047AB" fill="url(#colorVal)" name="Total Value" />
              <Area type="monotone" dataKey="invested" stroke="#94a3b8" fill="none" name="Invested Amount" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 3. LUMPSUM
const LumpsumCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    const val = calculateFV(amount, rate, years);
    const data = [];
    for(let i=0; i<=years; i++) {
      data.push({ year: i, value: Math.round(calculateFV(amount, rate, i)), invested: amount });
    }
    return { value: val, data };
  }, [amount, rate, years]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <InputCurrency label="Invested Amount" value={amount} setValue={setAmount} min={5000} max={10000000} step={5000} />
        <InputSlider label="Expected Return (p.a)" value={rate} setValue={setRate} min={4} max={30} unit="%" />
        <InputSlider label="Time Period" value={years} setValue={setYears} min={1} max={40} unit="Yrs" />
      </div>
      <div className="lg:col-span-7 space-y-6">
        <ResultSummary 
           title="Future Value" 
           value={result.value} 
           subtitle={`Growth of ${formatShort(amount)} over ${years} years`} 
        />
        <div className="card-result p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} width={40} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Area type="monotone" dataKey="value" stroke="#0047AB" fill="#E0F2FE" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 4. RETIREMENT ACCUMULATION
const RetirementAccumulation = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [expenses, setExpenses] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preRate, setPreRate] = useState(12);
  const [postRate, setPostRate] = useState(8);
  const [lifeExp, setLifeExp] = useState(85);

  const result = useMemo(() => {
    const yearsToRetire = retireAge - age;
    const yearsInRetire = lifeExp - retireAge;
    
    // Expenses at retirement
    const fvExpenseMonth = calculateFV(expenses, inflation, yearsToRetire);
    const annualExpense = fvExpenseMonth * 12;

    // Corpus needed at 60 to fund till 85
    // Real rate
    const realRate = ((1 + postRate/100) / (1 + inflation/100)) - 1;
    let corpus = 0;
    if (Math.abs(realRate) < 0.001) corpus = annualExpense * yearsInRetire;
    else corpus = annualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetire)) / realRate);

    // SIP Required
    const monthlyRate = preRate/12/100;
    const months = yearsToRetire * 12;
    const sip = corpus * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1); // Simple SIP formula (end of period)

    return { corpus, sip, fvExpenseMonth };
  }, [age, retireAge, expenses, inflation, preRate, postRate, lifeExp]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 card-input space-y-6">
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
          <div className="pt-4 border-t border-slate-100 animate-fade-in grid grid-cols-2 gap-4">
             <InputSlider label="Life Expectancy" value={lifeExp} setValue={setLifeExp} min={70} max={100} unit="Yrs" />
             <InputSlider label="Post-Retire Return" value={postRate} setValue={setPostRate} min={5} max={10} unit="%" />
          </div>
        )}
      </div>

      <div className="lg:col-span-6 flex flex-col gap-6">
         <ResultSummary 
            title="Required Corpus" 
            value={result.corpus} 
            subtitle={`At age ${retireAge} to sustain till ${lifeExp}`} 
         />
         
         <div className="card-result p-6 text-center bg-blue-50 border border-blue-100">
            <h4 className="text-sm font-bold text-slate-500 uppercase">Monthly SIP Required</h4>
            <div className="text-3xl font-bold text-brand-blue my-2">{formatShort(result.sip)}</div>
            <p className="text-xs text-slate-500">To achieve this goal starting today</p>
         </div>

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

  const result = useMemo(() => {
    let balance = corpus;
    let currentWithdrawal = withdrawal;
    const monthlyRate = rate / 12 / 100;
    const data = [];
    let years = 0;
    let totalWithdrawn = 0;

    // Simulate for max 40 years
    for (let m = 1; m <= 480; m++) {
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

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <InputCurrency label="Total Corpus" value={corpus} setValue={setCorpus} min={500000} max={50000000} step={100000} />
        <InputCurrency label="Monthly Withdrawal" value={withdrawal} setValue={setWithdrawal} min={5000} max={500000} step={1000} />
        <InputSlider label="Expected Return (p.a)" value={rate} setValue={setRate} min={4} max={15} unit="%" />
        {showAdvanced && (
           <div className="pt-4 animate-fade-in">
              <InputSlider label="Annual Withdrawal Increase" value={stepUp} setValue={setStepUp} min={0} max={10} unit="%" />
           </div>
        )}
      </div>

      <div className="lg:col-span-7 space-y-6">
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

// 6. RETIREMENT DISTRIBUTION (Similar to SWP but focused)
const RetirementDistribution = ({ showAdvanced }: { showAdvanced: boolean }) => {
  // Can reuse SWP component or customize text. Reusing logic for brevity but with custom UI.
  return (
    <div>
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 text-sm text-blue-800">
         <strong>Planning Tip:</strong> This tool helps you see how long your retirement savings will last given your monthly expenses and inflation.
      </div>
      <SWPCalculator showAdvanced={showAdvanced} />
    </div>
  );
};

// 7. EMI CALCULATOR
const EMICalculator = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [stepUp, setStepUp] = useState(0);

  const result = useMemo(() => {
    // Standard EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const r = rate / 12 / 100;
    const n = tenure * 12;
    
    // Base EMI
    let emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    // For Step-up, logic is complex (reverse solving), simplifying to showing impact
    // If step up is selected, we start lower and increase. 
    // Approx Logic for Step-up: PV of Growing Annuity = Loan.
    // Simplifying for static calc: Show standard EMI, then showing effective schedule if simple step-up is applied (which would reduce tenure).
    // Better UX: Standard EMI calc is primary. Step up usually means "I want to pay X% more each year to close early".
    
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

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
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

      <div className="lg:col-span-7 space-y-6">
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

// 8. HOME AFFORDABILITY
const HomeAffordability = ({ showAdvanced }: { showAdvanced: boolean }) => {
  const [income, setIncome] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [emiRatio, setEmiRatio] = useState(40);

  const result = useMemo(() => {
    // 1. Max Affordable EMI
    const maxEMI = income * (emiRatio / 100);
    
    // 2. Max Loan (PV of MaxEMI)
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const maxLoan = maxEMI * ((Math.pow(1+r, n) - 1) / (r * Math.pow(1+r, n)));
    
    // 3. Max Property Value (Loan + Downpayment)
    // Property = Loan / (1 - DownPct)
    const propertyValue = maxLoan / (1 - downPaymentPct/100);
    const requiredDownPayment = propertyValue * (downPaymentPct/100);

    return { maxLoan, propertyValue, requiredDownPayment, maxEMI };
  }, [income, rate, tenure, downPaymentPct, emiRatio]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
         <InputCurrency label="Monthly Net Income" value={income} setValue={setIncome} min={20000} max={1000000} step={5000} />
         <InputSlider label="Down Payment" value={downPaymentPct} setValue={setDownPaymentPct} min={10} max={50} unit="%" />
         <div className="pt-4 border-t border-slate-100">
           <InputSlider label="Interest Rate" value={rate} setValue={setRate} min={6} max={12} step={0.1} unit="%" />
           <InputSlider label="Loan Tenure" value={tenure} setValue={setTenure} min={5} max={30} unit="Yrs" />
         </div>
         {showAdvanced && (
           <InputSlider label="Max EMI (% of Income)" value={emiRatio} setValue={setEmiRatio} min={20} max={60} unit="%" />
         )}
      </div>
      
      <div className="lg:col-span-7 space-y-6">
         <ResultSummary 
           title="Max Property Budget" 
           value={result.propertyValue} 
           subtitle={`Based on a max EMI of ${formatINR(result.maxEMI)}/mo`} 
         />
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
               <div className="text-sm text-slate-500 mb-1">Eligible Loan Amount</div>
               <div className="text-xl font-bold text-slate-800">{formatShort(result.maxLoan)}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
               <div className="text-sm text-slate-500 mb-1">Your Down Payment</div>
               <div className="text-xl font-bold text-brandRed">{formatShort(result.requiredDownPayment)}</div>
            </div>
         </div>
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

  const result = useMemo(() => {
    // Simple HLV: Income Replacement Method
    const retirementAge = 60;
    const yearsLeft = Math.max(0, retirementAge - age);
    
    // Assumed personal expense 30%
    const investibleSurplus = income * 0.70;
    
    // Discount rate (Real rate) approx 4%
    const realRate = 0.04;
    
    // PV of future income
    const pvIncome = investibleSurplus * ((1 - Math.pow(1+realRate, -yearsLeft)) / realRate);
    
    const requiredCover = pvIncome + liabilities - savings;
    const gap = Math.max(0, requiredCover - existingCover);

    return { requiredCover, gap };
  }, [income, age, liabilities, existingCover, savings]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 card-input space-y-6">
        <InputCurrency label="Annual Net Income" value={income} setValue={setIncome} min={500000} max={10000000} step={100000} />
        <InputSlider label="Current Age" value={age} setValue={setAge} min={20} max={55} unit="Yrs" />
        <InputCurrency label="Outstanding Loans" value={liabilities} setValue={setLiabilities} min={0} max={50000000} step={100000} />
        <div className="pt-4 border-t border-slate-100">
          <InputCurrency label="Existing Insurance" value={existingCover} setValue={setExistingCover} min={0} max={50000000} step={500000} />
          <InputCurrency label="Current Savings" value={savings} setValue={setSavings} min={0} max={10000000} step={100000} />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
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
  
  // Very simplified FY2024-25 New Regime estimation
  const result = useMemo(() => {
    const stdDeduction = 75000;
    const taxable = Math.max(0, ctc - stdDeduction);
    
    let tax = 0;
    
    // New Regime Slabs 2024 (Budget 2024 proposed/final)
    // 0-3L: 0
    // 3-7L: 5%
    // 7-10L: 10%
    // 10-12L: 15%
    // 12-15L: 20%
    // >15L: 30%
    
    if (taxable <= 700000) {
      tax = 0; // Rebate u/s 87A
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

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-input space-y-8">
        <InputCurrency label="Annual Salary (CTC)" value={ctc} setValue={setCtc} min={300000} max={5000000} step={50000} />
        
        <div className="bg-yellow-50 p-4 rounded-lg text-xs text-yellow-800 border border-yellow-100">
           Note: Estimates based on FY 2024-25 New Tax Regime. Includes Standard Deduction of ₹75,000.
        </div>
      </div>
      
      <div className="card-result p-8 space-y-6">
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