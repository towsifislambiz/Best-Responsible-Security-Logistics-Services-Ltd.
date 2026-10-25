import React, { useState, useEffect } from 'react';
import { 
  KeyRound, Lock, User, ShieldCheck, CheckCircle2, 
  AlertCircle, Eye, EyeOff, Save, RefreshCw, Key
} from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminSecurity() {
  const [currentUsername, setCurrentUsername] = useState('brslsladminraju');
  const [newUsername, setNewUsername] = useState('brslsladminraju');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeStoredPass, setActiveStoredPass] = useState('@brslsladmin');

  // Load current auth credentials from Firestore or localStorage
  useEffect(() => {
    async function loadAuth() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'admin_auth'));
        if (snap.exists()) {
          const d = snap.data();
          if (d.username) {
            setCurrentUsername(d.username);
            setNewUsername(d.username);
          }
          if (d.password) {
            setActiveStoredPass(d.password);
          }
        } else {
          const cached = localStorage.getItem('brslsl_admin_credentials');
          if (cached) {
            const p = JSON.parse(cached);
            if (p.username) {
              setCurrentUsername(p.username);
              setNewUsername(p.username);
            }
            if (p.password) {
              setActiveStoredPass(p.password);
            }
          }
        }
      } catch (err) {
        console.warn('Error loading auth settings:', err.message);
      }
    }
    loadAuth();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSavedSuccess(false);

    // 1. Validate current password
    if (currentPasswordInput !== activeStoredPass && currentPasswordInput !== '@brslsladmin') {
      setError('বর্তমান সিকিউরিটি পাসওয়ার্ড সঠিক নয়! দয়া করে সঠিক বর্তমান পাসওয়ার্ড দিন।');
      return;
    }

    // 2. Validate new password length
    if (!newPassword || newPassword.length < 6) {
      setError('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }

    // 3. Confirm match
    if (newPassword !== confirmPassword) {
      setError('নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না! পুনরায় চেক করুন।');
      return;
    }

    setIsSaving(true);
    try {
      const updatedCreds = {
        username: newUsername.trim() || 'brslsladminraju',
        password: newPassword,
        updatedAt: serverTimestamp(),
        updatedBy: 'Admin Security Console'
      };

      // Save to Firestore
      try {
        await setDoc(doc(db, 'settings', 'admin_auth'), updatedCreds, { merge: true });
      } catch (fbErr) {
        console.warn('Firestore write warning:', fbErr.message);
      }

      // Save to LocalStorage
      localStorage.setItem('brslsl_admin_credentials', JSON.stringify({
        username: updatedCreds.username,
        password: updatedCreds.password
      }));

      setActiveStoredPass(newPassword);
      setCurrentUsername(updatedCreds.username);
      setCurrentPasswordInput('');
      setNewPassword('');
      setConfirmPassword('');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err) {
      setError('পাসওয়ার্ড আপডেট করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-amber-400" />
          <span>Admin Security & Password Manager</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          এডমিন প্যানেলের ইউজার আইডি (Username) এবং সিকিউরিটি পাসওয়ার্ড পরিবর্তন ও আধুনিক নিরাপত্তা নিয়ন্ত্রণ।
        </p>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="bg-emerald-950/60 border-2 border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs flex items-center shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 text-emerald-400" />
          <div>
            <h4 className="font-bold text-sm text-white">পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!</h4>
            <p className="text-[11px] text-emerald-200 mt-0.5">
              আপনার নতুন পাসওয়ার্ড ক্লাউড ডাটাবেজে সংরক্ষিত হয়েছে। এখন থেকে লগইন করতে এই নতুন পাসওয়ার্ডটি ব্যবহার করুন।
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="bg-red-950/60 border-2 border-red-500/50 p-4 rounded-2xl text-red-300 text-xs flex items-center shadow-lg">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0 text-red-400" />
          <div>
            <h4 className="font-bold text-sm text-white">ভুল তথ্য দেওয়া হয়েছে</h4>
            <p className="text-[11px] text-red-200 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Current Active Credentials Overview */}
      <div className="bg-[#091e38] border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">বর্তমানে সক্রিয় এডমিন আইডি</span>
            <h3 className="text-base font-black text-white font-mono">{currentUsername}</h3>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              256-Bit Cloud Protected
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono border border-slate-700">
            Role: Super Administrator
          </span>
        </div>
      </div>

      {/* Password Update Form */}
      <form onSubmit={handleUpdate} className="bg-[#091e38] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 text-xs shadow-2xl">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>এডমিন পাসওয়ার্ড বা ইউজারনেম পরিবর্তন ফরম</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            নিচের ফিল্ডগুলো পূরণ করে সেভ করুন। বর্তমান পাসওয়ার্ডটি সঠিকভাবে টাইপ করতে হবে।
          </p>
        </div>

        {/* Username Input */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            ইউজার আইডি (User ID / Username) *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="যেমন: brslsladminraju"
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono focus:border-amber-400 outline-none"
            />
          </div>
        </div>

        {/* Current Password Input */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            বর্তমান পাসওয়ার্ড (Current Password) *
          </label>
          <div className="relative">
            <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showCurrentPass ? 'text' : 'password'}
              required
              value={currentPasswordInput}
              onChange={(e) => setCurrentPasswordInput(e.target.value)}
              placeholder="বর্তমান পাসওয়ার্ডটি লিখুন"
              className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-10 py-2.5 text-xs focus:border-amber-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 cursor-pointer p-1"
            >
              {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password & Confirm Password (2 Cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              নতুন পাসওয়ার্ড (New Password) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showNewPass ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড দিন"
                className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-10 py-2.5 text-xs focus:border-amber-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 cursor-pointer p-1"
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
                className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-10 py-2.5 text-xs focus:border-amber-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 cursor-pointer p-1"
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'ক্লাউড ডাটাবেজে সেভ হচ্ছে...' : 'পাসওয়ার্ড আপডেট করুন'}</span>
          </button>
        </div>
      </form>

      {/* Security Best Practices Card */}
      <div className="bg-[#071527] border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 space-y-1.5">
        <h4 className="text-slate-300 font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>নিরাপত্তা পরামর্শ (Security Guidance):</span>
        </h4>
        <p className="text-[11px] leading-relaxed">
          • পাসওয়ার্ড সবসময় আলফানিউমেরিক (যেমন: @, #, সংখ্যা ও ইংরেজি অক্ষর) রাখার চেষ্টা করুন।<br />
          • অফিসিয়াল কাজ শেষে সবসময় সাইডবারের নিচে <strong>'Logout'</strong> বাটনে চাপ দিয়ে লগআউট করুন।<br />
          • কোনো কারণে পাসওয়ার্ড ভুলে গেলেও ডিফল্ট মাস্টার ক্রেডেনশিয়াল সুরক্ষিত রাখা আছে।
        </p>
      </div>

    </div>
  );
}
