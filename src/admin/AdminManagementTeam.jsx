import React, { useState, useRef } from 'react';
import { 
  Users, UserPlus, Trash2, Edit2, CheckCircle2, 
  Shield, Image as ImageIcon, Search, X, Sparkles, Download, Phone, RefreshCw, ArrowUpDown, Upload, Zap
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { optimizeImage } from '../utils/imageOptimizer';

export default function AdminManagementTeam() {
  const { 
    managementTeam, 
    addTeamMember, 
    updateTeamMember, 
    deleteTeamMember, 
    resetManagementTeam,
    exportToCSV 
  } = useSiteData();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    nameBn: '',
    role: '',
    roleBn: '',
    phone: '',
    photo: '/assets/team_raju_ahmed.webp',
    order: 1,
    bioBn: '',
    bioEn: ''
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOptimizing(true);
    try {
      const optimized = await optimizeImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.82 });
      setFormData(prev => ({ ...prev, photo: optimized.dataUrl }));
      setUploadStats(optimized);
    } catch (err) {
      alert('Error optimizing image: ' + err.message);
    } finally {
      setOptimizing(false);
    }
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      nameBn: '',
      role: '',
      roleBn: '',
      phone: '01604022929',
      photo: '/assets/team_raju_ahmed.webp',
      order: (managementTeam?.length || 0) + 1,
      bioBn: '',
      bioEn: ''
    });
    setShowModal(true);
  };

  const handleStartEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name || '',
      nameBn: member.nameBn || '',
      role: member.role || '',
      roleBn: member.roleBn || '',
      phone: member.phone || '',
      photo: member.photo || '/assets/team_raju_ahmed.webp',
      order: member.order || 1,
      bioBn: member.bioBn || '',
      bioEn: member.bioEn || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateTeamMember(editingId, formData);
      } else {
        await addTeamMember(formData);
      }
      setShowModal(false);
      setEditingId(null);
    } catch (err) {
      alert('Error saving team member: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the Management Team?`)) {
      await deleteTeamMember(id);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset Management Team to default 6 founding officers? Any unsaved custom entries will be replaced.')) {
      await resetManagementTeam();
    }
  };

  const handleExportCSV = () => {
    const headers = {
      order: 'Order',
      name: 'Name (English)',
      nameBn: 'Name (Bengali)',
      role: 'Post / Role (English)',
      roleBn: 'Post / Role (Bengali)',
      phone: 'Mobile Number',
      bioBn: 'Responsibilities'
    };
    exportToCSV(managementTeam, 'BRSLSL_Management_Team', headers);
  };

  // Filtered members list
  const filtered = (managementTeam || []).filter(m =>
    (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.nameBn || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.roleBn || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.phone || '').includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Executive Officers & Key Command</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Management Team Manager
          </h1>
          <p className="text-slate-400 text-xs">
            Add, update designations/posts, change contact numbers, upload photos, and organize officer display order.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800/80 hover:bg-red-950/40 text-slate-400 hover:text-red-400 text-xs font-bold rounded-xl border border-slate-700 hover:border-red-500/40 transition-colors"
            title="Reset to default 6 officers"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Officer</span>
          </button>
        </div>
      </div>

      {/* Metrics & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#071527] p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Total Officers:</span>
          <span className="px-2 py-0.5 bg-amber-400/20 text-amber-400 text-xs font-black rounded-lg border border-amber-400/30">
            {managementTeam?.length || 0}
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center ml-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
            Real-time Live Sync
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#050d1a] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Team Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <div
            key={member.id}
            className="bg-[#071527] border border-slate-800 hover:border-amber-400/50 rounded-2xl p-4 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              {/* Photo & Header */}
              <div className="flex items-start space-x-3">
                <img
                  src={member.photo || '/assets/team_raju_ahmed.webp'}
                  alt={member.name}
                  className="w-16 h-16 rounded-xl object-contain object-center border-2 border-amber-400/40 shrink-0 bg-slate-900 p-0.5"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/company-logo.webp';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-slate-800 text-amber-400 px-2 py-0.5 rounded border border-slate-700">
                      Order #{member.order || 99}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleStartEdit(member)}
                        className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-lg transition-colors"
                        title="Edit officer details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.name || member.nameBn)}
                        className="p-1.5 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete officer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white truncate mt-1">
                    {member.nameBn || member.name}
                  </h3>
                  {member.name && member.nameBn && (
                    <p className="text-xs text-slate-400 truncate">
                      {member.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Role Badges */}
              <div className="mt-3 space-y-1">
                <div className="inline-block px-2 py-0.5 bg-amber-400/10 text-amber-300 text-[11px] font-bold rounded border border-amber-400/20">
                  {member.roleBn || member.role}
                </div>
                {member.role && member.roleBn && (
                  <p className="text-[10px] text-slate-400 font-medium">
                    {member.role}
                  </p>
                )}
              </div>

              {/* Bio summary */}
              {member.bioBn && (
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {member.bioBn}
                </p>
              )}
            </div>

            {/* Direct Phone & Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-bold">{member.phone}</span>
              </div>

              <button
                onClick={() => handleStartEdit(member)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <span>Edit / Update</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full p-8 text-center bg-[#071527] rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No officers found matching your search.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071527] border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingId ? "Edit Officer Profile" : "Add New Officer"}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Changes immediately sync with website and Firebase.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Name (Bengali) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    placeholder="যেমন: মোঃ সাইফুল ইসলাম"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Name (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Md. Saiful Islam"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Designation / Post (Bengali) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roleBn}
                    onChange={(e) => setFormData({ ...formData, roleBn: e.target.value })}
                    placeholder="যেমন: ম্যানেজার অপারেশন"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Designation / Post (English)
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Manager - Operations"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Direct Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01604022934"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Display Order (1 = Top)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) || 1 })}
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Photo Input & Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">
                    Photo (Upload & Auto-Optimize to WebP)
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={optimizing}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-[11px] transition-all shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{optimizing ? "Compressing..." : "Upload from Device"}</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="/assets/team_saiful_islam.webp or image URL"
                    className="flex-1 bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-amber-400"
                  />
                  {formData.photo && (
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-contain bg-slate-900 border border-amber-400 shrink-0 p-0.5"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/company-logo.webp';
                      }}
                    />
                  )}
                </div>

                {uploadStats && (
                  <div className="mt-1.5 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-[11px] text-emerald-300">
                    <span className="flex items-center space-x-1 font-bold">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Auto-Optimized to WebP!</span>
                    </span>
                    <span className="font-mono">
                      {uploadStats.originalSizeKB} KB ➔ <strong>{uploadStats.optimizedSizeKB} KB</strong> ({uploadStats.savingsPct} smaller)
                    </span>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 mt-1">
                  Preset WebP files: /assets/team_raju_ahmed.webp, team_saiful_islam.webp, team_ali_akbar.webp, team_kamal_hossain.webp, team_mijanur_rahman.webp, team_hafiz_uddin.webp
                </p>
              </div>

              {/* Responsibilities / Bio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Responsibilities / Bio (Bengali)
                  </label>
                  <textarea
                    rows="3"
                    value={formData.bioBn}
                    onChange={(e) => setFormData({ ...formData, bioBn: e.target.value })}
                    placeholder="দায়িত্ব ও কাজের সংক্ষিপ্ত বিবরণ (বাংলা)..."
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Responsibilities / Bio (English)
                  </label>
                  <textarea
                    rows="3"
                    value={formData.bioEn}
                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                    placeholder="Officer role and responsibilities (English)..."
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  ></textarea>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-1.5"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingId ? "Update Officer" : "Add Officer"}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
