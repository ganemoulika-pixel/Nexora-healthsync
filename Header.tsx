import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Shield, 
  ChevronDown, 
  Lock, 
  Wifi, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { User, UserRole, NotificationItem } from '../types';

export interface HeaderProps {
  currentUser?: User | null;
  currentUserRole?: UserRole;
  onOpenMobileMenu?: () => void;
  onToggleMobileSidebar?: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onSelectRole?: (role: UserRole) => void;
  onRoleChange?: (role: UserRole) => void;
  notifications?: NotificationItem[];
  unreadNotificationsCount?: number;
  onOpenNotifications: () => void;
  onOpenLogin?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentUserRole,
  onOpenMobileMenu,
  onToggleMobileSidebar,
  isDarkMode,
  setIsDarkMode,
  onSelectRole,
  onRoleChange,
  notifications = [],
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenLogin,
  searchQuery,
  setSearchQuery
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);

  // Safely compute unread count with fallback
  const unreadCount = typeof unreadNotificationsCount === 'number'
    ? unreadNotificationsCount
    : (Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0);

  const activeRole: string = currentUserRole || currentUser?.role || 'Admin';

  const handleToggleMenu = onToggleMobileSidebar || onOpenMobileMenu || (() => {});
  const handleRoleSelect = (r: UserRole) => {
    if (onRoleChange) onRoleChange(r);
    else if (onSelectRole) onSelectRole(r);
    setIsRoleDropdownOpen(false);
  };

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'Admin', label: 'Admin', desc: 'Full System & Analytics' },
    { role: 'Doctor', label: 'Doctor', desc: 'Patients, EHR & Consults' },
    { role: 'Nurse', label: 'Nurse', desc: 'Vitals & Bed Status' },
    { role: 'Receptionist', label: 'Receptionist', desc: 'Appointments & Intake' },
    { role: 'Pharmacist', label: 'Pharmacist', desc: 'Stock & Prescriptions' },
    { role: 'Billing Staff', label: 'Billing Staff', desc: 'Invoices & Payments' }
  ];

  return (
    <header className={`
      sticky top-0 z-30 h-16 border-b transition-colors duration-200 px-4 lg:px-8 flex items-center justify-between
      ${isDarkMode 
        ? 'bg-slate-900/95 border-slate-800 backdrop-blur-md text-slate-100' 
        : 'bg-white/95 border-slate-200/80 backdrop-blur-md text-slate-800'}
    `}>
      {/* Left side: Hamburger + Hospital Welcome greeting */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleToggleMenu}
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
          }`}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-500 animate-pulse" />
              Nexora Hospital Portal
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-emerald-500" />
              Live Telemetry
            </span>
          </div>
          <p className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to Nexora HealthSync Hospital
          </p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, doctor, bed #, medicine, or bill ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`
              w-full pl-10 pr-4 py-1.5 text-xs rounded-xl border transition-all outline-none
              ${isDarkMode 
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500'}
            `}
          />
        </div>
      </div>

      {/* Right side: Security Badge, Role Switcher, Dark/Light mode, Notifs, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* HIPAA Indicator */}
        <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-[11px] font-medium text-teal-700 dark:text-teal-300">
          <Shield className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>HIPAA Validated</span>
          <Lock className="w-3 h-3 text-teal-500 ml-0.5" />
        </div>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className={`
              flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer
              ${isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-teal-300 hover:border-teal-500' 
                : 'bg-slate-50 border-slate-200 text-teal-700 hover:border-teal-400 hover:bg-slate-100'}
            `}
            title="Switch Dashboard Role View"
          >
            <span className="capitalize">{activeRole}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isRoleDropdownOpen && (
            <div className={`
              absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in slide-in-from-top-2
              ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}
            `}>
              <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Active Staff Role
              </div>
              <div className="space-y-1">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => handleRoleSelect(r.role)}
                    className={`
                      w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer
                      ${activeRole.toLowerCase() === r.role.toLowerCase() 
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold' 
                        : isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                    `}
                  >
                    <div>
                      <div className="font-semibold">{r.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{r.desc}</div>
                    </div>
                    {activeRole.toLowerCase() === r.role.toLowerCase() && (
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className={`
            relative p-2 rounded-xl transition-all cursor-pointer
            ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}
          `}
          title="Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`
            p-2 rounded-xl transition-colors cursor-pointer
            ${isDarkMode ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-slate-100 text-slate-600'}
          `}
          title={isDarkMode ? 'Switch to Light Medical Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Current User Avatar or Login Trigger */}
        {currentUser ? (
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-teal-500/40 ring-2 ring-teal-500/10"
            />
          </div>
        ) : onOpenLogin ? (
          <button
            onClick={onOpenLogin}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Switch User / Login"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Role Access</span>
          </button>
        ) : null}
      </div>
    </header>
  );
};
