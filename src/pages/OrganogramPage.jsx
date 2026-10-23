import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Network, Shield, User, Users, ChevronDown, CheckCircle2, 
  ArrowRight, Award, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OrganogramPage() {
  const { isBn } = useLanguage();

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5 text-blue-700" />
            <span>{isBn ? "অপারেশনাল কাঠামো ও কমান্ড চেইন" : "Operational Structure"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "কোম্পানি কমান্ড অর্গানোগ্রাম" : "Company Command Organogram"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "আমাদের সুশৃঙ্খল কর্পোরেট কমান্ড কাঠামো হেড অফিসের শীর্ষ নেতৃত্ব থেকে শুরু করে মাঠ পর্যায়ের গার্ড পর্যন্ত প্রত্যক্ষ নজরদারি, বহুস্তরীয় জবাবদিহিতা ও তাৎক্ষণিক প্রতিক্রিয়া নিশ্চিত করে।" 
              : "Our corporate structure ensures direct oversight, multi-tier accountability, and instant response from head office leadership to ground guards."}
          </p>
        </div>

        {/* Desktop Visual Hierarchy Tree (Hidden on Mobile) */}
        <div className="hidden lg:block bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md overflow-x-auto">
          <div className="min-w-[750px] flex flex-col items-center space-y-6">
            
            {/* Level 1: Managing Director */}
            <div className="flex flex-col items-center">
              <div className="bg-[#0a192f] text-white font-black px-8 py-4 rounded-2xl shadow-xl text-center border-2 border-amber-400">
                <span className="text-base sm:text-lg block text-amber-400">
                  {isBn ? "ব্যবস্থাপনা পরিচালক" : "MANAGING DIRECTOR"}
                </span>
                <span className="text-xs font-semibold block text-slate-200">
                  {isBn ? "মো. রাজু আহমেদ" : "Md. Raju Ahmed"}
                </span>
              </div>
              <div className="w-0.5 h-6 bg-slate-400"></div>
            </div>

            {/* Level 2: General Manager */}
            <div className="flex flex-col items-center">
              <div className="bg-slate-800 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 text-center shadow-md">
                <span className="text-sm block">
                  {isBn ? "জেনারেল ম্যানেজার" : "GENERAL MANAGER"}
                </span>
                <span className="text-[11px] text-amber-300 block">
                  {isBn ? "সার্বিক অপারেশন ও প্রশাসনিক কমান্ড" : "Overall Operational & Administrative Command"}
                </span>
              </div>
              <div className="w-0.5 h-6 bg-slate-400"></div>
            </div>

            {/* Level 3: Departmental Managers (Horizontal Strip) */}
            <div className="w-full flex flex-col items-center">
              <div className="w-4/5 h-0.5 bg-slate-300"></div>
              
              <div className="w-full grid grid-cols-4 gap-4 pt-4">
                
                {/* Branch 1: Admin & HR */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-center shadow-sm">
                    <span className="text-xs font-bold text-slate-900 block">
                      {isBn ? "ম্যানেজার অ্যাডমিন ও এইচআর" : "MANAGER ADMIN & HR"}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {isBn ? "জনবল ও অবকাঠামো" : "Personnel & Facilities"}
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-slate-300"></div>
                  <div className="w-full space-y-1.5 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "নিয়োগ শাখা" : "Recruitment Cell"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "ট্রেনিং একাডেমি" : "Training Wing"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "স্টোর ও ইউনিফর্ম" : "Store & Uniform Tailor"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "সরঞ্জাম রক্ষণাবেক্ষণ" : "Equipment Maintenance"}</div>
                  </div>
                </div>

                {/* Branch 2: Operations (The Core) */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full bg-blue-50 border-2 border-blue-600 p-3 rounded-xl text-center shadow-md">
                    <span className="text-xs font-black text-blue-950 block">
                      {isBn ? "ম্যানেজার অপারেশন্স" : "MANAGER OPERATION"}
                    </span>
                    <span className="text-[10px] text-blue-700 block font-bold">
                      {isBn ? "ট্যাকটিক্যাল ফিল্ড বহর" : "Tactical Field Fleet"}
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-blue-600"></div>
                  <div className="w-full space-y-1.5 text-[11px] text-slate-800 bg-blue-50/50 p-2.5 rounded-lg border border-blue-200">
                    <div className="p-1.5 bg-white border border-blue-200 rounded text-center font-bold text-slate-900">
                      {isBn ? "এরিয়া ম্যানেজার (৬টি হাব)" : "Area Managers (6 Hubs)"}
                    </div>
                    <div className="p-1.5 bg-white border border-blue-200 rounded text-center text-blue-900 font-semibold">
                      {isBn ? "এরিয়া সুপারভাইজার" : "Area Supervisors"}
                    </div>
                    <div className="p-1.5 bg-white border border-blue-200 rounded text-center">
                      {isBn ? "সিকিউরিটি ইন-চার্জ" : "Security In-charge"}
                    </div>
                    <div className="p-1.5 bg-emerald-600 text-white rounded text-center font-bold shadow-sm">
                      {isBn ? "৭০০+ ফিল্ড গার্ড ও গানম্যান" : "700+ Field Guards & Gunmen"}
                    </div>
                  </div>
                </div>

                {/* Branch 3: Marketing & Tenders */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-center shadow-sm">
                    <span className="text-xs font-bold text-slate-900 block">
                      {isBn ? "ম্যানেজার মার্কেটিং" : "MANAGER MARKETING"}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {isBn ? "টেন্ডার ও ক্লায়েন্ট সংযোগ" : "Client Growth & Tenders"}
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-slate-300"></div>
                  <div className="w-full space-y-1.5 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "করপোরেট টেন্ডার শাখা" : "Corporate Tenders"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "শিল্পাঞ্চল মার্কেটিং" : "Industrial Marketing"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "ডিজিটাল ও ই-মার্কেটিং" : "Digital & E-Marketing"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "ক্লায়েন্ট রিলেশনশিপ" : "Client Relationship"}</div>
                  </div>
                </div>

                {/* Branch 4: Accounts & Finance */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-center shadow-sm">
                    <span className="text-xs font-bold text-slate-900 block">
                      {isBn ? "ম্যানেজার অ্যাকাউন্টস" : "MANAGER ACCOUNTS"}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {isBn ? "অর্থ ও বিলিং শাখা" : "Finance & Billing"}
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-slate-300"></div>
                  <div className="w-full space-y-1.5 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "গার্ড পেরোল ও ব্যাংক বিল" : "Guard Payroll & Bank Disburse"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "ক্লায়েন্ট ইনভয়েস ও বিলিং" : "Client Invoicing & Billing"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "ভ্যাট, ট্যাক্স ও অডিট" : "VAT, Tax & Statutory Audit"}</div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded text-center">{isBn ? "কল্যাণ ও প্রভিডেন্ট ফান্ড" : "Welfare & Provident Fund"}</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Mobile Dedicated Vertical Hierarchy Tree (No Slider / 100% Screen Fit) */}
        <div className="block lg:hidden bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-md space-y-5">
          <div className="text-center pb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
              {isBn ? "কমান্ড কাঠামো ও চেইন অফ রেসপন্সিবিলিটি" : "Command Structure & Chain of Responsibility"}
            </span>
          </div>

          {/* Level 1: Managing Director */}
          <div className="bg-[#0a192f] text-white p-4 rounded-2xl border-2 border-amber-400 shadow-lg text-center relative">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
              {isBn ? "কমান্ড ১ • শীর্ষ নেতৃত্ব" : "COMMAND 1 • TOP LEADERSHIP"}
            </span>
            <strong className="text-base font-black text-white block mt-0.5">
              {isBn ? "ব্যবস্থাপনা পরিচালক" : "MANAGING DIRECTOR"}
            </strong>
            <span className="text-xs text-amber-200 block font-semibold">
              {isBn ? "মো. রাজু আহমেদ" : "Md. Raju Ahmed"}
            </span>
            <span className="text-[11px] text-slate-300 block mt-1">
              {isBn ? "প্রধান নির্বাহী ও কৌশলগত অপারেশন্স প্রধান" : "Chief Executive & Strategic Command Head"}
            </span>
          </div>

          {/* Vertical Connecting Stem */}
          <div className="flex justify-center -my-2.5">
            <div className="w-0.5 h-6 bg-slate-300"></div>
          </div>

          {/* Level 2: General Manager */}
          <div className="bg-[#0d213f] text-white p-3.5 rounded-2xl border border-slate-700 shadow-md text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
              {isBn ? "কমান্ড ২ • জেনারেল ম্যানেজার" : "COMMAND 2 • GENERAL MANAGER"}
            </span>
            <strong className="text-sm font-bold text-white block mt-0.5">
              {isBn ? "জেনারেল ম্যানেজার (জিএম)" : "General Manager (GM)"}
            </strong>
            <span className="text-[11px] text-slate-300 block mt-0.5">
              {isBn ? "সার্বিক অপারেশনাল ও প্রশাসনিক কমান্ড" : "Overall Operational & Administrative Command"}
            </span>
          </div>

          {/* Vertical Connecting Stem */}
          <div className="flex justify-center -my-2.5">
            <div className="w-0.5 h-6 bg-slate-300"></div>
          </div>

          {/* Level 3: Departmental Divisions (4 Stacked Clean Cards) */}
          <div className="space-y-4 pt-1">
            
            {/* Division 1: Operations (The Core Fleet) */}
            <div className="bg-blue-50/70 border-2 border-blue-500 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
                    {isBn ? "কোর অপারেশনস উইং" : "CORE OPERATIONS WING"}
                  </span>
                  <h4 className="text-sm font-black text-blue-950">
                    {isBn ? "ম্যানেজার অপারেশন্স" : "MANAGER OPERATION"}
                  </h4>
                </div>
                <span className="text-[10px] bg-blue-600 text-white font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  {isBn ? "ট্যাকটিক্যাল বহর" : "Tactical Fleet"}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-blue-200 font-bold text-slate-900 flex items-center justify-between shadow-2xs">
                  <span>{isBn ? "১. এরিয়া ম্যানেজার (৬টি আঞ্চলিক হাব)" : "1. Area Managers (6 Regional Hubs)"}</span>
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">HQ Command</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-blue-200 text-blue-950 font-semibold flex items-center justify-between shadow-2xs">
                  <span>{isBn ? "২. এরিয়া ফিল্ড সুপারভাইজার" : "2. Area Field Supervisors"}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">Field Patrol</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-blue-200 text-slate-800 flex items-center justify-between shadow-2xs">
                  <span>{isBn ? "৩. অন-সাইট সিকিউরিটি ইন-চার্জ" : "3. Security In-charge"}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">Site Post</span>
                </div>
                <div className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl font-extrabold flex items-center justify-between shadow-sm">
                  <span>{isBn ? "৪. ৭০০+ ফিল্ড গার্ড ও গানম্যান ফোর্স" : "4. 700+ Field Guards & Gunmen"}</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">24/7 Active</span>
                </div>
              </div>
            </div>

            {/* Division 2: Admin & HR */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {isBn ? "জনবল ও অবকাঠামো" : "Personnel & Facilities"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isBn ? "ম্যানেজার অ্যাডমিন ও এইচআর" : "MANAGER ADMIN & HR"}
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "নিয়োগ শাখা" : "Recruitment Cell"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "ট্রেনিং একাডেমি" : "Training Wing"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "স্টোর ও ইউনিফর্ম" : "Store & Uniform"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "সরঞ্জাম রক্ষণাবেক্ষণ" : "Equipment Maint."}
                </div>
              </div>
            </div>

            {/* Division 3: Marketing & Tenders */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {isBn ? "টেন্ডার ও ক্লায়েন্ট সংযোগ" : "Client Growth & Tenders"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isBn ? "ম্যানেজার মার্কেটিং" : "MANAGER MARKETING"}
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  Growth
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "করপোরেট টেন্ডার" : "Corporate Tenders"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "শিল্পাঞ্চল মার্কেটিং" : "Industrial Sector"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "ডিজিটাল মার্কেটিং" : "Digital & Web"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "ক্লায়েন্ট রিলেশনস" : "Client Relations"}
                </div>
              </div>
            </div>

            {/* Division 4: Accounts & Finance */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {isBn ? "অর্থ ও বিলিং শাখা" : "Finance & Invoicing"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isBn ? "ম্যানেজার অ্যাকাউন্টস" : "MANAGER ACCOUNTS"}
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  Finance
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "গার্ড পেরোল ও ব্যাংক" : "Guard Payroll"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "ইনভয়েস ও বিলিং" : "Invoicing & Bills"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "ভ্যাট ও ট্যাক্স অডিট" : "VAT, Tax & Audit"}
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded-xl text-center text-slate-800 font-medium shadow-2xs">
                  {isBn ? "প্রভিডেন্ট ফান্ড" : "Provident Fund"}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Employee Welfare & Motivation (From PDF Page 16) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-1">
              {isBn ? "অফিসিয়াল কর্পোরেট পলিসি" : "Official Corporate Policy"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isBn ? "গার্ড কল্যাণ ও প্রেষণা মানদণ্ডসমূহ" : "Guard Welfare & Motivation Standards"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              {isBn 
                ? "আমাদের গার্ডদের দীর্ঘমেয়াদি নিষ্ঠা ও শৃঙ্খলার মূল ভিত্তি হলো শতভাগ স্বচ্ছ সরকারি সুযোগ-সুবিধা, উৎসব ভাতা ও স্বাস্থ্য সুরক্ষা।" 
                : "Our low guard turnover and high discipline stem directly from transparent statutory benefits, bonus allowances, and healthcare coverage."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "১. বার্ষিক বেতন বৃদ্ধি" : "1. Annual Salary Increment"}
              </span>
              <p className="text-slate-600">
                {isBn ? "নিয়মিত কাজের মূল্যায়ন সাপেক্ষে বাৎসরিক বেতন বৃদ্ধি নিশ্চিত করা হয়।" : "Regular merit-based evaluations guaranteeing scheduled yearly salary increments."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "২. দুটি উৎসব ভাতা" : "2. Two Festival Bonuses"}
              </span>
              <p className="text-slate-600">
                {isBn ? "সকল সক্রিয় গার্ডদের জন্য ঈদুল ফিতর এবং ঈদুল আজহায় ৫০% করে উৎসব ভাতা।" : "50% bonus at Eid-ul-Fitr and 50% bonus at Eid-ul-Adha distributed to all active guards."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৩. যাতায়াত ও ভ্রমন ভাতা" : "3. Conveyance & Travel Allowance"}
              </span>
              <p className="text-slate-600">
                {isBn ? "সাইট ট্রান্সফার বা দূরবর্তী জরুরি ডিউটির ক্ষেত্রে যাতায়াত খরচ কোম্পানি বহন করে।" : "Official transport allowance during site deployment transfers and emergency shifts."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৪. গার্ড কল্যাণ তহবিল" : "4. Guard Welfare Fund"}
              </span>
              <p className="text-slate-600">
                {isBn ? "পারিবারিক জরুরি বিপদ, চিকিৎসা এবং সন্তানদের শিক্ষার জন্য আর্থিক অনুদান।" : "Financial assistance for family emergencies, medical treatment, and children’s education."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৫. প্রভিডেন্ট ফান্ড স্কিম" : "5. Provident Fund Scheme"}
              </span>
              <p className="text-slate-600">
                {isBn ? "চাকরি শেষে আর্থিক নিরাপত্তার জন্য সমপরিমাণ কোম্পানি অনুদানসহ ফান্ড সুবিধা।" : "Long-term retirement savings with matching company contributions."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৬. ওভারটাইম ক্ষতিপূরণ" : "6. Overtime Compensation"}
              </span>
              <p className="text-slate-600">
                {isBn ? "যেকোনো অতিরিক্ত ঘণ্টা ডিউটির ক্ষেত্রে প্রতি ঘণ্টার পূর্ণাঙ্গ ওভারটাইম বিল পরিশোধ।" : "Exact hour-for-hour overtime payment for any extra duty performed."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৭. জীবন ও দুর্ঘটনা বীমা" : "7. Life & Health Insurance"}
              </span>
              <p className="text-slate-600">
                {isBn ? "ডিউটিরত অবস্থায় যেকোনো অনাকাঙ্ক্ষিত দুর্ঘটনার জন্য গ্রুপ ইন্স্যুরেন্স কভারেজ।" : "Full group insurance coverage protecting guards against on-duty accidents."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৮. সবেতন ছুটি ও বিশ্রাম" : "8. Paid Leave & Holidays"}
              </span>
              <p className="text-slate-600">
                {isBn ? "সরকারি বিধিমোতাবেক নৈমিত্তিক ছুটি, বার্ষিক ছুটি এবং অসুস্থতাজনিত ছুটি।" : "Statutory annual leave, casual leave, and medical sickness leaves."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-900 font-bold text-sm block">
                {isBn ? "৯. অভ্যন্তরীণ পদোন্নতি সুযোগ" : "9. Internal Promotion Matrix"}
              </span>
              <p className="text-slate-600">
                {isBn ? "গার্ড থেকে সুপারভাইজার → ইন-চার্জ → ইন্সপেক্টর পদে যোগ্যতার ভিত্তিতে পদোন্নতি।" : "Dedicated promotion track from Guard → Supervisor → Security In-charge → Inspector."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
