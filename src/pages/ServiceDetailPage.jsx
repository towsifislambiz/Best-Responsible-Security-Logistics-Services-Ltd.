import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Shield, CheckCircle2, ArrowRight, Phone, Clock, 
  Award, Building, AlertCircle, ChevronRight, MessageCircle
} from 'lucide-react';
import { servicesList, officialRateChart, companyInfo } from '../data/companyData';
import { useSiteData } from '../context/SiteDataContext';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { rates: liveRates, siteSettings } = useSiteData();
  const service = servicesList.find((s) => s.slug === slug);
  const currentHotline = siteSettings?.hotline || companyInfo.contacts.hotline;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const activeRateChart = Array.isArray(liveRates) && liveRates.length > 0 ? liveRates : officialRateChart;

  // Find related rates from official rate chart
  const relatedRates = activeRateChart.filter((r) => 
    service.rolesIncluded?.some((roleName) => r.role.toLowerCase().includes(roleName.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-amber-600">Services</Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">{service.title}</span>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-xl bg-gradient-to-r from-[#0a192f] via-[#0d213f] to-[#0a192f]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {service.badge}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-amber-400 text-base sm:text-lg font-semibold">
                {service.banglaTitle}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to={`/hire-guard?service=${service.slug}`}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl text-sm shadow-xl hover:scale-105 transition-all flex items-center"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Hire This Service Now</span>
                </Link>

                <a
                  href={`tel:${currentHotline}`}
                  className="px-5 py-3.5 bg-slate-900/80 hover:bg-slate-900 text-white font-bold rounded-xl text-sm border border-slate-700 transition-colors flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2 text-amber-400" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl h-80">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Tactical Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Tactical Operational Standards
            </h3>
            
            <div className="space-y-3">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Standard Protocol 0{i + 1}</strong>
                    <span className="text-xs text-slate-600">{feat}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>
                All deployments include pre-site survey, emergency replacement coverage, and surprise night inspection visits.
              </span>
            </div>
          </div>

          {/* Right Column: Official Rate Breakdown for this Service */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h4 className="text-slate-900 font-bold text-base">Official Monthly Rates</h4>
              <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                Proposal Ref
              </span>
            </div>

            <div className="space-y-3">
              {relatedRates.length > 0 ? (
                relatedRates.map((r) => (
                  <div key={r.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-slate-900 text-xs sm:text-sm">{r.role}</strong>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 border-t border-slate-200 pt-1.5">
                      <span>08 Hours: <strong className="text-emerald-700 font-bold">{r.rate8h ? `৳${r.rate8h.toLocaleString()}/-` : 'N/A'}</strong></span>
                      <span>12 Hours: <strong className="text-amber-700 font-bold">{r.rate12h ? `৳${r.rate12h.toLocaleString()}/-` : 'N/A'}</strong></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Custom turnkey quote provided based on facility scale.
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                to={`/hire-guard?service=${service.slug}`}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center shadow-md transition-all"
              >
                <span>Calculate Total for Multiple Personnel →</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
