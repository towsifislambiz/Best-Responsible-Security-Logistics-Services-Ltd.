import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Phone, Mail, MapPin, Award, CheckCircle2, 
  Quote, ArrowRight, UserCheck, Briefcase
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function LeadershipPage() {
  const { isBn } = useLanguage();
  const md = companyInfo.managingDirector;

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{isBn ? "কর্পোরেট পরিচালনা পর্ষদ" : "Corporate Governance"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "ব্যবস্থাপনা ও পরিচালনা পর্ষদ" : "Leadership & Board of Directors"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "দীর্ঘ অভিজ্ঞতাসম্পন্ন দক্ষ নিরাপত্তা বিশেষজ্ঞ ও সামরিক বাহিনীর অভিজ্ঞ ফিল্ড কমান্ডারদের সুদৃঢ় পরিচালনায় আমাদের প্রতিষ্ঠান।" 
              : "Guided by visionary leadership and disciplined field operations commanders with decades of security expertise."}
          </p>
        </div>

        {/* MD Spotlight Card (Clean Corporate White Card) */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* MD Photo / Portrait */}
            <div className="lg:col-span-5 text-center">
              <div className="relative inline-block">
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl mx-auto bg-gradient-to-b from-slate-100 to-slate-200/90 flex items-end justify-center p-2">
                  <img 
                    src="/assets/team_raju_ahmed.png" 
                    alt="Md. Raju Ahmed - Managing Director" 
                    className="w-full h-full object-contain object-bottom drop-shadow-md"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                  {isBn ? "ব্যবস্থাপনা পরিচালক" : "Managing Director"}
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">
                  {isBn ? "মো. রাজু আহমেদ" : md.name}
                </h3>
                <p className="text-amber-700 text-sm font-semibold">
                  {isBn ? "ব্যবস্থাপনা পরিচালক ও প্রধান নির্বাহী" : md.title}
                </p>
                <p className="text-xs text-slate-500">
                  {isBn ? companyInfo.banglaName : "Best Responsible Security & Logistics Services Ltd."}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center space-y-1 text-xs text-slate-600">
                <a href={`tel:${md.phone}`} className="flex items-center text-amber-700 font-bold hover:underline">
                  <Phone className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  {isBn ? "সরাসরি যোগাযোগ:" : "Direct:"} {md.phone}
                </a>
                <span className="text-[11px] text-slate-500">
                  {isBn ? "কর্পোরেট অফিস: বাড়ি #৭, রোড #২০, সেক্টর #৪, উত্তরা, ঢাকা" : "Corporate Office: House #7, Road #20, Sector #4, Uttara, Dhaka"}
                </span>
              </div>
            </div>

            {/* MD Message Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-800 w-fit">
                <Quote className="w-8 h-8" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {isBn 
                  ? "“আপনার প্রতিষ্ঠানের নিরাপত্তা আমাদের পবিত্র দায়িত্ব; প্রতিটি চ্যালেঞ্জ মোকাবিলা করাই আমাদের অঙ্গীকার।”" 
                  : "\"Your Security is Our Solemn Responsibility; We Shall Overcome Every Hazard.\""}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isBn ? (
                  <>
                    <p>
                      "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিমিটেড প্রতিষ্ঠিত হয়েছিল গতানুগতিক সিকিউরিটি প্রথার বাইরে এসে বাংলাদেশের আধুনিক শিল্প ও করপোরেট অবকাঠামোর নানামুখী ঝুঁকি কার্যকরভাবে মোকাবিলা করার প্রত্যয় নিয়ে।"
                    </p>
                    <p>
                      "আমাদের লক্ষ্য কেবল গেটে প্রহরী বসানো নয়, বরং প্রতিটি গ্রাহকের নির্দিষ্ট নিরাপত্তা দুর্বলতাগুলো সঠিকভাবে অনুধাবন করে সময়োপযোগী পরিকল্পনা বাস্তবায়ন করা। গাজীপুরের বৃহৎ পোশাক কারখানা হোক, গুলশানের করপোরেট হেডকোয়ার্টার কিংবা হাইওয়েতে মূল্যবান পণ্য বা ক্যাশ পরিবহন—আমাদের গার্ড ও অফিসাররা সবসময় ধৈর্য, বিচক্ষণতা ও সর্বোচ্চ শৃঙ্খলার সাথে দায়িত্ব পালন করে।"
                    </p>
                    <p>
                      "আমরা আমাদের সম্মানিত ক্লায়েন্টদের আন্তরিক প্রচেষ্টা, চব্বিশ ঘণ্টা সুপারভাইজার নজরদারি এবং সর্বদা স্বচ্ছ ব্যবসায়িক যোগাযোগের নিশ্চয়তা দিচ্ছি। একটি দায়িত্বশীল ও বিশ্বস্ত নিরাপত্তা সহযোগী হিসেবে আমাদের পাশে থাকার জন্য আপনাকে স্বাগত জানাই।"
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      "Best Responsible Security & Logistics Services Limited was established to bridge the gap between traditional guarding and the complex, high-risk security requirements of contemporary industrial infrastructure in Bangladesh."
                    </p>
                    <p>
                      "Our aim is not merely to station personnel at entrances, but to identify and understand the precise vulnerabilities of each customer and strategize execution to meet multifaceted security needs. Whether it is an export apparel factory in Gazipur, a corporate headquarters in Gulshan, or secured cash transport across highways, our force is trained to act with composure, firmness, and supreme discipline."
                    </p>
                    <p>
                      "We assure our valued clients of our sincere efforts, round-the-clock supervisor vigilance, and transparent communication at all times. I invite you to partner with us and experience the difference of a responsible security ally."
                    </p>
                  </>
                )}
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <div className="border-l-4 border-amber-500 pl-3">
                  <span className="block font-bold text-slate-900 text-sm">
                    {isBn ? "মো. রাজু আহমেদ" : "Md. Raju Ahmed"}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {isBn ? "ব্যবস্থাপনা পরিচালক" : "Managing Director & CEO"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Management Team Structure Overview */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900">
              {isBn ? "ঊর্ধ্বতন অপারেশন ও কমান্ড টিম" : "Senior Operational Leadership"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isBn 
                ? "কর্পোরেট পলিসির সাথে মাঠ পর্যায়ের গার্ডদের নিবিড় সমন্বয় রক্ষাকারী অভিজ্ঞ কর্মকর্তা দল।" 
                : "A command matrix linking corporate strategy directly to perimeter guards on the ground."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-center space-y-3 shadow-sm hover:border-amber-400 transition-colors">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-[#0a192f] flex items-center justify-center mx-auto border border-slate-200">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "জেনারেল ম্যানেজার" : "General Manager"}
              </h4>
              <p className="text-amber-700 text-xs font-semibold">
                {isBn ? "সামগ্রিক অপারেশন প্রধান" : "Head of Overall Operations"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "সকল ৬টি আঞ্চলিক অফিস, ডেপ্লয়মেন্ট শিডিউল ও ক্লায়েন্ট সম্পর্কের প্রত্যক্ষ তত্ত্বাবধান।" 
                  : "Direct oversight of all 6 regional offices, deployment schedules, and key client liaison."}
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-center space-y-3 shadow-sm hover:border-amber-400 transition-colors">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-[#0a192f] flex items-center justify-center mx-auto border border-slate-200">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "ম্যানেজার অপারেশন্স" : "Manager Operations"}
              </h4>
              <p className="text-amber-700 text-xs font-semibold">
                {isBn ? "ট্যাকটিক্যাল ফিল্ড কমান্ড" : "Tactical Field Command"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "প্রাক্তন সামরিক কর্মকর্তা যিনি রাতের সারপ্রাইজ পেট্রোল ও র‍্যাপিড রেসপন্স সেল তদারকি করেন।" 
                  : "Ex-military officers supervising night mobile patrols, rapid response cell, and crisis drills."}
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-center space-y-3 shadow-sm hover:border-amber-400 transition-colors">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-[#0a192f] flex items-center justify-center mx-auto border border-slate-200">
                <UserCheck className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "ম্যানেজার এইচআর ও ট্রেনিং" : "Manager HR & Training"}
              </h4>
              <p className="text-amber-700 text-xs font-semibold">
                {isBn ? "নিয়োগ ও পরীক্ষণ শাখা" : "Recruitment & Vetting"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "পুলিশ ব্যাকগ্রাউন্ড যাচাই, শারীরিক পরীক্ষা ও ১৪ দিনের নিবিড় প্যারেড একাডেমি পরিচালনা।" 
                  : "Police background screening, physical endurance tests, and 2-week parade academy."}
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-center space-y-3 shadow-sm hover:border-amber-400 transition-colors">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-[#0a192f] flex items-center justify-center mx-auto border border-slate-200">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 font-bold text-base">
                {isBn ? "ম্যানেজার অ্যাকাউন্টস ও লিগ্যাল" : "Manager Accounts & Legal"}
              </h4>
              <p className="text-amber-700 text-xs font-semibold">
                {isBn ? "বিধিবদ্ধ ও অর্থ বিভাগ" : "Statutory Compliance"}
              </p>
              <p className="text-slate-500 text-xs">
                {isBn 
                  ? "গার্ডদের প্রভিডেন্ট ফান্ড, বীমা দাবি, এনবিআর ভ্যাট/ট্যাক্স কমপ্লায়েন্স ও সময়মতো বিলিং।" 
                  : "Employee provident fund, insurance claims, VAT/tax compliance, and transparent billing."}
              </p>
            </div>

          </div>
        </div>

        {/* CTA Strip */}
        <div className="text-center pt-4">
          <Link 
            to="/organogram"
            className="inline-flex items-center px-6 py-3 bg-[#0a192f] hover:bg-[#112240] text-white font-bold rounded-xl text-sm shadow-md transition-all"
          >
            <span>{isBn ? "পূর্ণাঙ্গ চেইন অব কমান্ড অর্গানোগ্রাম দেখুন" : "View Full Corporate Command Organogram"}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
