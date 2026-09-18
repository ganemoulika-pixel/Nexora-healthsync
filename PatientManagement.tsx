import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Phone, 
  Heart, 
  User, 
  Check, 
  X, 
  AlertCircle,
  FileCheck,
  Stethoscope,
  Filter
} from 'lucide-react';
import { Patient, AdmissionStatus, Doctor } from '../types';

interface PatientManagementProps {
  patients: Patient[];
  doctors: Doctor[];
  onAddPatient: (patient: Patient) => void;
  onUpdatePatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
  onViewEHR: (patientId: string) => void;
  isDarkMode: boolean;
  searchFilter?: string;
}

export const PatientManagement: React.FC<PatientManagementProps> = ({
  patients = [],
  doctors = [],
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
  onViewEHR,
  isDarkMode,
  searchFilter = ''
}) => {
  const [search, setSearch] = useState(searchFilter || '');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Auto-population state from EHR
  const [autoPopulateFromEHR, setAutoPopulateFromEHR] = useState(true);

  // New patient form state
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: '',
    age: 35,
    gender: 'Male',
    contact: '+91 98',
    bloodGroup: 'B+',
    doctor: 'Dr. Priya Sharma',
    diagnosis: '',
    admissionStatus: 'Outpatient',
    roomBed: 'OPD Suite',
    emergencyContact: '',
    insuranceProvider: 'Star Health Care',
    policyNumber: 'POL-',
    allergies: []
  });

  const availableEHRPreloads = [
    {
      label: 'Preload EHR: Vikram Singh (PAT-1082)',
      data: {
        name: 'Vikram Singh',
        age: 42,
        gender: 'Male' as const,
        contact: '+91 98210 44219',
        bloodGroup: 'B+',
        doctor: 'Dr. Anil Mehta',
        diagnosis: 'Type 2 Diabetes Mellitus & Essential Hypertension',
        admissionStatus: 'Observation' as AdmissionStatus,
        roomBed: 'ICU-B04',
        emergencyContact: '+91 98210 44220 (Spouse - Sunita)',
        insuranceProvider: 'Star Health Premier Care',
        policyNumber: 'SH-8829104',
        allergies: ['Penicillin', 'Sulfa drugs']
      }
    },
    {
      label: 'Preload EHR: Ananya Deshmukh (PAT-1083)',
      data: {
        name: 'Ananya Deshmukh',
        age: 29,
        gender: 'Female' as const,
        contact: '+91 97182 30041',
        bloodGroup: 'O+',
        doctor: 'Dr. Priya Sharma',
        diagnosis: 'Acute Coronary Syndrome evaluation',
        admissionStatus: 'Admitted' as AdmissionStatus,
        roomBed: 'GW-A12',
        emergencyContact: '+91 97182 30042 (Brother)',
        insuranceProvider: 'HDFC ERGO Health Suraksha',
        policyNumber: 'HE-4491028',
        allergies: ['None known']
      }
    },
    {
      label: 'Preload EHR: Rajesh Gupta (New Patient ABHA Record)',
      data: {
        name: 'Rajesh Gupta',
        age: 51,
        gender: 'Male' as const,
        contact: '+91 98450 11923',
        bloodGroup: 'A+',
        doctor: 'Dr. Arjun Kapoor',
        diagnosis: 'Lumbar spondylosis with radiculopathy',
        admissionStatus: 'Admitted' as AdmissionStatus,
        roomBed: 'PVT-304',
        emergencyContact: '+91 98450 11924 (Wife)',
        insuranceProvider: 'ICICI Lombard Health',
        policyNumber: 'IC-990182',
        allergies: ['Sulfa drugs']
      }
    }
  ];

  const handlePreloadEHR = (index: number) => {
    const selected = availableEHRPreloads[index];
    if (selected) {
      setFormData({
        ...formData,
        ...selected.data
      });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient: Patient = {
      id: newId,
      name: formData.name || 'New Patient',
      age: Number(formData.age) || 30,
      gender: (formData.gender as any) || 'Male',
      contact: formData.contact || '+91 90000 00000',
      bloodGroup: formData.bloodGroup || 'O+',
      doctor: formData.doctor || 'Dr. Priya Sharma',
      diagnosis: formData.diagnosis || 'General checkup',
      admissionStatus: (formData.admissionStatus as AdmissionStatus) || 'Outpatient',
      admissionDate: new Date().toISOString().split('T')[0],
      roomBed: formData.roomBed || 'OPD-Suite',
      emergencyContact: formData.emergencyContact || 'Not specified',
      insuranceProvider: formData.insuranceProvider || 'Direct Cash',
      policyNumber: formData.policyNumber || 'N/A',
      allergies: formData.allergies || ['None']
    };

    onAddPatient(newPatient);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPatient) {
      onUpdatePatient(editPatient);
      setEditPatient(null);
    }
  };

  const filteredPatients = (patients || []).filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.doctor.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      p.contact.includes(search);

    const matchesStatus = statusFilter === 'All' || p.admissionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-500" />
            Patient Management Registry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automated EHR-linked patient registration, real-time admission tracking, and clinical dossier access.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: '',
              age: 35,
              gender: 'Male',
              contact: '+91 98',
              bloodGroup: 'B+',
              doctor: 'Dr. Priya Sharma',
              diagnosis: '',
              admissionStatus: 'Outpatient',
              roomBed: 'OPD Suite',
              emergencyContact: '',
              insuranceProvider: 'Star Health Care',
              policyNumber: 'POL-',
              allergies: []
            });
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className={`
        p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, name, diagnosis, doctor..."
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
            Status:
          </span>
          {['All', 'Admitted', 'Observation', 'Outpatient', 'Discharged'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
                px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap
                ${statusFilter === status 
                  ? 'bg-teal-600 text-white' 
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
              `}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Table */}
      <div className={`
        rounded-3xl border shadow-xs overflow-hidden
        ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
      `}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-slate-800/30">
                <th className="py-3 px-4 font-bold">Patient ID</th>
                <th className="py-3 px-4 font-bold">Patient Name</th>
                <th className="py-3 px-4 font-bold">Age / Gender</th>
                <th className="py-3 px-4 font-bold">Contact Number</th>
                <th className="py-3 px-4 font-bold">Blood Group</th>
                <th className="py-3 px-4 font-bold">Assigned Doctor</th>
                <th className="py-3 px-4 font-bold">Diagnosis</th>
                <th className="py-3 px-4 font-bold">Admission Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No patients found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                      {patient.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {patient.name}
                      <span className="block text-[10px] font-normal text-slate-400">{patient.roomBed}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {patient.age} yrs • {patient.gender}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                      {patient.contact}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-[11px] border border-rose-200 dark:border-rose-900">
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {patient.doctor}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {patient.diagnosis}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-[10px] font-bold border
                        ${patient.admissionStatus === 'Admitted' 
                          ? 'bg-red-500/10 text-red-600 border-red-500/20' 
                          : patient.admissionStatus === 'Observation'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : patient.admissionStatus === 'Outpatient'
                              ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                              : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}
                      `}>
                        {patient.admissionStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setViewPatient(patient)}
                          title="View Patient Dossier"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onViewEHR(patient.id)}
                          title="View Complete EHR"
                          className="p-1.5 rounded-lg text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-slate-800"
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditPatient(patient)}
                          title="Edit Patient"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(patient.id)}
                          title="Delete Patient"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PATIENT MODAL WITH EHR AUTO-POPULATION */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`
            w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl my-8
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold">Register New Patient</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct admission or auto-populated from linked EHR health ID.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* EHR Auto-population banner */}
            <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-500" />
                  EHR Auto-Population Enabled
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  Reduces manual registration errors
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-2">
                Select an existing EHR profile to automatically sync clinical demographics and medical background:
              </p>
              <div className="flex flex-wrap gap-2">
                {availableEHRPreloads.map((preload, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePreloadEHR(idx)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 font-medium border border-teal-500/40 hover:bg-teal-50 transition-colors"
                  >
                    {preload.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    placeholder="e.g. Ramesh Chandra"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    placeholder="+91 98..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Assigned Doctor</label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name} ({doc.specialization})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Admission Status</label>
                  <select
                    value={formData.admissionStatus}
                    onChange={(e) => setFormData({ ...formData, admissionStatus: e.target.value as AdmissionStatus })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    <option value="Outpatient">Outpatient</option>
                    <option value="Observation">Observation</option>
                    <option value="Admitted">Admitted (Inpatient)</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Diagnosis & Clinical Reason</label>
                <input
                  type="text"
                  required
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  placeholder="Primary condition, symptom summary, or preliminary diagnosis"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Assigned Ward / Bed #</label>
                  <input
                    type="text"
                    value={formData.roomBed}
                    onChange={(e) => setFormData({ ...formData, roomBed: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    placeholder="e.g. ICU-B04 or OPD-3"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Insurance Provider</label>
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    placeholder="e.g. Star Health / Self Pay"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md cursor-pointer"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PATIENT DOSSIER MODAL */}
      {viewPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-lg rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  {viewPatient.bloodGroup}
                </div>
                <div>
                  <h3 className="font-bold text-base">{viewPatient.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{viewPatient.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewPatient(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">Age & Gender</span>
                  <span className="font-semibold">{viewPatient.age} years • {viewPatient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact</span>
                  <span className="font-semibold font-mono">{viewPatient.contact}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Primary Doctor</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">{viewPatient.doctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Ward / Bed</span>
                  <span className="font-semibold">{viewPatient.roomBed}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Clinical Diagnosis</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{viewPatient.diagnosis}</p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Known Allergies</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {viewPatient.allergies.map((alg, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                      {alg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Insurance: {viewPatient.insuranceProvider}</span>
                <button
                  onClick={() => {
                    onViewEHR(viewPatient.id);
                    setViewPatient(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Open Full EHR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PATIENT MODAL */}
      {editPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-lg rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base">Edit Patient Profile: {editPatient.id}</h3>
              <button
                onClick={() => setEditPatient(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={editPatient.name}
                  onChange={(e) => setEditPatient({ ...editPatient, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Contact</label>
                  <input
                    type="text"
                    value={editPatient.contact}
                    onChange={(e) => setEditPatient({ ...editPatient, contact: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Admission Status</label>
                  <select
                    value={editPatient.admissionStatus}
                    onChange={(e) => setEditPatient({ ...editPatient, admissionStatus: e.target.value as AdmissionStatus })}
                    className="w-full px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    <option value="Outpatient">Outpatient</option>
                    <option value="Observation">Observation</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Diagnosis</label>
                <input
                  type="text"
                  value={editPatient.diagnosis}
                  onChange={(e) => setEditPatient({ ...editPatient, diagnosis: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Assigned Doctor</label>
                  <select
                    value={editPatient.doctor}
                    onChange={(e) => setEditPatient({ ...editPatient, doctor: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Room / Bed</label>
                  <input
                    type="text"
                    value={editPatient.roomBed}
                    onChange={(e) => setEditPatient({ ...editPatient, roomBed: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditPatient(null)}
                  className="px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-sm rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-1">Confirm Patient Discharge / Removal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Are you sure you want to remove record <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{deleteConfirmId}</span>? This action is archived in the HIPAA audit trail.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDeletePatient(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
