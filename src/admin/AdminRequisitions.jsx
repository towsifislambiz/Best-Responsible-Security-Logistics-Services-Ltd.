import React, { useState, useEffect } from 'react';
import { 
  FileCheck, Phone, MapPin, Clock, DollarSign, 
  Trash2, MessageCircle, CheckCircle2, AlertCircle, 
  Search, Download, RefreshCw, Building, ShieldCheck
} from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, onSnapshot, doc, updateDoc, deleteDoc 
} from 'firebase/firestore';
import { exportToCSV } from '../context/SiteDataContext';

export default function AdminRequisitions() {
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const colRef = collection(db, 'requisitions');
      unsubscribe = onSnapshot(colRef, (snapshot) => {
        const list = [];
        snapshot.forEach((d) => {
          const data = d.data();
          list.push({
            id: d.id,
            ...data,
            formattedDate: data.createdAt?.toDate 
              ? data.createdAt.toDate().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
              : (data.createdAt ? new Date(data.createdAt).toLocaleString() : 'Recent')
          });
        });

        // Newest first
        list.sort((a, b) => {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        setRequisitions(list);
        setLoading(false);
        try {
          localStorage.setItem('brslsl_requisitions', JSON.stringify(list));
        } catch (_) {}
      }, (err) => {
        console.warn('Firestore requisitions error, falling back to local cache:', err.message);
        const cached = localStorage.getItem('brslsl_requisitions');
        if (cached) setRequisitions(JSON.parse(cached));
        setLoading(false);
      });
    } catch (e) {
      console.warn('Firebase error for requisitions:', e);
      const cached = localStorage.getItem('brslsl_requisitions');
      if (cached) setRequisitions(JSON.parse(cached));
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setRequisitions(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status: newStatus } : r);
      try {
        localStorage.setItem('brslsl_requisitions', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await updateDoc(doc(db, 'requisitions', id), { status: newStatus });
    } catch (err) {
      console.warn('Firestore update requisition status error:', err);
    }
  };

  const handleDelete = async (id, clientName) => {
    if (window.confirm(`Delete requisition inquiry for "${clientName || 'Client'}"?`)) {
      setRequisitions(prev => {
        const updated = prev.filter(r => r.id !== id);
        try {
          localStorage.setItem('brslsl_requisitions', JSON.stringify(updated));
        } catch (_) {}
        return updated;
      });

      try {
        await deleteDoc(doc(db, 'requisitions', id));
      } catch (err) {
        console.warn('Firestore delete requisition error:', err);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = {
      clientName: 'Company / Organization Name',
      contactPerson: 'Contact Person',
      phone: 'Phone Number',
      role: 'Requested Guard / Officer Role',
      quantity: 'Quantity (Personnel)',
      shift: 'Duty Shift',
      monthlyTotal: 'Estimated Monthly Budget (BDT)',
      address: 'Deployment Location',
      status: 'Current Status',
      formattedDate: 'Date Submitted'
    };
    exportToCSV(requisitions, 'BRSLSL_Guard_Requisitions', headers);
  };

  const filtered = requisitions.filter(r => {
    const term = search.toLowerCase();
    const matchesSearch = 
      (r.clientName || '').toLowerCase().includes(term) ||
      (r.contactPerson || '').toLowerCase().includes(term) ||
      (r.phone || '').includes(term) ||
      (r.role || '').toLowerCase().includes(term) ||
      (r.address || '').toLowerCase().includes(term);

    const currentStatus = r.status || 'pending';
    const matchesFilter = statusFilter === 'All' || currentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const pendingCount = requisitions.filter(r => (r.status || 'pending').toLowerCase() === 'pending').length;
  const contactedCount = requisitions.filter(r => (r.status || '').toLowerCase() === 'contacted').length;
  const deployedCount = requisitions.filter(r => (r.status || '').toLowerCase() === 'deployed').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-amber-400" />
            <span>Client Requisition Leads & Inquiries</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time quote requests and security deployment orders submitted from the website calculator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#091e38] hover:bg-[#0c2a4f] text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#091e38] border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Total Inquiries</span>
            <h3 className="text-2xl font-black text-white mt-0.5">{requisitions.length}</h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091e38] border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-amber-400">🟡 Pending Response</span>
            <h3 className="text-2xl font-black text-amber-400 mt-0.5">{pendingCount}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091e38] border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-emerald-400">🟢 Guards Deployed</span>
            <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{deployedCount}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#091e38] p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center w-full md:w-80 px-2 py-1 bg-[#050d1a] rounded-xl border border-slate-700/60">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input 
            type="text"
            placeholder="Search Company Name, Phone, Role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['All', 'pending', 'contacted', 'survey_scheduled', 'deployed', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer capitalize ${
                statusFilter === tab
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Requisitions List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
          <span className="text-xs">Connecting to real-time cloud requisitions...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#091e38] border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-xs">
          {search ? 'No requisition leads matching criteria.' : 'No requisitions received yet. Test by submitting a quote from the public calculator!'}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => {
            const rawPhone = (req.phone || '').replace(/[^0-9]/g, '');
            const cleanWa = rawPhone.startsWith('880') ? rawPhone : (rawPhone.startsWith('0') ? `88${rawPhone}` : `880${rawPhone}`);

            return (
              <div 
                key={req.id}
                className="bg-[#091e38] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 hover:border-amber-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {req.clientName || 'Private Organization'}
                    </h3>
                    <span className="text-xs text-amber-400">
                      Contact: {req.contactPerson || 'Direct Inquirer'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={req.status || 'pending'}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className="bg-[#050d1a] border border-slate-700 text-xs text-amber-300 font-bold rounded-lg px-2.5 py-1.5 focus:border-amber-400 outline-none cursor-pointer"
                    >
                      <option value="pending">🟡 Pending Contact</option>
                      <option value="contacted">🔵 Client Contacted</option>
                      <option value="survey_scheduled">🟣 Site Survey Scheduled</option>
                      <option value="deployed">🟢 Guards Deployed</option>
                      <option value="cancelled">🔴 Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDelete(req.id, req.clientName)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Requested Role:</span>
                    <strong className="text-white">{req.role}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Shift & Strength:</span>
                    <strong className="text-white">{req.quantity} Personnel ({req.shift})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Est. Monthly Budget:</span>
                    <strong className="text-emerald-400 font-extrabold text-sm">৳{req.monthlyTotal?.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Deployment Area:</span>
                    <span className="text-slate-300">{req.address || 'Dhaka'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    Logged: {req.formattedDate}
                  </span>

                  <div className="flex items-center space-x-2.5">
                    {req.phone && (
                      <>
                        <a
                          href={`tel:${req.phone}`}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold flex items-center transition-colors shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1 text-amber-400" />
                          <span>Call: {req.phone}</span>
                        </a>

                        <a
                          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Assalamu Alaikum, this is from Best Responsible Security & Logistics Services Ltd. regarding your security guard requisition for "${req.clientName || 'your organization'}". Can we schedule a site survey?`)}`}
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
