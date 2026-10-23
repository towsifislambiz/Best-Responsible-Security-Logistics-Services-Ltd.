import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, MapPin, Mail, Bell, Globe } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function AdminSettings() {
  const { siteSettings: liveSettings, updateSiteSettings } = useSiteData();
  const [settings, setSettings] = useState(liveSettings);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (liveSettings) {
      setSettings(liveSettings);
    }
  }, [liveSettings]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteSettings(settings);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">General Site Settings</h1>
          <p className="text-xs text-slate-400">
            Update primary hotlines, office addresses, and emergency announcement notices in real-time.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Cloud...' : 'Save Settings'}</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-xl text-emerald-400 text-xs flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          <span>Settings saved to cloud and published live across the website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#091e38] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 text-xs shadow-2xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span>Central IP-PABX Hotline</span>
            </label>
            <input 
              type="text" 
              value={settings.hotline || ''}
              onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span>MD Direct Cell Number</span>
            </label>
            <input 
              type="text" 
              value={settings.mdPhone || ''}
              onChange={(e) => setSettings({ ...settings, mdPhone: e.target.value })}
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>Official WhatsApp Hotline</span>
            </label>
            <input 
              type="text" 
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1 text-sky-400" />
              <span>Official Management Email</span>
            </label>
            <input 
              type="email" 
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1 text-blue-400" />
              <span>Official Facebook Page URL</span>
            </label>
            <input 
              type="url" 
              value={settings.facebook || ''}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center">
            <Phone className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span>Duty Desk Series Display Text</span>
          </label>
          <input 
            type="text" 
            value={settings.mobileDisplay || ''}
            onChange={(e) => setSettings({ ...settings, mobileDisplay: e.target.value })}
            className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span>Head Office Address</span>
          </label>
          <textarea 
            rows={2}
            value={settings.headOfficeAddress || ''}
            onChange={(e) => setSettings({ ...settings, headOfficeAddress: e.target.value })}
            className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span>Corporate Office Address</span>
          </label>
          <textarea 
            rows={2}
            value={settings.corporateOfficeAddress || ''}
            onChange={(e) => setSettings({ ...settings, corporateOfficeAddress: e.target.value })}
            className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center">
            <Bell className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span>Emergency Broadcast Notice Banner</span>
          </label>
          <input 
            type="text" 
            value={settings.announcementNotice || ''}
            onChange={(e) => setSettings({ ...settings, announcementNotice: e.target.value })}
            className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-amber-400 outline-none"
          />
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
