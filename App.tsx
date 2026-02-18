import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Calculator from './pages/Calculator';

// Component to update Open Graph meta tags dynamically
const MetaTagsUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://wealthy4ever.in';
    const fullUrl = `${baseUrl}${location.pathname}${location.search}`;

    // Get page-specific metadata
    let title = 'Wealthy4ever - Making Money Work For You';
    let description = 'Professional financial planning and investment tools to help you achieve your financial goals.';

    if (location.pathname === '/about') {
      title = 'About Us - Wealthy4ever';
      description = 'Meet the team behind Wealthy4ever. Professional financial advisors dedicated to helping you achieve your financial goals.';
    } else if (location.pathname === '/tools') {
      const searchParams = new URLSearchParams(location.search);
      const tool = searchParams.get('tool');

      if (tool) {
        const toolNames: Record<string, string> = {
          'risk-profile': 'Risk Profiler',
          'asset-allocation': 'Asset Allocation Calculator',
          'insurance': 'Life Insurance Calculator',
          'sip': 'SIP Calculator',
          'lumpsum': 'Lumpsum Growth Calculator',
          'retirement-accum': 'Retirement Planner',
          'swp': 'SWP / Retirement Calculator',
          'emi': 'EMI Calculator',
          'home-afford': 'Home Affordability Calculator',
          'tax': 'Salary & Tax Calculator',
        };

        const toolName = toolNames[tool] || 'Financial Calculator';
        title = `${toolName} - Wealthy4ever`;
        description = `Use our ${toolName.toLowerCase()} to plan and optimize your financial future.`;
      } else {
        title = 'Financial Tools - Wealthy4ever';
        description = 'Comprehensive suite of financial calculators and planning tools to help you make informed decisions.';
      }
    }

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update Open Graph tags
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', `${baseUrl}/logo_with_text.webp`);

    // Update Twitter tags
    updateMetaTag('twitter:url', fullUrl, false);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', `${baseUrl}/logo_with_text.webp`, false);

    // Update description meta tag
    updateMetaTag('description', description, false);
  }, [location]);

  return null;
};

// Component to track page views for browser-based routing
const PageViewTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Build the full path for browser-based routing
      const pagePath = location.pathname + location.search;

      // Update GA config with new page path (this triggers page_view in GA4)
      (window as any).gtag('config', 'G-K2BKTVN3CS', {
        page_path: pagePath,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <MetaTagsUpdater />
      <PageViewTracker />
      <div className="flex flex-col min-h-screen font-sans bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools" element={<Calculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;