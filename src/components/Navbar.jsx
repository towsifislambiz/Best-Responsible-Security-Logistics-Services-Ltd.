import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, Phone, Mail, MapPin, ChevronDown, ChevronRight, Menu, X, 
  Clock, ShieldAlert, Award, FileText, Users, DollarSign,
  ArrowRight, Lock, Globe
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

export default function Navbar() {
  const { lang, isBn, toggleLanguage, t } = useLanguage();
  const { siteSettings } = useSiteData();
  const currentHotline = siteSettings?.hotline || companyInfo.contacts.hotline;
  const currentMobileDisplay = siteSettings?.mobileDisplay || companyInfo.contacts.mobileDisplay;
  const currentMdPhone = siteSettings?.mdPhone || companyInfo.contacts.mobileList[0];
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialOpen = searchParams.get('open') || null;

  const logoClicksRef = useRef(0);
  const logoTimerRef = useRef(null);

  const handleLogoClick = (e) => {
    logoClicksRef.current += 1;

    if (logoTimerRef.current) {
      clearTimeout(logoTimerRef.current);
    }

    if (logoClicksRef.current >= 5) {
      e.preventDefault();
      logoClicksRef.current = 0;
      closeAll();
      navigate('/admin/login');
      return;
    }

    // Reset clicks counter after 3 seconds of inactivity
    logoTimerRef.current = setTimeout(() => {
      logoClicksRef.current = 0;
    }, 3000);

    closeAll();
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Mobile active dropdown
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(initialOpen); // Desktop click/hover dropdown
  const navRef = useRef(null);

  const isWhoActive = ['/about', '/leadership', '/organogram', '/licenses', '/training'].includes(location.pathname);
  const isServicesActive = location.pathname.startsWith('/services');
  const isPricingActive = ['/pricing', '/hire-guard'].includes(location.pathname);
  const isClientsActive = ['/clients', '/recommendations', '/sectors', '/gallery'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change or click outside
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setOpenDesktopDropdown(new URLSearchParams(location.search).get('open') || null);
  }, [location.pathname, location.search]);

  // Click outside listener for desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDesktopDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleDesktopDropdown = (name) => {
    setOpenDesktopDropdown(openDesktopDropdown === name ? null : name);
  };

  const closeAll = () => {
    setOpenDesktopDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full shadow-md font-sans">
      {/* Top Emergency & Contact Bar */}
      <div className="bg-[#0f172a] border-b border-slate-800 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-slate-300">
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5 animate-pulse text-amber-400" />
              {t('topBar.emergencyCell')}
            </span>
            <a href={`tel:${currentHotline}`} className="flex items-center hover:text-amber-400 transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-amber-400" />
              {t('topBar.hotline')} <strong className="ml-1 text-white">{currentHotline}</strong>
            </a>
            <span className="text-slate-600">|</span>
            <a href={`tel:${currentMdPhone}`} className="flex items-center hover:text-amber-400 transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-emerald-400" />
              {t('topBar.mobile')} {currentMobileDisplay}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3 h-3 mr-1 text-amber-400" />
              {t('topBar.location')}
            </span>
            <span className="text-slate-600">|</span>

            {/* Language Switcher in Top Bar - Luxury Segmented Pill */}
            <div className="inline-flex items-center bg-slate-900/90 border border-slate-700/80 rounded-full p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => !isBn && toggleLanguage()}
                className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  isBn 
                    ? 'bg-amber-400 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="বাংলা ভাষা নির্বাচন করুন"
              >
                <span>🇧🇩 বাংলা</span>
              </button>
              <button
                type="button"
                onClick={() => isBn && toggleLanguage()}
                className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  !isBn 
                    ? 'bg-amber-400 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Corporate Executive Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0a192f]/98 backdrop-blur-md shadow-xl py-2.5 border-b border-amber-500/30' 
          : 'bg-[#0a192f] py-3.5 border-b border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Identity (5-click secret admin easter egg) */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center space-x-2 sm:space-x-3 group min-w-0 select-none cursor-pointer">
            <div className="relative shrink-0">
              <img 
                src="/assets/company-logo.png" 
                alt="BRSLSL Shield Logo" 
                className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300 ring-2 ring-amber-400/50"
              />
              <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-[#0a192f]"></span>
            </div>
            <div className="min-w-0 max-w-[140px] sm:max-w-[240px] md:max-w-none overflow-hidden">
              <span className="block text-white font-extrabold text-xs sm:text-base md:text-lg tracking-wider group-hover:text-amber-300 transition-colors leading-tight truncate">
                {isBn ? 'বেস্ট রেসপনসিবল' : 'BEST RESPONSIBLE'}
              </span>
              <span className="block text-amber-400 text-[8.5px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase truncate">
                {isBn ? 'সিকিউরিটি সার্ভিসেস লি.' : 'SECURITY & LOGISTICS LTD.'}
              </span>
              <span className="block text-slate-400 text-[9px] hidden sm:block truncate">
                {isBn ? 'সরকারি নিবন্ধিত প্রাইভেট লিমিটেড কোম্পানি' : 'Govt. Reg. Private Limited Company'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            <Link 
              to="/" 
              onClick={closeAll}
              className={`relative py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg flex items-center ${
                location.pathname === '/' 
                  ? 'text-amber-400 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
              }`}
            >
              <span>{t('nav.home')}</span>
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              )}
            </Link>

            {/* Who We Are Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDesktopDropdown('who')}
              onMouseLeave={() => setOpenDesktopDropdown(null)}
            >
              <button 
                type="button"
                onClick={() => toggleDesktopDropdown('who')}
                className={`relative flex items-center py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg ${
                  openDesktopDropdown === 'who' || isWhoActive
                    ? 'text-amber-400 font-bold' 
                    : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
                }`}
              >
                <span>{t('nav.whoWeAre')}</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                  openDesktopDropdown === 'who' ? 'rotate-180 text-amber-400' : 'text-slate-400 group-hover:text-amber-300'
                }`} />
                {(openDesktopDropdown === 'who' || isWhoActive) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                )}
              </button>
              
              {/* Dropdown Menu Container (Apple Glass Card) */}
              <div className={`absolute left-0 top-full pt-2.5 w-72 z-50 transition-all duration-200 ease-out origin-top ${
                openDesktopDropdown === 'who'
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                  : 'opacity-0 translate-y-1 scale-95 pointer-events-none invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto group-hover:visible'
              }`}>
                <div className="apple-glass-card rounded-2xl p-2 space-y-0.5">
                  <Link 
                    to="/about" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.companyProfile')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.companyProfileSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/leadership" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.mdLeadership')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.mdLeadershipSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/organogram" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.organogram')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.organogramSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/licenses" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.licenses')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.licensesSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/training" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.training')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.trainingSub')}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* What We Do Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDesktopDropdown('services')}
              onMouseLeave={() => setOpenDesktopDropdown(null)}
            >
              <button 
                type="button"
                onClick={() => toggleDesktopDropdown('services')}
                className={`relative flex items-center py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg ${
                  openDesktopDropdown === 'services' || isServicesActive
                    ? 'text-amber-400 font-bold' 
                    : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
                }`}
              >
                <span>{t('nav.whatWeDo')}</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                  openDesktopDropdown === 'services' ? 'rotate-180 text-amber-400' : 'text-slate-400 group-hover:text-amber-300'
                }`} />
                {(openDesktopDropdown === 'services' || isServicesActive) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                )}
              </button>

              <div className={`absolute left-0 top-full pt-2.5 w-80 z-50 transition-all duration-200 ease-out origin-top ${
                openDesktopDropdown === 'services'
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                  : 'opacity-0 translate-y-1 scale-95 pointer-events-none invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto group-hover:visible'
              }`}>
                <div className="apple-glass-card rounded-2xl p-2 space-y-0.5">
                  <Link 
                    to="/services" 
                    onClick={closeAll}
                    className="block px-3 py-2 rounded-xl text-amber-800 bg-amber-500/10 hover:bg-amber-500/20 font-bold text-xs mb-1 transition-colors border border-amber-500/20"
                  >
                    {t('nav.viewAllServices')}
                  </Link>
                  <Link 
                    to="/services/manned-guarding" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.mannedGuarding')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.mannedGuardingSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/services/vip-protection" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.vipProtection')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.vipProtectionSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/services/cash-transit" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.cashTransit')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.cashTransitSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/services/cleaning-facility" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.cleaningFacility')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.cleaningFacilitySub')}
                    </span>
                  </Link>
                  <Link 
                    to="/services/event-security" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.eventSecurity')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.eventSecuritySub')}
                    </span>
                  </Link>
                  <Link 
                    to="/services/electronic-security" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.electronicSecurity')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.electronicSecuritySub')}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hire & Rates Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDesktopDropdown('pricing')}
              onMouseLeave={() => setOpenDesktopDropdown(null)}
            >
              <button 
                type="button"
                onClick={() => toggleDesktopDropdown('pricing')}
                className={`relative flex items-center py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg ${
                  openDesktopDropdown === 'pricing' || isPricingActive
                    ? 'text-amber-400 font-bold' 
                    : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
                }`}
              >
                <span>{t('nav.hireRates')}</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                  openDesktopDropdown === 'pricing' ? 'rotate-180 text-amber-400' : 'text-slate-400 group-hover:text-amber-300'
                }`} />
                {(openDesktopDropdown === 'pricing' || isPricingActive) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                )}
              </button>

              <div className={`absolute left-0 top-full pt-2.5 w-72 z-50 transition-all duration-200 ease-out origin-top ${
                openDesktopDropdown === 'pricing'
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                  : 'opacity-0 translate-y-1 scale-95 pointer-events-none invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto group-hover:visible'
              }`}>
                <div className="apple-glass-card rounded-2xl p-2 space-y-1">
                  <Link 
                    to="/hire-guard" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-bold group-hover/item:text-amber-700 transition-colors">
                        {t('nav.guardCalculator')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {t('nav.guardCalculatorSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/pricing" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.officialRateChart')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {t('nav.officialRateChartSub')}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Clients & Trust Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDesktopDropdown('clients')}
              onMouseLeave={() => setOpenDesktopDropdown(null)}
            >
              <button 
                type="button"
                onClick={() => toggleDesktopDropdown('clients')}
                className={`relative flex items-center py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg ${
                  openDesktopDropdown === 'clients' || isClientsActive
                    ? 'text-amber-400 font-bold' 
                    : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
                }`}
              >
                <span>{t('nav.clientsTrust')}</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                  openDesktopDropdown === 'clients' ? 'rotate-180 text-amber-400' : 'text-slate-400 group-hover:text-amber-300'
                }`} />
                {(openDesktopDropdown === 'clients' || isClientsActive) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                )}
              </button>

              <div className={`absolute left-0 top-full pt-2.5 w-72 z-50 transition-all duration-200 ease-out origin-top ${
                openDesktopDropdown === 'clients'
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                  : 'opacity-0 translate-y-1 scale-95 pointer-events-none invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto group-hover:visible'
              }`}>
                <div className="apple-glass-card rounded-2xl p-2 space-y-0.5">
                  <Link 
                    to="/clients" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.corporateClients')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.corporateClientsSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/recommendations" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.recommendations')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.recommendationsSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/sectors" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.industrySectors')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.industrySectorsSub')}
                    </span>
                  </Link>
                  <Link 
                    to="/gallery" 
                    onClick={closeAll}
                    className="group/item block px-3 py-2.5 rounded-xl hover:bg-slate-900/[0.05] active:bg-slate-900/[0.08] transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900 text-sm font-semibold group-hover/item:text-amber-600 transition-colors">
                        {t('nav.gallery')}
                      </strong>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                      {t('nav.gallerySub')}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Career */}
            <Link 
              to="/career" 
              onClick={closeAll}
              className={`relative py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg flex items-center ${
                location.pathname === '/career' 
                  ? 'text-amber-400 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
              }`}
            >
              <span>{t('nav.career')}</span>
              {location.pathname === '/career' && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              )}
            </Link>

            {/* Contact */}
            <Link 
              to="/contact" 
              onClick={closeAll}
              className={`relative py-2 px-3 text-sm font-semibold transition-all duration-150 rounded-lg flex items-center ${
                location.pathname === '/contact' 
                  ? 'text-amber-400 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/[0.04]'
              }`}
            >
              <span>{t('nav.contact')}</span>
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              )}
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link 
              to="/hire-guard" 
              onClick={closeAll}
              className="relative inline-flex items-center justify-center px-4 py-2.5 text-xs md:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-300/60"
            >
              <Shield className="w-4 h-4 mr-1.5 text-slate-950" />
              <span>{t('nav.hireGuardBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-950" />
            </Link>
          </div>

          {/* Mobile menu button and quick lang toggle */}
          <div className="lg:hidden flex items-center space-x-1.5 shrink-0">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-[11px] font-bold bg-white/10 hover:bg-white/20 text-amber-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="Change Language / ভাষা পরিবর্তন"
            >
              {isBn ? 'EN' : 'বাং'}
            </button>
            <Link 
              to="/hire-guard"
              onClick={closeAll}
              className="px-2.5 py-1 text-[11px] font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-lg shadow-sm"
            >
              {isBn ? 'নিয়োগ' : 'Hire'}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none border border-slate-700/60"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a192f] border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
            <div className="py-2 border-b border-slate-800 flex justify-between items-center text-xs text-amber-400">
              <span className="flex items-center font-bold">
                <Phone className="w-3.5 h-3.5 mr-1" />
                {t('topBar.hotline')} {currentHotline}
              </span>
              <button
                onClick={toggleLanguage}
                className="text-xs bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded font-bold border border-amber-400/40"
              >
                {isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
              </button>
            </div>

            <Link to="/" onClick={closeAll} className="block py-2 text-white font-medium">{t('nav.home')}</Link>
            
            {/* Mobile Who We Are */}
            <div>
              <button 
                type="button"
                onClick={() => toggleMobileDropdown('who')}
                className="w-full flex justify-between items-center py-2 text-white font-medium"
              >
                <span>{t('nav.whoWeAre')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'who' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {activeDropdown === 'who' && (
                <div className="pl-4 space-y-1.5 py-1 text-sm text-slate-300 bg-white/5 rounded p-2 border border-slate-700">
                  <Link to="/about" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.companyProfile')}</Link>
                  <Link to="/leadership" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.mdLeadership')}</Link>
                  <Link to="/organogram" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.organogram')}</Link>
                  <Link to="/licenses" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.licenses')}</Link>
                  <Link to="/training" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.training')}</Link>
                </div>
              )}
            </div>

            {/* Mobile Services */}
            <div>
              <button 
                type="button"
                onClick={() => toggleMobileDropdown('services')}
                className="w-full flex justify-between items-center py-2 text-white font-medium"
              >
                <span>{t('nav.whatWeDo')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {activeDropdown === 'services' && (
                <div className="pl-4 space-y-1.5 py-1 text-sm text-slate-300 bg-white/5 rounded p-2 border border-slate-700">
                  <Link to="/services" onClick={closeAll} className="block py-1 text-amber-400 font-semibold">{t('nav.viewAllServices')}</Link>
                  <Link to="/services/manned-guarding" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.mannedGuarding')}</Link>
                  <Link to="/services/vip-protection" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.vipProtection')}</Link>
                  <Link to="/services/cash-transit" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.cashTransit')}</Link>
                  <Link to="/services/cleaning-facility" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.cleaningFacility')}</Link>
                  <Link to="/services/event-security" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.eventSecurity')}</Link>
                  <Link to="/services/electronic-security" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.electronicSecurity')}</Link>
                </div>
              )}
            </div>

            {/* Mobile Pricing & Requisition */}
            <div>
              <button 
                type="button"
                onClick={() => toggleMobileDropdown('pricing')}
                className="w-full flex justify-between items-center py-2 text-white font-medium"
              >
                <span>{t('nav.hireRates')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'pricing' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {activeDropdown === 'pricing' && (
                <div className="pl-4 space-y-1.5 py-1 text-sm text-slate-300 bg-white/5 rounded p-2 border border-slate-700">
                  <Link to="/hire-guard" onClick={closeAll} className="block py-1 text-amber-300 font-bold">{t('nav.guardCalculator')}</Link>
                  <Link to="/pricing" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.officialRateChart')}</Link>
                </div>
              )}
            </div>

            {/* Mobile Clients */}
            <div>
              <button 
                type="button"
                onClick={() => toggleMobileDropdown('clients')}
                className="w-full flex justify-between items-center py-2 text-white font-medium"
              >
                <span>{t('nav.clientsTrust')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'clients' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {activeDropdown === 'clients' && (
                <div className="pl-4 space-y-1.5 py-1 text-sm text-slate-300 bg-white/5 rounded p-2 border border-slate-700">
                  <Link to="/clients" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.corporateClients')}</Link>
                  <Link to="/recommendations" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.recommendations')}</Link>
                  <Link to="/sectors" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.industrySectors')}</Link>
                  <Link to="/gallery" onClick={closeAll} className="block py-1 hover:text-amber-400">{t('nav.gallery')}</Link>
                </div>
              )}
            </div>

            <Link to="/career" onClick={closeAll} className="block py-2 text-white font-medium">{t('nav.career')}</Link>
            <Link to="/contact" onClick={closeAll} className="block py-2 text-white font-medium">{t('nav.contact')}</Link>

            <div className="pt-3">
              <Link 
                to="/hire-guard" 
                onClick={closeAll}
                className="w-full flex items-center justify-center py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-lg text-sm shadow-lg"
              >
                <Shield className="w-4 h-4 mr-1.5" />
                {t('nav.hireGuardBtn')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}