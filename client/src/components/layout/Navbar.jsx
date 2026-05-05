import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, Bell, Search, User } from 'lucide-react';
import Button from '../common/Button.jsx';

const Navbar = ({ mode = 'landing' }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const landingLinks = [
    { name: 'Home', href: '/' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Services', href: '/#' },
    { name: 'SOS', href: '/emergency', urgent: true },
  ];

  if (mode === 'dashboard') {
    return (
      <nav className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white/80 backdrop-blur-md border-b border-surface-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-surface-500">
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Search doctors, records..." 
                className="pl-10 pr-4 py-2 bg-surface-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-surface-500 hover:bg-surface-50 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-surface-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-surface-900 leading-none">Nandani Singh</p>
                <p className="text-xs text-surface-500 mt-1">Patient ID: #202405</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 border border-primary-200">
                <User size={24} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
              <Rocket size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              CuraJit
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {landingLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors ${
                  link.urgent ? 'text-red-500 hover:text-red-600' : 'text-surface-600 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-surface-600 hover:text-primary-600 font-medium px-4 py-2">Sign In</Link>
              <Button size="sm" onClick={() => navigate('/dashboard')}>Get Started</Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-surface-600 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-fade-in border-t border-surface-50">
          <div className="flex flex-col p-4 gap-4">
            {landingLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium py-2 transition-colors border-b border-surface-50 ${
                  link.urgent ? 'text-red-500' : 'text-surface-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="secondary" className="w-full" onClick={() => navigate('/login')}>Sign In</Button>
              <Button className="w-full" onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
