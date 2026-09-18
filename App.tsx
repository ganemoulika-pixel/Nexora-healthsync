import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { DashboardOverview } from './components/DashboardOverview';
import { PatientManagement } from './components/PatientManagement';
import { EHRView } from './components/EHRView';
import { AppointmentScheduling } from './components/AppointmentScheduling';
import { DoctorManagement } from './components/DoctorManagement';
import { BedManagement } from './components/BedManagement';
import { PharmacyManagement } from './components/PharmacyManagement';
import { BillingDashboard } from './components/BillingDashboard';
import { VirtualConsultation } from './components/VirtualConsultation';
import { NotificationCenter } from './components/NotificationCenter';
import { HospitalReports } from './components/HospitalReports';
import { HealthSyncChatbot } from './components/HealthSyncChatbot';

import {
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialBeds,
  initialMedicines,
  initialPrescriptions,
  initialBills,
  initialNotifications,
  initialEHRRecords,
  monthlyRevenueData,
  departmentRevenueData
} from './data/mockData';

import {
  UserRole,
  Patient,
  Doctor,
  Appointment,
  Bed,
  Medicine,
  Prescription,
  Bill,
  HospitalNotification,
  EHRRecord,
  BedStatus,
  AppointmentStatus,
  DoctorStatus,
  PrescriptionStatus,
  PaymentStatus
} from './types';

export function App() {
  // Authentication & Session
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Admin');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // App Theme & Navigation
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  // Master State Arrays
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [beds, setBeds] = useState<Bed[]>(initialBeds);
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [notifications, setNotifications] = useState<HospitalNotification[]>(initialNotifications);
  const [ehrs, setEhrs] = useState<Record<string, EHRRecord>>(initialEHRRecords);

  // Selected contexts
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT-1082');

  // Handle dark mode DOM sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Adjust default tab when role changes
  const handleRoleChange = (role: UserRole) => {
    setCurrentUserRole(role);
    if (role === 'Doctor') setActiveTab('doctors');
    else if (role === 'Nurse') setActiveTab('beds');
    else if (role === 'Pharmacist') setActiveTab('pharmacy');
    else if (role === 'Billing Staff') setActiveTab('billing');
    else if (role === 'Receptionist') setActiveTab('scheduling');
    else setActiveTab('dashboard');
  };

  const handleLoginSuccess = (role: UserRole) => {
    setCurrentUserRole(role);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    handleRoleChange(role);
  };

  // PATIENT HANDLERS
  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
    // Also provision initial baseline EHR record
    setEhrs(prev => ({
      ...prev,
      [newPatient.id]: {
        patientId: newPatient.id,
        bloodPressure: '120/80 mmHg',
        heartRate: '75 bpm',
        temperature: '98.6 °F',
        spo2: '99%',
        height: '172 cm',
        weight: '68 kg',
        medicalHistory: [newPatient.diagnosis, 'No known chronic comorbidities'],
        previousVisits: [{
          date: new Date().toISOString().split('T')[0],
          department: 'Emergency & Triage Intake',
          doctor: newPatient.doctor,
          summary: 'Inpatient triage admission.'
        }],
        allergies: newPatient.allergies || ['None known'],
        medications: [],
        labReports: [],
        prescriptionHistory: [],
        doctorNotes: [{
          id: `DN-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          doctor: newPatient.doctor,
          title: 'Admissions Intake Review',
          note: `Patient admitted under ${newPatient.doctor}. Initial vitals verified. Ward bed assignment: ${newPatient.roomBed}.`
        }],
        treatmentHistory: [{
          id: `TH-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          procedure: 'Baseline Intake & Verification',
          specialist: newPatient.doctor,
          notes: 'Admitted in stable condition.',
          outcome: 'Inpatient Ongoing'
        }]
      }
    }));
    // Add notification
    const newNotif: HospitalNotification = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Patient Registration',
      message: `${newPatient.name} registered into ${newPatient.roomBed} under ${newPatient.doctor}.`,
      timestamp: 'Just now',
      type: 'AppointmentReminder',
      read: false,
      actionLink: 'patients'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
  };

  const handleViewEHR = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveTab('ehr');
  };

  // EHR HANDLERS
  const handleAddDoctorNote = (patientId: string, noteText: string, title: string) => {
    const activeDoctor = doctors[0]?.name || 'Attending Physician';
    setEhrs(prev => {
      const existing = prev[patientId];
      if (!existing) return prev;
      return {
        ...prev,
        [patientId]: {
          ...existing,
          doctorNotes: [
            {
              id: `DN-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              doctor: activeDoctor,
              title,
              note: noteText
            },
            ...existing.doctorNotes
          ]
        }
      };
    });
  };

  // APPOINTMENT HANDLERS
  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
    // Add notification
    const notif: HospitalNotification = {
      id: `NOTIF-${Date.now()}`,
      title: 'Appointment Scheduled',
      message: `Consultation confirmed for ${newAppointment.patientName} with ${newAppointment.doctor} at ${newAppointment.time}. Automated SMS reminder sent.`,
      timestamp: 'Just now',
      type: 'AppointmentReminder',
      read: false,
      actionLink: 'scheduling'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleUpdateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? {
      ...a,
      date: newDate,
      time: newTime,
      status: 'Confirmed',
      reminderSent: true,
      reminderSentTime: `Rescheduled to ${newDate} ${newTime} (SMS sent)`
    } : a));
  };

  const handleSendReminder = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? {
      ...a,
      reminderSent: true,
      reminderSentTime: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} via SMS & WhatsApp`
    } : a));
  };

  // DOCTOR HANDLERS
  const handleUpdateDoctorStatus = (doctorId: string, status: DoctorStatus) => {
    setDoctors(prev => prev.map(d => d.id === doctorId ? { ...d, status } : d));
  };

  const handleBookDoctor = (doc: Doctor) => {
    setActiveTab('scheduling');
  };

  // BED HANDLERS
  const handleUpdateBedStatus = (bedId: string, newStatus: BedStatus, patientName?: string, patientId?: string) => {
    setBeds(prev => prev.map(b => b.id === bedId ? {
      ...b,
      status: newStatus,
      patientName: patientName ?? b.patientName,
      patientId: patientId ?? b.patientId,
      admittedSince: newStatus === 'Occupied' ? new Date().toISOString().split('T')[0] : b.admittedSince
    } : b));
  };

  // PHARMACY HANDLERS
  const handleAddMedicine = (newMed: Medicine) => {
    setMedicines(prev => [newMed, ...prev]);
  };

  const handleUpdateMedicineStock = (medicineId: string, addedQty: number) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        const newTotal = m.availableQty + addedQty;
        return {
          ...m,
          availableQty: newTotal,
          stockStatus: newTotal <= m.minStockLevel ? 'Low Stock' : 'Available'
        };
      }
      return m;
    }));
  };

  const handleUpdatePrescriptionStatus = (prescriptionId: string, status: PrescriptionStatus) => {
    setPrescriptions(prev => prev.map(prx => prx.id === prescriptionId ? { ...prx, prescriptionStatus: status } : prx));
  };

  // BILLING HANDLERS
  const handleAddBill = (newBill: Bill) => {
    setBills(prev => [newBill, ...prev]);
  };

  const handleUpdatePaymentStatus = (billId: string, status: PaymentStatus, method?: string) => {
    setBills(prev => prev.map(b => b.id === billId ? {
      ...b,
      paymentStatus: status,
      paymentMethod: method || b.paymentMethod
    } : b));
  };

  // VIRTUAL CONSULTATION HANDLERS
  const handleAddPrescriptionFromVirtual = (newPrescription: Prescription) => {
    setPrescriptions(prev => [newPrescription, ...prev]);
    // Also push to EHR medications
    setEhrs(prev => {
      const existing = prev[newPrescription.patientId];
      if (!existing) return prev;
      return {
        ...prev,
        [newPrescription.patientId]: {
          ...existing,
          medications: [
            {
              name: newPrescription.medicine,
              dosage: newPrescription.dosage,
              frequency: 'As directed',
              startDate: new Date().toISOString().split('T')[0],
              prescribedBy: newPrescription.doctor
            },
            ...existing.medications
          ]
        }
      };
    });
  };

  const handleEndConsultation = (summary: string) => {
    alert(`Consultation finalized. Clinical note recorded: "${summary.slice(0, 50)}..."`);
    setActiveTab('ehr');
  };

  // NOTIFICATION HANDLERS
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50/70 text-slate-900'}`}>
      {/* Welcome Banner as specifically requested in the prompt */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md relative z-40">
          <div className="flex items-center space-x-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              Welcome to <strong>Nexora HealthSync Hospital</strong> — Next-Generation Integrated Clinical & Hospital Management Platform.
            </span>
            <span className="hidden md:inline text-teal-200">
              • NABH & JCI Certified Telemetry Active
            </span>
          </div>
          <button
            onClick={() => setShowWelcomeBanner(false)}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-md text-xs ml-2 cursor-pointer"
            title="Dismiss Announcement"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Framework Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentUserRole={currentUserRole}
          unreadCount={unreadNotificationsCount}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Content Flow Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <Header
            currentUserRole={currentUserRole}
            onRoleChange={handleRoleChange}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            notifications={notifications}
            unreadNotificationsCount={unreadNotificationsCount}
            onOpenNotifications={() => setActiveTab('notifications')}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />

          {/* Dynamic Main Workspace Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <DashboardOverview
                  patients={patients}
                  doctors={doctors}
                  appointments={appointments}
                  medicines={medicines}
                  bills={bills}
                  beds={beds}
                  onNavigateTab={setActiveTab}
                  onViewPatientEHR={handleViewEHR}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 2: PATIENTS MANAGEMENT */}
              {activeTab === 'patients' && (
                <PatientManagement
                  patients={patients}
                  doctors={doctors}
                  onAddPatient={handleAddPatient}
                  onUpdatePatient={handleUpdatePatient}
                  onDeletePatient={handleDeletePatient}
                  onViewEHR={handleViewEHR}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 3: ELECTRONIC HEALTH RECORDS (EHR) */}
              {activeTab === 'ehr' && (
                <EHRView
                  patients={patients}
                  selectedPatientId={selectedPatientId}
                  onSelectPatient={setSelectedPatientId}
                  ehrs={ehrs}
                  onAddDoctorNote={handleAddDoctorNote}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 4: APPOINTMENT SCHEDULING */}
              {activeTab === 'scheduling' && (
                <AppointmentScheduling
                  appointments={appointments}
                  doctors={doctors}
                  patients={patients}
                  onAddAppointment={handleAddAppointment}
                  onUpdateStatus={handleUpdateAppointmentStatus}
                  onReschedule={handleRescheduleAppointment}
                  onSendReminder={handleSendReminder}
                  onNavigateToVirtual={() => setActiveTab('virtual')}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 5: DOCTOR MANAGEMENT & ROSTER */}
              {activeTab === 'doctors' && (
                <DoctorManagement
                  doctors={doctors}
                  onBookDoctor={handleBookDoctor}
                  onUpdateDoctorStatus={handleUpdateDoctorStatus}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 6: BED OCCUPANCY MANAGEMENT */}
              {activeTab === 'beds' && (
                <BedManagement
                  beds={beds}
                  patients={patients}
                  onUpdateBedStatus={handleUpdateBedStatus}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 7: PHARMACY & PRESCRIPTIONS */}
              {activeTab === 'pharmacy' && (
                <PharmacyManagement
                  medicines={medicines}
                  prescriptions={prescriptions}
                  onAddMedicine={handleAddMedicine}
                  onUpdateStock={handleUpdateMedicineStock}
                  onUpdatePrescriptionStatus={handleUpdatePrescriptionStatus}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 8: BILLING & HOSPITAL REVENUE */}
              {activeTab === 'billing' && (
                <BillingDashboard
                  bills={bills}
                  patients={patients}
                  monthlyRevenue={monthlyRevenueData}
                  departmentRevenue={departmentRevenueData}
                  onAddBill={handleAddBill}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 9: TELEHEALTH VIRTUAL CONSULTATION */}
              {activeTab === 'virtual' && (
                <VirtualConsultation
                  currentDoctor={doctors[0]}
                  patients={patients}
                  onAddPrescription={handleAddPrescriptionFromVirtual}
                  onEndConsultation={handleEndConsultation}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 10: AUTOMATED NOTIFICATIONS HUB */}
              {activeTab === 'notifications' && (
                <NotificationCenter
                  notifications={notifications}
                  onMarkAsRead={handleMarkNotificationAsRead}
                  onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                  onClearAll={handleClearAllNotifications}
                  onActionClick={(tab) => tab && setActiveTab(tab)}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* TAB 11: ANALYTICAL REPORTS */}
              {activeTab === 'reports' && (
                <HospitalReports
                  patients={patients}
                  doctors={doctors}
                  bills={bills}
                  medicines={medicines}
                  beds={beds}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Floating HealthSync AI Assistant Chatbot (Section 14) */}
      <HealthSyncChatbot
        beds={beds}
        doctors={doctors}
        medicines={medicines}
        patients={patients}
        notifications={notifications}
        onNavigateTab={setActiveTab}
        isDarkMode={isDarkMode}
      />

      {/* Role-Based Authentication & Switcher Modal (Section 1) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={currentUserRole}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
