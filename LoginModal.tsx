import React, { useState } from 'react';
import { 
  Activity, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  UserCheck, 
  Stethoscope, 
  Pill, 
  Receipt, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  onLogin: (email: string, role: UserRole) => void;
  isDarkMode: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, isDarkMode }) => {
  const [email, setEmail] = useState('dr.priya@nexorahealth.com');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('doctor');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const roleOptions: { role: UserRole; title: string; desc: string; icon: any; demoEmail: string }[] = [
    { role: 'doctor', title: 'Doctor', desc: 'OPD, EHR & Ward Rounds', icon: Stethoscope, demoEmail: 'dr.priya@nexorahealth.com' },
    { role: 'admin', title: 'Admin', desc: 'Executive Analytics & Ops', icon: ShieldCheck, demoEmail: 'admin@nexorahealth.com' },
    { role: 'nurse', title: 'Nurse', desc: 'Bed Management & Care', icon: Activity, demoEmail: 'nurse.priya@nexorahealth.com' },
    { role: 'receptionist', title: 'Receptionist', desc: 'Patient Intake & Sched', icon: HeartHandshake, demoEmail: 'reception@nexorahealth.com' },
    { role: 'pharmacist', title: 'Pharmacist', desc: 'Inventory & Prescriptions', icon: Pill, demoEmail: 'pharmacy@nexorahealth.com' },
    { role: 'billing', title: 'Billing Staff', desc: 'Invoices & TPA Claims', icon: Receipt, demoEmail: 'billing@nexorahealth.com' }
  ];

  const handleRoleSelect = (selectedRole: UserRole, demoMail: string) => {
    setRole(selectedRole);
    setEmail(demoMail);
    setPassword('HospitalSecure#2026');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, role);
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300
      ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-slate-50 via-teal-50/40 to-blue-50/50 text-slate-800'}
    `}>
      {/* Ambient background decoration */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className={`
        w-full max-w-xl rounded-3xl border shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative z-10
        ${isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 shadow-teal-950/20' 
          : 'bg-white/95 border-slate-200/90 shadow-slate-200/80'}
      `}>
        {/* Welcome Tag & Hospital Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
            <span>Welcome to Nexora Hospital</span>
          </div>

          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                HealthSync Hospital
              </h1>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-wide uppercase">
                Nexora Integrated Health Systems
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Authorized Medical Staff Portal • Encrypted AES-256 Session • HIPAA Compliant
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Select Your Staff Role
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roleOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = role === opt.role;
              return (
                <button
                  type="button"
                  key={opt.role}
                  onClick={() => handleRoleSelect(opt.role, opt.demoEmail)}
                  className={`
                    p-2.5 rounded-xl border text-left transition-all flex items-start space-x-2.5
                    ${isSelected 
                      ? 'bg-teal-500/15 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm ring-1 ring-teal-500/30' 
                      : isDarkMode 
                        ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}
                  `}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                  <div className="truncate">
                    <div className="text-xs font-bold leading-tight">{opt.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Username / Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff.name@nexorahealth.com"
                className={`
                  w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none
                  ${isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-teal-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500'}
                `}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Staff Security Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`
                  w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all outline-none
                  ${isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-teal-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500'}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Security Notice */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500 border-slate-300 w-4 h-4"
              />
              <span>Remember this workstation</span>
            </label>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              SSL 256-bit Encrypted
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Access HealthSync Dashboard</span>
            <UserCheck className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-medium">
            Quick Auto-Fill Demo Credentials:
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {roleOptions.map((opt) => (
              <button
                key={opt.role}
                type="button"
                onClick={() => {
                  setRole(opt.role);
                  setEmail(opt.demoEmail);
                  setPassword('HospitalPass2026!');
                  onLogin(opt.demoEmail, opt.role);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-500/20 hover:text-teal-500 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Login as {opt.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-md rounded-2xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <h3 className="text-base font-bold mb-2">Hospital Credentials Recovery</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter your verified staff hospital email. Our security team will send a temporary one-time passcode (OTP) to your registered device.
            </p>
            {forgotSubmitted ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Password reset link sent to your registered official inbox. Check email in 2 minutes.</span>
              </div>
            ) : (
              <input
                type="email"
                placeholder="name@nexorahealth.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-sm mb-4 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotSubmitted(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              {!forgotSubmitted && (
                <button
                  onClick={() => setForgotSubmitted(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white"
                >
                  Send OTP Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
