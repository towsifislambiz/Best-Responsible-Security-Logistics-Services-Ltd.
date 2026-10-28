import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, ShieldCheck, Award, Users, Building, Phone, 
  ArrowRight, CheckCircle2, Star, Clock, Target, Sparkles, 
  Truck, Video, FileText, ChevronRight, MessageCircle
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import QuoteCalculator from '../components/QuoteCalculator';
import { companyInfo, servicesList, clientSectors, galleryPhotos } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

export default function HomePage() {
  const { isBn, t } = useLanguage();
  const { clients: liveClients, siteSettings } = useSiteData();
  const currentHotline = siteSettings?.hotline || companyInfo.contacts.hotline;
  const allClients = (Array.isArray(liveClients) && liveClients.length > 0)
    ? liveClients
    : clientSectors.flatMap(s => s.clients);

  const [selectedClientCategory, setSelectedClientCategory] = useState('all');

  const clientCategoryTabs = [
    { id: 'all', en: 'All 70+ Clients', bn: 'সকল ৭০+ ক্লায়েন্ট' },
    { id: 'conglomerates', en: 'Conglomerates & Groups', bn: 'শিল্প ও বাণিজ্যিক গ্রুপ' },
    { id: 'healthcare', en: 'Hospitals & Care', bn: 'হাসপাতাল ও ডায়াগনস্টিক' },
    { id: 'realestate', en: 'Real Estate & Towers', bn: 'রিয়েল এস্টেট টাওয়ার' },
    { id: 'industrial', en: 'Textiles & Factories', bn: 'টেক্সটাইল ও কারখানা' },
  ];

  const getFilteredClients = () => {
    if (selectedClientCategory === 'all') return allClients.slice(0, 18);
    if (selectedClientCategory === 'conglomerates') {
      return allClients.filter(c => c.type.toLowerCase().includes('conglomerate') || c.name.toLowerCase().includes('group')).slice(0, 18);
    }
    if (selectedClientCategory === 'healthcare') {
      return allClients.filter(c => c.type.toLowerCase().includes('hospital') || c.type.toLowerCase().includes('care') || c.type.toLowerCase().includes('diagnostic')).slice(0, 18);
    }
    if (selectedClientCategory === 'realestate') {
      return allClients.filter(c => c.type.toLowerCase().includes('real estate') || c.type.toLowerCase().includes('infrastructure') || c.name.toLowerCase().includes('builder')).slice(0, 18);
    }
    if (selectedClientCategory === 'industrial') {
      return allClients.filter(c => c.type.toLowerCase().includes('textile') || c.type.toLowerCase().includes('manufacturing') || c.type.toLowerCase().includes('steel') || c.type.toLowerCase().includes('industrial')).slice(0, 18);
    }
    return allClients.slice(0, 18);
  };

  const getClientMonogram = (name) => {
    const clean = name.replace(/(Group|Ltd|Limited|Hospital|Center|Diagnostic|Enterprise|Commercial)/gi, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase() || 'BR';
  };

  return (
    <div className="bg-white text-slate-800 font-sans">
      
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Quick Requisition Strip */}
      <div className="bg-amber-50 border-y border-amber-200 py-3.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-lg shadow-sm">
              <ShieldCheck className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">
                {isBn ? 'জরুরি ২-৪ ঘণ্টার মধ্যে গার্ড প্রয়োজন?' : 'Need Guards within 2-4 Hours?'}
              </p>
              <p className="text-xs text-slate-600">
                {isBn 
                  ? 'আমাদের ২৪/৭ জরুরি রেসপন্স সেল সারা দেশে প্রস্তুত রয়েছে।' 
                  : 'Our 24/7 Rapid Response Cell is on standby nationwide.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-4 w-full md:w-auto">
            <a 
              href={`tel:${currentHotline}`} 
              className="text-amber-800 font-bold text-xs sm:text-sm hover:underline flex items-center"
            >
              <Phone className="w-4 h-4 mr-1 text-amber-600 animate-pulse shrink-0" />
              <span>{isBn ? 'হটলাইন:' : 'Hotline:'} {currentHotline}</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link 
              to="/hire-guard" 
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center shadow-sm shrink-0"
            >
              <span>{isBn ? 'তাৎক্ষণিক রিকুইজিশন' : 'Instant Requisition'}</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Company Introduction & MD Spotlight */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Real Force Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl">
              <img 
                src="/assets/logo (8).webp" 
                alt="Elite Security Guards" 
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                    MD
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">
                      {isBn ? 'মো. রাজু আহমেদ' : 'Md. Raju Ahmed'}
                    </h4>
                    <p className="text-amber-700 text-xs font-semibold">
                      {isBn ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক (Owner & MD)' : 'Founder & Managing Director, BRSLSL'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute top-3 right-3 sm:-top-4 sm:-right-4 bg-[#0a192f] text-white p-3 sm:p-4 rounded-2xl shadow-xl font-extrabold text-center border-2 border-amber-400 z-10">
              <span className="block text-xl sm:text-2xl font-black text-amber-400">2021</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider block text-slate-300">
                {isBn ? 'আস্থার পথচলা' : 'Serving Trust'}
              </span>
            </div>
          </div>

          {/* Right Column: Story & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-blue-700" />
              <span>{isBn ? 'আমাদের পরিচিতি ও অঙ্গীকার' : 'Who We Are & What Drives Us'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isBn 
                ? 'বাংলাদেশের শিল্পপ্রতিষ্ঠান ও কর্পোরেট সুরক্ষায় সুশৃঙ্খল গার্ড বাহিনী' 
                : "A High-Discipline Security Force Safeguarding Bangladesh's Industry"}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>{isBn ? 'বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লি.' : 'Best Responsible Security & Logistics Services Ltd.'}</strong> {isBn 
                ? 'দেশের অন্যতম দ্রুত বর্ধনশীল প্রাইভেট সিকিউরিটি প্রতিষ্ঠান। কোম্পানিজ অ্যাক্ট অনুযায়ী প্রতিষ্ঠিত এবং রেজিস্ট্রার অব জয়েন্ট স্টক কোম্পানিজ (RJSC) সনদপ্রাপ্ত প্রতিষ্ঠান হিসেবে আমরা দেশের শীর্ষস্থানীয় শিল্পপ্রতিষ্ঠান, গার্মেন্টস কারখানা, বাণিজ্যিক ভবন ও শপিং কমপ্লেক্সে সার্বক্ষণিক নিরাপত্তা সেবা দিয়ে আসছি।' 
                : 'is one of the nation’s fastest-growing private security firms. Established under the Companies Act and certified by the Registrar of Joint Stock Companies (RJSC), we provide end-to-end protective services to multinational conglomerates, export-oriented textile mills, premier real estate towers, and commercial retail chains.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-amber-400 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#0a192f] block">700+</span>
                <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                  {isBn ? 'প্রশিক্ষিত ফোর্স' : 'Trained Force'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-amber-400 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#0a192f] block">70+</span>
                <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                  {isBn ? 'কর্পোরেট ক্লায়েন্ট' : 'Corporate Clients'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-amber-400 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#0a192f] block">06</span>
                <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                  {isBn ? 'আঞ্চলিক অফিস হাব' : 'Regional Hubs'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-amber-400 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#0a192f] block">24/7</span>
                <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                  {isBn ? 'জরুরি মনিটরিং' : 'Patrol Monitoring'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isBn 
                    ? 'মোতায়েনের পূর্বে ১৪ দিনের নিবিড় শারীরিক মার্চপাস্ট, অগ্নিনির্বাপণ ও অ্যান্টি-থেফ্ট প্রশিক্ষণ।' 
                    : 'Mandatory 2-week parade, fire-fighting, and anti-theft drills before deployment.'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isBn 
                    ? 'কোনো প্রকার গোপন চার্জ ছাড়া সম্পূর্ণ স্বচ্ছ ও নির্ধারিত সরকারি রেট চার্ট।' 
                    : 'Transparent official rate chart with zero hidden commissions.'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isBn 
                    ? 'প্রাক্তন সামরিক ও পুলিশ অফিসারদের তত্ত্বাবধানে সার্বক্ষণিক সুপারভিশন ও সারপ্রাইজ নাইট ভিজিট।' 
                    : 'Ex-defense officer supervision & routine perimeter spot-checks.'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link 
                to="/about"
                className="px-5 py-2.5 bg-[#0a192f] hover:bg-[#112240] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md flex items-center"
              >
                <span>{isBn ? 'সম্পূর্ণ কোম্পানি প্রোফাইল পড়ুন' : 'Read Full Company Profile'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                to="/licenses"
                className="px-5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-xl text-xs sm:text-sm transition-colors border border-amber-300 flex items-center"
              >
                <span>{isBn ? 'সরকারি লাইসেন্সসমূহ দেখুন' : 'View Legal Licenses'}</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Core Services Showcase (7 Pillars) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-2">
                {isBn ? 'ট্যাকটিক্যাল সিকিউরিটি সলিউশন' : 'Tailored Tactical Solutions'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {isBn ? 'আমাদের বিশেষায়িত সিকিউরিটি ও লজিস্টিকস সেবাসমূহ' : 'Our Comprehensive Security & Logistics Services'}
              </h2>
            </div>
            <Link 
              to="/services" 
              className="mt-4 md:mt-0 text-amber-700 hover:text-amber-800 text-sm font-bold flex items-center"
            >
              <span>{isBn ? 'সকল ৭টি সেবা দেখুন' : 'Explore All 7 Services'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.slice(0, 6).map((service, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 overflow-hidden group shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Header with Badge */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {service.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {isBn ? service.banglaTitle : service.title}
                    </h3>
                    <p className="text-amber-700 text-xs font-semibold">
                      {isBn ? service.title : service.banglaTitle}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-slate-100">
                      {service.features.slice(0, 2).map((feat, fidx) => (
                        <div key={fidx} className="flex items-start text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center"
                  >
                    <span>{isBn ? 'বিস্তারিত জানুন' : 'View Specifications'}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  <Link 
                    to="/hire-guard"
                    className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold border border-amber-300 transition-colors"
                  >
                    {isBn ? 'গার্ড নিয়োগ' : 'Hire Service'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Real Field Deployments Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-2">
            {isBn ? 'বাস্তব ফিল্ড দৃশ্য ও প্যারেড' : 'Authentic Visual Proof'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? 'মাঠে ও ট্রেনিং ক্যাম্পে নিয়োজিত আমাদের সুশৃঙ্খল ফোর্স' : 'Our Force on Active Duty & Training Grounds'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            {isBn 
              ? 'আমানা বিগ বাজার, পোশাক কারখানা ও কর্পোরেট টাওয়ারে সক্রিয় ডিউটিরত গার্ডদের বাস্তব ছবি।' 
              : 'Real photos of our uniformed security force deployed at top corporate and retail clients like Amana Big Bazar.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryPhotos.slice(0, 8).map((photo, pidx) => (
            <div 
              key={pidx}
              className="relative rounded-2xl overflow-hidden group border border-slate-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-lg bg-slate-900"
            >
              <img 
                src={photo.src} 
                alt={photo.title} 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-3 left-3 right-3 text-xs">
                <span className="inline-block bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider mb-1">
                  {photo.category}
                </span>
                <p className="text-white font-bold leading-tight truncate">{photo.title}</p>
                <p className="text-slate-300 text-[10px] truncate">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/gallery" 
            className="inline-flex items-center px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 transition-colors shadow-sm"
          >
            <span>{isBn ? 'সকল ফিল্ড ছবি ও ভিডিও দেখুন' : 'View All Field Photos & Video Logs'}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* 6. Interactive Guard Budget & Requisition Calculator */}
      <QuoteCalculator />

      {/* 7. Corporate Clients Wall & Endorsements */}
      <section className="py-16 bg-[#f8fafc] border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-900 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? '৭০+ শীর্ষ জাতীয় প্রতিষ্ঠানের আস্থা' : 'Trusted by 70+ National Enterprises'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isBn ? 'আমাদের সম্মানিত ক্লায়েন্ট ও পার্টনারবৃন্দ' : 'Our Prestigious Client Portfolio'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {isBn 
                ? 'বাংলাদেশের স্বনামধন্য শিল্প গ্রুপ, হাসপাতাল, গার্মেন্টস ও রিয়েল এস্টেট টাওয়ারে নিশ্ছিদ্র নিরাপত্তা ও লজিস্টিকস সহায়তা প্রদান।' 
                : 'Providing specialized manned guarding, tactical fleet escort, and facility protection across Bangladesh’s top industrial groups.'}
            </p>
          </div>

          {/* 4-Pillar Trust Counter Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <strong className="text-xl sm:text-2xl font-black text-slate-900 block">70+</strong>
              <span className="text-[11px] text-slate-500 font-semibold">{isBn ? 'করপোরেট ক্লায়েন্ট' : 'Corporate Clients'}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <strong className="text-xl sm:text-2xl font-black text-amber-600 block">700+</strong>
              <span className="text-[11px] text-slate-500 font-semibold">{isBn ? 'সক্রিয় প্রশিক্ষিত গার্ড' : 'Active Trained Force'}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <strong className="text-xl sm:text-2xl font-black text-emerald-600 block">99.4%</strong>
              <span className="text-[11px] text-slate-500 font-semibold">{isBn ? 'ক্লায়েন্ট রিটেনশন রেট' : 'Client Retention Rate'}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <strong className="text-xl sm:text-2xl font-black text-blue-600 block">100%</strong>
              <span className="text-[11px] text-slate-500 font-semibold">{isBn ? 'পুলিশ ভেরিফাইড ব্যাকগ্রাউন্ড' : 'Police Vetted Security'}</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {clientCategoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedClientCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
                  selectedClientCategory === tab.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {isBn ? tab.bn : tab.en}
              </button>
            ))}
          </div>

          {/* Client Badges Grid (Luxury Monogram Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {getFilteredClients().map((client, cidx) => (
              <div 
                key={cidx}
                className="bg-white border-2 border-slate-200/90 hover:border-amber-400 p-4 sm:p-5 rounded-2xl text-center group transition-all duration-200 shadow-xs hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  {/* Monogram Emblem */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 border border-amber-200 text-amber-900 font-black text-sm flex items-center justify-center mx-auto shadow-2xs group-hover:scale-105 group-hover:border-amber-300 transition-all">
                    {getClientMonogram(client.name)}
                  </div>
                  
                  <div>
                    <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight truncate group-hover:text-amber-800 transition-colors">
                      {client.name}
                    </h4>
                    <span className="inline-block mt-1 bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200/70 truncate max-w-full">
                      {client.type}
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                  <span className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-wider">
                    {isBn ? 'সক্রিয় ডিউটি' : 'Active Duty'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link 
              to="/clients" 
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm rounded-xl border-2 border-slate-200 hover:border-amber-400 shadow-xs flex items-center justify-center transition-all"
            >
              <Users className="w-4 h-4 mr-2 text-amber-600" />
              <span>{isBn ? 'সম্পূর্ণ ৭০+ ক্লায়েন্ট তালিকা দেখুন' : 'View Full 70+ Client Directory'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
            </Link>

            <Link 
              to="/recommendations" 
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center transition-all"
            >
              <Award className="w-4 h-4 mr-2" />
              <span>{isBn ? 'অফিসিয়াল প্রশংসাপত্র ও চিঠি দেখুন' : 'View Scanned Recommendation Letters'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 7.5. Industry Authority & Google Ranking Highlight: Top 10 Security Agency in BD */}
      <section className="bg-gradient-to-r from-amber-500/15 via-white to-amber-500/10 border-y border-amber-300 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              ★
            </div>
            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full bg-amber-400/30 text-amber-900 font-mono text-[11px] font-bold uppercase tracking-wider">
                BANGLADESH PRIVATE SECURITY INDUSTRY REVIEW
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isBn ? "Top 10 Security Agency in BD (বাংলাদেশের সেরা ১০ সিকিউরিটি এজেন্সি)" : "Top 10 Security Agency in Bangladesh (2026 Ranking)"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {isBn 
                  ? "৭০০+ প্রশিক্ষিত ফোর্স, লাইসেন্সপ্রাপ্ত গানম্যান ও ৯৯.৪% ক্লায়েন্ট আস্থা নিয়ে বেস্ট রেসপনসিবল সিকিউরিটি শীর্ষ র‍্যাংকে অবস্থান করছে।" 
                  : "Ranked #1 Top Choice with 700+ police-vetted guards, licensed gunmen, and 99.4% client retention."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/top-10-security-agency-in-bangladesh"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>{isBn ? "টপ ১০ সিকিউরিটি র‍্যাংকিং দেখুন" : "View Top 10 Ranking & Review"}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Emergency Dial & Bottom Conversion Strip (Executive Navy) */}
      <section className="bg-[#0a192f] text-white py-14 px-4 border-t-2 border-amber-400">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-block p-3 rounded-full bg-amber-500/10 text-amber-400 ring-4 ring-amber-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {isBn 
              ? 'দেশের অন্যতম সেরা সিকিউরিটি ফোর্সের মাধ্যমে আপনার প্রতিষ্ঠানকে সুরক্ষিত করুন' 
              : "Secure Your Premises with Bangladesh's Elite Security Force"}
          </h2>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            {isBn 
              ? 'আপনার সাইটে ফ্রি সিকিউরিটি সার্ভে এবং ঝুঁকি মূল্যায়নের জন্য আজই আমাদের মিরপুর হেড অফিস বা উত্তরা কর্পোরেট সেন্টারে যোগাযোগ করুন।' 
              : 'Contact our Mirpur Head Office or Uttara Corporate Command Center today for a complimentary on-site security survey and industrial risk assessment.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 w-full max-w-md mx-auto">
            <a 
              href={`tel:${currentHotline}`}
              className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-center text-center"
            >
              <Phone className="w-4 h-4 mr-2 shrink-0" />
              <span className="truncate">{isBn ? 'হটলাইনে কল করুন:' : 'Call Hotline:'} {currentHotline}</span>
            </a>
            <Link 
              to="/contact"
              className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all text-center"
            >
              {isBn ? 'আঞ্চলিক অফিসসমূহের ঠিকানা' : 'Contact Regional Offices'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}