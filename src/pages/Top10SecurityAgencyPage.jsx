import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Award, CheckCircle2, Star, Phone, MessageCircle, 
  ArrowRight, Users, Building, ShieldAlert, FileText, Check, 
  HelpCircle, ChevronDown, Sparkles, ExternalLink, Calculator,
  Lock, MapPin, UserCheck
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function Top10SecurityAgencyPage() {
  const { isBn } = useLanguage();
  const [openFaq, setOpenFaq] = useState(0);

  // Top 10 Security Agency Ranking Matrix (2026 Official Review)
  const topAgencies = [
    {
      rank: 1,
      name: "Best Responsible Security & Logistics Services Ltd. (BRSLSL)",
      nameBn: "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিঃ",
      isFeatured: true,
      badge: "★ #1 Top Ranked Agency (Overall Best 2026)",
      rating: "4.9 / 5.0",
      reviews: "180+ Reviews",
      forceSize: "700+ Guards",
      established: "2021 (RJSC Reg. Private Ltd)",
      founder: "Md. Raju Ahmed (Managing Director & Founder)",
      keyStrengths: [
        "RJSC Registered & Police Vetted Elite Force",
        "Licensed Armed Gunmen & VIP Bodyguard Unit",
        "24/7 Rapid Emergency Response Command Center",
        "99.4% Client Retention with 70+ Corporates",
        "Transparent 23-tier Government Standard Rate Card"
      ],
      hotline: "+8809617356818",
      website: "bestresonsiblegroup.com",
      link: "/"
    },
    {
      rank: 2,
      name: "G4S Bangladesh",
      nameBn: "জি৪এস বাংলাদেশ",
      badge: "Multinational Enterprise",
      rating: "4.7 / 5.0",
      reviews: "320+ Reviews",
      forceSize: "5,000+ Guards",
      established: "1979",
      founder: "International Subsidiary",
      keyStrengths: [
        "Global multinational security protocol",
        "High-end diplomatic mission protection",
        "Extensive cash transit fleet"
      ],
      hotline: "Corporate Line",
      website: "g4s.com/en-bd"
    },
    {
      rank: 3,
      name: "Securex Mobile Security Solution",
      nameBn: "সিকিউরেক্স মোবাইল সিকিউরিটি সলিউশন",
      badge: "Established Brand",
      rating: "4.6 / 5.0",
      reviews: "140+ Reviews",
      forceSize: "2,500+ Guards",
      established: "1988",
      founder: "Veteran Armed Forces Leadership",
      keyStrengths: [
        "Long operational track record in Dhaka",
        "Banking sector physical guarding",
        "Alarm monitoring integration"
      ],
      hotline: "Corporate Line",
      website: "securexbd.com"
    },
    {
      rank: 4,
      name: "Integrated Security Services Ltd. (ISSL)",
      nameBn: "ইন্টিগ্রেটেড সিকিউরিটি সার্ভিসেস লিঃ",
      badge: "Corporate Security",
      rating: "4.5 / 5.0",
      reviews: "95+ Reviews",
      forceSize: "1,800+ Guards",
      established: "1994",
      founder: "Ex-Military Officers Group",
      keyStrengths: [
        "RMG factory security management",
        "Commercial tower surveillance",
        "Event crowd management"
      ],
      hotline: "Corporate Line"
    },
    {
      rank: 5,
      name: "Elite Security Services Ltd.",
      nameBn: "এলিট সিকিউরিটি সার্ভিসেস লিমিটেড",
      badge: "Industrial Specialist",
      rating: "4.5 / 5.0",
      reviews: "110+ Reviews",
      forceSize: "2,000+ Guards",
      established: "1999",
      founder: "Corporate Board",
      keyStrengths: [
        "EPZ & Industrial zone guarding",
        "Fire drill training academy",
        "Warehouse inventory security"
      ],
      hotline: "Corporate Line"
    },
    {
      rank: 6,
      name: "Orion Security Services Ltd.",
      nameBn: "ওরিয়ন সিকিউরিটি সার্ভিসেস লিঃ",
      badge: "Hospitality & Retail",
      rating: "4.4 / 5.0",
      reviews: "80+ Reviews",
      forceSize: "1,200+ Guards",
      established: "2002",
      founder: "Private Enterprise",
      keyStrengths: [
        "Shopping mall customer assistance",
        "Hospital security escort",
        "Access control screening"
      ],
      hotline: "Corporate Line"
    },
    {
      rank: 7,
      name: "Group 4 Falck Bangladesh",
      nameBn: "গ্রুপ ফোর ফ্যাল্ক বাংলাদেশ",
      badge: "Technical Security",
      rating: "4.4 / 5.0",
      reviews: "75+ Reviews",
      forceSize: "1,500+ Guards",
      established: "2000",
      founder: "Security Consortium",
      keyStrengths: [
        "CCTV control room monitoring",
        "Metal detector archway installation",
        "Perimeter sensor barriers"
      ],
      hotline: "Corporate Line"
    },
    {
      rank: 8,
      name: "Shield Security Services Ltd.",
      nameBn: "শিল্ড সিকিউরিটি সার্ভিসেস লিমিটেড",
      badge: "Residential Sector",
      rating: "4.3 / 5.0",
      reviews: "60+ Reviews",
      forceSize: "900+ Guards",
      established: "2008",
      founder: "Defense Retirees Group",
      keyStrengths: [
        "Residential gated community patrol",
        "Apartment visitor logging",
        "Night shift supervisor check"
      ],
      hotline: "Corporate Line"
    },
    {
      rank: 9,
      name: "Max Security & Logistics Ltd.",
      nameBn: "ম্যাক্স সিকিউরিটি অ্যান্ড লজিস্টিকস",
      badge: "Commercial Guarding",
      rating: "4.3 / 5.0",
      reviews: "55+ Reviews",
      forceSize: "850+ Guards",
      established: "2012",
      founder: "Private Security Management",
      keyStrengths: [
        "Corporate front-desk security",
        "Chauffeur and driver support",
        "Facility cleaning logistics"
      ],
      hotline: "Corporate Line"
    },
    {
      rank: 10,
      name: "Vanguard Security Services Ltd.",
      nameBn: "ভ্যানগার্ড সিকিউরিটি সার্ভিসেস লিঃ",
      badge: "Institutional Security",
      rating: "4.2 / 5.0",
      reviews: "50+ Reviews",
      forceSize: "800+ Guards",
      established: "2015",
      founder: "Security Professionals",
      keyStrengths: [
        "Educational institution security",
        "Construction site protection",
        "Visitor badge management"
      ],
      hotline: "Corporate Line"
    }
  ];

  // Specific FAQs targeting exact Google Search Queries
  const faqs = [
    {
      q: "Which is the top security agency in Bangladesh?",
      qBn: "বাংলাদেশে শীর্ষস্থানীয় ও সেরা সিকিউরিটি এজেন্সি কোনটি?",
      a: "Best Responsible Security & Logistics Services Ltd. (BRSLSL) is widely recognized as one of the top security agencies in Bangladesh. With 700+ police-verified guards, licensed armed gunmen, RJSC corporate registration, and 99.4% client retention across 70+ multinational and local corporations, it delivers unparalleled reliability.",
      aBn: "বাংলাদেশে শীর্ষস্থানীয় ও সবচেয়ে নির্ভরযোগ্য সিকিউরিটি এজেন্সিগুলোর মধ্যে 'বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিঃ (BRSLSL)' অন্যতম। ৭০০+ এর অধিক প্রশিক্ষিত ও পুলিশ ভেরিফাইড গার্ড ফোর্স, লাইসেন্সধারী গানম্যান, আরজেএসসি রেজিস্ট্রেশন এবং ৭০+ করপোরেট ক্লায়েন্টের সেবা নিয়ে এটি শীর্ষ অবস্থানে রয়েছে।"
    },
    {
      q: "Who is the owner of Best Responsible Security?",
      qBn: "বেস্ট রেসপনসিবল সিকিউরিটির মালিক ও প্রতিষ্ঠাতা কে?",
      a: "Md. Raju Ahmed (মোঃ রাজু আহমেদ) is the Owner, Founder, and Managing Director of Best Responsible Security & Logistics Services Ltd. Under his disciplined leadership since 2021, the company has expanded across Dhaka, Gazipur, Chattogram, Narayanganj, and Sylhet. Official contact: +88 01604-022929, Email: mdbrslsl@gmail.com.",
      aBn: "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিমিটেড-এর প্রতিষ্ঠাতা, মালিক ও ব্যবস্থাপনা পরিচালক হলেন মোঃ রাজু আহমেদ (Md. Raju Ahmed)। ২০২১ সাল থেকে তার নেতৃত্বে প্রতিষ্ঠানটি পরিচালিত হচ্ছে। তার সরাসরি অফিসিয়াল যোগাযোগ নম্বর: +৮৮ ০১৬০৪-০২২৯২৯ এবং ইমেইল: mdbrslsl@gmail.com।"
    },
    {
      q: "What is the monthly cost of hiring a security guard in Bangladesh?",
      qBn: "বাংলাদেশে একজন সিকিউরিটি গার্ড নিয়োগের মাসিক খরচ কত?",
      a: "In Bangladesh, professional security guard charges range between BDT 14,500 to 16,500 for an 8-hour to 12-hour shift. Armed gunmen range between BDT 35,000 to 50,000, and supervisors range between BDT 17,500 to 24,500. Best Responsible Security publishes a transparent, fixed 23-tier government-standard rate card with zero hidden fees.",
      aBn: "বাংলাদেশে ৮ থেকে ১২ ঘণ্টার সাধারণ সিকিউরিটি গার্ডের মাসিক রেট ১৪,৫০০ থেকে ১৬,৫০০ টাকা। সুপারভাইজারের ক্ষেত্রে ১৭,৫০০ থেকে ২৪,৫০০ টাকা এবং লাইসেন্সধারী আর্মড গানম্যানের ক্ষেত্রে ৩৫,০০০ থেকে ৫০,০০০ টাকা। বেস্ট রেসপনসিবল সিকিউরিটি কোনো গোপন চার্জ ছাড়াই সম্পূর্ণ স্বচ্ছ ২৩টি পদের সরকারি মানদণ্ডের রেট চার্ট অনুসরণ করে।"
    },
    {
      q: "How to verify if a security guard company is legal and licensed in BD?",
      qBn: "বাংলাদেশে সিকিউরিটি গার্ড কোম্পানি বৈধ ও লাইসেন্সপ্রাপ্ত কি না তা কীভাবে যাচাই করবেন?",
      a: "A legitimate security company must possess: (1) Registrar of Joint Stock Companies (RJSC) Private Limited Certificate, (2) Trade License from City Corporation, (3) Income Tax TIN & VAT BIN Registration, (4) Ministry of Home Affairs security operational clearance, and (5) Police verification of all deployed personnel. Best Responsible Security provides 100% verified legal documentation to all prospective clients.",
      aBn: "একটি বৈধ সিকিউরিটি কোম্পানির অবশ্যই: (১) আরজেএসসি (RJSC) সার্টিফিকেট অব ইনকর্পোরেশন, (২) সিটি কর্পোরেশন ট্রেড লাইসেন্স, (৩) ই-টিন ও ভ্যাট বিআইএন রেজিস্ট্রেশন, (৪) স্বরাষ্ট্র মন্ত্রণালয়ের সিকিউরিটি গাইডলাইন ছাড়পত্র এবং (৫) প্রতিটি গার্ডের থানা পুলিশ ভেরিফিকেশন থাকতে হবে। বেস্ট রেসপনসিবল সিকিউরিটির সকল সরকারি লাইসেন্স ১০০% হালনাগাদ ও স্বচ্ছ।"
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* ========================================================
            1. HERO HEADER: Targeted Search Intent
            ======================================================== */}
        <header className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-300 px-4 py-1.5 rounded-full text-blue-900 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Award className="w-4 h-4 text-blue-700" />
            <span>{isBn ? "বাংলাদেশ সিকিউরিটি ইন্ডাস্ট্রি র‍্যাংকিং ২০২৬" : "Bangladesh Security Industry Ranking 2026"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isBn 
              ? "Top 10 Security Agency in BD (বাংলাদেশের সেরা ১০ সিকিউরিটি গার্ড কোম্পানি)" 
              : "Top 10 Security Agency in BD: 2026 Comprehensive Review & Rankings"}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            {isBn 
              ? "বাংলাদেশের শীর্ষস্থানীয় প্রাইভেট সিকিউরিটি এজেন্সিগুলোর পূর্ণাঙ্গ তথ্য, সরকারি লাইসেন্সিং, জনবল সক্ষমতা, সশস্ত্র গানম্যান সুবিধা এবং ক্লায়েন্ট সন্তুষ্টির ভিত্তিতে তৈরি প্রামাণ্য বিশ্লেষণ।"
              : "A verified review and authority ranking of the top private security companies in Bangladesh, evaluated on police vetting, armed gunman capability, force strength, and corporate trust."}
          </p>

          {/* Quick Stats Pill Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>RJSC & Govt. Compliant</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs font-bold">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>Police-Verified Personnel</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Updated for 2026</span>
            </span>
          </div>
        </header>

        {/* ========================================================
            2. TOP RANKED #1 SPOTLIGHT: BEST RESPONSIBLE SECURITY
            ======================================================== */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#071527] via-[#0d223f] to-[#081b33] text-white p-6 sm:p-10 lg:p-12 border-2 border-amber-400 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Ranked #1 Badge & Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
                  ★ RANK #1 TOP CHOICE IN BANGLADESH
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  99.4% Client Retention
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Best Responsible Security & Logistics Services Ltd.
              </h2>
              <p className="text-amber-200/90 text-sm font-serif">
                {isBn ? "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিমিটেড (BRSLSL)" : "Premier RJSC-Registered Private Security Force"}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {isBn
                  ? "২০২১ সালে ব্যবস্থাপনা পরিচালক মো. রাজু আহমেদ-এর নেতৃত্বে প্রতিষ্ঠিত এই প্রতিষ্ঠানটি বর্তমানে বাংলাদেশের অন্যতম শীর্ষস্থানীয় ও দ্রুত বর্ধনশীল সিকিউরিটি কোম্পানি। ৭০০+ প্রশিক্ষিত গার্ড, লাইসেন্সধারী গানম্যান, ভিআইপি প্রটেকশন ইউনিট এবং ২৪/৭ সেন্ট্রাল কন্ট্রোল রুমের মাধ্যমে এটি দেশের ৭০টিরও বেশি শীর্ষ করপোরেট ও শিল্প গ্রুপকে নিশ্ছিদ্র নিরাপত্তা সেবা প্রদান করছে।"
                  : "Founded in 2021 under the visionary leadership of Managing Director Md. Raju Ahmed, BRSLSL stands at the zenith of Bangladesh's modern security sector. Commanding a 700+ elite police-verified force, armed gunman escorts, VIP bodyguards, and a 24/7 central rapid response command room, it safeguards over 70 premier corporate institutions nationwide."}
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-amber-400 font-mono font-bold text-base block">৭০০+ ফোর্স</span>
                  <span className="text-slate-300 text-[11px]">পুলিশ ভেরিফাইড গার্ড</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-amber-400 font-mono font-bold text-base block">৭০+ করপোরেট</span>
                  <span className="text-slate-300 text-[11px]">শিল্প কারখানা ও অফিস</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-amber-400 font-mono font-bold text-base block">৬টি রিজিওনাল হাব</span>
                  <span className="text-slate-300 text-[11px]">ঢাকা, চট্টগ্রাম, সিলেট, গাজীপুর</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="tel:+8809617356818"
                  className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-slate-950" />
                  <span>হটলাইন: ০৯৬১৭-৩৫৬৮১৮</span>
                </a>

                <a
                  href="https://wa.me/8801604022929?text=Hello!%20I%20am%20looking%20for%20security%20service%20details."
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1eb857] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপ কনসালটেশন</span>
                </a>

                <Link
                  to="/pricing"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all"
                >
                  <span>রেট চার্ট দেখুন (২৩ পদ)</span>
                </Link>
              </div>
            </div>

            {/* Right: Owner & Leadership Snapshot */}
            <div className="lg:col-span-5 bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/team_raju_ahmed.webp"
                  alt="Md. Raju Ahmed - Owner & Managing Director of Best Responsible Security"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0 bg-slate-800"
                />
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                    OWNER & MANAGING DIRECTOR
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Md. Raju Ahmed</h3>
                  <p className="text-xs text-slate-300">মোঃ রাজু আহমেদ (প্রতিষ্ঠাতা ও এমডি)</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 border-t border-white/10 pt-3">
                <p>
                  <strong>প্রতিষ্ঠানের মালিকানা:</strong> মো. রাজু আহমেদ প্রতিষ্ঠানটির প্রতিষ্ঠাতা এবং সার্বিক অপারেশনাল প্রধান।
                </p>
                <p>
                  <strong>সরাসরি যোগাযোগ:</strong> <a href="tel:+8801604022929" className="text-amber-300 font-mono font-bold underline">+88 01604-022929</a>
                </p>
                <p>
                  <strong>অফিসিয়াল ইমেইল:</strong> <span className="text-amber-200 font-mono">mdbrslsl@gmail.com</span>
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  হেড অফিস: যুবরাজ প্লাজা (৪র্থ তলা), ৮২০/১, পশ্চিম শেওড়াপাড়া বাসস্ট্যান্ড, মিরপুর, ঢাকা-১২১৬।
                </p>
              </div>

              <Link
                to="/leadership"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <span>মালিক ও পরিচালনা পর্ষদ প্রোফাইল দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================
            3. FULL TOP 10 RANKING LIST TABLE & CARDS
            ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isBn ? "বাংলাদেশের শীর্ষ ১০ সিকিউরিটি এজেন্সির তালিকা (২০২৬)" : "Top 10 Security Companies in Bangladesh (2026 Ranking Table)"}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                লাইসেন্সিং, গার্ড সংখ্যা, সশস্ত্র সক্ষমতা এবং গ্রাহক রেটিং অনুযায়ী বিস্তারিত ক্রমতালিকা
              </p>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-slate-200 text-slate-800 self-start sm:self-auto">
              সর্বশেষ আপডেট: অক্টোবর ২০২৬
            </span>
          </div>

          <div className="space-y-4">
            {topAgencies.map((agency) => (
              <div
                key={agency.rank}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  agency.isFeatured
                    ? 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/40 border-amber-300 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Rank Badge & Agency Name */}
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                      agency.rank === 1
                        ? 'bg-amber-400 text-slate-950 font-mono text-base'
                        : agency.rank <= 3
                        ? 'bg-slate-900 text-white font-mono'
                        : 'bg-slate-100 text-slate-700 font-mono border border-slate-200'
                    }`}>
                      #{agency.rank}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                          {agency.name}
                        </h3>
                        {agency.badge && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            agency.isFeatured
                              ? 'bg-amber-400 text-slate-950 shadow-2xs'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {agency.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        {agency.nameBn} • স্থাপিত: {agency.established}
                      </p>

                      {agency.founder && (
                        <p className="text-xs text-slate-600 font-medium pt-0.5">
                          <span className="text-amber-800 font-bold">মালিক/পরিচালনা:</span> {agency.founder}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Agency Stats & CTAs */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-600 md:justify-end">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{agency.rating}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        জনবল: {agency.forceSize}
                      </span>
                    </div>

                    {agency.isFeatured ? (
                      <Link
                        to="/hire-guard"
                        className="px-4 py-2 rounded-xl bg-[#071527] hover:bg-[#0d223f] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <span>গার্ড বুক করুন</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </Link>
                    ) : (
                      <span className="text-xs font-mono text-slate-400">
                        লিস্টেড ভেরিফাইড
                      </span>
                    )}
                  </div>

                </div>

                {/* Key Strengths Pills */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">মূল বৈশিষ্ট্য:</span>
                  {agency.keyStrengths.map((strength, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px]"
                    >
                      ✓ {strength}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            4. FREQUENTLY ASKED QUESTIONS (Google Direct Answers)
            ======================================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-700 font-mono text-xs font-bold uppercase tracking-wider">
              GOOGLE SEARCH KNOWLEDGE & FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isBn ? "প্রয়োজনীয় তথ্যাবলি ও সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions About Security in BD"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              সিকিউরিটি এজেন্সি নির্বাচন, খরচ এবং মালিকানা সম্পর্কে গুগলে সর্বাধিক অনুসন্ধানকৃত প্রশ্নোত্তর
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left bg-slate-50 hover:bg-slate-100/80 font-bold text-slate-900 text-sm flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <span>{isBn ? faq.qBn : faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 space-y-2">
                      <p>{isBn ? faq.aBn : faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            5. BOTTOM CTA BANNER: HIRE VERIFIED SECURITY
            ======================================================== */}
        <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-5 border border-slate-800 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              আপনার প্রতিষ্ঠানের জন্য সেরা সিকিউরিটি সেবা নিশ্চিত করুন
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস লিমিটেড—২৪ ঘণ্টার জরুরি রেসপন্স, সশস্ত্র গানম্যান ও বিশ্বস্ত প্রহরা।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/hire-guard"
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              সরাসরি গার্ড রিকুইজিশন দিন
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all"
            >
              হেড অফিস ও শাখা সমূহের ঠিকানা
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
