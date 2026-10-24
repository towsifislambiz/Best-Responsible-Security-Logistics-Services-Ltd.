import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Shield, CheckCircle2, Flame, HeartPulse, 
  Users, Target, ArrowRight, ShieldCheck, Dumbbell
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrainingPage() {
  const { isBn } = useLanguage();

  const syllabus = [
    { 
      title: isBn ? "শারীরিক কন্ডিশনিং ও মার্চপাস্ট ড্রিল" : "Physical Conditioning & Drill", 
      desc: isBn ? "সামরিক বাহিনীর অবসরপ্রাপ্ত প্রশিক্ষকদের তত্ত্বাবধানে প্রতিদিনের শারীরিক কসরত, দৌড়, স্যালুট শৃঙ্খলা ও ট্যাকটিক্যাল ফরমেশন ট্রেনিং।" : "Daily marching, endurance runs, salute discipline, and tactical formation drills supervised by retired defense instructors." 
    },
    { 
      title: isBn ? "ফায়ার সেফটি ও অগ্নিনির্বাপণ ব্যবস্থা" : "Fire Safety & Extinguisher Operation", 
      desc: isBn ? "CO2, ফোম ও ড্রাই কেমিক্যাল পাউডার এক্সটিংগুইশার সরাসরি চালনা, ফায়ার হাইড্রেন্ট সংযোগ ও জরুরি ভবন খালি করার প্র্যাকটিক্যাল ড্রিল।" : "Practical hands-on training with CO2, foam, and dry chemical powder extinguishers; fire hydrant connections and evacuation guides." 
    },
    { 
      title: isBn ? "প্রাথমিক চিকিৎসা ও সিপিআর লাইফ-সেভিং" : "First Aid & CPR Certification", 
      desc: isBn ? "জরুরি রক্তপাত বন্ধ, ফ্র্যাকচার ব্যান্ডেজ এবং ডাক্তার আসার পূর্ব পর্যন্ত কৃত্রিম শ্বাস-প্রশ্বাস (সিপিআর) প্রদানের সক্ষমতা।" : "Emergency life-saving response, wound dressing, fracture immobilization, and CPR until medical professionals arrive." 
    },
    { 
      title: isBn ? "ইলেকট্রনিক মেটাল ডিটেক্টর ও আর্চওয়ে স্ক্রিনিং" : "Electronic Access Control & Screening", 
      desc: isBn ? "ওয়াক-থ্রু মেটাল ডিটেক্টর, হ্যান্ডহেল্ড স্ক্যানার, গাড়ি তল্লাশি আয়না ও ডিজিটাল ভিজিটর লগবুক সঠিকভাবে পরিচালনা।" : "Operation of walk-through archway metal detectors, handheld scanners, under-vehicle search mirrors, and visitor logbooks." 
    },
    { 
      title: isBn ? "পেরিমিটার পেট্রোল ও অনুপ্রবেশকারী নিয়ন্ত্রণ" : "Perimeter Patrol & Intruder Interception", 
      desc: isBn ? "সীমানা প্রাচীর পর্যবেক্ষণ, অন্ধ স্পট চিহ্নিতকরণ, রাতের সতর্কতা ও অহিংস পদ্ধতিতে সন্দেহভাজন ব্যক্তিকে আটক রাখা।" : "Patrolling procedures, identifying perimeter blind spots, night alertness, and non-violent suspect detainment techniques." 
    },
    { 
      title: isBn ? "কর্পোরেট শিষ্টাচার ও বিনয়ী গ্রাহক সেবা" : "Customer Welcoming & Corporate Etiquette", 
      desc: isBn ? "বিনয়ী ও মার্জিত বাক্য বিনিময়, ভিআইপি অতিথিদের অভ্যর্থনা, ফ্রন্ট ডেস্ক প্রোটোকল ও জরুরি টেলিফোন যোগাযোগ দক্ষতা।" : "Respectful communication, handling VIP guests, front desk etiquette, and telephone communication." 
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{isBn ? "প্রশিক্ষণের মাধ্যমে শ্রেষ্ঠত্ব" : "Excellence Through Training"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "বিআরএসএলএসএল সিকিউরিটি ট্রেনিং একাডেমি" : "BRSLSL Security Training Academy"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "ক্লায়েন্ট সাইটে মোতায়েনের পূর্বে প্রতিটি গার্ড আমাদের ট্রেনিং একাডেমি থেকে বাধ্যতামূলক ১৪ দিনের নিবিড় শারীরিক, ট্যাকটিক্যাল ও ফায়ার সেফটি প্রশিক্ষণ সম্পন্ন করে।" 
              : "Every guard wearing the BRSLSL badge has graduated from our mandatory 2-week intensive physical, tactical, and fire safety drill curriculum before deploying to a client facility."}
          </p>
        </div>

        {/* Guard Selection Standards Grid (From PDF Page 5 & 10) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-1">
              {isBn ? "কঠোর নিয়োগ ফিল্টার" : "Rigorous Recruitment Filter"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isBn ? "গার্ডের শারীরিক মানদণ্ড ও যোগ্যতা" : "Guard Eligibility & Physical Benchmarks"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "উচ্চতার মানদণ্ড" : "Height Requirement"}
              </h4>
              <p className="text-[#0a192f] font-black text-xl">
                {isBn ? "ন্যূনতম ৫' ৫\"" : "Minimum 5' 5\""}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "প্রবেশদ্বারে ব্যক্তিত্বসম্পন্ন উপস্থিতি ও দৃঢ় মানসিকতার প্রতীক।" 
                  : "Commanding physical stature ensuring psychological deterrence at gates."}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "শিক্ষাগত যোগ্যতা" : "Education Standard"}
              </h4>
              <p className="text-[#0a192f] font-black text-xl">
                {isBn ? "৮ম শ্রেণি থেকে এইচএসসি" : "Class 8 to HSC"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "স্বাক্ষরজ্ঞানসম্পন্ন, রেজিস্ট্রি খাতা লেখা ও প্রাথমিক ইংরেজিতে পারদর্শী।" 
                  : "Literate, capable of reading visitor badges, writing entry logs, and basic English."}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "বয়সসীমা" : "Age Bracket"}
              </h4>
              <p className="text-[#0a192f] font-black text-xl">
                {isBn ? "২০ থেকে ৪৫ বছর" : "20 to 45 Years"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "শারীরিক সুস্থতার সনদপ্রাপ্ত কর্মক্ষম ও দায়িত্বশীল জনবল।" 
                  : "Peak physical and mental agility with medical fitness clearance certificate."}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "পুলিশ ভেরিফিকেশন" : "Police Clearance"}
              </h4>
              <p className="text-[#0a192f] font-black text-xl">
                {isBn ? "১০০% যাচাইকৃত" : "100% Vetted"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "স্থানীয় থানা ও এনআইডি বায়োমেট্রিক তথ্য যাচাইপূর্বক নিয়োগ।" 
                  : "Local police station verification, NID biometric check, and neighborhood inquiry."}
              </p>
            </div>

          </div>
        </div>

        {/* 2-Week Intensive Curriculum */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900">
              {isBn ? "১৪ দিনের নিবিড় প্রশিক্ষণ মডিউল" : "Curriculum Modules"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isBn 
                ? "সামরিক বাহিনীর অভিজ্ঞ অফিসারদের তৈরিকৃত সিলেবাস অনুযায়ী পরিচালিত।" 
                : "Developed by former Bangladesh Armed Forces officers to ensure military-grade precision in civilian security."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((mod, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <span>{isBn ? `মডিউল ০${idx + 1}` : `Module 0${idx + 1}`}</span>
                </div>
                <h4 className="text-slate-900 font-bold text-base">{mod.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Proof: Real Training Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <img src="/assets/Screenshot 2026-10-22 010044.webp" alt="Outdoor Guard Field Drill" className="w-full h-56 object-cover" />
            <div className="p-4 bg-white text-xs text-center font-bold text-slate-900">
              {isBn ? "ক্যাডেট ফিল্ড ফরমেশন ড্রিল" : "Cadet Field Formation Drill"}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <img src="/assets/logo (3).webp" alt="Full Battalion Salute" className="w-full h-56 object-cover" />
            <div className="p-4 bg-white text-xs text-center font-bold text-slate-900">
              {isBn ? "ব্যাটালিয়ন মার্চপাস্ট ও সালাম" : "Battalion Salute & Parade"}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <img src="/assets/logo (10).webp" alt="Supervisor Morning Inspection" className="w-full h-56 object-cover" />
            <div className="p-4 bg-white text-xs text-center font-bold text-slate-900">
              {isBn ? "ডিউটি পূর্ববর্তী সুপারভাইজার ব্রিফিং" : "Pre-Deployment Briefing"}
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="text-center pt-4">
          <Link 
            to="/hire-guard"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl text-sm shadow-md hover:scale-105 transition-all"
          >
            <Shield className="w-4 h-4 mr-2" />
            <span>{isBn ? "আপনার প্রতিষ্ঠানে প্রশিক্ষিত গার্ড মোতায়েন করুন" : "Deploy Our Trained Guards at Your Facility"}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
