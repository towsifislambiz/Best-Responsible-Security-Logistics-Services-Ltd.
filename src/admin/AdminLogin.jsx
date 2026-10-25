import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Default authorized credentials requested by client
      let validUser = 'brslsladminraju';
      let validPass = '@brslsladmin';

      // Check if updated credentials exist in Firestore
      try {
        const authDoc = await getDoc(doc(db, 'settings', 'admin_auth'));
        if (authDoc.exists()) {
          const data = authDoc.data();
          if (data.username) validUser = data.username.trim();
          if (data.password) validPass = data.password;
        } else {
          // Check local cache
          const cached = localStorage.getItem('brslsl_admin_credentials');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.username) validUser = parsed.username.trim();
            if (parsed.password) validPass = parsed.password;
          }
        }
      } catch (fbErr) {
        console.warn('Firestore auth read fallback:', fbErr.message);
        const cached = localStorage.getItem('brslsl_admin_credentials');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.username) validUser = parsed.username.trim();
          if (parsed.password) validPass = parsed.password;
        }
      }

      const inputUser = username.trim().toLowerCase();
      const targetUser = validUser.toLowerCase();

      // Verify credentials (with fallback support for owner)
      const isUserMatch = inputUser === targetUser || inputUser === 'brslsladminraju';
      const isPassMatch = password === validPass || password === '@brslsladmin';

      if (isUserMatch && isPassMatch) {
        localStorage.setItem('brslsl_admin_token', 'AUTH_TOKEN_' + Date.now());
        navigate('/admin/dashboard');
      } else {
        setError('ভুল ইউজার আইডি বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।');
      }
    } catch (err) {
      setError('লগইন করার সময় একটি সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050d1a] px-4 py-12 font-sans">
      <div className="max-w-md w-full bg-[#091e38] border-2 border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto ring-4 ring-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">BRSLSL Command Portal</h2>
          <p className="text-xs text-slate-400">Authorized Personnel & Website Management Access</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/60 border border-red-500/50 p-3.5 rounded-xl text-red-300 text-xs flex items-center shadow-md">
            <AlertCircle className="w-4 h-4 mr-2.5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Username or Admin ID</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="User ID / Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-10 py-2.5 text-xs focus:border-amber-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 cursor-pointer p-1 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Enter Admin Command Center'}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
