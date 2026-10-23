import React, { useState, useRef, useEffect } from 'react';
import { 
  Calculator, Shield, CheckCircle, Phone, Building, 
  User, MapPin, Calendar, Clock, DollarSign, MessageCircle, AlertCircle,
  ChevronDown, Search, Check, X, Sparkles, Filter
} from 'lucide-react';
import { officialRateChart, companyInfo } from '../data/companyData';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

// Role translation dictionary for native Bengali experience
const roleBnMap = {
  1: { role: "সিকিউরিটি ইন্সপেক্টর", category: "সিকিউরিটি অফিসার", desc: "সামগ্রিক পেরিমিটার কমান্ডের জন্য সিনিয়র প্রাক্তন প্রতিরক্ষা/পুলিশ কর্মকর্তা" },
  2: { role: "সিকিউরিটি অফিসার", category: "সিকিউরিটি অফিসার", desc: "কৌশলগত গার্ড পোস্ট তদারকিকারী কমিশনপ্রাপ্ত কর্মকর্তা" },
  3: { role: "সিকিউরিটি ইন-চার্জ", category: "সিকিউরিটি ইন-চার্জ", desc: "অন-সাইট শিফট সমন্বয়কারী ও দৈনিক অপারেশন প্রধান" },
  4: { role: "সিকিউরিটি সুপারভাইজার", category: "সুপারভাইজার", desc: "গার্ড ড্রিল, উপস্থিতি ও রেজিস্ট্রি লগবুক তদারকিকারী ফিল্ড সুপারভাইজার" },
  5: { role: "সিকিউরিটি গার্ড (পুরুষ)", category: "সাধারণ গার্ড ফোর্স", desc: "স্ট্যান্ডার্ড ফিজিক্যাল গার্ড, উচ্চতা ৫'৬\"+, শতভাগ যাচাইকৃত ব্যাকগ্রাউন্ড" },
  6: { role: "সিকিউরিটি গার্ড (মহিলা)", category: "সাধারণ গার্ড ফোর্স", desc: "কর্পোরেট অফিস, শপিং মল ও শিক্ষা প্রতিষ্ঠানের জন্য প্রশিক্ষিত মহিলা গার্ড" },
  7: { role: "গানম্যান (লাইসেন্সকৃত অস্ত্রসহ)", category: "সশস্ত্র গানম্যান", desc: "ব্যাংক, জুয়েলারি ও ক্যাশ ট্রানজিটের জন্য সরকারি অনুমোদিত অস্ত্রধারী শুটার" },
  8: { role: "ভিআইপি বডিগার্ড (অস্ত্রসহ)", category: "ভিআইপি প্রটেকশন", desc: "ভিআইপি ও এক্সিকিউটিভদের নিবিড় নিরাপত্তার জন্য লাইসেন্সকৃত অস্ত্রধারী স্পেশাল ফোর্স" },
  9: { role: "ভিআইপি বডিগার্ড (অস্ত্রবিহীন)", category: "ভিআইপি প্রটেকশন", desc: "মার্শাল আর্ট ও ক্লোজ প্রোটেকশনে অভিজ্ঞ বাউন্সার ও পার্সোনাল এসকর্ট" },
  10: { role: "ক্লিনিং ইন-চার্জ", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "স্যনিটেশন, হাউসকিপিং ও ডিপ ক্লিনিং টিম প্রধান" },
  11: { role: "ক্লিনিং সুপারভাইজার", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "কর্পোরেট ফ্লোর ও শপিং মলের ক্লিনিং তদারকিকারী সুপারভাইজার" },
  12: { role: "ক্লিনার (পুরুষ)", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "ফ্লোর সুইপিং, ডাস্টিং ও বাণিজ্যিক প্রতিষ্ঠান পরিচ্ছন্নতাকর্মী" },
  13: { role: "ক্লিনার (মহিলা)", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "ইনডোর অফিস কেবিন ও স্যানিটারি রক্ষণাবেক্ষণ কর্মী" },
  14: { role: "পেশাদার চালক / ড্রাইভার", category: "লজিস্টিকস ও ড্রাইভার", desc: "বিআরটিএ লাইসেন্সপ্রাপ্ত ও ভিআইপি কর্পোরেট গাড়ি চালক" },
  15: { role: "কম্পিউটার অপারেটর", category: "কর্পোরেট সাপোর্ট", desc: "দর্শনার্থী এন্ট্রি, সিসিটিভি মনিটরিং ও ফ্রন্ট ডেস্ক ডেটা এন্ট্রি অপারেটর" },
  16: { role: "ফ্রন্ট ডেস্ক রিসেপশনিস্ট", category: "কর্পোরেট সাপোর্ট", desc: "স্মার্ট কর্পোরেট রিসেপশন ও ক্লায়েন্ট অ্যাক্সেস কন্ট্রোল অফিসার" },
  17: { role: "হেল্প ডেস্ক অফিসার", category: "কর্পোরেট সাপোর্ট", desc: "কাস্টমার সাপোর্ট ও ফ্যাসিলিটি সমন্বয়কারী" },
  18: { role: "প্লাম্বার", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "স্যানিটেশন, ওয়াটার পাম্প ও পাইপলাইন মেরামত টেকনিশিয়ান" },
  19: { role: "কার পেইন্টার", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "অটোমোবাইল কোটিং, ডেন্টিং ও পেইন্ট স্পেশালিস্ট" },
  20: { role: "ল্যান্ডস্কেপ মালি", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "কর্পোরেট বাগান ও গ্রিন ল্যান্ডস্কেপ রক্ষণাবেক্ষণ মালি" },
  21: { role: "লিফট অপারেটর", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "কমার্শিয়াল টাওয়ার লিফট অপারেটর ও জরুরি সহকারী" },
  22: { role: "বিল্ডিং কেয়ারটেকার", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "আবাসিক ভবনের সার্বিক নিরাপত্তা ও চাবি রক্ষক" },
  23: { role: "ওয়ার্ড বয় / লেডি", category: "হসপিটালিটি ও হেলথকেয়ার", desc: "হাসপাতালের রোগী সেবা, হুইলচেয়ার ও ক্লিনিক্যাল সহকারী" }
};

export default function QuoteCalculator() {
  const { isBn, t } = useLanguage();
  const { rates } = useSiteData();
  const activeRateChart = Array.isArray(rates) && rates.length > 0 ? rates : officialRateChart;

  const [selectedRoleId, setSelectedRoleId] = useState(5); // Default to Security Guard (Male)
  const [shift, setShift] = useState('12h'); // Default to 12 Hours
  const [quantity, setQuantity] = useState(2);
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedRole = activeRateChart.find(r => r.id === Number(selectedRoleId)) || activeRateChart[4];

  // Dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const dropdownRef = useRef(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Categories definition
  const filterCategories = [
    { id: 'all', en: 'All Roles (23)', bn: 'সব পদবি (২৩)' },
    { id: 'security', en: 'Security Guards', bn: 'সিকিউরিটি গার্ড' },
    { id: 'armed_vip', en: 'Armed & VIP', bn: 'গানম্যান ও ভিআইপি' },
    { id: 'facility', en: 'Cleaning & Facility', bn: 'ক্লিনিং ও সার্ভিস' },
    { id: 'corporate_utility', en: 'Corporate & Tech', bn: 'কর্পোরেট ও টেকনিক্যাল' },
  ];

  const matchesCategory = (item, catId) => {
    if (catId === 'all') return true;
    if (catId === 'security') {
      return ['Security Officers', 'Security In-charge', 'Supervisors', 'Manned Guards'].includes(item.category);
    }
    if (catId === 'armed_vip') {
      return ['Armed Force', 'Executive Protection'].includes(item.category);
    }
    if (catId === 'facility') {
      return ['Facility Support'].includes(item.category);
    }
    if (catId === 'corporate_utility') {
      return ['Logistics & Fleet', 'Corporate Support', 'Utility & Maintenance', 'Hospitality & Care'].includes(item.category);
    }
    return true;
  };

  const filteredRoles = activeRateChart.filter(item => {
    const matchesCat = matchesCategory(item, activeCategory);
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const rBn = roleBnMap[item.id] || {};
    return (
      item.role.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (rBn.role && rBn.role.toLowerCase().includes(q)) ||
      (rBn.category && rBn.category.toLowerCase().includes(q)) ||
      (rBn.desc && rBn.desc.toLowerCase().includes(q))
    );
  });

  // Calculate rate based on shift
  let unitRate = 0;
  if (shift === '8h') {
    unitRate = selectedRole.rate8h || (selectedRole.rate12h ? Math.round(selectedRole.rate12h * 0.75) : 15000);
  } else {
    unitRate = selectedRole.rate12h || (selectedRole.rate8h ? Math.round(selectedRole.rate8h * 1.35) : 18000);
  }

  const monthlyTotal = unitRate * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !clientName) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে কোম্পানি/প্রতিষ্ঠানের নাম এবং মোবাইল নম্বর দিন।' : 'Please enter company/client name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const requisitionData = {
      clientName,
      contactPerson,
      phone,
      address,
      notes,
      role: selectedRole.role,
      category: selectedRole.category,
      shift: shift === '8h' ? '8 Hours Shift' : '12 Hours Shift',
      quantity: Number(quantity),
      unitRate,
      monthlyTotal,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      try {
        await addDoc(collection(db, 'requisitions'), {
          ...requisitionData,
          serverTime: serverTimestamp()
        });
      } catch (fbErr) {
        console.warn('Firestore notice (falling back to local cache):', fbErr);
      }

      const existing = JSON.parse(localStorage.getItem('brslsl_requisitions') || '[]');
      existing.unshift({ ...requisitionData, id: 'REQ-' + Date.now() });
      localStorage.setItem('brslsl_requisitions', JSON.stringify(existing));

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not submit requisition. Please contact our hotline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessage = () => {
    const text = `*New Guard Requisition Request - BRSLSL*\n` +
      `🏢 *Company:* ${clientName || 'N/A'}\n` +
      `👤 *Contact:* ${contactPerson || 'N/A'}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📍 *Location:* ${address || 'Dhaka'}\n` +
      `🛡️ *Role:* ${selectedRole.role}\n` +
      `⏱️ *Shift:* ${shift === '8h' ? '8 Hours' : '12 Hours'}\n` +
      `👥 *Guards Required:* ${quantity}\n` +
      `💰 *Estimated Monthly Total:* ৳${monthlyTotal.toLocaleString()}/-\n\n` +
      `Please provide formal proposal & agreement copy.`;
    return encodeURIComponent(text);
  };

  const selectedRoleName = isBn ? (roleBnMap[selectedRole.id]?.role || selectedRole.role) : selectedRole.role;
  const selectedRoleCategory = isBn ? (roleBnMap[selectedRole.id]?.category || selectedRole.category) : selectedRole.category;
  const selectedRoleDesc = isBn ? (roleBnMap[selectedRole.id]?.desc || selectedRole.description) : selectedRole.description;

  return (
    <div id="calculator-section" className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            <span>{t('calculator.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('calculator.title')}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {t('calculator.subtitle')}
          </p>
        </div>

        {isSuccess ? (
          <div className="max-w-2xl mx-auto bg-white border-2 border-emerald-500 rounded-3xl p-8 text-center shadow-xl space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{t('calculator.successTitle')}</h3>
              <p className="text-slate-600 text-sm mt-2">
                {isBn ? 'ধন্যবাদ, ' : 'Thank you, '}
                <strong className="text-slate-900">{contactPerson || clientName}</strong>. 
                {isBn 
                  ? ` আমাদের অপারেশন কমান্ড সেল আপনার ${quantity}x ${selectedRoleName} (${shift === '8h' ? '৮ ঘণ্টা' : '১২ ঘণ্টা'}) রিকুইজিশনটি গ্রহণ করেছে।` 
                  : ` Our Operations Command Cell has received your requirement for ${quantity}x ${selectedRole.role} (${shift === '8h' ? '8 Hours' : '12 Hours'}).`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {isBn ? 'আনুমানিক মাসিক বিল: ' : 'Estimated Monthly Budget: '}
                <strong className="text-emerald-600 font-bold text-base">৳{monthlyTotal.toLocaleString()}/-</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/8801604022929?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('calculator.whatsappDirect')}
              </a>
              <button
                onClick={() => setIsSuccess(false)}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all"
              >
                {t('calculator.anotherPackage')}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Selection Controls (Clean Light Card) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Step 1: Luxury Custom White Role Selector */}
              <div ref={dropdownRef} className="relative z-30">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t('calculator.step1')}
                  </label>
                  <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full flex items-center shadow-2xs">
                    <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
                    {isBn ? '২৩টি অফিশিয়াল অনুমোদিত পদবি' : '23 Approved Roles'}
                  </span>
                </div>

                {/* Custom Trigger Card */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  className={`w-full text-left bg-white border-2 rounded-2xl p-3.5 sm:p-4 transition-all duration-200 flex items-center justify-between gap-3 shadow-xs ${
                    isDropdownOpen 
                      ? 'border-amber-500 ring-4 ring-amber-500/10 shadow-lg' 
                      : 'border-slate-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/70 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
                      <Shield className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                          {selectedRoleName}
                        </span>
                        <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                          {selectedRoleCategory}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {selectedRoleDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {isBn ? 'মাসিক রেট' : 'Monthly Rate'}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                        ৳{unitRate.toLocaleString()}/-
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 bg-amber-100 text-amber-900 shadow-xs' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Ultra-Luxury White Popover Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border-2 border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* Popover Header: Search + Category Filters */}
                    <div className="p-3 bg-slate-50/95 border-b border-slate-200 backdrop-blur-md space-y-2.5">
                      
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="text"
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={isBn ? "পদবি বা সেবা খুঁজুন (যেমন: গার্ড, গানম্যান, ড্রাইভার)..." : "Search role or service (e.g., guard, gunman, driver)..."}
                          className="w-full pl-9 pr-9 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 shadow-xs transition-all"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Category Pills Strip */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
                        {filterCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                              activeCategory === cat.id
                                ? 'bg-amber-500 text-slate-950 shadow-xs'
                                : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                            }`}
                          >
                            {isBn ? cat.bn : cat.en}
                          </button>
                        ))}
                      </div>

                    </div>

                    {/* Roles List */}
                    <div className="max-h-80 overflow-y-auto p-2 space-y-1.5 [scrollbar-width:thin]">
                      {filteredRoles.length === 0 ? (
                        <div className="py-12 text-center space-y-2">
                          <p className="text-slate-500 text-sm font-semibold">
                            {isBn ? 'কোনো পদবি খুঁজে পাওয়া যায়নি' : 'No matching roles found'}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {isBn ? 'ভিন্ন কোনো নাম লিখে অনুসন্ধান করুন' : 'Try searching with a different keyword'}
                          </p>
                        </div>
                      ) : (
                        filteredRoles.map((item) => {
                          const isSelected = item.id === Number(selectedRoleId);
                          const rName = isBn ? (roleBnMap[item.id]?.role || item.role) : item.role;
                          const rCat = isBn ? (roleBnMap[item.id]?.category || item.category) : item.category;
                          const rDesc = isBn ? (roleBnMap[item.id]?.desc || item.description) : item.description;

                          // Rate preview for list item
                          let ratePreview = '';
                          if (item.rate8h && item.rate12h) {
                            ratePreview = `৳${item.rate8h.toLocaleString()} - ৳${item.rate12h.toLocaleString()}`;
                          } else if (item.rate12h) {
                            ratePreview = `৳${item.rate12h.toLocaleString()}/মাস (১২ঘ)`;
                          } else if (item.rate8h) {
                            ratePreview = `৳${item.rate8h.toLocaleString()}/মাস (৮ঘ)`;
                          }

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setSelectedRoleId(item.id);
                                setIsDropdownOpen(false);
                                setSearchQuery('');
                              }}
                              className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-start justify-between gap-3 border ${
                                isSelected
                                  ? 'bg-amber-50/90 border-amber-400 shadow-xs ring-1 ring-amber-400/30'
                                  : 'bg-white hover:bg-slate-50/90 border-transparent hover:border-slate-200'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                  <span className={`text-xs sm:text-sm font-bold ${
                                    isSelected ? 'text-amber-950 font-extrabold' : 'text-slate-900'
                                  }`}>
                                    {rName}
                                  </span>
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                    isSelected 
                                      ? 'bg-amber-100 text-amber-900 border-amber-300' 
                                      : 'bg-slate-100 text-slate-600 border-slate-200'
                                  }`}>
                                    {rCat}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                                  {rDesc}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 pt-0.5">
                                {ratePreview && (
                                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                                    {ratePreview}
                                  </span>
                                )}
                                {isSelected ? (
                                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full border border-slate-200 shrink-0" />
                                )}
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Popover Footer Info */}
                    <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                      <span className="font-medium">
                        {isBn ? `${filteredRoles.length}টি পদবি উপলভ্য` : `${filteredRoles.length} roles available`}
                      </span>
                      <span className="text-amber-800 font-semibold">
                        {isBn ? 'অফিসিয়াল কর্পোরেট রেট চার্ট (পৃষ্ঠা ১৫)' : 'Official Proposal Rate Chart (Pg 15)'}
                      </span>
                    </div>

                  </div>
                )}
              </div>

              {/* Shift Duration Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  {t('calculator.step2')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShift('8h')}
                    className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-center space-x-2.5 ${
                      shift === '8h'
                        ? 'bg-amber-50/80 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className={`w-4 h-4 ${shift === '8h' ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{t('calculator.shift8')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShift('12h')}
                    className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-center space-x-2.5 relative ${
                      shift === '12h'
                        ? 'bg-amber-50/80 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className={`w-4 h-4 ${shift === '12h' ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{t('calculator.shift12')}</span>
                    <span className="absolute -top-2.5 right-3 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                      {isBn ? 'জনপ্রিয়' : 'Popular'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Guard Quantity Slider & Buttons */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t('calculator.step3')}
                  </label>
                  <span className="text-slate-900 font-extrabold text-sm sm:text-base bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-300 shadow-xs">
                    {quantity} {t('calculator.personnel')}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {[1, 2, 4, 6, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuantity(num)}
                      className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all border ${
                        quantity === num 
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {num} {isBn ? 'জন' : (num === 1 ? 'Guard' : 'Guards')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Requisition Form Fields */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="text-slate-900 text-sm font-bold flex items-center">
                  <Building className="w-4 h-4 mr-2 text-amber-600" />
                  {t('calculator.enterpriseDetails')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calculator.companyName')}</label>
                    <input
                      type="text"
                      placeholder={t('calculator.companyPlaceholder')}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 shadow-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calculator.contactPerson')}</label>
                    <input
                      type="text"
                      placeholder={t('calculator.contactPlaceholder')}
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 shadow-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calculator.phone')}</label>
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 shadow-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calculator.location')}</label>
                    <input
                      type="text"
                      placeholder={t('calculator.locationPlaceholder')}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 shadow-xs transition-all"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-600 text-xs flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    {errorMsg}
                  </p>
                )}
              </div>

            </div>

            {/* Right 5 Columns: Executive Navy Budget Summary */}
            <div className="lg:col-span-5 bg-[#0a192f] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white">
              
              <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {t('calculator.summaryTitle')}
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                  {t('calculator.officialBadge')}
                </span>
              </div>

              {/* Selected Specs */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>{t('calculator.selectedRole')}</span>
                  <strong className="text-white">{selectedRoleName}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{t('calculator.shiftDuration')}</span>
                  <strong className="text-white">{shift === '8h' ? (isBn ? '০৮ ঘণ্টা সাধারণ শিফট' : '08 Hours Daily') : (isBn ? '১২ ঘণ্টা স্ট্যান্ডার্ড শিফট' : '12 Hours Daily')}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{t('calculator.forceStrength')}</span>
                  <strong className="text-amber-400">{quantity} {t('calculator.personnel')}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{t('calculator.ratePerPerson')}</span>
                  <strong className="text-white">৳{unitRate.toLocaleString()}/-</strong>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-[#050d1a] p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 uppercase">{t('calculator.estimatedTotal')}</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                      ৳{monthlyTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{t('calculator.withoutVat')}</span>
                  </div>
                </div>
              </div>

              {/* Official Terms from PDF Page 15 */}
              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <strong className="text-slate-200 block font-semibold text-xs">
                  {t('calculator.termsTitle')}
                </strong>
                <p>{t('calculator.term1')}</p>
                <p>{t('calculator.term2')}</p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg text-sm flex items-center justify-center transition-all disabled:opacity-50"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  <span>{isSubmitting ? t('calculator.submitting') : t('calculator.submitBtn')}</span>
                </button>

                <a
                  href={`https://wa.me/8801604022929?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#112240] hover:bg-[#1a365d] text-emerald-400 hover:text-emerald-300 font-bold rounded-xl border border-emerald-500/30 text-xs sm:text-sm flex items-center justify-center transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>{t('calculator.whatsappDirect')}</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
