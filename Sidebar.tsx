import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Calendar, 
  FileHeart, 
  Pill, 
  BedDouble, 
  CreditCard, 
  Video, 
  BarChart3, 
  Bell, 
  Settings, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  Sparkles,
  Activity
} from 'lucide-react';
import { NavigationTab, User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  onTabChange?: (tab: string) => void;
  currentUser?: User | null;
  currentUserRole?: string;
  onLogout?: () => void;
  unreadNotifsCount?: number;
  unreadCount?: number;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onTabChange,
  currentUser,
  currentUserRole,
  onLogout,
  unreadNotifsCount,
  unreadCount,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const handleTabSelect = onTabChange || setActiveTab || (() => {});
  const totalUnread = unreadCount ?? unreadNotifsCount ?? 0;
  const roleDisplay = currentUserRole || currentUser?.role || 'Admin';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'doctors', label: 'Doctors', icon: UserCheck, badge: '4 Avail' },
    { id: 'patients', label: 'Patients', icon: Users, badge: null },
    { id: 'scheduling', label: 'Appointments', icon: Calendar, badge: '6 Today' },
    { id: 'ehr', label: 'EHR', icon: FileHeart, badge: 'HIPAA' },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill, badge: '3 Low' },
    { id: 'beds', label: 'Bed Management', icon: BedDouble, badge: '69%' },
    { id: 'billing', label: 'Billing', icon: CreditCard, badge: null },
    { id: 'virtual', label: 'Virtual Consultation', icon: Video, badge: '11:30 AM' },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: totalUnread > 0 ? `${totalUnread}` : null }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Hospital Branding */}
        <div className="p-5 border-b border-slate-800/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-white tracking-tight">HealthSync</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">HMS</span>
              </div>
              <p className="text-xs text-cyan-200/70 font-medium">Nexora Health System</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Welcome Tagline */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-teal-950/40 via-cyan-950/20 to-transparent border-b border-slate-800/60 flex items-center justify-between text-[11px] text-teal-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Welcome to Nexora Hospital
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">v3.4</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Hospital Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'scheduling' && activeTab === 'appointments');
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  handleTabSelect(item.id);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer
                  ${isActive 
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-300 border border-teal-500/30 shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="tracking-wide">{item.label}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span className={`
                      text-[10px] px-1.5 py-0.5 rounded-md font-semibold
                      ${isActive 
                        ? 'bg-teal-400/20 text-teal-300' 
                        : item.id === 'notifications' && totalUnread > 0
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-teal-400" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Security & User Profile Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50 space-y-3">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-teal-950/40 border border-teal-800/40 text-[11px] text-teal-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              HIPAA & 256-Bit Encrypted
            </span>
            <span className="text-[10px] text-teal-400/80 font-mono">ONLINE</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <img 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80"} 
                alt={currentUser?.name || "Staff"}
                className="w-9 h-9 rounded-full object-cover border border-teal-500/40 shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{currentUser?.name || `Active Session`}</p>
                <p className="text-[10px] text-teal-300 uppercase tracking-wide font-medium truncate capitalize">
                  {roleDisplay} • {currentUser?.department || 'Medical Staff'}
                </p>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                title="Logout / Change Role"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
