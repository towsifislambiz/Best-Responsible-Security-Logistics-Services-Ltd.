import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Building, FileCheck, UserPlus, 
  ArrowRight, Phone, Clock, CheckCircle2, ShieldAlert,
  MessageSquare, Mail, MessageCircle, AlertCircle, Award, FileText,
  Download, AlertTriangle, Database, Zap
} from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSiteData } from '../context/SiteDataContext';
import { 
  getMonthEndInfo, 
  autoPrunePreviousMonths, 
  isCurrentMonth, 
  exportMonthlyPDF 
} from '../utils/monthlyManager';

export default function AdminDashboard() {
  const { staffList, clients, managementTeam, licenses } = useSiteData();
  const [requisitions, setRequisitions] = useState([]);
  const [recruitmentApps, setRecruitmentApps] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [prunedNotice, setPrunedNotice] = useState(null);

  // Auto-prune previous months records to keep database clean
  useEffect(() => {
    autoPrunePreviousMonths(db).then((res) => {
      if (res && res.prunedTotal > 0) {
        setPrunedNotice(res);
      }
    });
  }, []);

  // Real-time Firestore sync
  useEffect(() => {
    let unsubs = [];
    try {
      // 1. Requisitions
      const unReq = onSnapshot(collection(db, 'requisitions'), (snap) => {
        const list = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() }));
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setRequisitions(list);
      }, (err) => {
        console.warn('Dashboard requisitions notice:', err.message);
        const cached = localStorage.getItem('brslsl_requisitions');
        if (cached) setRequisitions(JSON.parse(cached));
      });
      unsubs.push(unReq);

      // 2. Recruitment
      const unRec = onSnapshot(collection(db, 'recruitment'), (snap) => {
        const list = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() }));
        list.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
        setRecruitmentApps(list);
      }, (err) => {
        console.warn('Dashboard recruitment notice:', err.message);
        const cached = localStorage.getItem('brslsl_recruitment');
        if (cached) setRecruitmentApps(JSON.parse(cached));
      });
      unsubs.push(unRec);

      // 3. Inquiries
      const unInq = onSnapshot(collection(db, 'inquiries'), (snap) => {
        const list = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() }));
        list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setInquiries(list);
      }, (err) => {
        console.warn('Dashboard inquiries notice:', err.message);
        const cached = localStorage.getItem('brslsl_inquiries_cache');
        if (cached) setInquiries(JSON.parse(cached));
      });
      unsubs.push(unInq);

    } catch (e) {
      console.warn('Firebase error in dashboard:', e);
    }

    return () => unsubs.forEach(fn => fn());
  }, []);

  const pendingRequisitions = requisitions.filter(r => (r.status || 'pending').toLowerCase() === 'pending').length;
  const pendingInquiries = inquiries.filter(i => (i.status || 'Pending').toLowerCase() === 'pending').length;
  const pendingRecruitment = recruitmentApps.filter(a => (a.status || 'new').toLowerCase() === 'new').length;

  const monthInfo = getMonthEndInfo();
  const currentMonthReqs = requisitions.filter(r => isCurrentMonth(r.createdAt || r.serverTime));
  const currentMonthRecs = recruitmentApps.filter(a => isCurrentMonth(a.submittedAt || a.serverTime));
  const currentMonthInqs = inquiries.filter(i => isCurrentMonth(i.createdAt || i.date));
  const totalCurrentMonthRecords = currentMonthReqs.length + currentMonthRecs.length + currentMonthInqs.length;

  // Warning triggers during final 5-6 days of the month ONLY IF at least 1 record exists
  const showWarning = monthInfo.isWarningPeriod && totalCurrentMonthRecords > 0;

  return (
    <div className="space-y-8">
      
      {/* Auto-Prune Notification (if previous month records were cleaned up) */}
      {prunedNotice && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-300 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold">ক্লাউড ডাটাবেজ স্টোরেজ অপ্টিমাইজেশন সম্পন্ন:</span>
              <span className="ml-1 text-slate-300">
                বিগত মাসের অপ্রয়োজনীয় {prunedNotice.prunedTotal}টি পুরাতন রেকর্ড সফলভাবে মুছে স্টোরেজ খালি রাখা হয়েছে।
              </span>
            </div>
          </div>
          <button 
            onClick={() => setPrunedNotice(null)}
            className="text-slate-400 hover:text-white text-[11px] underline cursor-pointer ml-4"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* 5-Day End-of-Month Warning Alert Card */}
      {showWarning && (
        <div className="bg-gradient-to-r from-amber-950/80 via-[#261704] to-amber-950/80 border-2 border-amber-400 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black rounded-full text-xs flex items-center gap-1.5 shadow-md">
                  <AlertTriangle className="w-4 h-4 fill-slate-950 text-amber-400" />
                  <span>জরুরি স্টোরেজ সতর্কবার্তা (End-of-Month Warning)</span>
                </span>
                <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-500/50 rounded-full text-xs font-bold font-mono">
                  ⏳ {monthInfo.monthBn} শেষ হতে আর মাত্র {monthInfo.daysLeft} দিন বাকি
                </span>
                <span className="text-[11px] text-amber-300 font-semibold">
                  (চলতি মাসের মোট রেকর্ড: {totalCurrentMonthRecords} টি)
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  চলতি মাসের সব ডাটা এখনই PDF ডাউনলোড করে ব্যাকআপ রাখুন!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                  ফায়ারস্টোর ডাটাবেজ স্টোরেজ সুরক্ষিত রাখতে <strong>{monthInfo.fullLabel}</strong> মাস শেষ হওয়ার পর পূর্ববর্তী মাসের সকল রিকুইজিশন, চাকরির আবেদন ও বার্তা স্বয়ংক্রিয়ভাবে ডাটাবেজ এবং এডমিন প্যানেল থেকে মুছে যাবে। ডাটা হারানোর পূর্বে নিচে ক্লিক করে অফিশিয়াল PDF ফাইল হিসেবে ডাউনলোড করে নিজের কাছে সংরক্ষণ করুন।
                </p>
              </div>
            </div>

            {/* Direct 1-Click Monthly PDF Download Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={() => exportMonthlyPDF({
                  type: 'requisitions',
                  title: 'সিকিউরিটি গার্ড রিকুইজিশন মাসিক আর্কাইভ',
                  monthLabel: monthInfo.fullLabel,
                  data: currentMonthReqs
                })}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>রিকুইজিশন PDF ডাউনলোড ({currentMonthReqs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => exportMonthlyPDF({
                  type: 'recruitment',
                  title: 'গার্ড চাকরির আবেদন মাসিক আর্কাইভ',
                  monthLabel: monthInfo.fullLabel,
                  data: currentMonthRecs
                })}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white border border-purple-500/30 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>চাকরির আবেদন PDF ({currentMonthRecs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => exportMonthlyPDF({
                  type: 'inquiries',
                  title: 'যোগাযোগ ও মেসেজ মাসিক আর্কাইভ',
                  monthLabel: monthInfo.fullLabel,
                  data: currentMonthInqs
                })}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/30 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>মেসেজ ও ইনকোয়ারি PDF ({currentMonthInqs.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0c2445] via-[#081830] to-[#0c2445] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Command Center Terminal (Cloud Synced)</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, Md. Raju Ahmed & Operations Team
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Real-time control center for incoming guard requisitions, contact inquiries, staff credentials, and corporate client directory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/inquiries"
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl transition-all whitespace-nowrap flex items-center gap-2 border border-slate-700"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Messages ({inquiries.length})</span>
          </Link>

          <Link
            to="/admin/staff"
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xl transition-all whitespace-nowrap"
          >
            + Add New Guard
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid (7 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        
        {/* Card 1: Requisitions */}
        <Link to="/admin/requisitions" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Requisitions</span>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">{requisitions.length}</h3>
            <span className="text-[10px] text-amber-400 font-semibold">{pendingRequisitions} Pending</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
            <FileCheck className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 2: Contact Inquiries */}
        <Link to="/admin/inquiries" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Inquiries</span>
            <h3 className="text-2xl font-black text-sky-400 mt-1">{inquiries.length}</h3>
            <span className="text-[10px] text-amber-400 font-semibold">{pendingInquiries} Unread</span>
          </div>
          <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 3: Job Applicants */}
        <Link to="/admin/recruitment" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Applicants</span>
            <h3 className="text-2xl font-black text-purple-400 mt-1">{recruitmentApps.length}</h3>
            <span className="text-[10px] text-amber-400 font-semibold">{pendingRecruitment} Review</span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 4: Management Team */}
        <Link to="/admin/management-team" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Officers</span>
            <h3 className="text-2xl font-black text-amber-300 mt-1">{managementTeam?.length || 6}</h3>
            <span className="text-[10px] text-emerald-400 font-semibold">Key Command</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-300 rounded-xl group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 5: Govt Licenses */}
        <Link to="/admin/licenses" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Licenses</span>
            <h3 className="text-2xl font-black text-teal-400 mt-1">{licenses?.length || 6}</h3>
            <span className="text-[10px] text-teal-300 font-semibold">Govt Approved</span>
          </div>
          <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 6: Staff Roster */}
        <Link to="/admin/staff" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Guards</span>
            <h3 className="text-2xl font-black text-amber-400 mt-1">{staffList.length}</h3>
            <span className="text-[10px] text-emerald-400 font-semibold">Active Roster</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 7: Corporate Clients */}
        <Link to="/admin/clients" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Clients</span>
            <h3 className="text-2xl font-black text-white mt-1">{clients.length}</h3>
            <span className="text-[10px] text-slate-400">70+ Enterprise</span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
            <Building className="w-5 h-5" />
          </div>
        </Link>

      </div>

      {/* Two-Column Feeds Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Column 1: Recent Requisitions */}
        <div className="bg-[#091e38] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Recent Guard Requisitions</span>
              </h3>
              <p className="text-[11px] text-slate-400">From public budget calculator</p>
            </div>
            <Link to="/admin/requisitions" className="text-xs font-bold text-amber-400 hover:underline flex items-center">
              <span>View All ({requisitions.length})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {requisitions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No requisitions logged yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {requisitions.slice(0, 4).map((req, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <strong className="text-white text-sm block">{req.clientName || 'Private Organization'}</strong>
                    <span className="text-slate-400 text-[11px]">
                      {req.role} ({req.shift}) • Strength: <strong className="text-amber-400">{req.quantity}</strong> • Total: <strong className="text-emerald-400 font-mono">৳{req.monthlyTotal?.toLocaleString()}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {req.phone && (
                      <a href={`tel:${req.phone}`} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold rounded-lg flex items-center text-[11px]">
                        <Phone className="w-3 h-3 mr-1" />
                        <span>{req.phone}</span>
                      </a>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                      {req.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Recent Contact Form Inquiries */}
        <div className="bg-[#091e38] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Recent Contact Inquiries</span>
              </h3>
              <p className="text-[11px] text-slate-400">From public Contact page</p>
            </div>
            <Link to="/admin/inquiries" className="text-xs font-bold text-amber-400 hover:underline flex items-center">
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No contact inquiries received yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {inquiries.slice(0, 4).map((inq, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <strong className="text-white text-sm block">{inq.name || 'Visitor'}</strong>
                    <span className="text-slate-400 text-[11px] line-clamp-1">
                      {inq.subject || 'General Inquiry'}: "{inq.message || ''}"
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold rounded-lg flex items-center text-[11px]">
                        <Phone className="w-3 h-3 mr-1" />
                        <span>{inq.phone}</span>
                      </a>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inq.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                    }`}>
                      {inq.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
