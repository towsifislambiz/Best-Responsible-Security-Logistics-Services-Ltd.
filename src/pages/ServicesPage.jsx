import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, CheckCircle2, ArrowRight, ShieldCheck, 
  Target, Truck, Sparkles, Users, Video, FileCheck
} from 'lucide-react';
import { servicesList } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesPage() {
  const { isBn } = useLanguage();

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? "অপারেশন সক্ষমতা ও সেবাসমূহ" : "Operational Capabilities"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "সিকিউরিটি ও লজিস্টিকস সেবাসমূহ" : "Security & Logistics Services"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "ম্যানড ফিজিক্যাল গার্ডিং থেকে শুরু করে ট্যাকটিক্যাল ক্যাশ ট্রানজিট ও ফ্যাসিলিটি ক্লিনিং—আমাদের ৭০০+ সদস্যের পেশাদার ফোর্স সারা দেশে সর্বোচ্চ নিরাপত্তা প্রদান করে।" 
              : "From manned physical guarding to tactical cash transit and corporate cleaning logistics, our 700+ force delivers end-to-end peace of mind across Bangladesh."}
          </p>
        </div>

        {/* Services Full List Grid */}
        <div className="space-y-12">
          {servicesList.map((service, idx) => (
            <div 
              key={service.slug}
              className={`bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className={`lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 h-72 lg:h-80 shadow-md ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {isBn ? (service.banglaBadge || service.badge) : service.badge}
                </span>
              </div>

              {/* Text Side */}
              <div className={`lg:col-span-7 space-y-4 ${
                idx % 2 === 1 ? 'lg:order-1' : ''
              }`}>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                    {isBn ? `সেবা ০${idx + 1}` : `Service 0${idx + 1}`}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{isBn ? service.title : service.banglaTitle}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {isBn ? service.banglaTitle : service.title}
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {isBn ? (service.banglaShortDesc || service.shortDesc) : service.shortDesc}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {(isBn && service.banglaFeatures ? service.banglaFeatures : service.features).map((feat, fidx) => (
                    <div key={fidx} className="flex items-start text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link 
                    to={`/services/${service.slug}`}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center"
                  >
                    <span>{isBn ? "বিস্তারিত বিবরণ দেখুন" : "View Full Specs"}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <Link 
                    to={`/hire-guard?service=${service.slug}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all"
                  >
                    {isBn ? "বাজেট হিসাব ও নিয়োগ" : "Calculate Budget & Hire"}
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
