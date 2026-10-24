import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, CheckCircle2, Award, Users, Target, Eye, 
  MapPin, Phone, Building, ArrowRight, ShieldCheck
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { isBn } = useLanguage();

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-blue-700" />
            <span>{isBn ? "আমাদের পরিচিতি" : "Who We Are"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস লিমিটেড সম্পর্কে" : "About Best Responsible Security & Logistics Ltd."}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "২০২১ সালে প্রতিষ্ঠিত, আমরা আজ বাংলাদেশের অন্যতম শীর্ষ কর্পোরেট নিরাপত্তা ও ফ্যাসিলিটি লজিস্টিকস প্রতিষ্ঠান, যার উপর সারা দেশে ৭০টিরও বেশি শিল্প গ্রুপ ও বাণিজ্যিক প্রতিষ্ঠান আস্থা রেখেছে।"
              : "Founded in 2021, we have grown into one of Bangladesh's premier private security and facility logistics companies, trusted by over 70 industrial conglomerates and commercial facilities nationwide."}
          </p>
        </div>

        {/* Core Corporate Snapshot (Clean Light Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block">
              {isBn ? "আমাদের প্রতিষ্ঠা ও অগ্রযাত্রার ইতিহাস" : "Our Founding Story & Growth"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {isBn 
                ? "আপসহীন নিরাপত্তা ও স্বল্প পরিচালন ব্যয়ে সর্বোচ্চ পেশাদারিত্ব" 
                : "Delivering Uncompromised Guarding with Low Operational Overhead"}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {isBn 
                ? <><strong>বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিমিটেড</strong> প্রতিষ্ঠিত হয়েছিল একটি সুস্পষ্ট লক্ষ্য নিয়ে: বাংলাদেশের আধুনিক করপোরেট ও শিল্প কারখানার সুনির্দিষ্ট ঝুঁকিগুলো চিহ্নিত করে এমন এক নিরাপত্তা কৌশল বাস্তবায়ন করা, যা ক্লায়েন্টের সার্বিক ঝুঁকি ও লোকসান শূন্যে নামিয়ে আনে।</>
                : <><strong>Best Responsible Security & Logistics Services Limited</strong> was founded with a clear directive: to understand the precise vulnerabilities of modern corporate and manufacturing sites in Bangladesh, and execute customized protective strategies that drastically reduce client operational risks.</>}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {isBn 
                ? <>আমাদের ব্যবস্থাপনা পরিচালক <strong>মো. রাজু আহমেদ</strong>-এর দূরদর্শী নেতৃত্বে আজ আমাদের রয়েছে <strong>৭০০+ এর অধিক সক্রিয় প্রশিক্ষিত সিকিউরিটি গার্ড, সুপারভাইজার, গানম্যান ও ফ্যাসিলিটি কর্মী</strong>, যা ৬টি আঞ্চলিক অপারেশন হাবের মাধ্যমে পরিচালিত হচ্ছে।</>
                : <>Under the visionary leadership of our Managing Director, <strong>Md. Raju Ahmed</strong>, we have grown our operational strength to over <strong>700+ active security guards, supervisors, gunmen, and facility specialists</strong> supported by 6 regional operation hubs.</>}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[#0a192f] font-black block text-sm">{isBn ? "৭০০+ গার্ড ফোর্স" : "700+ Force"}</span>
                <span className="text-slate-500 font-medium">{isBn ? "প্রশিক্ষিত ও পুলিশ ভেরিফাইড" : "Trained & Police Vetted"}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[#0a192f] font-black block text-sm">{isBn ? "৭০+ করপোরেট ক্লায়েন্ট" : "70+ Clients"}</span>
                <span className="text-slate-500 font-medium">{isBn ? "শূন্য দুর্ঘটনা রেকর্ড" : "Zero Incident Record"}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[#0a192f] font-black block text-sm">{isBn ? "সরকারি রেজিস্টার্ড" : "Govt. Registered"}</span>
                <span className="text-slate-500 font-medium">{isBn ? "আরজেএসসি প্রাইভেট লিমিটেড" : "RJSC Private Limited"}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[#0a192f] font-black block text-sm">{isBn ? "২৪/৭ রেসপন্স" : "24/7 Response"}</span>
                <span className="text-slate-500 font-medium">{isBn ? "জরুরি রেসপন্স সেল" : "Rapid Reaction Cell"}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl relative">
              <img 
                src="/assets/logo (11).webp" 
                alt="BRSLSL Guard Parade" 
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 text-xs shadow-md">
                <p className="text-slate-900 font-bold">{isBn ? "সুশৃঙ্খল গার্ড প্যারেড ও ড্রিল পরিদর্শন" : "Synchronized Guard Parade Drill"}</p>
                <p className="text-slate-500 text-[11px]">{isBn ? "ট্রেনিং একাডেমি, পশ্চিম শেওড়াপাড়া, মিরপুর" : "Training Academy, West Shewrapara, Mirpur"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-4 hover:border-amber-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{isBn ? "আমাদের লক্ষ্য (Mission)" : "Our Mission"}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {isBn 
                ? "সর্বোচ্চ প্রশিক্ষিত জনবল এবং আধুনিক ইলেকট্রনিক প্রযুক্তির সমন্বয়ে চুরি-ডাকাতি প্রতিরোধ করা, সম্পদ ও জীবনের সুরক্ষা নিশ্চিত করা এবং একটি নিরাপদ ব্যবসায়িক পরিবেশ সৃষ্টি করা।" 
                : "To provide robust, highly trained physical and electronic security solutions that eliminate theft, safeguard human lives, and create a welcoming, secure environment for Bangladesh’s business community."}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-4 hover:border-amber-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{isBn ? "আমাদের ভিশন (Vision)" : "Our Vision"}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {isBn 
                ? "বাংলাদেশের সবচেয়ে নির্ভরযোগ্য, নৈতিক ও প্রযুক্তিবান্ধব সিকিউরিটি ও লজিস্টিকস কোম্পানি হিসেবে সুপ্রতিষ্ঠিত হওয়া, যা তাৎক্ষণিক জরুরি সাড়া এবং সর্বোচ্চ শৃঙ্খলার জন্য পরিচিত।" 
                : "To be recognized as Bangladesh’s most reliable, ethical, and technologically forward security and logistics enterprise, celebrated for rapid emergency response and unparalleled guard discipline."}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-4 hover:border-amber-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{isBn ? "মূল মূল্যবোধ (Core Values)" : "Core Values"}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {isBn 
                ? "প্রতিটি পোস্টে সর্বোচ্চ সততা, ২৪ ঘণ্টা সার্বক্ষণিক সতর্কতা, ভদ্র ও বিনয়ী আচরণ, নিরাপত্তা প্রটোকলে কোনো আপস না করা এবং ক্লায়েন্টের সাথে স্বচ্ছ ব্যবসায়িক অংশীদারিত্ব।" 
                : "Integrity in every post, vigilance around the clock, respectful customer interaction, zero compromise on safety protocols, and transparent client partnerships."}
            </p>
          </div>

        </div>

        {/* Why Choose Us Pillars from PDF Page 6 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-1">
              {isBn ? "বিআরএসএলএসএল-এর অনন্য বিশেষত্ব" : "The BRSLSL Distinction"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isBn ? "কেন বাংলাদেশের শীর্ষ প্রতিষ্ঠানগুলো আমাদের বিশ্বাস করে?" : "Why Corporate Bangladesh Trusts Our Force"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-slate-900 font-bold text-base flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                {isBn ? "কঠোর বাছাই প্রক্রিয়া" : "Vigorous Selection Criteria"}
              </h4>
              <p className="text-slate-600">
                {isBn 
                  ? "পুরুষ গার্ডদের জন্য ন্যূনতম ৫'৬\" উচ্চতা, শিক্ষাগত যোগ্যতা (অষ্টম থেকে এইচএসসি), নিষ্কলুষ পুলিশ ভেরিফিকেশন ও বায়োমেট্রিক তথ্য যাচাই।" 
                  : "Minimum 5'6\" height for male guards, educational background (Class 8 to HSC), clean police clearance, and thorough background checking."}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-slate-900 font-bold text-base flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                {isBn ? "অগ্নি ও প্রাথমিক চিকিৎসা সনদ" : "Fire & First Aid Certified"}
              </h4>
              <p className="text-slate-600">
                {isBn 
                  ? "গার্ডরা জরুরি ফায়ার এক্সটিংগুইশার চালানো, ভবন থেকে জরুরি বহির্গমন ও সিপিআর প্রাথমিক চিকিৎসায় সরাসরি সনদপ্রাপ্ত।" 
                  : "Guards are certified in emergency fire-extinguisher operation, building evacuation protocols, and emergency CPR."}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-slate-900 font-bold text-base flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                {isBn ? "সারপ্রাইজ নাইট পেট্রোল" : "Night Patrol Supervision"}
              </h4>
              <p className="text-slate-600">
                {isBn 
                  ? "গার্ডরা সজাগ রয়েছে কিনা তা যাচাই করতে রাত ১১টা থেকে ভোর ৫টার মধ্যে সিনিয়র ফিল্ড ইন্সপেক্টররা আকস্মিক ভিজিট করেন।" 
                  : "Armed mobile patrol inspectors visit every deployment post unannounced between 11:00 PM and 5:00 AM to verify alertness."}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-slate-900 font-bold text-base flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                {isBn ? "কর্মী কল্যাণ ও সুবিধা" : "Full Employee Welfare"}
              </h4>
              <p className="text-slate-600">
                {isBn 
                  ? "প্রভিডেন্ট ফান্ড, চিকিৎসা বীমা, দুটি ঈদ বোনাস, ওভারটাইম ভাতা এবং কল্যাণ তহবিল নিশ্চিত করায় গার্ডরা সদা অনুপ্রাণিত থাকে।" 
                  : "Provident fund, medical insurance, two Eid festival bonuses, overtime compensation, and welfare fund ensuring loyal, motivated personnel."}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-slate-900 font-bold text-base flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                {isBn ? "র‍্যাপিড রিলিফ ফোর্স (RRF)" : "Rapid Relief Force (RRF)"}
              </h4>
              <p className="text-slate-600">
                {isBn 
                  ? "কোনো গার্ড অনুপস্থিত থাকলে বা ক্লায়েন্টের বিশেষ অনুরোধে সর্বোচ্চ ২ ঘণ্টার মধ্যে বিকল্প রিজার্ভ গার্ড মোতায়েন নিশ্চিত করা হয়।" 
                  : "Guaranteed replacement within 2 hours if any guard is absent, sick, or if client requests an immediate personnel change."}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-slate-900 font-bold text-base flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                {isBn ? "সরকারি আইন ও স্বচ্ছতা" : "Legal Paper Transparency"}
              </h4>
              <p className="text-slate-600">
                {isBn 
                  ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের শ্রম আইন, এনবিআর ট্যাক্স নিয়মাবলী, ট্রেড লাইসেন্স ও আরজেএসসি বিধিমালা শতভাগ মান্যকারী প্রতিষ্ঠান।" 
                  : "100% compliant with government labor laws, NBR tax regulations, trade licenses, and RJSC statutory corporate disclosures."}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h4 className="text-slate-900 font-bold text-base">
              {isBn ? "আমাদের সাংগঠনিক কাঠামো ও সরকারি লাইসেন্স দেখতে চান?" : "Want to inspect our corporate hierarchy or licenses?"}
            </h4>
            <p className="text-xs text-slate-500">
              {isBn ? "আমাদের চেইন অব কমান্ড অর্গানোগ্রাম ও সরকারি সনদসমূহ পর্যালোচনা করুন।" : "Review our organogram and certified government papers."}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/organogram" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors border border-slate-200">
              {isBn ? "অর্গানোগ্রাম দেখুন →" : "View Organogram →"}
            </Link>
            <Link to="/licenses" className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-sm">
              {isBn ? "সরকারি লাইসেন্সসমূহ দেখুন →" : "View Legal Licenses →"}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
