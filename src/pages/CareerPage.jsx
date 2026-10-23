import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, Shield, User, Phone, 
  MapPin, Calendar, Award, FileText, CheckCircle, AlertCircle
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';

export default function CareerPage() {
  const { isBn } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nid: '',
    role: 'Security Guard (Male)',
    height: '5\' 6"',
    age: '26',
    education: 'SSC Passed',
    district: 'Dhaka',
    experience: 'None (Fresher)',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const jobOpenings = [
    { 
      role: "Security Guard (Male)", 
      roleBn: "সিকিউরিটি গার্ড (পুরুষ)",
      vacancies: isBn ? "৫০+ পদ খালি" : "50+ Openings", 
      salary: isBn ? "৳১৪,৫০০ – ৳১৬,৫০০" : "৳14,500 – ৳16,500", 
      reqs: isBn ? "ন্যূনতম উচ্চতা ৫'৬\", অষ্টম শ্রেণি থেকে এসএসসি পাস, সম্পূর্ণ নিষ্কলুষ পুলিশ রেকর্ড।" : "Min 5'6\" height, Class 8 to SSC, Clean police record" 
    },
    { 
      role: "Security Guard (Female)", 
      roleBn: "সিকিউরিটি গার্ড (মহিলা)",
      vacancies: isBn ? "১৫+ পদ খালি" : "15+ Openings", 
      salary: isBn ? "৳১৪,৫০০ – ৳১৬,৫০০" : "৳14,500 – ৳16,500", 
      reqs: isBn ? "ন্যূনতম উচ্চতা ৫'২\", মার্জিত স্বভাব, কর্পোরেট শপিং মল ও হাসপাতালের জন্য।" : "Min 5'2\" height, polite demeanor, corporate mall & hospital duty" 
    },
    { 
      role: "Security Supervisor", 
      roleBn: "সিকিউরিটি সুপারভাইজার",
      vacancies: isBn ? "০৮টি পদ খালি" : "08 Openings", 
      salary: isBn ? "৳১৭,৫০০ – ৳২৪,৫০০" : "৳17,500 – ৳24,500", 
      reqs: isBn ? "ন্যূনতম ২ বছরের সিকিউরিটি অভিজ্ঞতা অথবা প্রাক্তন ডিফেন্স সদস্য, নেতৃত্ব গুণাবলী।" : "Min 2 years security experience or ex-defense personnel, leadership skills" 
    },
    { 
      role: "Gunman (With Arms)", 
      roleBn: "গানম্যান (লাইসেন্সকৃত অস্ত্রসহ)",
      vacancies: isBn ? "০৬টি পদ খালি" : "06 Openings", 
      salary: isBn ? "৳৩৫,০০০ – ৳৫০,০০০" : "৳35,000 – ৳50,000", 
      reqs: isBn ? "সরকারি বৈধ অস্ত্রের লাইসেন্সধারী, ব্যাংক ও ক্যাশ এসকর্ট অপারেশনে দক্ষ শুটার।" : "Valid firearms license holder, bank & VIP bullion cash escort experience" 
    },
    { 
      role: "Corporate Chauffeur / Driver", 
      roleBn: "পেশাদার ড্রাইভার / চালক",
      vacancies: isBn ? "১০টি পদ খালি" : "10 Openings", 
      salary: isBn ? "৳৩৫,০০০ – ৳৫০,০০০" : "৳35,000 – ৳50,000", 
      reqs: isBn ? "বৈধ বিআরটিএ প্রফেশনাল ড্রাইভিং লাইসেন্স, ঢাকায় ভিআইপি গাড়ি চালানোর ৩+ বছরের অভিজ্ঞতা।" : "Valid BRTA professional license, 3+ years driving experience in Dhaka" 
    },
    { 
      role: "Commercial Cleaner (Male/Female)", 
      roleBn: "বাণিজ্যিক পরিচ্ছন্নতাকর্মী (পুরুষ/মহিলা)",
      vacancies: isBn ? "২৫টি পদ খালি" : "25 Openings", 
      salary: isBn ? "৳১৩,৫০০ – ৳১৫,৫০০" : "৳13,500 – ৳15,500", 
      reqs: isBn ? "অফিস ফ্লোর স্যানিটেশন, ঝাড়ু ও ডাস্টিং কাজে দক্ষ, সৎ ও পরিশ্রমী কর্মী।" : "Office sanitation, floor scrubbing, honest and hardworking" 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.nid) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে আপনার পূর্ণ নাম, মোবাইল নম্বর এবং এনআইডি নম্বর দিন।' : 'Please fill in your Full Name, Phone Number, and NID Number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const applicationData = {
        ...formData,
        status: 'new',
        submittedAt: new Date().toISOString()
      };

      try {
        await addDoc(collection(db, 'recruitment'), {
          ...applicationData,
          serverTime: serverTimestamp()
        });
      } catch (fbErr) {
        console.warn('Firestore notice (falling back to local cache):', fbErr);
      }

      const existing = JSON.parse(localStorage.getItem('brslsl_recruitment') || '[]');
      existing.unshift({ ...applicationData, id: 'APP-' + Date.now() });
      localStorage.setItem('brslsl_recruitment', JSON.stringify(existing));

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(isBn ? 'আবেদন জমা দেওয়া সম্ভব হয়নি। সরাসরি আমাদের এইচআর নম্বরে কল করুন।' : 'Could not submit application. Please call our HR line directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? "আমাদের পরিবারে যোগ দিন" : "Join Our Elite Force"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? "ক্যারিয়ার ও গার্ড নিয়োগ পোর্টাল" : "Career & Guard Recruitment Portal"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn 
              ? "বাংলাদেশের দ্রুত বর্ধনশীল সিকিউরিটি সংস্থায় একটি সুশৃঙ্খল ও সম্মানজনক ক্যারিয়ার গড়ে তুলুন। নিয়মিত বেতন, বছরে ২টি ঈদ বোনাস, ফ্রি আবাসন ও চিকিৎসা সুবিধা উপভোগ করুন।"
              : "Build a disciplined, respected career with Bangladesh's fastest growing security service. Enjoy on-time bank salary, two festival bonuses, free accommodation, and medical insurance."}
          </p>
        </div>

        {/* Current Job Openings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            {isBn ? "চলমান নিয়োগ বিজ্ঞপ্তিসমূহ" : "Active Job Positions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpenings.map((job, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 hover:border-amber-400 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200">
                      {job.vacancies}
                    </span>
                    <span className="text-amber-700 font-extrabold text-xs sm:text-sm">
                      {job.salary}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isBn ? job.roleBn : job.role}
                  </h3>
                  <p className="text-slate-600 text-xs mt-1">{job.reqs}</p>
                </div>

                <a 
                  href="#apply-form" 
                  onClick={() => setFormData(prev => ({ ...prev, role: job.role }))}
                  className="w-full text-center py-2 bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-800 text-xs font-bold rounded-lg transition-colors border border-slate-200"
                >
                  {isBn ? "এই পদের জন্য আবেদন করুন" : "Apply for this Role"}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid (From PDF Page 16) */}
        <div className="bg-gradient-to-r from-[#0a192f] via-[#0d213f] to-[#0a192f] border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-xl">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            {isBn ? "কোম্পানির পক্ষ থেকে নিশ্চিত সুযোগ-সুবিধা" : "Guaranteed Company Benefits"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-center">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
              <span className="text-amber-400 font-bold block mb-1">
                {isBn ? "প্রতি মাসে নিয়মিত বেতন" : "On-Time Salary"}
              </span>
              <span className="text-slate-300">
                {isBn ? "১ থেকে ৭ তারিখের মধ্যে" : "1st to 7th of every month"}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
              <span className="text-amber-400 font-bold block mb-1">
                {isBn ? "২টি উৎসব ভাতা (ঈদ বোনাস)" : "2 Eid Festival Bonuses"}
              </span>
              <span className="text-slate-300">
                {isBn ? "ঈদুল ফিতর ও ঈদুল আজহা" : "Eid-ul-Fitr & Eid-ul-Adha"}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
              <span className="text-amber-400 font-bold block mb-1">
                {isBn ? "বিনামূল্যে থাকার ব্যারাক" : "Free Living Barracks"}
              </span>
              <span className="text-slate-300">
                {isBn ? "নিরাপদ আবাসন ও মেস" : "Safe guard accommodation"}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
              <span className="text-amber-400 font-bold block mb-1">
                {isBn ? "চিকিৎসা ও দুর্ঘটনা বীমা" : "Accident Insurance"}
              </span>
              <span className="text-slate-300">
                {isBn ? "ডিউটিরত অবস্থায় সম্পূর্ণ কভার" : "Full on-duty medical cover"}
              </span>
            </div>
          </div>
        </div>

        {/* Online Application Form */}
        <div id="apply-form" className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              {isBn ? "অনলাইন গার্ড নিয়োগ আবেদন ফরম" : "Online Guard Application Form"}
            </h3>
            <p className="text-xs text-slate-600">
              {isBn 
                ? "আপনার সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন। আমাদের এইচআর অফিসার সরাসরি আপনার সাথে ফোনে যোগাযোগ করবেন।" 
                : "Fill in your information and our HR officer will call you for physical interview."}
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-300 p-8 rounded-2xl text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">
                {isBn ? "আবেদন সফলভাবে গ্রহণ করা হয়েছে!" : "Application Received!"}
              </h4>
              <p className="text-xs text-slate-600">
                {isBn 
                  ? `ধন্যবাদ ${formData.name}। ${formData.role} পদের জন্য আপনার আবেদনটি আমাদের সিস্টেমে সংরক্ষিত হয়েছে। আমাদের এইচআর টিম আপনার মোবাইল নম্বরে (${formData.phone}) শীঘ্রই কল করবে।`
                  : `Thank you, ${formData.name}. Your application for ${formData.role} has been logged into our Recruitment Registry. Our HR cell will contact you at ${formData.phone} shortly.`}
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700"
              >
                {isBn ? "আরেকটি আবেদন ফরম পূরণ করুন" : "Submit Another Application"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "আপনার পূর্ণ নাম (বাংলা বা ইংরেজি) *" : "Full Name (বাংলায় বা ইংরেজিতে) *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? "যেমন: মো. সুমন মিয়া" : "e.g. Md. Sumon Mia"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "সচল মোবাইল নম্বর *" : "Mobile Number (সচল মোবাইল নম্বর) *"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "জাতীয় পরিচয়পত্র (এনআইডি) নম্বর *" : "National ID (NID) Number *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? "১০ বা ১৭ সংখ্যার এনআইডি নম্বর" : "১০ বা ১৭ সংখ্যার জাতীয় পরিচয়পত্র নম্বর"}
                    value={formData.nid}
                    onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "আবেদনকৃত পদবী" : "Applying For Position"}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  >
                    {jobOpenings.map((j, i) => (
                      <option key={i} value={j.role}>
                        {isBn ? j.roleBn : j.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "উচ্চতা (ফিট ও ইঞ্চি)" : "Height (উচ্চতা)"}
                  </label>
                  <input
                    type="text"
                    placeholder={isBn ? "যেমন: ৫ ফিট ৭ ইঞ্চি" : "e.g. 5 ft 7 in"}
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "বয়স" : "Age (বয়স)"}
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "স্থায়ী নিজ জেলা" : "Home District (নিজ জেলা)"}
                  </label>
                  <input
                    type="text"
                    placeholder={isBn ? "যেমন: টাঙ্গাইল, কুমিল্লা, বগুড়া" : "e.g. Tangail, Cumilla, Bogura"}
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isBn ? "শিক্ষাগত যোগ্যতা" : "Educational Qualification"}
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  >
                    <option value="Class 8 Passed">{isBn ? "৮ম শ্রেণি পাস" : "Class 8 Passed (৮ম শ্রেণি)"}</option>
                    <option value="SSC Passed">{isBn ? "এসএসসি পাস" : "SSC Passed (এসএসসি)"}</option>
                    <option value="HSC Passed">{isBn ? "এইচএসসি পাস" : "HSC Passed (এইচএসসি)"}</option>
                    <option value="Degree / Honors">{isBn ? "ডিগ্রি / অনার্স পাস" : "Degree / Honors"}</option>
                  </select>
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-500 text-xs flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  {errorMsg}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting 
                    ? (isBn ? 'আবেদন জমা দেওয়া হচ্ছে...' : 'Submitting Application...') 
                    : (isBn ? 'নিয়োগ আবেদনপত্র জমা দিন' : 'Submit Guard Application')}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
