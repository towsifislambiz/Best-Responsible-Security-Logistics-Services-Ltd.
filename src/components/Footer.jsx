import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Phone, Mail, MapPin, Clock, ArrowRight, 
  ShieldCheck, Award, CheckCircle, ExternalLink, MessageCircle
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

export default function Footer() {
  const { isBn, t } = useLanguage();
  const { siteSettings } = useSiteData();
  const currentHotline = siteSettings?.hotline || companyInfo.contacts.hotline;
  const currentMobileDisplay = siteSettings?.mobileDisplay || companyInfo.contacts.mobileDisplay;
  const currentEmail = siteSettings?.email || companyInfo.contacts.email;
  const currentFacebook = siteSettings?.facebook || companyInfo.contacts.facebook;
  const currentWhatsapp = siteSettings?.whatsapp || companyInfo.contacts.whatsapp;
  const currentHeadOffice = siteSettings?.headOfficeAddress || companyInfo.locations.headOffice.address;
  const currentCorpOffice = siteSettings?.corporateOfficeAddress || companyInfo.locations.corporateOffice.address;

  return (
    <footer className="bg-[#071322] text-slate-300 text-sm border-t border-slate-800 relative overflow-hidden font-sans">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-[#0a192f] via-[#0d213f] to-[#0a192f] border-b border-slate-850 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-400/10 rounded-2xl border border-amber-400/30 text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">{t('footer.ctaTitle')}</h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                {t('footer.ctaDesc')}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a 
              href={`tel:${currentHotline}`}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-700 flex items-center justify-center text-xs sm:text-sm transition-all shadow-md"
            >
              <Phone className="w-4 h-4 mr-2 text-amber-400 animate-bounce shrink-0" />
              <span className="truncate">{t('footer.hotlineBtn')} {currentHotline}</span>
            </a>
            <Link 
              to="/hire-guard"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition-all text-center"
            >
              {t('footer.quoteBtn')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/company-logo.webp" 
                alt="BRSLSL Shield" 
                className="w-12 h-12 object-contain rounded-full ring-2 ring-amber-400/40"
              />
              <div>
                <h4 className="text-white font-extrabold text-base tracking-wide">
                  {isBn ? "বেস্ট রেসপনসিবল" : "BEST RESPONSIBLE"}
                </h4>
                <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                  {isBn ? "সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লি." : "SECURITY & LOGISTICS SERVICES LTD."}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isBn 
                ? "বাংলাদেশের অন্যতম শীর্ষ করপোরেট সিকিউরিটি ও লজিস্টিকস সেবা প্রদানকারী প্রতিষ্ঠান। ২০২১ সাল থেকে ৭০০+ প্রশিক্ষিত ফোর্স, ৭০+ খ্যাতনামা ক্লায়েন্ট ও ৬টি রিজিওনাল অফিসের মাধ্যমে সার্বক্ষণিক নিরাপত্তা নিশ্চিত করে আসছে।"
                : "One of Bangladesh's fastest growing corporate security and logistics providers. Operating with 700+ vetted manpower, 70+ premier clients, and 6 regional offices since 2021. Government registered Private Limited Company."}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{isBn ? "হেড অফিস:" : "Head Office:"}</strong> {currentHeadOffice}
                </span>
              </div>
              <div className="flex items-start space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{isBn ? "কর্পোরেট ও অপারেশন অফিস:" : "Corporate Office:"}</strong> {currentCorpOffice}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isBn ? "মোবাইল:" : "Mobile:"} {currentMobileDisplay}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{currentEmail}</span>
              </div>

              {/* Official Social Media & WhatsApp Direct Links */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={currentFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#4285F4] hover:text-white rounded-lg border border-[#1877F2]/40 text-xs font-bold flex items-center transition-all shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current mr-1.5" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href={`https://wa.me/${currentWhatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg border border-emerald-500/40 text-xs font-bold flex items-center transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>{currentWhatsapp}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: What We Do (Services) */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              {isBn ? "সিকিউরিটি সেবাসমূহ" : "Security Services"}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/manned-guarding" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "ম্যানড সিকিউরিটি গার্ড" : "Manned Guarding"}
                </Link>
              </li>
              <li>
                <Link to="/services/vip-protection" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "ভিআইপি প্রটেকশন ও গানম্যান" : "VIP Protection & Gunman"}
                </Link>
              </li>
              <li>
                <Link to="/services/cash-transit" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "ক্যাশ-ইন-ট্রানজিট লজিস্টিকস" : "Cash-In-Transit Logistics"}
                </Link>
              </li>
              <li>
                <Link to="/services/cleaning-facility" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "পরিচ্ছন্নতা কর্মী ও ড্রাইভার" : "Facility Cleaning & Drivers"}
                </Link>
              </li>
              <li>
                <Link to="/services/event-security" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "ইভেন্ট ক্রাউড কন্ট্রোল" : "Event Crowd Control"}
                </Link>
              </li>
              <li>
                <Link to="/services/electronic-security" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "সিসিটিভি ও মেটাল ডিটেক্টর" : "Electronic CCTV & Archways"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Info & Trust */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              {isBn ? "আমাদের পরিচিতি" : "Who We Are"}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "কোম্পানির বিবরণ ও লক্ষ্য" : "Company Profile & Mission"}
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "এমডি মহোদয়ের বাণী" : "MD Md. Raju Ahmed Message"}
                </Link>
              </li>
              <li>
                <Link to="/management-team" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "ম্যানেজমেন্ট টিম ও কর্মকর্তা" : "Management Team & Officers"}
                </Link>
              </li>
              <li>
                <Link to="/organogram" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "কমান্ড অর্গানোগ্রাম" : "Command Organogram"}
                </Link>
              </li>
              <li>
                <Link to="/licenses" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "সরকারি লাইসেন্স ও সনদ" : "Government Licenses & RJSC"}
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "ট্রেনিং একাডেমি ও ড্রিল" : "Training Academy & Drills"}
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:text-amber-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 text-slate-600" />
                  {isBn ? "৭০+ শীর্ষ করপোরেট ক্লায়েন্ট" : "Our 70+ Prestigious Clients"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Portals & Branches */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              {isBn ? "আঞ্চলিক অফিসসমূহ" : "Regional Hubs"}
            </h5>
            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-slate-200 block">{isBn ? "চট্টগ্রাম অফিস:" : "Chattogram Office:"}</strong>
                <span className="text-slate-400">{isBn ? "আগ্রাবাদ বাণিজ্যিক এলাকা" : "Agrabad Commercial Area"}</span>
              </div>
              <div>
                <strong className="text-slate-200 block">{isBn ? "গাজীপুর শিল্পাঞ্চল হাব:" : "Gazipur Industrial Hub:"}</strong>
                <span className="text-slate-400">{isBn ? "চৌরাস্তা, জয়দেবপুর" : "Chowrasta, Joydebpur"}</span>
              </div>
              <div>
                <strong className="text-slate-200 block">{isBn ? "নারায়ণগঞ্জ অফিস:" : "Narayanganj Office:"}</strong>
                <span className="text-slate-400">{isBn ? "নয়ামাটি রোড" : "Noyamati Road"}</span>
              </div>
              <div>
                <strong className="text-slate-200 block">{isBn ? "সিলেট হাব:" : "Sylhet Hub:"}</strong>
                <span className="text-slate-400">{isBn ? "জিন্দাবাজার বাণিজ্যিক এলাকা" : "Zindabazar Commercial Area"}</span>
              </div>
            </div>

            <div className="pt-3">
              <Link 
                to="/pricing" 
                className="inline-block text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
              >
                {isBn ? "অফিশিয়াল ২৩টি পদের পূর্ণাঙ্গ রেট চার্ট →" : "View Official 23-Role Rate Chart →"}
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Compliance Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} <strong className="text-white">{isBn ? "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লি." : "Best Responsible Security & Logistics Services Ltd."}</strong> {isBn ? "সর্বস্বত্ব সংরক্ষিত। আরজেএসসি গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত।" : "All rights reserved. Reg. under RJSC Govt. of Bangladesh."}
          </p>

          <div className="flex items-center space-x-4 text-slate-400">
            <Link to="/licenses" className="hover:text-amber-400">{isBn ? "লিগ্যাল অনুমোদন" : "Legal Compliance"}</Link>
            <span>•</span>
            <Link to="/career" className="hover:text-amber-400">{isBn ? "গার্ড পদে নিয়োগ" : "Join as Guard"}</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-amber-400">{isBn ? "জরুরি যোগাযোগ" : "Emergency Contact"}</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-amber-400 text-slate-500">{isBn ? "অ্যাডমিন লগইন" : "Admin Login"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
