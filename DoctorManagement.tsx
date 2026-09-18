import React, { useState } from 'react';
import { 
  UserCheck, 
  Stethoscope, 
  Clock, 
  Users, 
  Calendar, 
  Award, 
  Phone, 
  MapPin, 
  Plus, 
  Search, 
  Filter,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Video
} from 'lucide-react';
import { Doctor, DoctorStatus } from '../types';

interface DoctorManagementProps {
  doctors: Doctor[];
  onBookDoctor: (doctor: Doctor) => void;
  onUpdateDoctorStatus: (doctorId: string, status: DoctorStatus) => void;
  isDarkMode: boolean;
}

export const DoctorManagement: React.FC<DoctorManagementProps> = ({
  doctors = [],
  onBookDoctor,
  onUpdateDoctorStatus,
  isDarkMode
}) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const departments = ['All', 'Cardiovascular Sciences', 'General Medicine', 'Neurosciences', 'Pediatric Care', 'Orthopedic Surgery', 'Comprehensive Cancer Center'];

  const filteredDoctors = (doctors || []).filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-teal-500" />
            Doctor Roster & Availability Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time outpatient patient loads, slot allocation, and departmental on-call statuses.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Busy
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Fully Booked
          </span>
        </div>
      </div>

      {/* Department Filter and Search */}
      <div className={`
        p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctor name or specialization..."
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
            Dept:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`
                px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap
                ${selectedDept === dept 
                  ? 'bg-teal-600 text-white' 
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
              `}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => {
          const isAvailable = doc.status === 'Available';
          const isBusy = doc.status === 'Busy';
          const isFull = doc.status === 'Fully Booked';

          return (
            <div
              key={doc.id}
              className={`
                p-5 rounded-3xl border shadow-xs transition-all duration-200 flex flex-col justify-between hover:shadow-md
                ${isDarkMode ? 'bg-slate-900/90 border-slate-800 hover:border-teal-500/40' : 'bg-white border-slate-200/90 hover:border-teal-400'}
              `}
            >
              <div>
                {/* Avatar & Status Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 ring-2 ring-teal-500/10 shadow-xs"
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-bold text-teal-600 dark:text-teal-400">
                        {doc.specialization}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {doc.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`
                    px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border flex items-center gap-1 shrink-0
                    ${isAvailable 
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                      : isBusy
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30'}
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-ping' : isBusy ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                    {doc.status}
                  </span>
                </div>

                {/* Metrics Breakdown Matching Prompt Examples */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Current Load</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {doc.currentPatientLoad}
                    </span>
                    <span className="text-[9px] text-slate-400 block">Patients</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Appointments</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400 text-sm">
                      {doc.todayAppointments}
                    </span>
                    <span className="text-[9px] text-slate-400 block">Today</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Open Slots</span>
                    <span className={`font-bold text-sm ${doc.availableSlots > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {doc.availableSlots}
                    </span>
                    <span className="text-[9px] text-slate-400 block">Slots</span>
                  </div>
                </div>

                {/* Location & Contact */}
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.roomNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.contactNumber}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Status Toggle */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <select
                  value={doc.status}
                  onChange={(e) => onUpdateDoctorStatus(doc.id, e.target.value as DoctorStatus)}
                  className={`
                    px-2.5 py-1 rounded-xl text-xs font-semibold border outline-none
                    ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-700'}
                  `}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Fully Booked">Fully Booked</option>
                </select>

                <button
                  onClick={() => onBookDoctor(doc)}
                  disabled={doc.availableSlots === 0}
                  className={`
                    px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                    ${doc.availableSlots > 0 
                      ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-xs cursor-pointer' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}
                  `}
                >
                  {doc.availableSlots > 0 ? 'Book Slot' : 'No Slots'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
