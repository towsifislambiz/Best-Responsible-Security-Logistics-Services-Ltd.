import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Phone, ArrowRight, Award, ShieldAlert, 
  ChevronLeft, ChevronRight, CheckCircle2, Users, Building
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

const slidesData = [
  {
    image: "/assets/logo (3).webp",
    tagBn: "বাংলাদেশের নির্ভরযোগ্য সিকিউরিটি ফোর্স",
    tagEn: "BANGLADESH'S PREMIER SECURITY FORCE",
    titleBn: "আপনার শিল্পপ্রতিষ্ঠান ও সম্পদের জন্য নিশ্ছিদ্র নিরাপত্তা",
    titleEn: "Ironclad Protection for Your Enterprise & Assets",
    subBn: "২০২১ সাল থেকে সারা বাংলাদেশে ৭০০+ অত্যন্ত সুশৃঙ্খল ও যাচাইকৃত সিকিউরিটি গার্ড, আর্মড গানম্যান এবং সুপারভাইজার মোতায়েন রয়েছে।",
    subEn: "Over 700+ rigorously vetted and trained security personnel, armed gunmen, and supervisors deployed across Bangladesh since 2021.",
    cta1Bn: "গার্ড বাজেট হিসাব করুন",
    cta1En: "Calculate Guard Budget",
    link1: "/hire-guard",
    cta2Bn: "সকল সেবা দেখুন",
    cta2En: "Explore All Services",
    link2: "/services"
  },
  {
    image: "/assets/Screenshot 2026-10-22 010044.webp",
    tagBn: "কঠোর প্যারেড ও ট্যাকটিক্যাল ট্রেনিং",
    tagEn: "RIGOROUS PARADE & TACTICAL DRILLS",
    titleBn: "জরুরি অগ্নিনির্বাপণ ও ক্রাইসিস মোকাবেলায় প্রস্তুত সুশৃঙ্খল বাহিনী",
    titleEn: "Disciplined Force Trained for Crisis & Evacuation",
    subBn: "প্রতিটি গার্ডকে সাইটে মোতায়েনের পূর্বে ১৪ দিনের নিবিড় শারীরিক প্রশিক্ষণ, অগ্নি নির্বাপণ মহড়া এবং পুঙ্খানুপুঙ্খ পুলিশ ভেরিফিকেশন করানো হয়।",
    subEn: "Every guard undergoes mandatory physical conditioning, fire-fighting drills, and background police verification prior to site deployment.",
    cta1Bn: "ট্রেনিং স্ট্যান্ডার্ড দেখুন",
    cta1En: "View Training Standards",
    link1: "/training",
    cta2Bn: "২৩-পদবী রেট চার্ট",
    cta2En: "View 23-Role Rate Chart",
    link2: "/pricing"
  },
  {
    image: "/assets/logo (4).webp",
    tagBn: "বাণিজ্যিক ও রিটেইল মল নিরাপত্তা",
    tagEn: "COMMERCIAL & RETAIL DEPLOYMENT",
    titleBn: "নাভানা, ইউনাইটেড, রূপায়ন ও আমানা বিগ বাজারের বিশ্বস্ত সঙ্গী",
    titleEn: "Trusted by Navana, United, Rupayan & Amana Big Bazar",
    subBn: "টার্নকি সিকিউরিটি গার্ডিং, ফ্রন্ট ডেস্ক কাস্টমার ওয়েলকামিং, পার্কিং ট্রাফিক কন্ট্রোল এবং সুপারমার্কেট লস প্রিভেনশনে অভিজ্ঞ জনবল।",
    subEn: "Turnkey security guarding, front-desk customer welcoming, parking traffic control, and loss prevention for top brands.",
    cta1Bn: "আমাদের ক্লায়েন্ট পোর্টফোলিও",
    cta1En: "Our Client Portfolio",
    link1: "/clients",
    cta2Bn: "গার্ড বুকিং দিন",
    cta2En: "Hire Guards Today",
    link2: "/hire-guard"
  },
  {
    image: "/assets/logo (12).webp",
    tagBn: "ভিআইপি ক্লোজ প্রটেকশন ও এসকোর্ট",
    tagEn: "TACTICAL CLOSE PROTECTION & ESCORT",
    titleBn: "ভিআইপি এক্সিকিউটিভ বডিগার্ড ও আর্মার্ড ক্যাশ ট্রানজিট",
    titleEn: "VIP Executive Bodyguards & Armored Cash Transit",
    subBn: "লাইসেন্সপ্রাপ্ত আর্মড গানম্যান ও পার্সোনাল সিকিউরিটি অফিসার (পিএসও) দ্বারা ভিআইপি ব্যক্তিত্ব ও ক্যাশ ভল্ট পরিবহন সুরক্ষা।",
    subEn: "Licensed armed gunmen and personal security officers ensuring safe transport of VIP dignitaries and cash bullion.",
    cta1Bn: "ভিআইপি বডিগার্ড রেট",
    cta1En: "VIP Bodyguard Rates",
    link1: "/services/vip-protection",
    cta2Bn: "সরাসরি হটলাইন কল",
    cta2En: "Direct Hotline Call",
    link2: `tel:${companyInfo.contacts.hotline}`,
    external: true
  }
];

export default function HeroSlider() {
  const { isBn } = useLanguage();
  const { siteSettings } = useSiteData();
  const currentHotline = siteSettings?.hotline || companyInfo.contacts.hotline;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const slide = slidesData[currentSlide];

  return (
    <div className="relative w-full bg-[#050e1a] overflow-hidden min-h-[550px] lg:min-h-[680px] flex items-center font-sans">
      {/* Background Slides */}
      {slidesData.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 8s ease' }}
        >
          <img
            src={s.image}
            alt={isBn ? s.titleBn : s.titleEn}
            className="w-full h-full object-cover object-center"
          />
          {/* Tactical High-End Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a14] via-[#051122]/90 to-[#071527]/75"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10 w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-400/30 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-amber-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{isBn ? slide.tagBn : slide.tagEn}</span>
          </div>

          {/* Main Title - Refined size & elegant bold weight */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-normal leading-snug sm:leading-tight lg:leading-[1.2]">
            {isBn ? slide.titleBn : slide.titleEn}
          </h1>

          <p className="text-amber-400 text-xs sm:text-base md:text-lg font-medium">
            {isBn ? "আপনার সুরক্ষাই আমাদের দায়িত্ব ও অঙ্গীকার" : "Your Safety is Our Responsibility"}
          </p>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
            {isBn ? slide.subBn : slide.subEn}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              to={slide.link1}
              className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm md:text-base rounded-xl shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
              <span>{isBn ? slide.cta1Bn : slide.cta1En}</span>
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </Link>

            {slide.external ? (
              <a
                href={`tel:${currentHotline}`}
                className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm md:text-base rounded-xl border border-slate-700 backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
                <span>{isBn ? slide.cta2Bn : slide.cta2En}</span>
              </a>
            ) : (
              <Link
                to={slide.link2}
                className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm md:text-base rounded-xl border border-slate-700 backdrop-blur-md transition-all"
              >
                <span>{isBn ? slide.cta2Bn : slide.cta2En}</span>
              </Link>
            )}
          </div>

          {/* Trust Highlights */}
          <div className="pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{isBn ? '৭০০+ প্রশিক্ষিত ফোর্স' : '700+ Trained Force'}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{isBn ? '৭০+ করপোরেট ক্লায়েন্ট' : '70+ Corporate Clients'}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{isBn ? 'সরকারি অনুমোদিত লাইসেন্স' : 'Govt. Reg. License'}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{isBn ? '২৪/৭ জরুরি রেসপন্স' : '24/7 Rapid Response'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Controls (Next / Prev Arrows) - Desktop only to avoid mobile overlap */}
      <div className="hidden sm:flex absolute right-6 bottom-8 z-20 items-center space-x-3">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-3 rounded-full bg-slate-900/70 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-3 rounded-full bg-slate-900/70 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}