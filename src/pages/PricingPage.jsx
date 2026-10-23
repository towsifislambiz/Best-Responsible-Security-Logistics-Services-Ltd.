import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, Shield, Clock, CheckCircle2, FileText, 
  ArrowRight, Calculator, Filter, AlertCircle
} from 'lucide-react';
import { officialRateChart, companyInfo } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

const roleBnMap = {
  1: { role: "সিকিউরিটি ইন্সপেক্টর", category: "সিকিউরিটি অফিসার", desc: "সামগ্রিক পেরিমিটার কমান্ডের জন্য সিনিয়র প্রাক্তন প্রতিরক্ষা/পুলিশ কর্মকর্তা" },
  2: { role: "সিকিউরিটি অফিসার", category: "সিকিউরিটি অফিসার", desc: "কৌশলগত গার্ড পোস্ট তদারকিকারী কমিশনপ্রাপ্ত কর্মকর্তা" },
  3: { role: "সিকিউরিটি ইন-চার্জ", category: "সিকিউরিটি ইন-চার্জ", desc: "অন-সাইট শিফট সমন্বয়কারী ও দৈনিক অপারেশন প্রধান" },
  4: { role: "সিকিউরিটি সুপারভাইজার", category: "সুপারভাইজার", desc: "গার্ড ড্রিল, উপস্থিতি ও রেজিস্ট্রি লগবুক তদারকিকারী ফিল্ড সুপারভাইজার" },
  5: { role: "সিকিউরিটি গার্ড (পুরুষ)", category: "সাধারণ গার্ড ফোর্স", desc: "স্ট্যান্ডার্ড ফিজিক্যাল গার্ড, উচ্চতা ৫'৬\"+, শতভাগ যাচাইকৃত ব্যাকগ্রাউন্ড" },
  6: { role: "সিকিউরিটি গার্ড (মহিলা)", category: "সাধারণ গার্ড ফোর্স", desc: "কর্পোরেট অফিস, শপিং মল ও শিক্ষা প্রতিষ্ঠানের জন্য প্রশিক্ষিত মহিলা গার্ড" },
  7: { role: "গানম্যান (লাইসেন্সকৃত অস্ত্রসহ)", category: "সশস্ত্র গানম্যান", desc: "ব্যাংক, জুয়েলারি ও ক্যাশ ট্রানজিটের জন্য সরকারি অনুমোদিত অস্ত্রধারী শুটার" },
  8: { role: "ভিআইপি বডিগার্ড (অস্ত্রসহ)", category: "ভিআইপি প্রটেকশন", desc: "ভিআইপি ও এক্সিকিউটিভদের নিবিড় নিরাপত্তার জন্য লাইসেন্সকৃত অস্ত্রধারী স্পেশাল ফোর্স" },
  9: { role: "ভিআইপি বডিগার্ড (অস্ত্রবিহীন)", category: "ভিআইপি প্রটেকশন", desc: "মার্শাল আর্ট ও ক্লোজ প্রোটেকশনে অভিজ্ঞ বাউন্সার ও পার্সোনাল এসকর্ট" },
  10: { role: "ক্লিনিং ইন-চার্জ", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "স্যনিটেশন, হাউসকিপিং ও ডিপ ক্লিনিং টিম প্রধান" },
  11: { role: "ক্লিনিং সুপারভাইজার", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "কর্পোরেট ফ্লোর ও শপিং মলের ক্লিনিং তদারকিকারী সুপারভাইজার" },
  12: { role: "ক্লিনার (পুরুষ)", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "ফ্লোর সুইপিং, ডাস্টিং ও বাণিজ্যিক প্রতিষ্ঠান পরিচ্ছন্নতাকর্মী" },
  13: { role: "ক্লিনার (মহিলা)", category: "ফ্যাসিলিটি ও ক্লিনিং", desc: "ইনডোর অফিস কেবিন ও স্যানিটারি রক্ষণাবেক্ষণ কর্মী" },
  14: { role: "পেশাদার চালক / ড্রাইভার", category: "লজিস্টিকস ও ড্রাইভার", desc: "বিআরটিএ লাইসেন্সপ্রাপ্ত ও ভিআইপি কর্পোরেট গাড়ি চালক" },
  15: { role: "কম্পিউটার অপারেটর", category: "কর্পোরেট সাপোর্ট", desc: "দর্শনার্থী এন্ট্রি, সিসিটিভি মনিটরিং ও ফ্রন্ট ডেস্ক ডেটা এন্ট্রি অপারেটর" },
  16: { role: "ফ্রন্ট ডেস্ক রিসেপশনিস্ট", category: "কর্পোরেট সাপোর্ট", desc: "স্মার্ট কর্পোরেট রিসেপশন ও ক্লায়েন্ট অ্যাক্সেস কন্ট্রোল অফিসার" },
  17: { role: "হেল্প ডেস্ক অফিসার", category: "কর্পোরেট সাপোর্ট", desc: "কাস্টমার সাপোর্ট ও ফ্যাসিলিটি সমন্বয়কারী" },
  18: { role: "প্লাম্বার", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "স্যানিটেশন, ওয়াটার পাম্প ও পাইপলাইন মেরামত টেকনিশিয়ান" },
  19: { role: "কার পেইন্টার", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "অটোমোবাইল কোটিং, ডেন্টিং ও পেইন্ট স্পেশালিস্ট" },
  20: { role: "ল্যান্ডস্কেপ মালি", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "কর্পোরেট বাগান ও গ্রিন ল্যান্ডস্কেপ রক্ষণাবেক্ষণ মালি" },
  21: { role: "লিফট অপারেটর", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "কমার্শিয়াল টাওয়ার লিফট অপারেটর ও জরুরি সহকারী" },
  22: { role: "বিল্ডিং কেয়ারটেকার", category: "ইউটিলিটি ও টেকনিশিয়ান", desc: "আবাসিক ভবনের সার্বিক নিরাপত্তা ও চাবি রক্ষক" },
  23: { role: "ওয়ার্ড বয় / লেডি", category: "হসপিটালিটি ও হেলথকেয়ার", desc: "হাসপাতালের রোগী সেবা, হুইলচেয়ার ও ক্লিনিক্যাল সহকারী" }
};

export default function PricingPage() {
  const { isBn } = useLanguage();
  const { rates } = useSiteData();
  const [filterCat, setFilterCat] = useState('All');

  const activeRates = Array.isArray(rates) && rates.length > 0 ? rates : officialRateChart;
  const categories = ['All', ...new Set(activeRates.map(i => i.category))];

  const filteredRates = filterCat === 'All' 
    ? activeRates 
    : activeRates.filter(i => i.category === filterCat);

  return (
    <div className="bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{isBn ? "অফিশিয়াল ২০২৬ বাণিজ্যিক রেট কার্ড" : "Official 2026 Commercial Rate Card"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "স্বচ্ছ মূল্য তালিকা ও রেট চার্ট" : "Transparent Pricing & Rate Chart"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "আমাদের অফিসিয়াল কর্পোরেট প্রপোজালের ১৫ নম্বর পৃষ্ঠা অনুযায়ী সকল পদের অনুমোদিত রেট তালিকা। ০৮ ঘণ্টা ও ১২ ঘণ্টা শিফটের মাসিক জনপ্রতি খরচ (ভ্যাট/ট্যাক্স ব্যতিত)।"
              : "Directly from page 15 of our official corporate proposal. All rates are per personnel per month for 8-hour and 12-hour duty shifts (without VAT/AIT)."}
          </p>
        </div>

        {/* Quick CTA to Calculator */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl shadow-sm">
              <Calculator className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-slate-900 text-xl font-bold">
                {isBn ? "মুহূর্তেই পূর্ণাঙ্গ বাজেট হিসাব করতে চান?" : "Want an Instant Calculated Total?"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {isBn 
                  ? "আমাদের লাইভ ক্যালকুলেটরে গার্ড সংখ্যা ও শিফট নির্বাচন করে সরাসরি কোটেশন বের করুন।"
                  : "Use our live calculator to configure multiple guards, choose shifts, and generate a quotation."}
              </p>
            </div>
          </div>
          <Link
            to="/hire-guard"
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold rounded-xl shadow-md hover:scale-105 transition-all text-xs sm:text-sm whitespace-nowrap"
          >
            {isBn ? "লাইভ ক্যালকুলেটর চালু করুন →" : "Open Live Calculator →"}
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterCat === cat
                  ? 'bg-[#0a192f] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'All' ? (isBn ? 'সকল পদবী (All)' : 'All') : cat}
            </button>
          ))}
        </div>

        {/* Comprehensive Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0a192f] text-amber-300 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-4 sm:px-6">{isBn ? "নং" : "Sl"}</th>
                  <th className="py-4 px-4 sm:px-6">{isBn ? "পদবী ও দায়িত্ব" : "Designation / Role"}</th>
                  <th className="py-4 px-4 sm:px-6">{isBn ? "বিভাগ" : "Category"}</th>
                  <th className="py-4 px-4 sm:px-6 text-center">{isBn ? "০৮ ঘণ্টা দৈনিক" : "08 Hours Daily"}</th>
                  <th className="py-4 px-4 sm:px-6 text-center">{isBn ? "১২ ঘণ্টা স্ট্যান্ডার্ড" : "12 Hours Daily"}</th>
                  <th className="py-4 px-4 sm:px-6 text-right">{isBn ? "অ্যাকশন" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRates.map((item, idx) => {
                  const roleName = isBn ? (roleBnMap[item.id]?.role || item.role) : item.role;
                  const catName = isBn ? (roleBnMap[item.id]?.category || item.category) : item.category;
                  const descText = isBn ? (roleBnMap[item.id]?.desc || item.description) : item.description;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-slate-900 block font-bold text-sm sm:text-base">
                          {roleName}
                        </strong>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {descText}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                          {catName}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-center">
                        {item.rate8h ? (
                          <span className="font-extrabold text-emerald-600 text-sm sm:text-base">
                            ৳{item.rate8h.toLocaleString()}/-
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-center">
                        {item.rate12h ? (
                          <span className="font-extrabold text-amber-700 text-sm sm:text-base">
                            ৳{item.rate12h.toLocaleString()}/-
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <Link
                          to={`/hire-guard?role=${encodeURIComponent(item.role)}`}
                          className="inline-flex items-center px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-bold border border-amber-200 transition-colors"
                        >
                          <span>{isBn ? "রিকুইজিশন" : "Requisition"}</span>
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Terms & Conditions (PDF Page 15 Ref) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>{isBn ? "অফিশিয়াল আর্থিক ও চুক্তিভিত্তিক শর্তাবলী (প্রপোজাল পৃষ্ঠা ১৫)" : "Official Financial Quotation Notes (Proposal PDF Page 15)"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">{isBn ? "১. অগ্রিম সমন্বয়:" : "1. Advance Adjustment:"}</strong>
              <p>
                {isBn 
                  ? "চুক্তির শুরুতে ০১ (এক) মাসের সার্ভিস চার্জ অগ্রিম প্রদানযোগ্য, যা চুক্তি সমাপ্তির শেষ মাসের বিলের সাথে সম্পূর্ণ সমন্বয় করা হবে।" 
                  : "Client agrees to pay 01 (one) month service charge as advance to the service provider; it will be adjusted with the final month bill."}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">{isBn ? "২. বাৎসরিক উৎসব ভাতা:" : "2. Annual Festival Allowance:"}</strong>
              <p>
                {isBn 
                  ? "বছরে মোট ০১ মাসের সার্ভিস চার্জ উৎসব ভাতা হিসেবে প্রদানযোগ্য (৫০% ঈদুল ফিতর এবং ৫০% ঈদুল আজহার সময়)।" 
                  : "Client agrees to pay one month service charge as Festival Allowance (50% of Eid-ul-Fitr & 50% of Eid-ul-Adha)."}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">{isBn ? "৩. বিলিং ও ভ্যাট/ট্যাক্স:" : "3. Billing & VAT:"}</strong>
              <p>
                {isBn 
                  ? "প্রতি মাসের প্রথম সপ্তাহের মধ্যে মাসিক বিল প্রদান করা হয়। সরকারি এনবিআর বিধি মোতাবেক ভ্যাট ও এআইটি প্রযোজ্য হবে।" 
                  : "Monthly service bills are submitted within the 1st week of each month. VAT & AIT are applicable as per government NBR statutory rules."}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">{isBn ? "৪. দ্রুত গার্ড রিপ্লেসমেন্ট:" : "4. Rapid Replacement:"}</strong>
              <p>
                {isBn 
                  ? "ক্লায়েন্টের চাহিদামাফিক যেকোনো গার্ডের ক্ষেত্রে সর্বোচ্চ ২ ঘণ্টার মধ্যে কোনো অতিরিক্ত চার্জ ছাড়াই বিকল্প গার্ড নিশ্চিত করা হয়।" 
                  : "Any replacement requested by the client will be executed within 2 hours without additional mobilization fee."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
