import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Building, FileCheck, UserPlus, 
  ArrowRight, Phone, Clock, CheckCircle2, ShieldAlert,
  MessageSquare, Mail, MessageCircle, AlertCircle
} from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSiteData } from '../context/SiteDataContext';

export default function AdminDashboard() {
  const { staffList, clients } = useSiteData();
  const [requisitions, setRequisitions] = useState([]);
  const [recruitmentApps, setRecruitmentApps] = useState([]);
  const [inquiries, setInquiries] = useState([]);

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

  return (
    <div className="space-y-8">
      
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

      {/* Metrics Cards Grid (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
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
            <span className="text-slate-400 text-[11px] font-bold uppercase">Contact Inquiries</span>
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
            <span className="text-slate-400 text-[11px] font-bold uppercase">Job Applicants</span>
            <h3 className="text-2xl font-black text-purple-400 mt-1">{recruitmentApps.length}</h3>
            <span className="text-[10px] text-amber-400 font-semibold">{pendingRecruitment} Review</span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 4: Staff Roster */}
        <Link to="/admin/staff" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Active Force</span>
            <h3 className="text-2xl font-black text-amber-400 mt-1">{staffList.length} Guards</h3>
            <span className="text-[10px] text-emerald-400 font-semibold">Trained & Vetted</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </Link>

        {/* Card 5: Corporate Clients */}
        <Link to="/admin/clients" className="bg-[#091e38] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl shadow-xl flex items-center justify-between transition-all group cursor-pointer">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase">Clients Brand</span>
            <h3 className="text-2xl font-black text-white mt-1">{clients.length}</h3>
            <span className="text-[10px] text-slate-400">Navana, United, Apex</span>
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
