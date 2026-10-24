import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Phone, MessageCircle, Shield, Award, 
  CheckCircle2, Sparkles, Building, ArrowRight, ShieldCheck, Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

const defaultEnglishBios = {
  "tm-1": "Founder & Managing Director of Best Responsible Security & Logistics Services Ltd. Visionary leader spearheading modern, tech-enabled corporate security across Bangladesh.",
  "tm-2": "Chief coordinator of nationwide field operations, emergency security force deployments, and field supervisor command hierarchy.",
  "tm-3": "Head of corporate client relations, organizational security policies, statutory compliances, and institutional administrative command.",
  "tm-4": "Leading corporate security contract acquisitions, industrial client relations, and strategic business development nationwide.",
  "tm-5": "Armed forces veteran instructor. Leading recruit march drills, physical fitness, firefighting, and tactical combat security training.",
  "tm-6": "Retired Sergeant of the Bangladesh Army. Supervising round-the-clock physical security operations across key industrial and commercial hubs."
};

export default function ManagementTeamPage() {
  const { isBn } = useLanguage();
  const { managementTeam, siteSettings } = useSiteData();

  // Sort by order ascending
  const sortedTeam = [...(managementTeam || [])].sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full text-amber-900 text-xs font-bold uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{isBn ? "কমান্ড ও এক্সিকিউটিভ প্রশাসন" : "Executive Command & Operations"}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isBn ? "ম্যানেজমেন্ট টিম ও দায়িত্বপ্রাপ্ত কর্মকর্তাবৃন্দ" : "Management Team & Key Officers"}
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লি.-এর সার্বিক কার্যক্রমে অভিজ্ঞ সামরিক কর্মকর্তা, সুদক্ষ মানবসম্পদ ব্যবস্থাপক ও পেশাদার ফিল্ড কমান্ডারদের সক্রিয় সমন্বয়ে পরিচালিত হচ্ছে।"
              : "Led by seasoned military veterans, experienced operational commanders, and professional security administrators ensuring flawless round-the-clock protection nationwide."}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-700">
            <span className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? "২৪/৭ জরুরি রেসপন্স সেল" : "24/7 Rapid Response"}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? "সামরিক বাহিনীর অভিজ্ঞ প্রশিক্ষক" : "Armed Forces Veteran Trainers"}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>{isBn ? "সরাসরি যোগাযোগ ও দ্রুত সিদ্ধান্ত" : "Direct Officer Access"}</span>
            </span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTeam.map((member, index) => {
            const cleanPhone = (member.phone || '').replace(/[^0-9]/g, '');
            const whatsappNumber = cleanPhone.startsWith('88') ? cleanPhone : ('88' + cleanPhone);
            const isTopLeader = index === 0;

            return (
              <div 
                key={member.id || index}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group ${
                  isTopLeader 
                    ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-lg' 
                    : 'border-slate-200 hover:border-amber-400/70 shadow-sm'
                }`}
              >
                <div>
                  {/* Photo Container - Dedicated Full-Portrait Frame */}
                  <div className="relative aspect-[4/5] sm:h-96 w-full bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 overflow-hidden flex items-end justify-center p-3 border-b border-slate-100">
                    <img 
                      src={member.photo || '/assets/team_raju_ahmed.webp'} 
                      alt={member.name}
                      className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/company-logo.webp';
                      }}
                    />
                    
                    {/* Badge top-left */}
                    <div className="absolute top-4 left-4 z-10">
                      {isTopLeader ? (
                        <span className="inline-flex items-center space-x-1 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isBn ? "প্রতিষ্ঠাতা ও শীর্ষ নেতৃত্ব" : "Top Leadership"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/30 shadow-sm">
                          <Shield className="w-3 h-3" />
                          <span>{isBn ? `অফিসার #${index + 1}` : `Officer #${index + 1}`}</span>
                        </span>
                      )}
                    </div>

                    {/* Status badge top-right */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center space-x-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        <span>{isBn ? "অন-ডিউটি" : "Active"}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content - Clear Text without Covering Any Photo */}
                  <div className="p-6 space-y-3">
                    {/* Member Name */}
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                        {isBn ? (member.nameBn || member.name) : (member.name || member.nameBn)}
                      </h3>
                      {isBn && member.name && (
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {member.name}
                        </p>
                      )}
                    </div>

                    {/* Designation / Post */}
                    <div className="inline-block bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1 text-amber-900 text-xs font-extrabold">
                      {isBn ? (member.roleBn || member.role) : (member.role || member.roleBn)}
                    </div>

                    {/* Bio / Responsibilities */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {isBn 
                        ? (member.bioBn || member.bioEn || "দায়িত্বপ্রাপ্ত নির্বাহী কর্মকর্তা") 
                        : (member.bioEn || defaultEnglishBios[member.id] || "Key executive officer responsible for operational security and command supervision.")}
                    </p>
                  </div>
                </div>

                {/* Direct Action Footer */}
                <div className="p-6 pt-0 space-y-2 border-t border-slate-100 mt-2">
                  <div className="pt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{isBn ? "সরাসরি মোবাইল:" : "Direct Line:"}</span>
                    <strong className="text-slate-800 text-sm font-bold tracking-wide">{member.phone}</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isBn ? "কল করুন" : "Direct Call"}</span>
                    </a>

                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Box */}
        <div className="bg-gradient-to-br from-[#0a192f] via-[#0d213f] to-[#071322] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-amber-400 text-xs font-extrabold tracking-wider uppercase">
              {isBn ? "আমাদের পরিচালনা ও কমান্ড দর্শন" : "Our Command & Supervisory Philosophy"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {isBn 
                ? "সামরিক শৃঙ্খলা ও আধুনিক করপোরেট পেশাদারিত্বের মেলবন্ধন" 
                : "Bridging Military Discipline with Corporate Security Standards"}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isBn 
                ? "আমাদের ম্যানেজমেন্ট টিমের প্রতিটি সদস্য সার্বক্ষণিক দায়িত্ব পালনে প্রস্তুত। মাঠ পর্যায়ে কোনো সংকট দেখা দিলে তাৎক্ষণিক পদক্ষেপ নেওয়ার ক্ষমতা প্রতিটি অফিসারের রয়েছে। যেকোনো অভিযোগ বা বিশেষ পরামর্শ সরাসরি আমাদের ব্যবস্থাপনা পরিচালকের নিকট পৌঁছানোর ব্যবস্থা রয়েছে।"
                : "Every member of our leadership holds rapid operational autonomy to deploy reinforcements, handle emergency crisis protocols, and ensure client facilities remain guarded without a single second of lapses."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">{isBn ? "২৪ ঘণ্টা নাইট পেট্রোলিং" : "24/7 Surprise Night Patrol"}</strong>
                <span className="text-slate-400">{isBn ? "সুপারভাইজারদের আকস্মিক পরিদর্শন" : "Unannounced midnight check"}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-400/10 rounded-xl text-emerald-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">{isBn ? "জরুরি ব্যাকআপ ফোর্স" : "Emergency Backup Force"}</strong>
                <span className="text-slate-400">{isBn ? "১৫-৩০ মিনিটে ফোর্স মোতায়েন" : "15-30 min response cell"}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-sky-400/10 rounded-xl text-sky-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">{isBn ? "সরাসরি এমডি ও হটলাইন" : "Direct MD Hotline"}</strong>
                <span className="text-slate-400">{isBn ? "০১৬০৪০২২৯২৯ নম্বরে সরাসরি যোগাযোগ" : "Direct line to MD Raju Ahmed"}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/hire-guard"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm flex items-center justify-center transition-all"
            >
              <span>{isBn ? "গার্ড নিয়োগের আবেদন করুন" : "Hire Security Guards"}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center transition-all"
            >
              <span>{isBn ? "হেড অফিসে যোগাযোগ করুন" : "Contact Head Office"}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
