import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  Shield, LayoutDashboard, Users, Building, 
  FileCheck, UserPlus, DollarSign, Settings, LogOut, ExternalLink, MessageSquare
} from 'lucide-react';
import { companyInfo } from '../../data/companyData';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isDemo = new URLSearchParams(window.location.search).get('demo');
    if (isDemo) {
      localStorage.setItem('brslsl_admin_token', 'DEMO_TOKEN');
      return;
    }
    const token = localStorage.getItem('brslsl_admin_token');
    if (!token && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('brslsl_admin_token');
    navigate('/admin/login');
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Staff & Guard Manager", path: "/admin/staff", icon: Users, badge: "Photo Edit" },
    { title: "Client Logos Manager", path: "/admin/clients", icon: Building },
    { title: "Requisition Leads", path: "/admin/requisitions", icon: FileCheck },
    { title: "Recruitment Apps", path: "/admin/recruitment", icon: UserPlus },
    { title: "Contact Inquiries", path: "/admin/inquiries", icon: MessageSquare, badge: "Inbox" },
    { title: "Rate Chart Editor", path: "/admin/rates", icon: DollarSign },
    { title: "Site Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050d1a] text-slate-200 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#071527] border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
            <img 
              src="/assets/company-logo.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain rounded-full ring-2 ring-amber-400" 
            />
            <div>
              <h2 className="text-white font-black text-xs sm:text-sm tracking-wider uppercase">
                BRSLSL Command
              </h2>
              <span className="text-[10px] text-amber-400 block font-semibold">
                Super Admin Console
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="p-3 space-y-1 text-xs">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded uppercase font-bold border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-xl border border-slate-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-950/30 hover:bg-red-900/40 text-red-400 text-xs rounded-xl border border-red-500/30 transition-colors font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-screen bg-[#050d1a]">
        {children || <Outlet />}
      </main>

    </div>
  );
}
