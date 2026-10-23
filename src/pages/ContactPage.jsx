import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  MessageCircle, Building, ShieldAlert, Award, ExternalLink, Sparkles
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

export default function ContactPage() {
  const { isBn } = useLanguage();
  const { siteSettings } = useSiteData();
  const currentHotline = siteSettings?.hotline || companyInfo.contacts.hotline;
  const currentMobileDisplay = siteSettings?.mobileDisplay || companyInfo.contacts.mobileDisplay;
  const currentMdPhone = siteSettings?.mdPhone || companyInfo.managingDirector.phone;
  const currentWhatsapp = siteSettings?.whatsapp || companyInfo.contacts.whatsapp;
  const currentEmail = siteSettings?.email || companyInfo.contacts.email;
  const currentFacebook = siteSettings?.facebook || companyInfo.contacts.facebook || "https://www.facebook.com/brslsl01";
  const currentHeadOffice = siteSettings?.headOfficeAddress || companyInfo.locations.headOffice.address;
  const currentCorpOffice = siteSettings?.corporateOfficeAddress || companyInfo.locations.corporateOffice.address;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Security Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      try {
        await addDoc(collection(db, 'inquiries'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Inquiry notice (offline):', err);
      }

      const existing = JSON.parse(localStorage.getItem('brslsl_inquiries') || '[]');
      existing.unshift({ ...formData, id: 'INQ-' + Date.now(), date: new Date().toISOString() });
      localStorage.setItem('brslsl_inquiries', JSON.stringify(existing));

      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-4 py-1.5 rounded-full text-amber-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <Phone className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{isBn ? "২৪/৭ সার্বক্ষণিক অপারেশন কমান্ড সেল" : "24/7 Rapid Emergency Response Cell"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isBn ? "যোগাযোগ ও প্রধান অফিসসমূহ" : "Official Contact & Operations Hubs"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isBn 
              ? "জরুরি সিকিউরিটি গার্ড মোতায়েন, ভিআইপি এস্কর্ট কিংবা করপোরেট সাইট পরিদর্শনের জন্য আমাদের মিরপুর হেড অফিস বা উত্তরা কর্পোরেট সেন্টারে সরাসরি যোগাযোগ করুন।"
              : "Reach our Mirpur Head Office, Uttara Corporate Center, or any of our 4 regional branch hubs anytime for emergency force deployment or site inspections."}
          </p>
        </div>

        {/* Primary Command Offices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Head Office (Mirpur) */}
          <div className="bg-white border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg shadow-amber-500/5 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold shadow-2xs">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                      {isBn ? "হেড অফিস • সেন্ট্রাল কমান্ড" : "HEAD OFFICE • CENTRAL COMMAND"}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5"></span>
                  24/7 Active
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isBn ? "মিরপুর অপারেশন্স সেন্টার" : "Mirpur Operations Center"}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                  {currentHeadOffice}
                </p>
              </div>
              
              <div className="pt-3 space-y-2.5 text-xs border-t border-slate-100">
                <div className="flex items-center space-x-2 text-slate-800">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-semibold">{isBn ? "অফিসিয়াল হটলাইন:" : "Official Hotline:"}</span>
                  <a href={`tel:${currentHotline}`} className="font-extrabold text-slate-900 hover:text-amber-600 transition-colors">
                    {currentHotline}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{isBn ? "অপারেশন মোবাইল:" : "Operations Mobile:"}</span>
                  <span className="font-bold text-slate-900">{currentMobileDisplay}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-semibold">{isBn ? "অফিসিয়াল ইমেইল:" : "Official Email:"}</span>
                  <a href={`mailto:${currentEmail}`} className="font-bold text-sky-700 hover:underline">
                    {currentEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-2.5">
              <a
                href={`tel:${currentHotline}`}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                <span>{isBn ? "হটলাইনে কল করুন" : "Call Hotline"}</span>
              </a>
              <a
                href={`https://wa.me/${currentWhatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Corporate & MD Office (Uttara) */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:border-slate-300 transition-all relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold shadow-2xs">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {isBn ? "কর্পোরেট ও এমডি অফিস" : "CORPORATE & MD SUITE"}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  Executive Suite
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isBn ? "উত্তরা কর্পোরেট সেন্টার" : "Uttara Corporate Office"}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                  {currentCorpOffice}
                </p>
              </div>
              
              <div className="pt-3 space-y-2.5 text-xs border-t border-slate-100">
                <div className="flex items-center space-x-2 text-slate-800">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-semibold">{isBn ? "ব্যবস্থাপনা পরিচালক সেল:" : "Managing Director Cell:"}</span>
                  <a href={`tel:${currentMdPhone}`} className="font-extrabold text-slate-900 hover:text-amber-600 transition-colors">
                    {currentMdPhone}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{isBn ? "জরুরি ডিউটি সেল:" : "Emergency Duty Desk:"}</span>
                  <span className="font-bold text-emerald-800">{isBn ? "২৪ ঘণ্টা / ৭ দিন সার্বক্ষণিক" : "24 Hours / 7 Days Live"}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-semibold">{isBn ? "সাপোর্ট ও কন্ট্রাক্ট:" : "Support & Contracts:"}</span>
                  <a href={`mailto:${currentEmail}`} className="font-bold text-sky-700 hover:underline">
                    {currentEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-2.5">
              <a
                href={`tel:${currentMdPhone}`}
                className="flex-1 min-w-[140px] py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                <span>{isBn ? "এমডি স্যারের ডিরেক্ট সেল" : "Call MD Directly"}</span>
              </a>
              <a
                href={`https://wa.me/${currentWhatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={currentFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-xl text-xs flex items-center justify-center transition-all shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current mr-1.5" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* 4 Regional Hubs Strip */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {isBn ? "সারাদেশে নেটওয়ার্ক" : "NATIONWIDE NETWORK"}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {isBn ? "৪টি কৌশলগত আঞ্চলিক অপারেশন হাব" : "4 Strategic Regional Operations Hubs"}
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              {isBn ? "অন-সাইট সিকিউরিটি ইন্সপেকশন ও দ্রুত ব্যাকআপ মোতায়েনের জন্য সার্বক্ষণিক প্রস্তুত।" : "Equipped for rapid backup deployment and continuous field monitoring across major zones."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyInfo.locations.branches.map((b, i) => (
              <div 
                key={i} 
                className="bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-amber-300 rounded-2xl p-4 space-y-2.5 transition-all hover:shadow-md group"
              >
                <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm group-hover:text-amber-800 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="truncate">{b.name}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed min-h-[32px]">{b.address}</p>
                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{isBn ? "হটলাইন সেল" : "Duty Cell"}</span>
                  <a 
                    href={`tel:${b.phone}`} 
                    className="text-xs font-mono font-bold text-amber-700 hover:text-amber-900 flex items-center"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    <span>{b.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Google Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Message Form */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {isBn ? "দ্রুত ইনকোয়ারি পোর্টাল" : "DIRECT INQUIRY DESK"}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {isBn ? "অপারেশন্স ডেস্কে বার্তা পাঠান" : "Send Us a Direct Message"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isBn 
                  ? "আমাদের সিনিয়র কাস্টমার অপারেশন কর্মকর্তা ৩০ মিনিটের মধ্যে আপনার সাথে ফোনে যোগাযোগ করবেন।" 
                  : "Our customer operations officer will reply within 30 minutes."}
              </p>
            </div>

            {isSuccess ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 p-8 rounded-3xl text-center space-y-3 shadow-md">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-black text-slate-900">
                  {isBn ? "বার্তা সফলভাবে পাঠানো হয়েছে!" : "Message Dispatched Successfully!"}
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {isBn 
                    ? "যোগাযোগ করার জন্য ধন্যবাদ। আমাদের ডিউটি কমান্ড অফিসার আপনার বার্তাটি পেয়েছেন এবং শীঘ্রই কল করবেন।" 
                    : "Thank you for reaching out. A duty command officer has received your message and will call you shortly."}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                  >
                    {isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 text-xs">
                    {isBn ? "আপনার পূর্ণ নাম *" : "Your Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? "যেমন: ইঞ্জি. তানভীর আহমেদ" : "e.g. Engr. Tanvir Ahmed"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50/70 hover:bg-white border-2 border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 text-xs">
                      {isBn ? "মোবাইল নম্বর *" : "Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50/70 hover:bg-white border-2 border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 text-xs">
                      {isBn ? "ইমেইল এড্রেস" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50/70 hover:bg-white border-2 border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 text-xs">
                    {isBn ? "বার্তা বা গার্ড রিকুইজিশন বিবরণ *" : "Message / Guard Requisition Details *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={isBn ? "আপনার প্রতিষ্ঠানের অবস্থান, কতজন গার্ড প্রয়োজন বা অন্যান্য তথ্য লিখুন..." : "Describe your site location, guard requirements, or questions..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50/70 hover:bg-white border-2 border-slate-200 text-slate-900 rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-md flex items-center justify-center transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>
                    {isSubmitting 
                      ? (isBn ? 'বার্তা পাঠানো হচ্ছে...' : 'Sending Message...') 
                      : (isBn ? 'অপারেশন্স ডেস্কে বার্তা পাঠান' : 'Send Inquiry to Operations Desk')}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {isBn ? "লোকেশন পিন" : "MAP PIN"}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {isBn ? "হেড অফিস লোকেশন মানচিত্র" : "Head Office Location Map"}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? "যুবরাজ প্লাজা, পশ্চিম শেওড়াপাড়া বাস স্ট্যান্ড, মিরপুর, ঢাকা-১২১৬" : "Juboraj Plaza, West Shewrapara Bus Stand, Mirpur, Dhaka-1216"}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-slate-200 h-80 sm:h-96 w-full shadow-inner">
              <iframe
                title="BRSLSL Head Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.841324128522!2d90.36952861543162!3d23.788661693240215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b490807b03%3A0x6b4476059d08479e!2sShewrapara%20Bus%20Stand%2C%20Mirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1689230192841!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span>{isBn ? "বাস স্ট্যান্ড: পশ্চিম শেওড়াপাড়া (বেগম রোকেয়া সরণি)" : "Bus Stop: West Shewrapara (Begum Rokeya Sarani)"}</span>
              <a 
                href="https://maps.google.com/?q=Shewrapara+Bus+Stand+Mirpur+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 font-extrabold hover:underline flex items-center"
              >
                <span>{isBn ? "গুগল ম্যাপে দেখুন" : "Open in Google Maps"}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
