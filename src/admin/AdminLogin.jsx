import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Default authorized credentials
    if (
      (username.trim().toLowerCase() === 'admin' || username.trim() === 'info@bestresponsiblesecurity.com') &&
      (password === 'brslsl@2026' || password === 'admin123')
    ) {
      localStorage.setItem('brslsl_admin_token', 'AUTH_TOKEN_' + Date.now());
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin / brslsl@2026');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050d1a] px-4 py-12">
      <div className="max-w-md w-full bg-[#091e38] border-2 border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto ring-4 ring-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">BRSLSL Command Portal</h2>
          <p className="text-xs text-slate-400">Authorized Personnel & Website Management Access</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-500/40 p-3 rounded-xl text-red-400 text-xs flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Username or Admin Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050d1a] border border-slate-700 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs focus:border-amber-400"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Default demo access: admin / brslsl@2026</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-xl flex items-center justify-center transition-all"
          >
            <span>Enter Admin Command Center</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-amber-400">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
