import React, { useState, useEffect } from 'react';
import { DollarSign, Save, CheckCircle2, RotateCcw, Download } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function AdminRates() {
  const { rates: liveRates, saveRates, resetRates, exportToCSV } = useSiteData();
  const [localRates, setLocalRates] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (Array.isArray(liveRates) && liveRates.length > 0) {
      setLocalRates(liveRates);
    }
  }, [liveRates]);

  const handleRateChange = (id, field, value) => {
    const num = value === '' ? null : parseInt(value, 10);
    setLocalRates(prev => prev.map(r => r.id === id ? { ...r, [field]: isNaN(num) ? null : num } : r));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await saveRates(localRates);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset all commercial service rates back to official 2026 PDF values?')) {
      await resetRates();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  const handleExportCSV = () => {
    const headers = {
      id: 'Sl No',
      role: 'Designation / Post',
      banglaRole: 'বাংলা পদবি',
      category: 'Category Sector',
      rate8h: '8 Hours Monthly Rate (BDT)',
      rate12h: '12 Hours Monthly Rate (BDT)'
    };
    exportToCSV(localRates, 'BRSLSL_Commercial_Rate_Card', headers);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Commercial Rate Card Manager</h1>
          <p className="text-xs text-slate-400">
            Edit 8-hour and 12-hour monthly service rates. All changes reflect live on the website calculator and pricing page!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-[#091e38] hover:bg-[#0c2a4f] text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center space-x-1 border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to PDF Rates</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Cloud...' : 'Save & Publish Live Rates'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-2xl flex items-center space-x-2 text-emerald-300 text-xs shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Rates updated in cloud & local storage! All changes are now live across the website calculator and pricing page.</span>
        </div>
      )}

      {/* Rates Table Card */}
      <div className="bg-[#091e38] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050d1a] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12">#</th>
                <th className="py-3.5 px-4">Designation / Role</th>
                <th className="py-3.5 px-4">Category Sector</th>
                <th className="py-3.5 px-4 w-36">8-Hour Rate (৳)</th>
                <th className="py-3.5 px-4 w-36">12-Hour Rate (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {localRates.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">{r.id}</td>
                  <td className="py-3 px-4">
                    <strong className="text-white block font-sans">{r.role}</strong>
                    <span className="text-[11px] text-amber-400 font-sans">{r.banglaRole}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-700">
                      {r.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                      <input 
                        type="number"
                        value={r.rate8h ?? ''}
                        onChange={(e) => handleRateChange(r.id, 'rate8h', e.target.value)}
                        placeholder="Negotiable"
                        className="w-full bg-[#050d1a] border border-slate-700 text-white font-mono font-bold rounded-lg pl-6 pr-2 py-1.5 text-xs focus:border-amber-400 outline-none"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                      <input 
                        type="number"
                        value={r.rate12h ?? ''}
                        onChange={(e) => handleRateChange(r.id, 'rate12h', e.target.value)}
                        placeholder="Negotiable"
                        className="w-full bg-[#050d1a] border border-slate-700 text-white font-mono font-bold rounded-lg pl-6 pr-2 py-1.5 text-xs focus:border-amber-400 outline-none"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
