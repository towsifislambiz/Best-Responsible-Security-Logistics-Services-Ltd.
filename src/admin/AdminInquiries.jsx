import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MessageSquare, Clock, Trash2, 
  Search, CheckCircle2, AlertCircle, ArrowUpRight, 
  Download, RefreshCw, Send, User, MessageCircle
} from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, onSnapshot, doc, updateDoc, 
  deleteDoc, query, orderBy 
} from 'firebase/firestore';
import { exportToCSV } from '../context/SiteDataContext';
import { getMonthEndInfo, isCurrentMonth, exportMonthlyPDF } from '../utils/monthlyManager';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Real-time Firestore sync with LocalStorage fallback
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const colRef = collection(db, 'inquiries');
      unsubscribe = onSnapshot(colRef, (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            ...data,
            formattedDate: data.createdAt?.toDate 
              ? data.createdAt.toDate().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
              : (data.createdAt || 'Recent')
          });
        });
        
        // Sort newest first
        list.sort((a, b) => {
          const timeA = a.createdAt?.seconds || Date.now();
          const timeB = b.createdAt?.seconds || Date.now();
          return timeB - timeA;
        });

        setInquiries(list);
        setLoading(false);
        try {
          localStorage.setItem('brslsl_inquiries_cache', JSON.stringify(list));
        } catch (_) {}
      }, (err) => {
        console.warn('Firestore inquiries error, using cached storage:', err.message);
        const cached = localStorage.getItem('brslsl_inquiries_cache');
        if (cached) setInquiries(JSON.parse(cached));
        setLoading(false);
      });
    } catch (e) {
      console.warn('Firebase error for inquiries:', e);
      const cached = localStorage.getItem('brslsl_inquiries_cache');
      if (cached) setInquiries(JSON.parse(cached));
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    // Update local state immediately for snappy UI
    setInquiries(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, status: newStatus } : item);
      try {
        localStorage.setItem('brslsl_inquiries_cache', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
    } catch (err) {
      console.warn('Firestore update inquiry error:', err);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete inquiry message from "${name || 'Visitor'}"?`)) {
      setInquiries(prev => {
        const updated = prev.filter(item => item.id !== id);
        try {
          localStorage.setItem('brslsl_inquiries_cache', JSON.stringify(updated));
        } catch (_) {}
        return updated;
      });
      try {
        await deleteDoc(doc(db, 'inquiries', id));
      } catch (err) {
        console.warn('Firestore delete inquiry error:', err);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = {
      name: 'Visitor Name',
      phone: 'Phone Number',
      email: 'Email Address',
      subject: 'Inquiry Subject',
      message: 'Full Message Content',
      status: 'Status',
      formattedDate: 'Date Submitted'
    };
    exportToCSV(inquiries, 'BRSLSL_Contact_Inquiries', headers);
  };

  const filtered = inquiries.filter(item => {
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.phone || '').includes(search) ||
      (item.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.subject || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.message || '').toLowerCase().includes(search.toLowerCase());
    
    const currentStatus = item.status || 'Pending';
    const matchesFilter = statusFilter === 'All' || currentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const pendingCount = inquiries.filter(i => (i.status || 'Pending').toLowerCase() === 'pending').length;
  const contactedCount = inquiries.filter(i => (i.status || '').toLowerCase() === 'contacted').length;
  const resolvedCount = inquiries.filter(i => (i.status || '').toLowerCase() === 'resolved').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            <span>Contact Form Inquiries Inbox</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time messages submitted by visitors & corporate clients from the public Contact page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              const monthInfo = getMonthEndInfo();
              const curInqs = inquiries.filter(i => isCurrentMonth(i.createdAt || i.date));
              exportMonthlyPDF({
                type: 'inquiries',
                title: 'যোগাযোগ ও মেসেজ মাসিক আর্কাইভ',
                monthLabel: monthInfo.fullLabel,
                data: curInqs.length > 0 ? curInqs : inquiries
              });
            }}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>📄 চলতি মাসের বার্তা PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#091e38] hover:bg-[#0c2a4f] text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Storage & Auto-Pruning Guidance Notice */}
      <div className="bg-[#071527] border border-sky-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-slate-300">
            <strong>মাসিক ব্যাকআপ পলিসি:</strong> ফায়ারস্টোর ডাটাবেজ খালি রাখতে প্রতি মাস শেষ হলে বিগত মাসের বার্তাগুলো স্বয়ংক্রিয়ভাবে মুছে ফেলা হয়। মাস শেষ হওয়ার পূর্বে উপরের <strong>'📄 চলতি মাসের বার্তা PDF'</strong> বাটনে ক্লিক করে অফিশিয়াল কপি ডাউনলোড করে নিজের কাছে সংরক্ষণ করুন।
          </span>
        </div>
        <span className="font-mono text-[11px] text-sky-300 bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-500/30 whitespace-nowrap">
          চলতি মাসের বার্তা: {inquiries.filter(i => isCurrentMonth(i.createdAt || i.date)).length} টি
        </span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#091e38] border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Total Inquiries</span>
            <h3 className="text-2xl font-black text-white mt-0.5">{inquiries.length}</h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091e38] border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-amber-400">Requires Action</span>
            <h3 className="text-2xl font-black text-amber-400 mt-0.5">{pendingCount}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091e38] border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-emerald-400">Resolved / Handled</span>
            <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{resolvedCount}</h3>
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
            placeholder="Search by Name, Phone, Email, or Message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['All', 'Pending', 'Contacted', 'Resolved'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === tab
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards Feed */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
          <span className="text-xs">Loading real-time inquiries from cloud...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#091e38] rounded-2xl border border-slate-800 text-slate-400 space-y-2">
          <MessageSquare className="w-8 h-8 mx-auto text-slate-600" />
          <h4 className="text-sm font-bold text-white">No Inquiries Found</h4>
          <p className="text-xs text-slate-500">
            {search ? 'Try adjusting your search criteria.' : 'When clients send inquiries from the Contact page, they will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((item) => {
            const rawPhone = (item.phone || '').replace(/[^0-9]/g, '');
            const cleanWa = rawPhone.startsWith('880') ? rawPhone : (rawPhone.startsWith('0') ? `88${rawPhone}` : `880${rawPhone}`);
            const currentStatus = item.status || 'Pending';

            return (
              <div 
                key={item.id} 
                className="bg-[#091e38] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition space-y-4"
              >
                {/* Top Row: Client Info & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">{item.name || 'Anonymous Client'}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.subject || 'General Inquiry'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      {item.phone && (
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          {item.phone}
                        </span>
                      )}
                      {item.email && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          {item.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {item.formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                        currentStatus === 'Resolved' 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : currentStatus === 'Contacted'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      <option value="Pending" className="bg-slate-900 text-amber-300">⏳ Pending</option>
                      <option value="Contacted" className="bg-slate-900 text-sky-300">📞 Contacted</option>
                      <option value="Resolved" className="bg-slate-900 text-emerald-300">✅ Resolved</option>
                    </select>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-[#050d1a] p-3.5 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {item.message || '(No message content provided)'}
                  </p>
                </div>

                {/* Bottom Row: 1-Click Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {item.phone && (
                    <>
                      <a
                        href={`tel:${item.phone}`}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Direct Call</span>
                      </a>

                      <a
                        href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Assalamu Alaikum ${item.name || ''}, thank you for contacting Best Responsible Security & Logistics Services Ltd. regarding your inquiry: "${item.subject || 'Security Services'}". How can we assist you?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Reply</span>
                      </a>
                    </>
                  )}

                  {item.email && (
                    <a
                      href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject || 'Security Inquiry'} - BRSLSL`)}`}
                      className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
