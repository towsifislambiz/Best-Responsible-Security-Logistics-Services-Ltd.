import React from 'react';
import QuoteCalculator from '../components/QuoteCalculator';
import { 
  ShieldCheck, Phone, CheckCircle2, Clock, 
  MapPin, Award, Users, Building
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function HireGuardPage() {
  const { isBn } = useLanguage();

  return (
    <div className="bg-slate-50 text-slate-800 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? "দ্রুত গার্ড মোতায়েন পোর্টাল" : "Fast Mobilization Portal"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "প্রশিক্ষিত সিকিউরিটি গার্ড ও জনবল নিয়োগ" : "Deploy Trained Security Guards & Staff"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "নিচের ক্যালকুলেটরে আপনার প্রয়োজনীয় জনবল ও শিফট নির্বাচন করুন। আমাদের অপারেশন্স কমান্ড অবিলম্বে চাহিদা যাচাই করে অফিসিয়াল প্রস্তাব পাঠাবে।"
              : "Configure your exact manpower needs below. Our Operations Command will verify your requirements and dispatch an official proposal within minutes."}
          </p>
        </div>

        {/* Embedded Calculator */}
        <QuoteCalculator />

        {/* Onboarding Steps Strip */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900">
              {isBn ? "আমাদের গার্ড মোতায়েন প্রক্রিয়া যেভাবে কাজ করে" : "How Our Deployment Process Works"}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {isBn ? "প্রাথমিক রিকুইজিশন থেকে শুরু করে অন-সাইট ডিউটি পর্যন্ত ৪টি সহজ ধাপ।" : "From initial requisition to on-site saluting guard in 4 simple steps."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-sm">১</span>
              <h4 className="text-slate-900 font-bold text-sm">
                {isBn ? "রিকুইজিশন জমা দিন" : "Submit Requisition"}
              </h4>
              <p className="text-slate-600 text-xs">
                {isBn ? "ক্যালকুলেটরে পদবী, শিফট (৮ঘণ্টা/১২ঘণ্টা) ও প্রয়োজনীয় গার্ড সংখ্যা নির্বাচন করুন।" : "Choose roles, shifts (8h/12h), and number of personnel on the calculator above."}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-sm">২</span>
              <h4 className="text-slate-900 font-bold text-sm">
                {isBn ? "সাইট সার্ভে ও প্রস্তাবনা" : "Site Survey & Proposal"}
              </h4>
              <p className="text-slate-600 text-xs">
                {isBn ? "আমাদের ইন্সপেক্টর সরাসরি আপনার প্রতিষ্ঠান পরিদর্শন করে চুক্তির প্রস্তাব পেশ করবেন।" : "Our Inspector conducts a complimentary perimeter risk survey and delivers the formal agreement."}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-sm">৩</span>
              <h4 className="text-slate-900 font-bold text-sm">
                {isBn ? "ফোর্স মোতায়েন" : "Force Mobilization"}
              </h4>
              <p className="text-slate-600 text-xs">
                {isBn ? "স্মার্ট ট্যাকটিক্যাল ইউনিফর্ম, ব্যাজ ও লাঠিসহ প্রশিক্ষিত গার্ডরা সময়মতো উপস্থিত হবে।" : "Vetted guards arrive in clean tactical uniforms with badges, batons, whistles, and torches."}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-sm">৪</span>
              <h4 className="text-slate-900 font-bold text-sm">
                {isBn ? "২৪/৭ নাইট পেট্রোল" : "24/7 Night Patrols"}
              </h4>
              <p className="text-slate-600 text-xs">
                {isBn ? "গার্ডদের শতভাগ সতর্কতা ও শৃঙ্খলা নিশ্চিত করতে রাতে আকস্মিক পরিদর্শন পরিচালিত হয়।" : "Senior officers conduct surprise night inspections to maintain 100% alertness."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
