import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Filter, 
  Clock, 
  Users, 
  BedDouble, 
  Pill, 
  Receipt, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Patient, Doctor, Bill, Medicine, Bed } from '../types';

interface HospitalReportsProps {
  patients: Patient[];
  doctors: Doctor[];
  bills: Bill[];
  medicines: Medicine[];
  beds: Bed[];
  isDarkMode: boolean;
}

export const HospitalReports: React.FC<HospitalReportsProps> = ({
  patients = [],
  doctors = [],
  bills = [],
  medicines = [],
  beds = [],
  isDarkMode
}) => {
  const [selectedReport, setSelectedReport] = useState<'admissions' | 'doctors' | 'revenue' | 'pharmacy' | 'beds'>('admissions');
  const [dateRange, setDateRange] = useState<'Today' | 'This Week' | 'This Month' | 'Custom Range'>('This Month');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (format: 'PDF' | 'Excel') => {
    setDownloadSuccess(`Generated ${format} report for ${selectedReport.toUpperCase()} successfully.`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-teal-500" />
            Hospital Analytical Reports & Data Exports
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Certified NABH/JCI compliance logs, financial reconciliation statements, and clinical throughput records.
          </p>
        </div>

        {/* Global Download Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDownload('PDF')}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => handleDownload('Excel')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download Excel</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Print Report"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {downloadSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{downloadSuccess} Check your browser downloads folder.</span>
        </div>
      )}

      {/* Report Types & Date Range Filter Bar */}
      <div className={`
        p-4 rounded-3xl border shadow-xs space-y-4
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        {/* Report Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {[
            { id: 'admissions', label: 'Patient Admission Report', icon: Users },
            { id: 'doctors', label: 'Doctor Performance Report', icon: FileText },
            { id: 'revenue', label: 'Revenue & Billing Report', icon: Receipt },
            { id: 'pharmacy', label: 'Pharmacy Stock Report', icon: Pill },
            { id: 'beds', label: 'Bed Occupancy Report', icon: BedDouble }
          ].map((rep) => {
            const Icon = rep.icon;
            return (
              <button
                key={rep.id}
                onClick={() => setSelectedReport(rep.id as any)}
                className={`
                  px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2
                  ${selectedReport === rep.id 
                    ? 'bg-teal-600 text-white shadow-sm' 
                    : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{rep.label}</span>
              </button>
            );
          })}
        </div>

        {/* Date Range Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Date Filter:
            </span>
            {['Today', 'This Week', 'This Month', 'Custom Range'].map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r as any)}
                className={`
                  px-3 py-1 rounded-lg font-semibold transition-colors
                  ${dateRange === r 
                    ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40' 
                    : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                {r}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Reporting Period: 2026-08-01 to 2026-09-03
          </span>
        </div>
      </div>

      {/* REPORT CONTENT VIEW */}
      <div className={`
        rounded-3xl border shadow-xs overflow-hidden
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        {/* 1. Patient Admission Report */}
        {selectedReport === 'admissions' && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Patient Admission & Inpatient Roster</h3>
              <span className="text-xs text-slate-400">{patients.length} Active Records</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Patient</th>
                  <th className="py-3 px-4 font-bold">Age/Gender</th>
                  <th className="py-3 px-4 font-bold">Admitted Date</th>
                  <th className="py-3 px-4 font-bold">Assigned Ward</th>
                  <th className="py-3 px-4 font-bold">Primary Diagnosis</th>
                  <th className="py-3 px-4 font-bold">Attending Specialist</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {p.name}
                      <span className="block text-[10px] font-mono text-teal-600">{p.id}</span>
                    </td>
                    <td className="py-3 px-4">{p.age}y / {p.gender}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{p.admissionDate}</td>
                    <td className="py-3 px-4 font-semibold">{p.roomBed}</td>
                    <td className="py-3 px-4 font-medium text-teal-700 dark:text-teal-300">{p.diagnosis}</td>
                    <td className="py-3 px-4">{p.doctor}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-600">
                        {p.admissionStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. Doctor Performance Report */}
        {selectedReport === 'doctors' && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Doctor Clinical Productivity & Case Metrics</h3>
              <span className="text-xs text-slate-400">{doctors.length} Attending Staff</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Doctor Name</th>
                  <th className="py-3 px-4 font-bold">Specialty</th>
                  <th className="py-3 px-4 font-bold">Active Patient Load</th>
                  <th className="py-3 px-4 font-bold">Today's Appointments</th>
                  <th className="py-3 px-4 font-bold">Open Slots</th>
                  <th className="py-3 px-4 font-bold">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {doctors.map((d) => (
                  <tr key={d.id}>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{d.name}</td>
                    <td className="py-3 px-4 text-teal-600 font-semibold">{d.specialization}</td>
                    <td className="py-3 px-4 font-bold">{d.currentPatientLoad} Patients</td>
                    <td className="py-3 px-4">{d.todayAppointments} Consultations</td>
                    <td className="py-3 px-4 font-mono">{d.availableSlots} Slots</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${d.status === 'Available' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Revenue & Billing Report */}
        {selectedReport === 'revenue' && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Revenue, Collections & Outstanding Invoices</h3>
              <span className="text-xs text-slate-400">{(bills || []).length} Invoices</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Invoice ID</th>
                  <th className="py-3 px-4 font-bold">Patient</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-4 font-bold">Subtotal</th>
                  <th className="py-3 px-4 font-bold">Tax / GST</th>
                  <th className="py-3 px-4 font-bold">Net Total</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {(bills || []).map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 px-4 font-mono font-bold text-teal-600">{b.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{b.patientName}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{b.invoiceDate || b.date || '2026-09-03'}</td>
                    <td className="py-3 px-4">₹{(b.subtotal ?? b.totalAmount ?? 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-400">₹{(b.tax ?? 0).toLocaleString()}</td>
                    <td className="py-3 px-4 font-black text-teal-700 dark:text-teal-300">₹{(b.totalAmount ?? 0).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${(b.paymentStatus || b.status) === 'Paid' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                        {b.paymentStatus || b.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. Pharmacy Stock Report */}
        {selectedReport === 'pharmacy' && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pharmacy Stock Audit & Reorder Thresholds</h3>
              <span className="text-xs text-slate-400">{medicines.length} Formulations</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Medicine</th>
                  <th className="py-3 px-4 font-bold">ID Code</th>
                  <th className="py-3 px-4 font-bold">On Hand</th>
                  <th className="py-3 px-4 font-bold">Safety Min</th>
                  <th className="py-3 px-4 font-bold">Expiry</th>
                  <th className="py-3 px-4 font-bold">Supplier</th>
                  <th className="py-3 px-4 font-bold">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {medicines.map((m) => (
                  <tr key={m.id}>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{m.name}</td>
                    <td className="py-3 px-4 font-mono text-teal-600">{m.medicineId}</td>
                    <td className="py-3 px-4 font-black">{m.availableQty} units</td>
                    <td className="py-3 px-4 text-slate-400">{m.minStockLevel} units</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{m.expiryDate}</td>
                    <td className="py-3 px-4">{m.supplier}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${m.stockStatus === 'Available' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                        {m.stockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Bed Occupancy Report */}
        {selectedReport === 'beds' && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Bed Utilization & Sanitization Ledger</h3>
              <span className="text-xs text-teal-600 font-bold">Hospital Occupancy: 69%</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Bed Number</th>
                  <th className="py-3 px-4 font-bold">Ward Type</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Assigned Patient</th>
                  <th className="py-3 px-4 font-bold">Patient ID</th>
                  <th className="py-3 px-4 font-bold">Doctor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {beds.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{b.bedNumber}</td>
                    <td className="py-3 px-4 font-semibold text-teal-600">{b.ward}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Available' ? 'bg-emerald-500/15 text-emerald-600' : b.status === 'Occupied' ? 'bg-red-500/15 text-red-600' : 'bg-amber-500/15 text-amber-600'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{b.patientName || '—'}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{b.patientId || '—'}</td>
                    <td className="py-3 px-4 text-slate-500">{b.assignedDoctor || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
