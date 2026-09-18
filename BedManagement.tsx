import React, { useState } from 'react';
import { 
  BedDouble, 
  Bed as BedIcon, 
  Sparkles, 
  User, 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Filter, 
  Plus, 
  X,
  Search,
  Check,
  ShieldAlert
} from 'lucide-react';
import { Bed, WardType, BedStatus, Patient } from '../types';

interface BedManagementProps {
  beds: Bed[];
  patients: Patient[];
  onUpdateBedStatus: (bedId: string, newStatus: BedStatus, patientName?: string, patientId?: string) => void;
  isDarkMode: boolean;
}

export const BedManagement: React.FC<BedManagementProps> = ({
  beds = [],
  patients = [],
  onUpdateBedStatus,
  isDarkMode
}) => {
  const [activeWardFilter, setActiveWardFilter] = useState<'All' | WardType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | BedStatus>('All');
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [assignPatientModalOpen, setAssignPatientModalOpen] = useState(false);
  const [patientToAssign, setPatientToAssign] = useState<string>((patients && patients[0]?.id) || '');

  // Exact prompt numbers:
  // Total Beds: 122, Occupied: 84, Available: 38, ICU: 18, Emergency: 24, Isolation: 12. Overall Occupancy: 69%
  const totalBeds = 122;
  const occupiedBeds = 84;
  const availableBeds = 38;
  const icuBeds = 18;
  const emergencyBeds = 24;
  const isolationBeds = 12;
  const overallOccupancy = 69;

  const filteredBeds = (beds || []).filter((b) => {
    const matchesWard = activeWardFilter === 'All' || b.ward === activeWardFilter;
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesWard && matchesStatus;
  });

  const handleAssignPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBed) return;
    const pat = patients.find(p => p.id === patientToAssign);
    if (pat) {
      onUpdateBedStatus(selectedBed.id, 'Occupied', pat.name, pat.id);
      setSelectedBed({
        ...selectedBed,
        status: 'Occupied',
        patientName: pat.name,
        patientId: pat.id,
        admittedSince: new Date().toISOString().split('T')[0]
      });
      setAssignPatientModalOpen(false);
    }
  };

  const handleDischarge = () => {
    if (!selectedBed) return;
    onUpdateBedStatus(selectedBed.id, 'Cleaning');
    setSelectedBed({
      ...selectedBed,
      status: 'Cleaning',
      patientName: undefined,
      patientId: undefined,
      notes: 'Sterilizing post-discharge'
    });
  };

  const handleMarkAvailable = () => {
    if (!selectedBed) return;
    onUpdateBedStatus(selectedBed.id, 'Available');
    setSelectedBed({
      ...selectedBed,
      status: 'Available',
      patientName: undefined,
      patientId: undefined,
      notes: undefined
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BedDouble className="w-6 h-6 text-teal-500" />
            Bed Occupancy & Ward Telemetry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time graphical ward bed grid with patient assignment, sanitization cycles, and critical care tracking.
          </p>
        </div>

        {/* Color Legend required by prompt: Green = Available, Red = Occupied, Yellow = Cleaning / Maintenance */}
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Green = Available
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            Red = Occupied
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Yellow = Cleaning
          </span>
        </div>
      </div>

      {/* Prominent Overall Occupancy Banner & 6 Key Metrics */}
      <div className={`
        p-6 rounded-3xl border shadow-xs
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                69%
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Hospital Capacity
              </span>
            </div>
            {/* Bold text explicitly required by prompt */}
            <p className="text-base font-bold text-teal-700 dark:text-teal-300 mt-1">
              Overall Occupancy: 69%
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              38 critical and general beds ready for immediate intake.
            </p>
          </div>

          {/* Graphical Progress Bar */}
          <div className="w-full md:w-2/3 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>84 Occupied</span>
              <span>122 Total Hospital Beds</span>
              <span>38 Available</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-amber-500 rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${overallOccupancy}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Required Display Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Beds</span>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{totalBeds}</p>
            <span className="text-[10px] text-teal-600 font-medium">All Wards</span>
          </div>

          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
            <span className="text-[10px] text-red-600 uppercase font-bold">Occupied Beds</span>
            <p className="text-xl font-black text-red-700 dark:text-red-400 mt-0.5">{occupiedBeds}</p>
            <span className="text-[10px] text-red-500 font-medium">69% Rate</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="text-[10px] text-emerald-600 uppercase font-bold">Available Beds</span>
            <p className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">{availableBeds}</p>
            <span className="text-[10px] text-emerald-500 font-medium">Immediate</span>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <span className="text-[10px] text-cyan-600 uppercase font-bold">ICU Beds</span>
            <p className="text-xl font-black text-cyan-700 dark:text-cyan-400 mt-0.5">{icuBeds}</p>
            <span className="text-[10px] text-cyan-600 font-medium">Level 3 Telemetry</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
            <span className="text-[10px] text-amber-600 uppercase font-bold">Emergency Beds</span>
            <p className="text-xl font-black text-amber-700 dark:text-amber-400 mt-0.5">{emergencyBeds}</p>
            <span className="text-[10px] text-amber-600 font-medium">Triage Care</span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
            <span className="text-[10px] text-purple-600 uppercase font-bold">Isolation Beds</span>
            <p className="text-xl font-black text-purple-700 dark:text-purple-400 mt-0.5">{isolationBeds}</p>
            <span className="text-[10px] text-purple-600 font-medium">Negative Pressure</span>
          </div>
        </div>
      </div>

      {/* Ward Filters (General Ward, ICU, Emergency, Private Rooms) as explicitly requested */}
      <div className={`
        p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Ward:
          </span>
          {['All', 'General Ward', 'ICU', 'Emergency', 'Private Rooms'].map((ward) => (
            <button
              key={ward}
              onClick={() => setActiveWardFilter(ward as any)}
              className={`
                px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                ${activeWardFilter === ward 
                  ? 'bg-teal-600 text-white shadow-sm' 
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
              `}
            >
              {ward}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Showing {filteredBeds.length} active bed nodes</span>
        </div>
      </div>

      {/* Visual Bed Layout (Each Bed is a Card) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredBeds.map((bed) => {
          const isAvail = bed.status === 'Available';
          const isOcc = bed.status === 'Occupied';
          const isClean = bed.status === 'Cleaning';

          return (
            <div
              key={bed.id}
              onClick={() => setSelectedBed(bed)}
              className={`
                relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between min-h-[135px]
                ${isAvail 
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500 text-emerald-950 dark:text-emerald-100' 
                  : isOcc 
                    ? 'bg-red-500/10 border-red-500/30 hover:border-red-500 text-red-950 dark:text-red-100' 
                    : 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500 text-amber-950 dark:text-amber-100'}
              `}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xs">
                    {bed.bedNumber}
                  </span>
                  <span className={`
                    w-2.5 h-2.5 rounded-full
                    ${isAvail ? 'bg-emerald-500 animate-pulse' : isOcc ? 'bg-red-500' : 'bg-amber-500'}
                  `} />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
                  {bed.ward}
                </span>

                {isOcc && (
                  <div className="mt-2">
                    <p className="text-xs font-bold truncate">{bed.patientName}</p>
                    <p className="text-[10px] text-slate-500 truncate">{bed.assignedDoctor}</p>
                  </div>
                )}

                {isClean && (
                  <div className="mt-2">
                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Cleaning in Progress</p>
                    <p className="text-[9px] text-slate-400 truncate">{bed.notes || 'Sanitizing'}</p>
                  </div>
                )}

                {isAvail && (
                  <div className="mt-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Ready for Admit</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                <span>{bed.status}</span>
                <span className="text-slate-400">Manage ➔</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BED DETAIL / ACTION MODAL */}
      {selectedBed && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-md rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold">Bed {selectedBed.bedNumber}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {selectedBed.ward}
                </span>
              </div>
              <button
                onClick={() => setSelectedBed(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status</span>
                  <span className={`
                    font-bold px-2 py-0.5 rounded-full text-[10px]
                    ${selectedBed.status === 'Available' ? 'bg-emerald-500/15 text-emerald-600' : selectedBed.status === 'Occupied' ? 'bg-red-500/15 text-red-600' : 'bg-amber-500/15 text-amber-600'}
                  `}>
                    {selectedBed.status}
                  </span>
                </div>

                {selectedBed.patientName && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Patient Name</span>
                      <span className="font-bold text-slate-900 dark:text-white">{selectedBed.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Patient ID</span>
                      <span className="font-mono text-teal-600">{selectedBed.patientId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Attending Specialist</span>
                      <span className="font-semibold">{selectedBed.assignedDoctor || 'On-duty Resident'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Admitted Since</span>
                      <span className="font-mono">{selectedBed.admittedSince || '2026-09-02'}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {selectedBed.status === 'Available' && (
                  <button
                    onClick={() => setAssignPatientModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign / Admit Patient to This Bed</span>
                  </button>
                )}

                {selectedBed.status === 'Occupied' && (
                  <button
                    onClick={handleDischarge}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Discharge Patient & Mark for Cleaning</span>
                  </button>
                )}

                {selectedBed.status === 'Cleaning' && (
                  <button
                    onClick={handleMarkAvailable}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sanitization Completed (Mark Available)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN PATIENT MODAL */}
      {assignPatientModalOpen && selectedBed && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-md rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <h3 className="font-bold text-base mb-1">Assign Patient to {selectedBed.bedNumber}</h3>
            <p className="text-xs text-slate-500 mb-4">Ward: {selectedBed.ward}</p>

            <form onSubmit={handleAssignPatient} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Select Patient from Registry</label>
                <select
                  value={patientToAssign}
                  onChange={(e) => setPatientToAssign(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.diagnosis.slice(0, 30)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignPatientModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Confirm Bed Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
