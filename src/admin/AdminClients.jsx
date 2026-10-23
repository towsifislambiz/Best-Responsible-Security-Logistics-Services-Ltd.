import React, { useState } from 'react';
import { 
  Building, Plus, Trash2, Search, Upload, CheckCircle2, X, Download
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function AdminClients() {
  const { clients, addClient, deleteClient, exportToCSV } = useSiteData();
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newClient, setNewClient] = useState({
    name: '',
    type: 'Corporate Group',
    category: 'Conglomerates & Corporate Groups'
  });

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClient.name.trim()) return;
    await addClient({
      name: newClient.name.trim(),
      type: newClient.type.trim() || 'Corporate Group',
      category: newClient.category
    });
    setShowAdd(false);
    setNewClient({ name: '', type: 'Corporate Group', category: 'Conglomerates & Corporate Groups' });
  };

  const handleDelete = async (name) => {
    if (window.confirm(`Delete "${name}" from client directory?`)) {
      await deleteClient(name);
    }
  };

  const handleExportCSV = () => {
    const headers = {
      name: 'Client / Company Name',
      type: 'Industry / Sub-Sector',
      category: 'Primary Corporate Sector'
    };
    exportToCSV(clients, 'BRSLSL_Client_Directory', headers);
  };

  const filtered = clients.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.type || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Client Logos & Directory Manager</h1>
          <p className="text-xs text-slate-400">
            Add new client organizations, manage industry sectors, and control public trust badges in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-[#091e38] hover:bg-[#0c2a4f] text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAdd(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Client Brand</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#091e38] p-3 rounded-2xl border border-slate-800 flex items-center">
        <Search className="w-4 h-4 text-slate-400 ml-2 mr-3" />
        <input 
          type="text"
          placeholder="Search by Client Name (e.g. Amana, Confidence, Sayem), Type, or Sector..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white text-xs focus:outline-none placeholder-slate-500"
        />
      </div>

      {/* Clients Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((c, idx) => (
          <div 
            key={idx}
            className="bg-[#091e38] border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between group hover:border-amber-500/40 transition-all"
          >
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">{c.name}</h4>
              <span className="text-[11px] text-amber-400 font-semibold block">{c.type}</span>
              <span className="text-[10px] text-slate-500 block truncate max-w-[170px]">{c.category}</span>
            </div>

            <button
              onClick={() => handleDelete(c.name)}
              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
              title="Delete Client"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#071527] border-2 border-amber-500/40 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Add Client Organization</h3>
              </div>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company / Client Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Apex Footwear Ltd."
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Industry Type / Tag</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Leather & Footwear Export"
                  value={newClient.type}
                  onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                  className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sector Category</label>
                <select
                  value={newClient.category}
                  onChange={(e) => setNewClient({ ...newClient, category: e.target.value })}
                  className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none cursor-pointer"
                >
                  <option value="Conglomerates & Corporate Groups">Conglomerates & Corporate Groups</option>
                  <option value="Hospitals & Healthcare Facilities">Hospitals & Healthcare Facilities</option>
                  <option value="Supermarkets & Retail Chains">Supermarkets & Retail Chains</option>
                  <option value="Textile Mills & Industrial Garments">Textile Mills & Industrial Garments</option>
                  <option value="Financial & Banking Institutions">Financial & Banking Institutions</option>
                  <option value="Educational & University Campuses">Educational & University Campuses</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition cursor-pointer"
                >
                  Add to Live Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
