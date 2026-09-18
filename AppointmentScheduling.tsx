import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  CalendarCheck, 
  Send, 
  Video, 
  AlertCircle, 
  Search, 
  Filter,
  Check,
  X,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Appointment, AppointmentType, AppointmentStatus, Doctor, Patient } from '../types';

interface AppointmentSchedulingProps {
  appointments: Appointment[];
  doctors: Doctor[];
  patients: Patient[];
  onAddAppointment: (appointment: Appointment) => void;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onReschedule: (id: string, newDate: string, newTime: string) => void;
  onSendReminder: (id: string) => void;
  onNavigateToVirtual: () => void;
  isDarkMode: boolean;
}

export const AppointmentScheduling: React.FC<AppointmentSchedulingProps> = ({
  appointments = [],
  doctors = [],
  patients = [],
  onAddAppointment,
  onUpdateStatus,
  onReschedule,
  onSendReminder,
  onNavigateToVirtual,
  isDarkMode
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [rescheduleAppointment, setRescheduleAppointment] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // New appointment form state
  const [patientName, setPatientName] = useState('Vikram Singh');
  const [patientId, setPatientId] = useState('PAT-1082');
  const [doctorName, setDoctorName] = useState('Dr. Priya Sharma');
  const [department, setDepartment] = useState('Cardiology');
  const [aptDate, setAptDate] = useState('2026-09-03');
  const [aptTime, setAptTime] = useState('11:00 AM');
  const [aptType, setAptType] = useState<AppointmentType>('In-person consultation');
  const [notes, setNotes] = useState('');

  const handlePatientSelect = (pId: string) => {
    const p = patients.find(pat => pat.id === pId);
    if (p) {
      setPatientId(p.id);
      setPatientName(p.name);
    }
  };

  const handleDoctorSelect = (docName: string) => {
    const doc = doctors.find(d => d.name === docName);
    if (doc) {
      setDoctorName(doc.name);
      setDepartment(doc.specialization);
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: Appointment = {
      id: `APT-${Math.floor(400 + Math.random() * 500)}`,
      patientName,
      patientId,
      doctor: doctorName,
      department,
      date: aptDate,
      time: aptTime,
      type: aptType,
      status: 'Confirmed',
      notes,
      reminderSent: true,
      reminderSentTime: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} via SMS`
    };
    onAddAppointment(newApt);
    setIsScheduleModalOpen(false);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleAppointment && rescheduleDate && rescheduleTime) {
      onReschedule(rescheduleAppointment.id, rescheduleDate, rescheduleTime);
      setRescheduleAppointment(null);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      apt.department.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || apt.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-teal-500" />
            Patient Scheduling & Automated Reminders
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Intelligent appointment orchestrator with multi-channel SMS/WhatsApp automated patient reminders.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Reminder Status Broadcast Banner */}
      <div className={`
        p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              Automated Dispatch Engine Active
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Appointments scheduled send an automated reminder notification via SMS & WhatsApp to patients 24 hours prior.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            Reminder sent to patient
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`
        p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, doctor, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`
              w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none
              ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}
            `}
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Type:
          </span>
          {['All', 'In-person consultation', 'Follow-up', 'Emergency', 'Virtual consultation'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`
                px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap
                ${typeFilter === t 
                  ? 'bg-teal-600 text-white' 
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment Table */}
      <div className={`
        rounded-3xl border shadow-xs overflow-hidden
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-slate-800/30">
                <th className="py-3 px-4 font-bold">Patient Name</th>
                <th className="py-3 px-4 font-bold">Doctor & Dept</th>
                <th className="py-3 px-4 font-bold">Date & Time</th>
                <th className="py-3 px-4 font-bold">Appointment Type</th>
                <th className="py-3 px-4 font-bold">Reminder Interface</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {apt.patientName}
                      <span className="block text-[10px] font-mono font-normal text-teal-600 dark:text-teal-400">{apt.patientId}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{apt.doctor}</span>
                      <span className="block text-[10px] text-teal-600">{apt.department}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-1.5 font-medium text-slate-800 dark:text-slate-200">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.time}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{apt.date}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`
                        px-2.5 py-1 rounded-md text-[11px] font-semibold
                        ${apt.type === 'Virtual consultation' 
                          ? 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30' 
                          : apt.type === 'Emergency'
                            ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}
                      `}>
                        {apt.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {apt.reminderSent ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            Reminder sent to patient
                          </span>
                          {apt.reminderSentTime && (
                            <span className="block text-[9px] text-slate-400">{apt.reminderSentTime}</span>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => onSendReminder(apt.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 text-[11px] font-bold border border-amber-500/30 flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Instant Reminder</span>
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-[10px] font-bold border
                        ${apt.status === 'Confirmed' 
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                          : apt.status === 'Scheduled'
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                            : apt.status === 'Cancelled'
                              ? 'bg-red-500/10 text-red-600 border-red-500/20'
                              : 'bg-slate-500/10 text-slate-600 border-slate-500/20'}
                      `}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {apt.status !== 'Confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(apt.id, 'Confirmed')}
                            title="Confirm Appointment"
                            className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setRescheduleAppointment(apt);
                            setRescheduleDate(apt.date);
                            setRescheduleTime(apt.time);
                          }}
                          title="Reschedule Appointment"
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 text-[11px] font-semibold"
                        >
                          Reschedule
                        </button>
                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(apt.id, 'Cancelled')}
                            title="Cancel Appointment"
                            className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-slate-800"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.type === 'Virtual consultation' && (
                          <button
                            onClick={onNavigateToVirtual}
                            className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] flex items-center gap-1"
                          >
                            <Video className="w-3 h-3" />
                            <span>Join</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHEDULE MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-lg rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base">Schedule New Appointment</h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Select Patient</label>
                <select
                  value={patientId}
                  onChange={(e) => handlePatientSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Select Attending Doctor</label>
                <select
                  value={doctorName}
                  onChange={(e) => handleDoctorSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialization}) - Slots: {d.availableSlots}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11:30 AM"
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Appointment Type</label>
                <select
                  value={aptType}
                  onChange={(e) => setAptType(e.target.value as AppointmentType)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  <option value="In-person consultation">In-person consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Virtual consultation">Virtual consultation (TeleHealth)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Clinical Notes / Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Glycemic log review, BP titration..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[11px]">
                ℹ️ Patient will automatically receive an SMS notification confirmation with clinic room directions.
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Confirm & Send Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {rescheduleAppointment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-sm rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <h3 className="font-bold text-base mb-1">Reschedule Appointment</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Patient: {rescheduleAppointment.patientName} with {rescheduleAppointment.doctor}
            </p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">New Time</label>
                <input
                  type="text"
                  required
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  placeholder="e.g. 02:30 PM"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRescheduleAppointment(null)}
                  className="px-3 py-1.5 rounded-xl text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Save & Notify Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
