export type UserRole = 
  | 'admin' 
  | 'doctor' 
  | 'nurse' 
  | 'receptionist' 
  | 'pharmacist' 
  | 'billing'
  | 'Admin'
  | 'Doctor'
  | 'Nurse'
  | 'Receptionist'
  | 'Pharmacist'
  | 'Billing Staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  badgeNumber: string;
}

export type AdmissionStatus = 'Admitted' | 'Outpatient' | 'Observation' | 'Discharged';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  email?: string;
  bloodGroup: string;
  doctor: string;
  diagnosis: string;
  admissionStatus: AdmissionStatus;
  admissionDate: string;
  roomBed: string;
  emergencyContact: string;
  insuranceProvider: string;
  policyNumber: string;
  allergies: string[];
}

export interface LabReport {
  id: string;
  testName: string;
  date: string;
  result: string;
  normalRange: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  labTechnician: string;
}

export interface EHRRecord {
  patientId: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  spo2: string;
  height: string;
  weight: string;
  medicalHistory: string[];
  previousVisits: {
    date: string;
    department: string;
    doctor: string;
    summary: string;
  }[];
  allergies: string[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    prescribedBy: string;
  }[];
  labReports: LabReport[];
  prescriptionHistory: {
    id: string;
    date: string;
    doctor: string;
    medicines: string[];
    instructions: string;
  }[];
  doctorNotes: {
    id: string;
    date: string;
    doctor: string;
    title: string;
    note: string;
  }[];
  treatmentHistory: {
    id: string;
    date: string;
    procedure: string;
    specialist: string;
    notes: string;
    outcome: string;
  }[];
}

export type AppointmentType = 
  | 'In-person consultation' 
  | 'Follow-up' 
  | 'Emergency' 
  | 'Virtual consultation';

export type AppointmentStatus = 
  | 'Scheduled' 
  | 'Confirmed' 
  | 'Completed' 
  | 'Cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  reminderSent: boolean;
  reminderSentTime?: string;
}

export type DoctorStatus = 'Available' | 'Busy' | 'Fully Booked';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  currentPatientLoad: number;
  todayAppointments: number;
  availableSlots: number;
  status: DoctorStatus;
  avatar: string;
  roomNumber: string;
  qualification: string;
  contactNumber: string;
}

export type BedStatus = 'Available' | 'Occupied' | 'Cleaning';
export type WardType = 'General Ward' | 'ICU' | 'Emergency' | 'Private Rooms';

export interface Bed {
  id: string;
  bedNumber: string;
  ward: WardType;
  status: BedStatus;
  patientName?: string;
  patientId?: string;
  assignedDoctor?: string;
  admittedSince?: string;
  notes?: string;
}

export type StockStatus = 'Available' | 'Low Stock' | 'Out of Stock' | 'Expired';

export interface Medicine {
  id: string;
  name: string;
  medicineId: string;
  availableQty: number;
  minStockLevel: number;
  expiryDate: string;
  price: number;
  supplier: string;
  stockStatus: StockStatus;
  category: string;
}

export type PrescriptionStatus = 'Pending' | 'Processing' | 'Dispensed';

export interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  doctor: string;
  medicine: string;
  dosage: string;
  duration: string;
  date: string;
  prescriptionStatus: PrescriptionStatus;
  dispensedAt?: string;
  pharmacistNotes?: string;
  instructions?: string;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Insurance Claimed' | 'Partial';

export interface Bill {
  id: string;
  invoiceNumber?: string;
  patientName: string;
  patientId: string;
  consultationFee?: number;
  doctorConsultationFees?: number;
  roomCharges: number;
  pharmacyCharges?: number;
  medicationCharges?: number;
  labCharges?: number;
  laboratoryTestFees?: number;
  otherCharges?: number;
  otherServices?: number;
  subtotal?: number;
  discount?: number;
  tax?: number;
  insurance?: number;
  totalAmount: number;
  paidAmount?: number;
  pendingAmount?: number;
  status?: 'Paid' | 'Pending' | 'Partial';
  paymentStatus?: PaymentStatus;
  date?: string;
  invoiceDate?: string;
  paymentMethod?: string;
  insuranceClaimStatus?: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  formattedRevenue?: string;
  consultationRevenue?: number;
  pharmacyRevenue?: number;
  roomRevenue?: number;
  otherRevenue?: number;
  target?: number;
}

export type NotificationType = 
  | 'Emergency' 
  | 'StockAlert' 
  | 'AppointmentReminder' 
  | 'LabResult' 
  | 'Billing'
  | 'appointment_reminder' 
  | 'new_appointment' 
  | 'bed_availability' 
  | 'low_pharmacy_stock' 
  | 'prescription_received' 
  | 'pending_payment' 
  | 'ehr_update' 
  | 'virtual_consultation_reminder';

export interface HospitalNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLink?: string;
  severity?: 'info' | 'warning' | 'urgent' | 'success';
}

export interface NotificationItem extends HospitalNotification {}

export type NavigationTab = 
  | 'dashboard'
  | 'doctors'
  | 'patients'
  | 'appointments'
  | 'ehr'
  | 'pharmacy'
  | 'beds'
  | 'billing'
  | 'virtual'
  | 'reports'
  | 'notifications'
  | 'settings';
