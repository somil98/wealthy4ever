import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Calculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;