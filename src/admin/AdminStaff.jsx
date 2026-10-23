import React, { useState } from 'react';
import { 
  Users, UserPlus, Trash2, Edit2, CheckCircle2, 
  Shield, Image as ImageIcon, Search, Sliders, X, Sparkles, Download
} from 'lucide-react';
import PhotoCropper from './components/PhotoCropper';
import { useSiteData } from '../context/SiteDataContext';

export default function AdminStaff() {
  const { staffList, addStaff, updateStaff, deleteStaff, exportToCSV } = useSiteData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Security Guard (Male)',
    badgeNo: 'BRS-GD-' + Math.floor(100 + Math.random() * 900),
    phone: '018XXXXXXXX',
    bloodGroup: 'B+',
    status: 'Active (On-Duty)',
    photo: '/assets/logo (8).png'
  });

  const handleStartCreate = () => {
    setEditingId(null);
    setNewStaff({
      name: '',
      role: 'Security Guard (Male)',
      badgeNo: 'BRS-GD-' + Math.floor(100 + Math.random() * 900),
      phone: '018XXXXXXXX',
      bloodGroup: 'B+',
      status: 'Active (On-Duty)',
      photo: '/assets/logo (8).png'
    });
    setShowAddModal(true);
  };

  const handleStartEdit = (staff) => {
    setEditingId(staff.id);
    setNewStaff({
      name: staff.name || '',
      role: staff.role || 'Security Guard (Male)',
      badgeNo: staff.badgeNo || '',
      phone: staff.phone || '',
      bloodGroup: staff.bloodGroup || 'B+',
      status: staff.status || 'Active (On-Duty)',
      photo: staff.photo || '/assets/logo (8).png'
    });
    setShowAddModal(true);
  };

  const handleSaveStaff = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateStaff(editingId, newStaff);
    } else {
      await addStaff(newStaff);
    }
    setShowAddModal(false);
    setEditingId(null);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete staff record for "${name || 'Guard'}"?`)) {
      await deleteStaff(id);
    }
  };

  const handleExportCSV = () => {
    const headers = {
      name: 'Staff Name',
      role: 'Designation / Role',
      badgeNo: 'Badge Number',
      phone: 'Phone Number',
      bloodGroup: 'Blood Group',
      status: 'Current Duty Status'
    };
    exportToCSV(staffList, 'BRSLSL_Staff_Registry', headers);
  };

  const handlePhotoSaved = (croppedDataUrl) => {
    setNewStaff(prev => ({ ...prev, photo: croppedDataUrl }));
    setIsEditingPhoto(false);
  };

  const filteredStaff = staffList.filter(s =>
    (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.badgeNo || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Staff & Security Guard Manager</h1>
          <p className="text-xs text-slate-400">
            Add new security guards, crop & edit profile photos, and assign duty badge numbers.
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
            onClick={handleStartCreate}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            <span>Add New Staff / Guard</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#091e38] p-3 rounded-2xl border border-slate-800 flex items-center">
        <Search className="w-4 h-4 text-slate-400 ml-2 mr-3" />
        <input 
          type="text"
          placeholder="Search by Guard Name, Badge Number (e.g. BRS-SP-014), or Role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-white text-xs focus:outline-none placeholder-slate-500"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStaff.map((staff) => (
          <div 
            key={staff.id}
            className="bg-[#091e38] border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo Area */}
              <div className="relative h-56 bg-slate-950 overflow-hidden">
                <img 
                  src={staff.photo} 
                  alt={staff.name} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091e38] via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-700">
                  {staff.badgeNo}
                </span>

                <span className="absolute top-3 right-3 bg-emerald-500/90 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  {staff.status}
                </span>
              </div>

              {/* Info Body */}
              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white truncate">{staff.name}</h3>
                <p className="text-amber-400 text-xs font-semibold">{staff.role}</p>

                <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Blood Group:</span>
                    <strong className="text-slate-200">{staff.bloodGroup}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="font-mono text-slate-300">{staff.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500">ID: {staff.id}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(staff)}
                  className="text-amber-400 hover:text-amber-300 p-1.5 rounded-lg hover:bg-amber-400/10 transition-colors cursor-pointer"
                  title="Edit Guard Details"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(staff.id, staff.name)}
                  className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-950/40 transition-colors cursor-pointer"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add New Staff with Integrated Photo Cropper */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071527] border-2 border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                {editingId ? <Edit2 className="w-5 h-5 text-amber-400" /> : <UserPlus className="w-5 h-5 text-amber-400" />}
                <h3 className="text-xl font-bold text-white">
                  {editingId ? 'Edit Security Staff / Guard Details' : 'Register New Staff / Security Guard'}
                </h3>
              </div>
              <button 
                onClick={() => { setShowAddModal(false); setEditingId(null); }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isEditingPhoto ? (
              <PhotoCropper 
                existingImage={newStaff.photo}
                onSave={handlePhotoSaved}
                onCancel={() => setIsEditingPhoto(false)}
              />
            ) : (
              <form onSubmit={handleSaveStaff} className="space-y-4 text-xs">
                
                {/* Photo Preview & Edit Trigger */}
                <div className="bg-[#091e38] p-4 rounded-2xl border border-slate-800 flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-950">
                    <img 
                      src={newStaff.photo} 
                      alt="Guard Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Guard Profile Photo</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Crop, zoom, rotate and adjust brightness before saving.</p>
                    <button
                      type="button"
                      onClick={() => setIsEditingPhoto(true)}
                      className="mt-2 px-3 py-1.5 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-1 hover:bg-amber-300 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Open Photo Cropper & Editor</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Staff / Guard Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Rafiqul Islam"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Assigned Designation / Role</label>
                    <select
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                      className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-amber-400"
                    >
                      <option value="Security Guard (Male)">Security Guard (Male)</option>
                      <option value="Security Guard (Female)">Security Guard (Female)</option>
                      <option value="Security Supervisor">Security Supervisor</option>
                      <option value="Security Inspector">Security Inspector</option>
                      <option value="Gunman (With Arms)">Gunman (With Arms)</option>
                      <option value="VIP Bodyguard">VIP Bodyguard</option>
                      <option value="Chauffeur / Driver">Chauffeur / Driver</option>
                      <option value="Commercial Cleaner">Commercial Cleaner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Badge Identification Number</label>
                    <input
                      type="text"
                      required
                      value={newStaff.badgeNo}
                      onChange={(e) => setNewStaff({ ...newStaff, badgeNo: e.target.value })}
                      className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Blood Group</label>
                    <select
                      value={newStaff.bloodGroup}
                      onChange={(e) => setNewStaff({ ...newStaff, bloodGroup: e.target.value })}
                      className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-amber-400"
                    >
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="O+">O+</option>
                      <option value="AB+">AB+</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="O-">O-</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Deployment Status</label>
                    <select
                      value={newStaff.status}
                      onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value })}
                      className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-amber-400"
                    >
                      <option value="Active (On-Duty)">Active (On-Duty)</option>
                      <option value="Standby / Relief">Standby / Relief</option>
                      <option value="Night Patrol Duty">Night Patrol Duty</option>
                      <option value="Training Cadet">Training Cadet</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingId(null); }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl shadow-lg hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
                  >
                    {editingId ? 'Update Guard Record' : 'Save & Deploy Guard'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
