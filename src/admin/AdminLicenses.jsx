import React, { useState } from 'react';
import { 
  FileCheck, Plus, Trash2, Edit2, CheckCircle2, 
  Shield, Image as ImageIcon, Search, X, Sparkles, Download, RefreshCw, Eye, ExternalLink
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function AdminLicenses() {
  const { 
    licenses, 
    addLicense, 
    updateLicense, 
    deleteLicense, 
    resetLicenses,
    exportToCSV 
  } = useSiteData();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    number: '',
    desc: '',
    image: '/assets/p21_2_Image145.jpg'
  });

  const handleStartCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: 'Government Legal Clearance',
      number: 'REF-' + Math.floor(100000 + Math.random() * 900000),
      desc: '',
      image: '/assets/p21_2_Image145.jpg'
    });
    setShowModal(true);
  };

  const handleStartEdit = (doc) => {
    setEditingId(doc.id);
    setFormData({
      title: doc.title || '',
      subtitle: doc.subtitle || '',
      number: doc.number || '',
      desc: doc.desc || '',
      image: doc.image || '/assets/p21_2_Image145.jpg'
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateLicense(editingId, formData);
      } else {
        await addLicense(formData);
      }
      setShowModal(false);
      setEditingId(null);
    } catch (err) {
      alert('Error saving document: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete license/document: "${title}"?`)) {
      await deleteLicense(id);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all licenses to original default government certificates? Any custom added certificates will be cleared.')) {
      await resetLicenses();
    }
  };

  const handleExportCSV = () => {
    const headers = {
      title: 'Document Title',
      subtitle: 'Category / Issuing Authority',
      number: 'Reference / License Number',
      desc: 'Description & Scope',
      image: 'Image File Path'
    };
    exportToCSV(licenses, 'BRSLSL_Legal_Licenses', headers);
  };

  const filtered = (licenses || []).filter(doc =>
    (doc.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.desc || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileCheck className="w-4 h-4" />
            <span>Statutory Compliance & Legal Clearances</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Government Licenses & Legal Documents Manager
          </h1>
          <p className="text-slate-400 text-xs">
            Edit document names, correct spelling mistakes, update reference numbers, add new government certificates, and replace images.
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
            title="Reset to default legal certificates"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Document</span>
          </button>
        </div>
      </div>

      {/* Metrics & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#071527] p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Total Documents:</span>
          <span className="px-2 py-0.5 bg-amber-400/20 text-amber-400 text-xs font-black rounded-lg border border-amber-400/30">
            {licenses?.length || 0}
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center ml-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
            Real-time Live Sync with Website
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, ref no, authority..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#050d1a] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Documents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#071527] border border-slate-800 hover:border-amber-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              {/* Document Image Thumbnail */}
              <div className="relative h-48 bg-slate-900 overflow-hidden border-b border-slate-800">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => setPreviewDoc(doc)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/company-logo.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071527] via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Official Record
                </span>

                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="absolute bottom-3 right-3 p-1.5 bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white rounded-lg text-xs transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Inspect</span>
                </button>
              </div>

              {/* Document Details */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    Ref: {doc.number}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleStartEdit(doc)}
                      className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-lg transition-colors"
                      title="Edit document"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id, doc.title)}
                      className="p-1.5 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-amber-500/90 font-medium">
                  {doc.subtitle}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {doc.desc}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                {doc.image}
              </span>

              <button
                onClick={() => handleStartEdit(doc)}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
              >
                <span>Edit / Correct</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full p-8 text-center bg-[#071527] rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No legal documents found matching your search.
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
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingId ? "Edit Government License / Document" : "Add New Legal Document"}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Fix names, correct spelling, or upload new certificates.
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
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Document Title (নাম / সনদপত্র শিরোনাম) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: Certificate of Incorporation (RJSC)"
                  className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  You can change this anytime to correct any misspelling or rename the document.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Authority / Category Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="যেমন: Registrar of Joint Stock Companies"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Registration / License Number (Ref) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="যেমন: C-173617"
                    className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Document Image Path or URL *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/p21_2_Image145.jpg or image URL"
                    className="flex-1 bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Doc Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-amber-400 shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/company-logo.png';
                      }}
                    />
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Preset files: /assets/p21_2_Image145.jpg (RJSC), /assets/p22_2_Image148.jpg (TIN), /assets/p23_2_Image151.jpg (Trade License), /assets/p24_2_Image154.jpg (BIN), /assets/p25_2_Image157.jpg (Fire License)
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Statutory Description & Tender Scope
                </label>
                <textarea
                  rows="3"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="সনদটির আইনি ক্ষমতা ও বিবরণ লিখুন..."
                  className="w-full bg-[#050d1a] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                ></textarea>
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
                      <span>{editingId ? "Update Document" : "Add Document"}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Full Document Inspector Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071527] border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{previewDoc.title}</h3>
                <span className="text-xs text-amber-400 font-mono">Ref: {previewDoc.number}</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto flex items-center justify-center bg-slate-900 rounded-2xl p-2 border border-slate-800">
              <img
                src={previewDoc.image}
                alt={previewDoc.title}
                className="max-h-[60vh] object-contain rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/company-logo.png';
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{previewDoc.subtitle}</span>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
