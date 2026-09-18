import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  AlertTriangle, 
  AlertOctagon, 
  FileText, 
  CreditCard, 
  CheckCheck, 
  Trash2, 
  Filter, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { HospitalNotification, NotificationType } from '../types';

interface NotificationCenterProps {
  notifications: HospitalNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onActionClick?: (linkTab?: string) => void;
  isDarkMode: boolean;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onActionClick,
  isDarkMode
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | NotificationType>('All');

  const filteredNotifications = (notifications || []).filter(n => {
    if (activeFilter === 'All') return true;
    return n.type === activeFilter;
  });

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'Emergency':
        return <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />;
      case 'StockAlert':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'AppointmentReminder':
        return <Calendar className="w-5 h-5 text-teal-500" />;
      case 'LabResult':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Billing':
        return <CreditCard className="w-5 h-5 text-purple-500" />;
    }
  };

  const getTypeBadge = (type: NotificationType) => {
    switch (type) {
      case 'Emergency':
        return 'bg-red-500/15 text-red-600 border-red-500/30';
      case 'StockAlert':
        return 'bg-amber-500/15 text-amber-600 border-amber-500/30';
      case 'AppointmentReminder':
        return 'bg-teal-500/15 text-teal-600 border-teal-500/30';
      case 'LabResult':
        return 'bg-blue-500/15 text-blue-600 border-blue-500/30';
      case 'Billing':
        return 'bg-purple-500/15 text-purple-600 border-purple-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-teal-500" />
              Automated Hospital Notification Hub
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-600 text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time event stream capturing emergency triage arrivals, critical medication alerts, lab releases, and billing triggers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onMarkAllAsRead}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-teal-500" />
            <span>Mark All as Read</span>
          </button>
          <button
            onClick={onClearAll}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Feed</span>
          </button>
        </div>
      </div>

      {/* Filters matching Section 13 (All, Reminders, Alerts, Emergency, etc.) */}
      <div className={`
        p-3.5 rounded-2xl border flex items-center space-x-2 overflow-x-auto
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {[
          { id: 'All', label: 'All Notifications' },
          { id: 'Emergency', label: 'Emergency Room' },
          { id: 'StockAlert', label: 'Low Medicine Alerts' },
          { id: 'AppointmentReminder', label: 'Appointment Reminders' },
          { id: 'LabResult', label: 'Lab Test Results' },
          { id: 'Billing', label: 'Unpaid Bills' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveFilter(item.id as any)}
            className={`
              px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all
              ${activeFilter === item.id 
                ? 'bg-teal-600 text-white shadow-xs' 
                : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-400'}`}>
            <Bell className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="font-bold text-sm">No notifications in this category</p>
            <p className="text-xs">All hospital telemetry channels are currently clear.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkAsRead(notif.id)}
              className={`
                p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer
                ${notif.read 
                  ? isDarkMode ? 'bg-slate-900/40 border-slate-800/80 opacity-75' : 'bg-white/60 border-slate-200/60 opacity-80' 
                  : isDarkMode ? 'bg-slate-900 border-teal-500/40 shadow-sm' : 'bg-white border-teal-400 shadow-sm ring-1 ring-teal-500/10'}
              `}
            >
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                    )}
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getTypeBadge(notif.type)}`}>
                      {notif.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              {notif.actionLink && onActionClick && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionClick(notif.actionLink);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 hover:bg-teal-100 font-bold text-xs flex items-center gap-1 self-end sm:self-auto shrink-0 cursor-pointer"
                >
                  <span>Resolve / View</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
