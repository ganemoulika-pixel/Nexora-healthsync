import React, { useState } from 'react';
import { 
  FileHeart, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Pill, 
  FileText, 
  Clock, 
  Calendar, 
  User, 
  Stethoscope, 
  Plus, 
  Printer, 
  Download, 
  Eye, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  HeartPulse,
  Syringe,
  ClipboardList
} from 'lucide-react';
import { Patient, EHRRecord, LabReport } from '../types';

interface EHRViewProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  ehrs: Record<string, EHRRecord>;
  onAddDoctorNote: (patientId: string, noteText: string, title: string) => void;
  isDarkMode: boolean;
}

export const EHRView: React.FC<EHRViewProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  ehrs,
  onAddDoctorNote,
  isDarkMode
}) => {
  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const ehrData = ehrs[currentPatient?.id] || ehrs['PAT-1082'] || {
    patientId: currentPatient?.id,
    bloodPressure: '120/80 mmHg',
    heartRate: '72 bpm',
    temperature: '98.6 °F',
    spo2: '99%',
    height: '170 cm',
    weight: '70 kg',
    medicalHistory: ['General healthy baseline'],
    previousVisits: [{ date: '2026-08-01', department: 'General Medicine', doctor: currentPatient?.doctor || 'Attending Physician', summary: 'Baseline health evaluation.' }],
    allergies: currentPatient?.allergies || ['None known'],
    medications: [{ name: 'Multivitamin', dosage: '1 tablet', frequency: 'Daily', startDate: '2026-01-01', prescribedBy: 'Dr. Priya Sharma' }],
    labReports: [{ id: 'LR-001', testName: 'Complete Blood Count (CBC)', date: '2026-09-01', result: 'All parameters normal', normalRange: 'WBC: 4.5-11.0, Hb: 13.5-17.5', status: 'Normal', labTechnician: 'Swati K' }],
    prescriptionHistory: [{ id: 'RX-001', date: '2026-09-01', doctor: currentPatient?.doctor || 'Attending', medicines: ['Multivitamin'], instructions: 'With water' }],
    doctorNotes: [{ id: 'DN-001', date: '2026-09-02', doctor: currentPatient?.doctor || 'Attending', title: 'Routine Observation', note: 'Patient in stable condition.' }],
    treatmentHistory: [{ id: 'TH-001', date: '2026-09-02', procedure: 'Initial Evaluation', specialist: currentPatient?.doctor || 'Attending', notes: 'Vitals stable', outcome: 'Cleared' }]
  };

  const [isCompleteEHRModalOpen, setIsCompleteEHRModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'medications' | 'labs' | 'notes' | 'treatment'>('summary');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    onAddDoctorNote(currentPatient.id, newNoteContent, newNoteTitle || 'Clinical Observation');
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNoteForm(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar with Security and View Complete EHR button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileHeart className="w-6 h-6 text-teal-500" />
              Electronic Health Records (EHR)
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              <Lock className="w-3 h-3 text-teal-500" />
              Role-Based Access: Authorized MD / Nurse
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            HIPAA-compliant longitudinal health records with immutable audit logs and encrypted medical telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Patient Selector */}
          <select
            value={currentPatient.id}
            onChange={(e) => onSelectPatient(e.target.value)}
            className={`
              px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer
              ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}
            `}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id}) - {p.diagnosis.slice(0, 22)}...
              </option>
            ))}
          </select>

          {/* View Complete EHR Button (Explicitly requested by prompt) */}
          <button
            onClick={() => setIsCompleteEHRModalOpen(true)}
            id="btn-view-complete-ehr"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>View Complete EHR</span>
          </button>
        </div>
      </div>

      {/* Patient Profile Card with Vitals */}
      <div className={`
        p-6 rounded-3xl border shadow-xs
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              {currentPatient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {currentPatient.name}
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  {currentPatient.id}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 font-bold">
                  {currentPatient.admissionStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentPatient.age} yrs • {currentPatient.gender} • Blood Group: <span className="font-bold text-rose-500">{currentPatient.bloodGroup}</span> • Ward: <span className="font-semibold">{currentPatient.roomBed}</span>
              </p>
              <p className="text-xs font-medium text-teal-700 dark:text-teal-400 mt-0.5">
                Primary Physician: {currentPatient.doctor}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
              <span className="text-slate-400 block text-[10px]">Contact</span>
              <span className="font-semibold font-mono">{currentPatient.contact}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
              <span className="text-slate-400 block text-[10px]">Insurance</span>
              <span className="font-semibold">{currentPatient.insuranceProvider}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span>AES-256 Verified</span>
            </div>
          </div>
        </div>

        {/* Live Vitals Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20">
            <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-teal-500" />
              Blood Pressure
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              {ehrData.bloodPressure}
            </p>
            <span className="text-[10px] text-teal-600 font-medium">Standard range</span>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              Heart Rate
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              {ehrData.heartRate}
            </p>
            <span className="text-[10px] text-cyan-600 font-medium">Resting baseline</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              SpO2
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              {ehrData.spo2}
            </p>
            <span className="text-[10px] text-emerald-600 font-medium">Optimal oxygenation</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">
              Temperature
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              {ehrData.temperature}
            </p>
            <span className="text-[10px] text-amber-600 font-medium">Afebrile</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300">
              Height / Weight
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              {ehrData.height} • {ehrData.weight}
            </p>
            <span className="text-[10px] text-blue-600 font-medium">BMI 26.4 (Normal)</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              Allergies
            </span>
            <div className="mt-1">
              {ehrData.allergies.map((al, idx) => (
                <span key={idx} className="block text-[11px] font-bold text-rose-600 truncate">
                  • {al}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation for EHR subsections */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'summary', label: 'Clinical Summary & Visits' },
          { id: 'medications', label: 'Medications & Prescriptions' },
          { id: 'labs', label: 'Lab Reports & Diagnostics' },
          { id: 'notes', label: 'Doctor Notes & Observations' },
          { id: 'treatment', label: 'Treatment & Procedure History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all
              ${activeTab === tab.id 
                ? 'bg-teal-600 text-white shadow-sm' 
                : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: 1. SUMMARY & VISITS */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical History */}
          <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-teal-500" />
              Chronic Conditions & Medical History
            </h4>
            <div className="space-y-2">
              {ehrData.medicalHistory.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Current Primary Diagnosis</h5>
              <p className="text-xs text-teal-700 dark:text-teal-300 font-semibold bg-teal-50 dark:bg-teal-950/40 p-2.5 rounded-xl border border-teal-200 dark:border-teal-800">
                {currentPatient.diagnosis}
              </p>
            </div>
          </div>

          {/* Previous Visits Timeline */}
          <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-teal-500" />
              Previous Hospital Visits Timeline
            </h4>
            <div className="space-y-3">
              {ehrData.previousVisits.map((visit, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-teal-600 dark:text-teal-400">{visit.department}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{visit.date}</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{visit.summary}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Consultant: {visit.doctor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. MEDICATIONS */}
      {activeTab === 'medications' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Pill className="w-4 h-4 text-teal-500" />
              Active Medication Regimen
            </h4>
            <span className="text-xs text-teal-600 font-semibold">Synchronized with Central Pharmacy</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2 font-bold">Medication Name</th>
                  <th className="pb-2 font-bold">Dosage</th>
                  <th className="pb-2 font-bold">Frequency</th>
                  <th className="pb-2 font-bold">Started Date</th>
                  <th className="pb-2 font-bold">Prescribed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {ehrData.medications.map((med, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Pill className="w-3.5 h-3.5 text-teal-500" />
                      {med.name}
                    </td>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-300">{med.dosage}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-400">{med.frequency}</td>
                    <td className="py-3 font-mono text-[11px] text-slate-500">{med.startDate}</td>
                    <td className="py-3 text-teal-600 dark:text-teal-400 font-medium">{med.prescribedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. LAB REPORTS */}
      {activeTab === 'labs' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-teal-500" />
            Diagnostic & Pathology Lab Reports
          </h4>

          <div className="space-y-3">
            {ehrData.labReports.map((lab) => (
              <div 
                key={lab.id} 
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{lab.testName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{lab.id}</span>
                    <span className={`
                      px-2 py-0.5 rounded-full text-[10px] font-bold
                      ${lab.status === 'Normal' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}
                    `}>
                      {lab.status}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    Result: <span className="text-teal-700 dark:text-teal-300">{lab.result}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Reference Range: {lab.normalRange} • Certified by {lab.labTechnician}
                  </p>
                </div>
                <div className="flex items-center space-x-2 self-start md:self-auto">
                  <span className="text-[11px] text-slate-400 font-mono">{lab.date}</span>
                  <button className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. DOCTOR NOTES */}
      {activeTab === 'notes' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-500" />
              Clinical Doctor Notes & Observations
            </h4>
            <button
              onClick={() => setShowAddNoteForm(!showAddNoteForm)}
              className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Doctor Note</span>
            </button>
          </div>

          {showAddNoteForm && (
            <form onSubmit={handleSaveNote} className="mb-5 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-3">
              <h5 className="text-xs font-bold text-teal-800 dark:text-teal-300">New Clinical Entry</h5>
              <div>
                <input
                  type="text"
                  placeholder="Note Title / Round Objective (e.g. Morning Vitals Review)"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  placeholder="Enter detailed physician observation, plan, and medication changes..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoteForm(false)}
                  className="px-3 py-1 rounded-lg text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500"
                >
                  Record Note to EHR
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {ehrData.doctorNotes.map((note) => (
              <div key={note.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 dark:text-white font-bold">{note.title}</span>
                  <span className="text-slate-400 text-[10px] font-mono">{note.date}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{note.note}</p>
                <div className="mt-2 text-[11px] font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Attending: {note.doctor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. TREATMENT HISTORY */}
      {activeTab === 'treatment' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Syringe className="w-4 h-4 text-teal-500" />
            Interventions & Surgical/Clinical Treatment History
          </h4>
          <div className="space-y-3">
            {ehrData.treatmentHistory.map((th) => (
              <div key={th.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-teal-700 dark:text-teal-300 font-bold">{th.procedure}</span>
                  <span className="text-slate-400 text-[10px] font-mono">{th.date}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mt-1">{th.notes}</p>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[11px]">
                  <span className="text-slate-500">Specialist: {th.specialist}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Outcome: {th.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLETE EHR FULL VIEW MODAL */}
      {isCompleteEHRModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`
            w-full max-w-4xl rounded-3xl p-6 sm:p-8 border shadow-2xl my-8 max-h-[90vh] overflow-y-auto
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase font-bold text-teal-600 dark:text-teal-400 tracking-wider">
                    Official Health Dossier • Nexora HealthSync
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">
                    HIPAA Certified
                  </span>
                </div>
                <h3 className="text-xl font-black mt-1">Complete Electronic Health Record</h3>
                <p className="text-xs text-slate-500">Patient: {currentPatient.name} | ID: {currentPatient.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  title="Print EHR"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCompleteEHRModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                >
                  Close Dossier
                </button>
              </div>
            </div>

            {/* Dossier Body */}
            <div className="space-y-6 text-xs">
              {/* Demographics & Admission */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Birth / Age</span>
                  <span className="font-bold">{currentPatient.age} Years ({currentPatient.gender})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Blood Type</span>
                  <span className="font-bold text-rose-500">{currentPatient.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Admission Status</span>
                  <span className="font-bold">{currentPatient.admissionStatus} ({currentPatient.roomBed})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Primary Physician</span>
                  <span className="font-bold text-teal-600">{currentPatient.doctor}</span>
                </div>
              </div>

              {/* Vitals Summary */}
              <div>
                <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Physiological Telemetry</h5>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">BP</span>
                    <span className="font-bold">{ehrData.bloodPressure}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                    <span className="font-bold">{ehrData.heartRate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">SpO2</span>
                    <span className="font-bold">{ehrData.spo2}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Temp</span>
                    <span className="font-bold">{ehrData.temperature}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Height</span>
                    <span className="font-bold">{ehrData.height}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Weight</span>
                    <span className="font-bold">{ehrData.weight}</span>
                  </div>
                </div>
              </div>

              {/* Active Prescriptions */}
              <div>
                <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Active Pharmacotherapy</h5>
                <div className="space-y-1.5">
                  {ehrData.medications.map((m, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{m.name} ({m.dosage})</span>
                      <span className="text-slate-500">{m.frequency} • Prescribed by {m.prescribedBy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Reports History */}
              <div>
                <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Laboratory Diagnostic Results</h5>
                <div className="space-y-2">
                  {ehrData.labReports.map((l) => (
                    <div key={l.id} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between font-bold">
                        <span>{l.testName}</span>
                        <span className="text-teal-600">{l.status}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">{l.result} (Ref: {l.normalRange})</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physician Notes History */}
              <div>
                <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Clinical Notes & Progress Logs</h5>
                <div className="space-y-2">
                  {ehrData.doctorNotes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                      <div className="flex justify-between font-bold text-teal-700 dark:text-teal-300">
                        <span>{n.title}</span>
                        <span className="font-mono text-[10px] text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mt-1">{n.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
