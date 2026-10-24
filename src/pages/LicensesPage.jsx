import React, { useState } from 'react';
import { 
  FileCheck, Shield, ExternalLink, Download, Eye, 
  X, CheckCircle2, Building, ShieldAlert, Award, ShieldCheck
} from 'lucide-react';
import { legalDocuments } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

export default function LicensesPage() {
  const { isBn } = useLanguage();
  const { licenses } = useSiteData();
  const [selectedDoc, setSelectedDoc] = useState(null);

  const docsToDisplay = (licenses && licenses.length > 0) ? licenses : legalDocuments;

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isBn ? "বিধিবদ্ধ কমপ্লায়েন্স ও আইনি স্বীকৃতি" : "Statutory Compliance & Legal Recognition"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "সরকারি লাইসেন্স ও অনুমোদন সনদসমূহ" : "Government Licenses & Legal Clearances"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লি. গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সকল প্রচলিত আইন ও বিধিমালা সম্পূর্ণভাবে মেনে পরিচালিত হচ্ছে। নিচের সকল সনদসমূহ যাচাইকৃত এবং যেকোনো প্রাতিষ্ঠানিক টেন্ডারের জন্য প্রস্তুত।" 
              : "Best Responsible Security & Logistics Services Ltd. operates in full compliance with the laws of the People's Republic of Bangladesh. All documents below are verified and available for tender audits."}
          </p>
        </div>

        {/* Legal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docsToDisplay.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Document Thumbnail Preview */}
                <div 
                  onClick={() => setSelectedDoc(doc)}
                  className="relative h-64 bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img 
                    src={doc.image} 
                    alt={doc.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Click to Zoom overlay */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center shadow-lg">
                      <Eye className="w-4 h-4 mr-1.5" />
                      {isBn ? "সনদটি বড় করে দেখুন" : "Inspect Full Document"}
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {isBn ? "সরকারি অনুমোদিত কপি" : "Official Govt. Copy"}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-amber-700 text-xs font-semibold">
                    {doc.subtitle}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">
                  Ref: <strong className="text-slate-800">{doc.number}</strong>
                </span>

                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="text-amber-700 hover:text-amber-800 font-bold flex items-center"
                >
                  <span>{isBn ? "হাই-রেস দেখুন" : "View High-Res"}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Statutory Declaration */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-amber-600">
            <Award className="w-6 h-6" />
            <h3 className="text-slate-900 text-xl font-bold">
              {isBn ? "১০০% অডিট ও প্রাতিষ্ঠানিক টেন্ডারের জন্য প্রস্তুত" : "100% Audit & Tender Ready"}
            </h3>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {isBn 
              ? "আমাদের প্রতিষ্ঠান সরকারি বিভিন্ন অধিদপ্তর, বেসরকারি ব্যাংক নেটওয়ার্ক, সমুদ্রবন্দর লজিস্টিকস এবং ইপিজেড শিল্পাঞ্চলের জাতীয় দরপত্রে নিয়মিত অংশগ্রহণ করে থাকে। দায়িত্বপ্রাপ্ত প্রকিউরমেন্ট অফিসারদের পর্যালোচনার জন্য মেমোরেন্ডাম অব অ্যাসোসিয়েশন ও ট্যাক্স ছাড়পত্রের সত্যায়িত কপি সর্বদা উন্মুক্ত রয়েছে।" 
              : "Our company participates in national tenders for government agencies, bank networks, seaport logistics, and industrial EPZ zones. Certified true copies of our Articles of Association, Memorandum, and Tax Clearance Certificates are available upon request for authorized corporate procurement officers."}
          </p>
        </div>

      </div>

      {/* Full-Screen High-Res Modal Lightbox */}
      {selectedDoc && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedDoc(null)}
        >
          <div 
            className="bg-white border border-slate-300 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-slate-900 font-bold text-base">{selectedDoc.title}</h3>
                <p className="text-amber-700 text-xs">{selectedDoc.subtitle} (Ref: {selectedDoc.number})</p>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 flex justify-center bg-slate-100">
              <img 
                src={selectedDoc.image} 
                alt={selectedDoc.title} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-xl"
              />
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-600">
              <span>{selectedDoc.desc}</span>
              <a 
                href={selectedDoc.image} 
                download 
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                {isBn ? "মূল স্ক্যান কপি ডাউনলোড" : "Download Original Scan"}
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
