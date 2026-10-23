import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useSiteData } from '../context/SiteDataContext';

export default function WhatsAppButton() {
  const { siteSettings } = useSiteData();
  const rawNumber = siteSettings?.whatsapp || companyInfo.contacts.whatsapp || "8801604022929";
  const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');
  const defaultText = encodeURIComponent("Hello Best Responsible Security & Logistics Ltd, I am interested in hiring security personnel / requesting a quotation.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center group shadow-2xl"
      aria-label="Chat with Best Responsible Security on WhatsApp"
    >
      <div className="hidden sm:flex items-center bg-[#071527] text-white text-xs font-bold px-3 py-2 rounded-l-full border border-r-0 border-emerald-500/40 shadow-lg group-hover:bg-[#0d233e] transition-colors">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
        <span>Chat on WhatsApp</span>
      </div>
      <div className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20">
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
      </div>
    </a>
  );
}
