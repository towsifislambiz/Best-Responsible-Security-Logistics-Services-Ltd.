import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Phone, Calendar, MapPin, Award, 
  Trash2, CheckCircle2, Search, FileText, Download, 
  RefreshCw, MessageCircle, Clock, Shield, AlertCircle
} from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, onSnapshot, doc, updateDoc, deleteDoc 
} from 'firebase/firestore';
import { exportToCSV } from '../context/SiteDataContext';
import { getMonthEndInfo, isCurrentMonth, exportMonthlyPDF } from '../utils/monthlyManager';

export default function AdminRecruitment() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const colRef = collection(db, 'recruitment');
      unsubscribe = onSnapshot(colRef, (snapshot) => {
        const list = [];
        snapshot.forEach((d) => {
          const data = d.data();
          list.push({
            id: d.id,
            ...data,
            formattedDate: data.serverTime?.toDate 
              ? data.serverTime.toDate().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
              : (data.submittedAt ? new Date(data.submittedAt).toLocaleString() : 'Recent')
          });
        });

        // Newest first
        list.sort((a, b) => {
          const timeA = new Date(a.submittedAt || 0).getTime();
          const timeB = new Date(b.submittedAt || 0).getTime();
          return timeB - timeA;
        });

        setApps(list);
        setLoading(false);
        try {
          localStorage.setItem('brslsl_recruitment', JSON.stringify(list));
        } catch (_) {}
      }, (err) => {
        console.warn('Firestore recruitment error, falling back to local cache:', err.message);
        const cached = localStorage.getItem('brslsl_recruitment');
        if (cached) setApps(JSON.parse(cached));
        setLoading(false);
      });
    } catch (e) {
      console.warn('Firebase error for recruitment:', e);
      const cached = localStorage.getItem('brslsl_recruitment');
      if (cached) setApps(JSON.parse(cached));
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setApps(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status: newStatus } : a);
      try {
        localStorage.setItem('brslsl_recruitment', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await updateDoc(doc(db, 'recruitment', id), { status: newStatus });
    } catch (err) {
      console.warn('Firestore update recruitment status error:', err);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete candidate application for "${name || 'Applicant'}"?`)) {
      setApps(prev => {
        const updated = prev.filter(a => a.id !== id);
        try {
          localStorage.setItem('brslsl_recruitment', JSON.stringify(updated));
        } catch (_) {}
        return updated;
      });

      try {
        await deleteDoc(doc(db, 'recruitment', id));
      } catch (err) {
        console.warn('Firestore delete recruitment error:', err);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = {
      name: 'Applicant Name',
      role: 'Applied Role',
      phone: 'Phone Number',
      nid: 'NID / Smart Card No',
      height: 'Height',
      education: 'Education Level',
      experience: 'Years of Security Experience',
      district: 'Home District',
      status: 'Application Status',
      formattedDate: 'Date Applied'
    };
    exportToCSV(apps, 'BRSLSL_Security_Job_Applicants', headers);
  };

  const filtered = apps.filter(a => {
    const term = search.toLowerCase();
    const matchesSearch = 
      (a.name || '').toLowerCase().includes(term) ||
      (a.phone || '').includes(term) ||
      (a.nid || '').includes(term) ||
      (a.role || '').toLowerCase().includes(term) ||
      (a.district || '').toLowerCase().includes(term);

    const currentStatus = a.status || 'new';
    const matchesFilter = statusFilter === 'All' || currentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const newCount = apps.filter(a => (a.status || 'new').toLowerCase() === 'new').length;
  const interviewCount = apps.filter(a => (a.status || '').toLowerCase() === 'interview_called').length;
  const hiredCount = apps.filter(a => (a.status || '').toLowerCase() === 'hired').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-purple-400" />
            <span>Guard Recruitment & Applications Inbox</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Online job registrations and bio-data submitted by candidate security guards and supervisors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              const monthInfo = getMonthEndInfo();
              const curApps = apps.filter(a => isCurrentMonth(a.submittedAt || a.serverTime));
              exportMonthlyPDF({
                type: 'recruitment',
                title: 'গার্ড চাকরির আবেদন মাসিক আর্কাইভ',
                monthLabel: monthInfo.fullLabel,
                data: curApps.length > 0 ? curApps : apps
              });
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>📄 চলতি মাসের আবেদন PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#091e38] hover:bg-[#0c2a4f] text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Storage & Auto-Pruning Guidance Notice */}
      <div className="bg-[#071527] border border-purple-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-slate-300">
            <strong>মাসিক ব্যাকআপ পলিসি:</strong> ফায়ারস্টোর ডাটাবেজ খালি ও দ্রুত রাখতে প্রতি মাস শেষ হলে বিগত মাসের চাকরির আবেদনগুলো স্বয়ংক্রিয়ভাবে মুছে ফেলা হয়। মাস শেষ হওয়ার পূর্বে উপরের <strong>'📄 চলতি মাসের আবেদন PDF'</strong> বাটনে ক্লিক করে অফিশিয়াল কপি ডাউনলোড করে সংরক্ষণ করুন।
          </span>
        </div>
        <span className="font-mono text-[11px] text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30 whitespace-nowrap">
          চলতি মাসের আবেদন: {apps.filter(a => isCurrentMonth(a.submittedAt || a.serverTime)).length} টি
        </span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#091e38] border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Total Applicants</span>
            <h3 className="text-2xl font-black text-white mt-0.5">{apps.length}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091e38] border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-amber-400">🟡 Pending Review</span>
            <h3 className="text-2xl font-black text-amber-400 mt-0.5">{newCount}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091e38] border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-emerald-400">🟢 Hired / Enrolled</span>
            <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{hiredCount}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#091e38] p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center w-full md:w-80 px-2 py-1 bg-[#050d1a] rounded-xl border border-slate-700/60">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input 
            type="text"
            placeholder="Search Applicant Name, Phone, NID, Role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['All', 'new', 'interview_called', 'hired', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer capitalize ${
                statusFilter === tab
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Applicants List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-400" />
          <span className="text-xs">Connecting to real-time candidate applications...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#091e38] border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-xs">
          {search ? 'No candidate matching filter criteria.' : 'No candidate registrations yet. Applicants submitting from the Career page will appear here.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const rawPhone = (app.phone || '').replace(/[^0-9]/g, '');
            const cleanWa = rawPhone.startsWith('880') ? rawPhone : (rawPhone.startsWith('0') ? `88${rawPhone}` : `880${rawPhone}`);

            return (
              <div 
                key={app.id}
                className="bg-[#091e38] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 hover:border-purple-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{app.name}</h3>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-bold border border-purple-500/30">
                        {app.role}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      NID: <strong className="text-slate-300 font-mono">{app.nid || 'N/A'}</strong> | Home: {app.district || 'Bangladesh'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={app.status || 'new'}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="bg-[#050d1a] border border-slate-700 text-xs text-purple-300 font-bold rounded-lg px-2.5 py-1.5 focus:border-purple-400 outline-none cursor-pointer"
                    >
                      <option value="new">🟡 Pending Review</option>
                      <option value="interview_called">🟣 Called for Interview</option>
                      <option value="hired">🟢 Hired / Enrolled</option>
                      <option value="rejected">🔴 Rejected</option>
                    </select>

                    <button
                      onClick={() => handleDelete(app.id, app.name)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Height / Physical:</span>
                    <strong className="text-white">{app.height || "5' 6\" or above"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Education:</span>
                    <strong className="text-white">{app.education || 'SSC / Equivalent'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Security Experience:</span>
                    <strong className="text-amber-400 font-bold">{app.experience || 'Fresher (Trained)'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Blood Group / Details:</span>
                    <span className="text-slate-300">{app.bloodGroup || 'O+'}</span>
                  </div>
                </div>

                {app.address && (
                  <div className="text-xs text-slate-400 bg-[#050d1a] p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-bold">Present Address: </span>
                    {app.address}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    Submitted: {app.formattedDate}
                  </span>

                  <div className="flex items-center space-x-2.5">
                    {app.phone && (
                      <>
                        <a
                          href={`tel:${app.phone}`}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold flex items-center transition-colors shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1 text-purple-400" />
                          <span>Call: {app.phone}</span>
                        </a>

                        <a
                          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Assalamu Alaikum ${app.name}, this is regarding your job application for "${app.role}" at Best Responsible Security & Logistics Services Ltd. Please come for physical verification at our Mirpur Head Office.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 mr-1" />
                          <span>WhatsApp</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
