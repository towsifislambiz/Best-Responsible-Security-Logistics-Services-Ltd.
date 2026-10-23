import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ShieldCheck, Award, Star, CheckCircle2, 
  ArrowRight, Search, FileText
} from 'lucide-react';
import { clientSectors, companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

export default function ClientsPage() {
  const { isBn } = useLanguage();
  const { clients: liveClients } = useSiteData();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const allClients = (Array.isArray(liveClients) && liveClients.length > 0)
    ? liveClients
    : clientSectors.flatMap(s => 
        s.clients.map(c => ({ ...c, category: s.category }))
      );

  const filteredClients = allClients.filter(c => {
    const matchesCat = selectedCat === 'All' || c.category === selectedCat;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.type.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? "জাতীয় আস্থার প্রতীক" : "National Footprint of Trust"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "আমাদের সম্মানিত ক্লায়েন্ট ও অংশীদারবৃন্দ" : "Our Prestigious Clients & Partners"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "বাংলাদেশের ৭০টিরও বেশি শীর্ষস্থানীয় শিল্প গ্রুপ, কমার্শিয়াল শপিং মল, রপ্তানিমুখী টেক্সটাইল মিল ও বিশেষায়িত হাসপাতালের নিরাপত্তায় আমরা গর্বিত অংশীদার।" 
              : "Proudly safeguarding over 70 premier corporate groups, commercial shopping complexes, export textile mills, and specialized hospitals across Bangladesh."}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={isBn ? "ক্লায়েন্টের নাম দিয়ে খুঁজুন (যেমন: Navana, Amana)..." : "Search clients (e.g. Navana, Rupayan)..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['All', ...clientSectors.map(s => s.category)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedCat === cat
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? (isBn ? 'সকল খাত (All)' : 'All') : cat.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredClients.map((client, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 hover:border-amber-400 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-200">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 font-bold text-sm sm:text-base group-hover:text-amber-700 transition-colors">
                  {client.name}
                </h3>
                <p className="text-amber-800 text-xs font-semibold">
                  {client.type}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{client.category}</span>
                <span className="text-emerald-700 font-bold">{isBn ? "সক্রিয় ক্লায়েন্ট" : "Active"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Letters Teaser */}
        <div className="bg-gradient-to-r from-[#0a192f] via-[#0d213f] to-[#0a192f] border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-400/20 rounded-2xl border border-amber-400/30 text-amber-400">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">
                {isBn ? "ক্লায়েন্টদের সন্তুষ্টি প্রশংসাপত্র দেখতে চান?" : "Want to Inspect Official Client Appreciation Letters?"}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                {isBn 
                  ? "আমাদের কর্পোরেট ক্লায়েন্টদের মূল প্রশংসাপত্র ও সাইট পারফরম্যান্স রিপোর্ট সংগ্রহে রয়েছে।" 
                  : "We maintain signed certificates of satisfactory duty performance from leading conglomerates."}
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg whitespace-nowrap"
          >
            {isBn ? "কর্পোরেট ব্রোশিউর চান →" : "Request Corporate Brochure →"}
          </Link>
        </div>

      </div>
    </div>
  );
}
