import { 
  User, 
  Patient, 
  EHRRecord, 
  Appointment, 
  Doctor, 
  Bed, 
  Medicine, 
  Prescription, 
  Bill, 
  MonthlyRevenue, 
  NotificationItem 
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Dr. Sarah Jenkins',
    email: 'admin@nexorahealth.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    department: 'Hospital Administration',
    badgeNumber: 'NX-ADM-001'
  },
  {
    id: 'u-2',
    name: 'Dr. Priya Sharma',
    email: 'dr.priya@nexorahealth.com',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&q=80&w=250',
    department: 'Cardiology',
    badgeNumber: 'NX-DOC-108'
  },
  {
    id: 'u-3',
    name: 'Nurse Priya Varma',
    email: 'nurse.priya@nexorahealth.com',
    role: 'nurse',
    avatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=250',
    department: 'ICU & Emergency Care',
    badgeNumber: 'NX-NUR-204'
  },
  {
    id: 'u-4',
    name: 'Kavita Chawla',
    email: 'reception@nexorahealth.com',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    department: 'Outpatient Reception',
    badgeNumber: 'NX-REC-012'
  },
  {
    id: 'u-5',
    name: 'Rajeev Malhotra',
    email: 'pharmacy@nexorahealth.com',
    role: 'pharmacist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    department: 'Central Pharmacy',
    badgeNumber: 'NX-PHAR-045'
  },
  {
    id: 'u-6',
    name: 'Sunil Verma',
    email: 'billing@nexorahealth.com',
    role: 'billing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'Accounts & Revenue',
    badgeNumber: 'NX-BIL-032'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'PAT-1082',
    name: 'Vikram Singh',
    age: 42,
    gender: 'Male',
    contact: '+91 98210 44219',
    email: 'vikram.singh@gmail.com',
    bloodGroup: 'B+',
    doctor: 'Dr. Anil Mehta',
    diagnosis: 'Type 2 Diabetes Mellitus & Essential Hypertension',
    admissionStatus: 'Observation',
    admissionDate: '2026-09-02',
    roomBed: 'ICU-B04',
    emergencyContact: '+91 98210 44220 (Spouse - Sunita)',
    insuranceProvider: 'Star Health Premier Care',
    policyNumber: 'SH-8829104',
    allergies: ['Penicillin', 'Sulfa drugs']
  },
  {
    id: 'PAT-1083',
    name: 'Ananya Deshmukh',
    age: 29,
    gender: 'Female',
    contact: '+91 97182 30041',
    email: 'ananya.d@outlook.com',
    bloodGroup: 'O+',
    doctor: 'Dr. Priya Sharma',
    diagnosis: 'Acute Coronary Syndrome evaluation',
    admissionStatus: 'Admitted',
    admissionDate: '2026-09-01',
    roomBed: 'GW-A12',
    emergencyContact: '+91 97182 30042 (Brother)',
    insuranceProvider: 'HDFC ERGO Health Suraksha',
    policyNumber: 'HE-4491028',
    allergies: ['None known']
  },
  {
    id: 'PAT-1084',
    name: 'Rohan Joshi',
    age: 56,
    gender: 'Male',
    contact: '+91 98901 12948',
    email: 'rohan.j@yahoo.com',
    bloodGroup: 'A+',
    doctor: 'Dr. Rajesh Nair',
    diagnosis: 'Chronic Migraine & Cervical Spondylosis',
    admissionStatus: 'Outpatient',
    admissionDate: '2026-08-30',
    roomBed: 'OPD-Suite 3',
    emergencyContact: '+91 98901 12949 (Wife)',
    insuranceProvider: 'Max Bupa Health Companion',
    policyNumber: 'MB-9902182',
    allergies: ['Aspirin']
  },
  {
    id: 'PAT-1085',
    name: 'Meenakshi Iyer',
    age: 67,
    gender: 'Female',
    contact: '+91 94451 88301',
    email: 'meenakshi.iyer@gmail.com',
    bloodGroup: 'AB+',
    doctor: 'Dr. Arjun Kapoor',
    diagnosis: 'Post-Op Total Knee Arthroplasty (Right)',
    admissionStatus: 'Admitted',
    admissionDate: '2026-08-28',
    roomBed: 'PVT-302',
    emergencyContact: '+91 94451 88302 (Son - Kartik)',
    insuranceProvider: 'Care Health Advantage',
    policyNumber: 'CH-1092837',
    allergies: ['Latex']
  },
  {
    id: 'PAT-1086',
    name: 'Aarav Patel',
    age: 8,
    gender: 'Male',
    contact: '+91 98200 77192',
    email: 'kavita.patel@gmail.com',
    bloodGroup: 'O-',
    doctor: 'Dr. Sunita Rao',
    diagnosis: 'Acute Bronchial Asthma Exacerbation',
    admissionStatus: 'Observation',
    admissionDate: '2026-09-03',
    roomBed: 'EMR-E08',
    emergencyContact: '+91 98200 77192 (Mother - Kavita)',
    insuranceProvider: 'Tata AIG Medicare',
    policyNumber: 'TA-7729103',
    allergies: ['Dust mites', 'Peanuts']
  },
  {
    id: 'PAT-1087',
    name: 'Fatima Sheikh',
    age: 34,
    gender: 'Female',
    contact: '+91 96541 22890',
    email: 'fatima.s@gmail.com',
    bloodGroup: 'A-',
    doctor: 'Dr. Priya Sharma',
    diagnosis: 'Post-partum Cardiomyopathy follow-up',
    admissionStatus: 'Outpatient',
    admissionDate: '2026-08-25',
    roomBed: 'OPD-Suite 1',
    emergencyContact: '+91 96541 22891 (Husband)',
    insuranceProvider: 'ICICI Lombard Complete Health',
    policyNumber: 'IL-5591024',
    allergies: ['Ciprofloxacin']
  }
];

export const INITIAL_EHRS: Record<string, EHRRecord> = {
  'PAT-1082': {
    patientId: 'PAT-1082',
    bloodPressure: '138/86 mmHg',
    heartRate: '78 bpm',
    temperature: '98.4 °F',
    spo2: '98%',
    height: '175 cm',
    weight: '81 kg',
    medicalHistory: [
      'Type 2 Diabetes diagnosed 2019',
      'Mild Hypertension diagnosed 2021',
      'No surgical history',
      'Non-smoker'
    ],
    previousVisits: [
      {
        date: '2026-08-15',
        department: 'General Medicine',
        doctor: 'Dr. Anil Mehta',
        summary: 'Routine HbA1c review (7.2%). Added baseline cardio protective medication.'
      },
      {
        date: '2026-06-10',
        department: 'Ophthalmology',
        doctor: 'Dr. Reena Sen',
        summary: 'Diabetic retinopathy screening — negative for maculopathy.'
      }
    ],
    allergies: ['Penicillin (causes severe hives)', 'Sulfa drugs'],
    medications: [
      {
        name: 'Metformin Hydrochloride',
        dosage: '500 mg',
        frequency: 'Twice daily with meals',
        startDate: '2024-01-10',
        prescribedBy: 'Dr. Anil Mehta'
      },
      {
        name: 'Telmisartan',
        dosage: '40 mg',
        frequency: 'Once daily morning',
        startDate: '2025-05-12',
        prescribedBy: 'Dr. Anil Mehta'
      },
      {
        name: 'Insulin Glargine',
        dosage: '10 units',
        frequency: 'Once at bedtime',
        startDate: '2026-08-15',
        prescribedBy: 'Dr. Anil Mehta'
      }
    ],
    labReports: [
      {
        id: 'LR-901',
        testName: 'Comprehensive Metabolic Panel & HbA1c',
        date: '2026-09-02',
        result: 'HbA1c: 7.1%, Fasting Blood Glucose: 132 mg/dL',
        normalRange: 'HbA1c < 5.7%, FBG: 70-99 mg/dL',
        status: 'Abnormal',
        labTechnician: 'Ramesh Sundaram (Pathology Dept)'
      },
      {
        id: 'LR-902',
        testName: 'Lipid Profile Panel',
        date: '2026-09-02',
        result: 'Total Cholesterol: 188 mg/dL, LDL: 104 mg/dL, HDL: 46 mg/dL',
        normalRange: 'Total < 200 mg/dL, LDL < 100 mg/dL',
        status: 'Normal',
        labTechnician: 'Ramesh Sundaram (Pathology Dept)'
      },
      {
        id: 'LR-903',
        testName: 'Serum Creatinine & eGFR',
        date: '2026-09-02',
        result: 'Creatinine: 0.9 mg/dL, eGFR: 98 mL/min/1.73m²',
        normalRange: '0.7 - 1.3 mg/dL',
        status: 'Normal',
        labTechnician: 'Swati Kulkarni'
      }
    ],
    prescriptionHistory: [
      {
        id: 'RX-4401',
        date: '2026-09-02',
        doctor: 'Dr. Anil Mehta',
        medicines: ['Metformin 500mg', 'Telmisartan 40mg', 'Atorvastatin 10mg'],
        instructions: 'Continue regular glycemic logs. Follow up in 2 weeks.'
      }
    ],
    doctorNotes: [
      {
        id: 'DN-101',
        date: '2026-09-02 11:45',
        doctor: 'Dr. Anil Mehta',
        title: 'Morning Rounds & Tele-Followup Preparation',
        note: 'Patient Vikram Singh reported mild morning dizziness. Blood pressure stabilized to 138/86. Virtual check-in booked for 11:30 AM today to review glycemic curve and titration.'
      }
    ],
    treatmentHistory: [
      {
        id: 'TH-01',
        date: '2026-09-02',
        procedure: 'Continuous Glucose Monitoring (CGM) Sensor Placement',
        specialist: 'Dr. Anil Mehta',
        notes: 'Freestyle Libre sensor affixed to left upper arm. Calibrated successfully.',
        outcome: 'Stable telemetry established.'
      }
    ]
  },
  'PAT-1083': {
    patientId: 'PAT-1083',
    bloodPressure: '124/80 mmHg',
    heartRate: '72 bpm',
    temperature: '98.6 °F',
    spo2: '99%',
    height: '162 cm',
    weight: '58 kg',
    medicalHistory: ['Occasional exertional chest palpitations', 'Mild iron deficiency'],
    previousVisits: [
      {
        date: '2026-09-01',
        department: 'Cardiology',
        doctor: 'Dr. Priya Sharma',
        summary: 'Admitted for 24-hr Holter monitoring and echocardiography.'
      }
    ],
    allergies: ['No known allergies (NKDA)'],
    medications: [
      {
        name: 'Metoprolol Succinate ER',
        dosage: '25 mg',
        frequency: 'Once daily morning',
        startDate: '2026-09-01',
        prescribedBy: 'Dr. Priya Sharma'
      }
    ],
    labReports: [
      {
        id: 'LR-920',
        testName: 'High Sensitivity Troponin-I',
        date: '2026-09-01',
        result: '0.012 ng/mL (Negative for myocardial necrosis)',
        normalRange: '< 0.034 ng/mL',
        status: 'Normal',
        labTechnician: 'Swati Kulkarni'
      }
    ],
    prescriptionHistory: [
      {
        id: 'RX-4412',
        date: '2026-09-01',
        doctor: 'Dr. Priya Sharma',
        medicines: ['Metoprolol 25mg', 'Ferrous Ascorbate 100mg'],
        instructions: 'Rest in bed. Monitor heart rhythm.'
      }
    ],
    doctorNotes: [
      {
        id: 'DN-102',
        date: '2026-09-02',
        doctor: 'Dr. Priya Sharma',
        title: 'Echo Results Reviewed',
        note: 'Normal LV ejection fraction (62%), no regional wall motion abnormality. Good prognosis.'
      }
    ],
    treatmentHistory: [
      {
        id: 'TH-02',
        date: '2026-09-01',
        procedure: 'Transthoracic 2D Echocardiogram',
        specialist: 'Dr. Priya Sharma',
        notes: 'Valvular anatomy normal, chamber dimensions within physiologic limits.',
        outcome: 'Normal cardiac structure.'
      }
    ]
  }
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-301',
    patientName: 'Vikram Singh',
    patientId: 'PAT-1082',
    doctor: 'Dr. Anil Mehta',
    department: 'General Medicine',
    date: '2026-09-03',
    time: '11:30 AM',
    type: 'Virtual consultation',
    status: 'Confirmed',
    notes: 'Secure TeleHealth review of Glycemic log and medication adherence.',
    reminderSent: true,
    reminderSentTime: '2026-09-03 08:30 AM via SMS & WhatsApp'
  },
  {
    id: 'APT-302',
    patientName: 'Ananya Deshmukh',
    patientId: 'PAT-1083',
    doctor: 'Dr. Priya Sharma',
    department: 'Cardiology',
    date: '2026-09-03',
    time: '10:15 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    notes: 'Holter telemetry review & discharge clearance check.',
    reminderSent: true,
    reminderSentTime: '2026-09-02 06:00 PM via Email'
  },
  {
    id: 'APT-303',
    patientName: 'Rohan Joshi',
    patientId: 'PAT-1084',
    doctor: 'Dr. Rajesh Nair',
    department: 'Neurology',
    date: '2026-09-03',
    time: '01:00 PM',
    type: 'In-person consultation',
    status: 'Scheduled',
    notes: 'Cervical MRI review & ergonomic management plan.',
    reminderSent: true,
    reminderSentTime: '2026-09-03 09:00 AM via SMS'
  },
  {
    id: 'APT-304',
    patientName: 'Aarav Patel',
    patientId: 'PAT-1086',
    doctor: 'Dr. Sunita Rao',
    department: 'Pediatrics',
    date: '2026-09-03',
    time: '02:30 PM',
    type: 'Emergency',
    status: 'Confirmed',
    notes: 'Nebulization response check & pediatric pulmonary triage.',
    reminderSent: false
  },
  {
    id: 'APT-305',
    patientName: 'Fatima Sheikh',
    patientId: 'PAT-1087',
    doctor: 'Dr. Priya Sharma',
    department: 'Cardiology',
    date: '2026-09-03',
    time: '04:00 PM',
    type: 'In-person consultation',
    status: 'Scheduled',
    notes: 'Post-partum cardiological follow-up and Doppler check.',
    reminderSent: false
  },
  {
    id: 'APT-306',
    patientName: 'Devendra Patil',
    patientId: 'PAT-1088',
    doctor: 'Dr. Arjun Kapoor',
    department: 'Orthopedics',
    date: '2026-09-04',
    time: '09:30 AM',
    type: 'In-person consultation',
    status: 'Scheduled',
    notes: 'Lumbar disc herniation physical assessment.',
    reminderSent: false
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'DOC-01',
    name: 'Dr. Priya Sharma',
    specialization: 'Cardiology',
    department: 'Cardiovascular Sciences',
    currentPatientLoad: 12,
    todayAppointments: 8,
    availableSlots: 3,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'OPD Block A - 204',
    qualification: 'MD, DM (Cardiology), FACC',
    contactNumber: '+91 98201 11204'
  },
  {
    id: 'DOC-02',
    name: 'Dr. Anil Mehta',
    specialization: 'Internal Medicine & Diabetology',
    department: 'General Medicine',
    currentPatientLoad: 10,
    todayAppointments: 6,
    availableSlots: 4,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'OPD Block B - 108',
    qualification: 'MD (Internal Medicine), Fellowship Diabetology',
    contactNumber: '+91 98202 33401'
  },
  {
    id: 'DOC-03',
    name: 'Dr. Rajesh Nair',
    specialization: 'Neurology',
    department: 'Neurosciences',
    currentPatientLoad: 16,
    todayAppointments: 10,
    availableSlots: 1,
    status: 'Busy',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'OPD Block C - 310',
    qualification: 'MD, DM (Neurology)',
    contactNumber: '+91 98203 77812'
  },
  {
    id: 'DOC-04',
    name: 'Dr. Sunita Rao',
    specialization: 'Pediatrics',
    department: 'Pediatric Care',
    currentPatientLoad: 18,
    todayAppointments: 14,
    availableSlots: 0,
    status: 'Fully Booked',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Pediatric Wing - 101',
    qualification: 'MBBS, MD (Pediatrics), DNB',
    contactNumber: '+91 98204 99120'
  },
  {
    id: 'DOC-05',
    name: 'Dr. Arjun Kapoor',
    specialization: 'Orthopedics & Joint Replacement',
    department: 'Orthopedic Surgery',
    currentPatientLoad: 9,
    todayAppointments: 5,
    availableSlots: 5,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Surgical Wing - 402',
    qualification: 'MS (Orthopedics), MCh (Joint Reconstructive)',
    contactNumber: '+91 98205 66291'
  },
  {
    id: 'DOC-06',
    name: 'Dr. Meera Sen',
    specialization: 'Medical Oncology',
    department: 'Comprehensive Cancer Center',
    currentPatientLoad: 15,
    todayAppointments: 9,
    availableSlots: 1,
    status: 'Busy',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Oncology Suite - 501',
    qualification: 'MD, DM (Medical Oncology), ESMO Certified',
    contactNumber: '+91 98206 44109'
  }
];

// 122 Total Beds: 84 Occupied, 38 Available. Overall Occupancy: 69%
export const INITIAL_BEDS: Bed[] = [
  // ICU Wards (Total 18: 12 Occupied, 4 Available, 2 Cleaning)
  { id: 'b-icu-01', bedNumber: 'ICU-101', ward: 'ICU', status: 'Occupied', patientName: 'Vikram Singh', patientId: 'PAT-1082', assignedDoctor: 'Dr. Anil Mehta', admittedSince: '2026-09-02' },
  { id: 'b-icu-02', bedNumber: 'ICU-102', ward: 'ICU', status: 'Occupied', patientName: 'Sunil Rao', patientId: 'PAT-1055', assignedDoctor: 'Dr. Priya Sharma', admittedSince: '2026-08-31' },
  { id: 'b-icu-03', bedNumber: 'ICU-103', ward: 'ICU', status: 'Available' },
  { id: 'b-icu-04', bedNumber: 'ICU-104', ward: 'ICU', status: 'Occupied', patientName: 'Kishore Kumar', patientId: 'PAT-1060', assignedDoctor: 'Dr. Rajesh Nair', admittedSince: '2026-09-01' },
  { id: 'b-icu-05', bedNumber: 'ICU-105', ward: 'ICU', status: 'Cleaning', notes: 'Sterilizing post discharge' },
  { id: 'b-icu-06', bedNumber: 'ICU-106', ward: 'ICU', status: 'Available' },
  { id: 'b-icu-07', bedNumber: 'ICU-107', ward: 'ICU', status: 'Occupied', patientName: 'Geeta Nair', patientId: 'PAT-1064', assignedDoctor: 'Dr. Priya Sharma', admittedSince: '2026-09-02' },
  { id: 'b-icu-08', bedNumber: 'ICU-108', ward: 'ICU', status: 'Occupied', patientName: 'Aarav Patel', patientId: 'PAT-1086', assignedDoctor: 'Dr. Sunita Rao', admittedSince: '2026-09-03' },
  { id: 'b-icu-09', bedNumber: 'ICU-109', ward: 'ICU', status: 'Available' },
  { id: 'b-icu-10', bedNumber: 'ICU-110', ward: 'ICU', status: 'Occupied', patientName: 'Harish Varma', patientId: 'PAT-1071', assignedDoctor: 'Dr. Anil Mehta', admittedSince: '2026-09-01' },
  { id: 'b-icu-11', bedNumber: 'ICU-111', ward: 'ICU', status: 'Cleaning', notes: 'HEPA air filter cycle' },
  { id: 'b-icu-12', bedNumber: 'ICU-112', ward: 'ICU', status: 'Available' },

  // Emergency Wards (Total 24: 18 Occupied, 5 Available, 1 Cleaning)
  { id: 'b-emr-01', bedNumber: 'EMR-E01', ward: 'Emergency', status: 'Occupied', patientName: 'Mohit Agarwal', patientId: 'PAT-1075', assignedDoctor: 'Dr. Priya Sharma', admittedSince: '2026-09-03' },
  { id: 'b-emr-02', bedNumber: 'EMR-E02', ward: 'Emergency', status: 'Available' },
  { id: 'b-emr-03', bedNumber: 'EMR-E03', ward: 'Emergency', status: 'Occupied', patientName: 'Preeti Saxena', patientId: 'PAT-1076', assignedDoctor: 'Dr. Arjun Kapoor', admittedSince: '2026-09-03' },
  { id: 'b-emr-04', bedNumber: 'EMR-E04', ward: 'Emergency', status: 'Available' },
  { id: 'b-emr-05', bedNumber: 'EMR-E05', ward: 'Emergency', status: 'Occupied', patientName: 'Naveen Reddy', patientId: 'PAT-1077', assignedDoctor: 'Dr. Anil Mehta', admittedSince: '2026-09-03' },
  { id: 'b-emr-06', bedNumber: 'EMR-E06', ward: 'Emergency', status: 'Available' },
  { id: 'b-emr-07', bedNumber: 'EMR-E07', ward: 'Emergency', status: 'Occupied', patientName: 'Kamla Bai', patientId: 'PAT-1078', assignedDoctor: 'Dr. Sunita Rao', admittedSince: '2026-09-03' },
  { id: 'b-emr-08', bedNumber: 'EMR-E08', ward: 'Emergency', status: 'Cleaning', notes: 'Routine sanitation' },
  { id: 'b-emr-09', bedNumber: 'EMR-E09', ward: 'Emergency', status: 'Available' },
  { id: 'b-emr-10', bedNumber: 'EMR-E10', ward: 'Emergency', status: 'Available' },

  // General Ward (Total 44: 30 Occupied, 11 Available, 3 Cleaning)
  { id: 'b-gw-01', bedNumber: 'GW-A01', ward: 'General Ward', status: 'Occupied', patientName: 'Ananya Deshmukh', patientId: 'PAT-1083', assignedDoctor: 'Dr. Priya Sharma', admittedSince: '2026-09-01' },
  { id: 'b-gw-02', bedNumber: 'GW-A02', ward: 'General Ward', status: 'Available' },
  { id: 'b-gw-03', bedNumber: 'GW-A03', ward: 'General Ward', status: 'Occupied', patientName: 'Sanjay Jain', patientId: 'PAT-1065', assignedDoctor: 'Dr. Rajesh Nair', admittedSince: '2026-08-30' },
  { id: 'b-gw-04', bedNumber: 'GW-A04', ward: 'General Ward', status: 'Available' },
  { id: 'b-gw-05', bedNumber: 'GW-A05', ward: 'General Ward', status: 'Occupied', patientName: 'Lata Sen', patientId: 'PAT-1068', assignedDoctor: 'Dr. Anil Mehta', admittedSince: '2026-09-02' },
  { id: 'b-gw-06', bedNumber: 'GW-A06', ward: 'General Ward', status: 'Cleaning', notes: 'Linen replacement' },
  { id: 'b-gw-07', bedNumber: 'GW-A07', ward: 'General Ward', status: 'Available' },
  { id: 'b-gw-08', bedNumber: 'GW-A08', ward: 'General Ward', status: 'Available' },
  { id: 'b-gw-09', bedNumber: 'GW-A09', ward: 'General Ward', status: 'Occupied', patientName: 'Brijesh Pandey', patientId: 'PAT-1070', assignedDoctor: 'Dr. Arjun Kapoor', admittedSince: '2026-08-29' },
  { id: 'b-gw-10', bedNumber: 'GW-A10', ward: 'General Ward', status: 'Available' },
  { id: 'b-gw-11', bedNumber: 'GW-A11', ward: 'General Ward', status: 'Occupied', patientName: 'Tarun Ghose', patientId: 'PAT-1072', assignedDoctor: 'Dr. Priya Sharma', admittedSince: '2026-09-01' },
  { id: 'b-gw-12', bedNumber: 'GW-A12', ward: 'General Ward', status: 'Available' },

  // Private Rooms (Total 24: 15 Occupied, 7 Available, 2 Cleaning)
  { id: 'b-pvt-01', bedNumber: 'PVT-301', ward: 'Private Rooms', status: 'Occupied', patientName: 'Meenakshi Iyer', patientId: 'PAT-1085', assignedDoctor: 'Dr. Arjun Kapoor', admittedSince: '2026-08-28' },
  { id: 'b-pvt-02', bedNumber: 'PVT-302', ward: 'Private Rooms', status: 'Available' },
  { id: 'b-pvt-03', bedNumber: 'PVT-303', ward: 'Private Rooms', status: 'Occupied', patientName: 'Rajinder Gupta', patientId: 'PAT-1062', assignedDoctor: 'Dr. Meera Sen', admittedSince: '2026-08-26' },
  { id: 'b-pvt-04', bedNumber: 'PVT-304', ward: 'Private Rooms', status: 'Available' },
  { id: 'b-pvt-05', bedNumber: 'PVT-305', ward: 'Private Rooms', status: 'Cleaning', notes: 'Deep chemical wash' },
  { id: 'b-pvt-06', bedNumber: 'PVT-306', ward: 'Private Rooms', status: 'Available' },
  { id: 'b-pvt-07', bedNumber: 'PVT-307', ward: 'Private Rooms', status: 'Occupied', patientName: 'Usha Kothari', patientId: 'PAT-1063', assignedDoctor: 'Dr. Priya Sharma', admittedSince: '2026-09-02' },
  { id: 'b-pvt-08', bedNumber: 'PVT-308', ward: 'Private Rooms', status: 'Available' }
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-01',
    name: 'Paracetamol',
    medicineId: 'MED-PARA-650',
    availableQty: 850,
    minStockLevel: 200,
    expiryDate: '2027-11-30',
    price: 32.50,
    supplier: 'Sun Pharma Ltd.',
    stockStatus: 'Available',
    category: 'Analgesics & Antipyretics'
  },
  {
    id: 'med-02',
    name: 'Insulin (Human Mixtard 30/70)',
    medicineId: 'MED-INSU-100U',
    availableQty: 18,
    minStockLevel: 50,
    expiryDate: '2026-10-15',
    price: 480.00,
    supplier: 'Novo Nordisk Healthcare',
    stockStatus: 'Low Stock',
    category: 'Endocrine & Diabetology'
  },
  {
    id: 'med-03',
    name: 'Aspirin (Ecosprin 75mg)',
    medicineId: 'MED-ASPR-75MG',
    availableQty: 15,
    minStockLevel: 60,
    expiryDate: '2027-04-20',
    price: 24.00,
    supplier: 'USV Lifesciences',
    stockStatus: 'Low Stock',
    category: 'Cardiology & Antiplatelet'
  },
  {
    id: 'med-04',
    name: 'Amoxicillin + Clavulanic Acid (Augmentin 625)',
    medicineId: 'MED-AMOX-625',
    availableQty: 420,
    minStockLevel: 100,
    expiryDate: '2027-08-15',
    price: 210.00,
    supplier: 'GSK Pharmaceuticals',
    stockStatus: 'Available',
    category: 'Broad Spectrum Antibiotic'
  },
  {
    id: 'med-05',
    name: 'Atorvastatin (Lipitor 10mg)',
    medicineId: 'MED-ATOR-10MG',
    availableQty: 310,
    minStockLevel: 80,
    expiryDate: '2027-03-31',
    price: 145.00,
    supplier: 'Pfizer India',
    stockStatus: 'Available',
    category: 'Lipid Lowering'
  },
  {
    id: 'med-06',
    name: 'Metformin Hydrochloride (500mg)',
    medicineId: 'MED-METF-500',
    availableQty: 640,
    minStockLevel: 150,
    expiryDate: '2028-01-10',
    price: 38.00,
    supplier: 'Cipla Therapeutics',
    stockStatus: 'Available',
    category: 'Antidiabetic'
  },
  {
    id: 'med-07',
    name: 'Salbutamol Inhaler (Asthalin 100mcg)',
    medicineId: 'MED-SALB-INH',
    availableQty: 6,
    minStockLevel: 30,
    expiryDate: '2026-12-05',
    price: 185.00,
    supplier: 'Cipla Respiratory',
    stockStatus: 'Low Stock',
    category: 'Respiratory'
  },
  {
    id: 'med-08',
    name: 'Ceftriaxone Injection 1g',
    medicineId: 'MED-CEFT-1GM',
    availableQty: 0,
    minStockLevel: 40,
    expiryDate: '2026-08-30',
    price: 165.00,
    supplier: 'Alkem Laboratories',
    stockStatus: 'Out of Stock',
    category: 'Injectable Antibiotic'
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'PRX-501',
    patientName: 'Vikram Singh',
    patientId: 'PAT-1082',
    doctor: 'Dr. Anil Mehta',
    medicine: 'Insulin (Human Mixtard 30/70)',
    dosage: '10 Units subcutaneously at bedtime',
    duration: '30 Days',
    date: '2026-09-03',
    prescriptionStatus: 'Pending',
    pharmacistNotes: 'Check cold-chain packaging before dispensing.'
  },
  {
    id: 'PRX-502',
    patientName: 'Ananya Deshmukh',
    patientId: 'PAT-1083',
    doctor: 'Dr. Priya Sharma',
    medicine: 'Aspirin (Ecosprin 75mg)',
    dosage: '1 tablet daily after food',
    duration: '15 Days',
    date: '2026-09-03',
    prescriptionStatus: 'Processing',
    pharmacistNotes: 'Patient has mild gastric sensitivity, ensure coated tablet dispensed.'
  },
  {
    id: 'PRX-503',
    patientName: 'Rohan Joshi',
    patientId: 'PAT-1084',
    doctor: 'Dr. Rajesh Nair',
    medicine: 'Paracetamol 650mg',
    dosage: '1 tablet SOS for severe tension headaches',
    duration: '10 Days',
    date: '2026-09-02',
    prescriptionStatus: 'Dispensed',
    dispensedAt: '2026-09-02 04:15 PM'
  },
  {
    id: 'PRX-504',
    patientName: 'Aarav Patel',
    patientId: 'PAT-1086',
    doctor: 'Dr. Sunita Rao',
    medicine: 'Salbutamol Inhaler (100mcg)',
    dosage: '2 puffs via spacer every 6 hours during wheezing',
    duration: '7 Days',
    date: '2026-09-03',
    prescriptionStatus: 'Pending'
  }
];

export const INITIAL_BILLS: Bill[] = [
  {
    id: 'INV-8812',
    invoiceNumber: 'HS-2026-8812',
    patientName: 'Vikram Singh',
    patientId: 'PAT-1082',
    consultationFee: 1500,
    doctorConsultationFees: 1500,
    roomCharges: 6000,
    pharmacyCharges: 2450,
    medicationCharges: 2450,
    labCharges: 4200,
    laboratoryTestFees: 4200,
    otherCharges: 850,
    otherServices: 850,
    subtotal: 14150,
    discount: 0,
    tax: 850,
    insurance: 11000,
    totalAmount: 15000,
    paidAmount: 11000,
    pendingAmount: 4000,
    status: 'Partial',
    paymentStatus: 'Partial',
    date: '2026-09-03',
    invoiceDate: '2026-09-03',
    paymentMethod: 'Star Health TPA Pre-Auth'
  },
  {
    id: 'INV-8813',
    invoiceNumber: 'HS-2026-8813',
    patientName: 'Ananya Deshmukh',
    patientId: 'PAT-1083',
    consultationFee: 2000,
    doctorConsultationFees: 2000,
    roomCharges: 9000,
    pharmacyCharges: 1800,
    medicationCharges: 1800,
    labCharges: 6500,
    laboratoryTestFees: 6500,
    otherCharges: 1200,
    otherServices: 1200,
    subtotal: 19300,
    discount: 0,
    tax: 1200,
    insurance: 16500,
    totalAmount: 20500,
    paidAmount: 20500,
    pendingAmount: 0,
    status: 'Paid',
    paymentStatus: 'Paid',
    date: '2026-09-02',
    invoiceDate: '2026-09-02',
    paymentMethod: 'UPI / NetBanking'
  },
  {
    id: 'INV-8814',
    invoiceNumber: 'HS-2026-8814',
    patientName: 'Meenakshi Iyer',
    patientId: 'PAT-1085',
    consultationFee: 4000,
    doctorConsultationFees: 4000,
    roomCharges: 28000,
    pharmacyCharges: 8900,
    medicationCharges: 8900,
    labCharges: 9500,
    laboratoryTestFees: 9500,
    otherCharges: 5200,
    otherServices: 5200,
    subtotal: 52600,
    discount: 0,
    tax: 3000,
    insurance: 45000,
    totalAmount: 55600,
    paidAmount: 45000,
    pendingAmount: 10600,
    status: 'Partial',
    paymentStatus: 'Partial',
    date: '2026-09-01',
    invoiceDate: '2026-09-01',
    paymentMethod: 'Care Health Direct Billing'
  },
  {
    id: 'INV-8815',
    invoiceNumber: 'HS-2026-8815',
    patientName: 'Rohan Joshi',
    patientId: 'PAT-1084',
    consultationFee: 1200,
    doctorConsultationFees: 1200,
    roomCharges: 0,
    pharmacyCharges: 450,
    medicationCharges: 450,
    labCharges: 2800,
    laboratoryTestFees: 2800,
    otherCharges: 150,
    otherServices: 150,
    subtotal: 4450,
    discount: 0,
    tax: 150,
    insurance: 0,
    totalAmount: 4600,
    paidAmount: 4600,
    pendingAmount: 0,
    status: 'Paid',
    paymentStatus: 'Paid',
    date: '2026-08-30',
    invoiceDate: '2026-08-30',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'INV-8816',
    invoiceNumber: 'HS-2026-8816',
    patientName: 'Fatima Sheikh',
    patientId: 'PAT-1087',
    consultationFee: 1800,
    doctorConsultationFees: 1800,
    roomCharges: 0,
    pharmacyCharges: 950,
    medicationCharges: 950,
    labCharges: 3400,
    laboratoryTestFees: 3400,
    otherCharges: 200,
    otherServices: 200,
    subtotal: 6150,
    discount: 0,
    tax: 200,
    insurance: 4000,
    totalAmount: 6350,
    paidAmount: 0,
    pendingAmount: 2350,
    status: 'Pending',
    paymentStatus: 'Pending',
    date: '2026-09-03',
    invoiceDate: '2026-09-03',
    paymentMethod: 'Pending Co-pay'
  }
];

export const MONTHLY_REVENUE_DATA: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 1800000, formattedRevenue: '₹18,00,000', consultationRevenue: 420000, pharmacyRevenue: 510000, roomRevenue: 720000, otherRevenue: 150000 },
  { month: 'Feb', revenue: 1950000, formattedRevenue: '₹19,50,000', consultationRevenue: 450000, pharmacyRevenue: 560000, roomRevenue: 780000, otherRevenue: 160000 },
  { month: 'Mar', revenue: 2100000, formattedRevenue: '₹21,00,000', consultationRevenue: 490000, pharmacyRevenue: 610000, roomRevenue: 830000, otherRevenue: 170000 },
  { month: 'Apr', revenue: 2250000, formattedRevenue: '₹22,50,000', consultationRevenue: 520000, pharmacyRevenue: 650000, roomRevenue: 890000, otherRevenue: 190000 },
  { month: 'May', revenue: 2400000, formattedRevenue: '₹24,00,000', consultationRevenue: 560000, pharmacyRevenue: 690000, roomRevenue: 950000, otherRevenue: 200000 },
  { month: 'Jun', revenue: 2350000, formattedRevenue: '₹23,50,000', consultationRevenue: 550000, pharmacyRevenue: 680000, roomRevenue: 930000, otherRevenue: 190000 },
  { month: 'Jul', revenue: 2600000, formattedRevenue: '₹26,00,000', consultationRevenue: 610000, pharmacyRevenue: 750000, roomRevenue: 1030000, otherRevenue: 210000 },
  { month: 'Aug', revenue: 2845000, formattedRevenue: '₹28,45,000', consultationRevenue: 680000, pharmacyRevenue: 820000, roomRevenue: 1120000, otherRevenue: 225000 },
  { month: 'Sep', revenue: 2700000, formattedRevenue: '₹27,00,000', consultationRevenue: 640000, pharmacyRevenue: 780000, roomRevenue: 1070000, otherRevenue: 210000 },
  { month: 'Oct', revenue: 3000000, formattedRevenue: '₹30,00,000', consultationRevenue: 720000, pharmacyRevenue: 870000, roomRevenue: 1180000, otherRevenue: 230000 },
  { month: 'Nov', revenue: 3200000, formattedRevenue: '₹32,00,000', consultationRevenue: 770000, pharmacyRevenue: 920000, roomRevenue: 1260000, otherRevenue: 250000 },
  { month: 'Dec', revenue: 3500000, formattedRevenue: '₹35,00,000', consultationRevenue: 850000, pharmacyRevenue: 1010000, roomRevenue: 1370000, otherRevenue: 270000 }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    type: 'virtual_consultation_reminder',
    title: 'Virtual Consultation in 30 mins',
    message: 'Dr. Anil Mehta is scheduled with Vikram Singh (PAT-1082) today at 11:30 AM.',
    timestamp: '11:00 AM',
    read: false,
    severity: 'urgent'
  },
  {
    id: 'notif-02',
    type: 'low_pharmacy_stock',
    title: 'Low Pharmacy Stock Alert',
    message: 'Insulin (18 units) and Aspirin (15 units) are below the recommended threshold.',
    timestamp: '10:45 AM',
    read: false,
    severity: 'warning'
  },
  {
    id: 'notif-03',
    type: 'appointment_reminder',
    title: 'Appointment Reminder Sent',
    message: 'Automated SMS and WhatsApp reminder sent to patient Vikram Singh.',
    timestamp: '08:30 AM',
    read: true,
    severity: 'success'
  },
  {
    id: 'notif-04',
    type: 'bed_availability',
    title: 'ICU Bed Occupancy Notice',
    message: 'Overall bed occupancy reached 69%. 38 beds currently available across hospital wards.',
    timestamp: '08:15 AM',
    read: false,
    severity: 'info'
  },
  {
    id: 'notif-05',
    type: 'prescription_received',
    title: 'Prescription Submitted by Dr. Anil Mehta',
    message: 'New Rx #PRX-501 awaiting dispensing for patient Vikram Singh.',
    timestamp: '07:50 AM',
    read: false,
    severity: 'info'
  },
  {
    id: 'notif-06',
    type: 'pending_payment',
    title: 'Pending Insurance Co-Pay',
    message: 'Invoice #HS-2026-8816 has an outstanding balance of ₹2,350.',
    timestamp: 'Yesterday',
    read: true,
    severity: 'warning'
  },
  {
    id: 'notif-07',
    type: 'ehr_update',
    title: 'EHR Lab Report Ready',
    message: 'Comprehensive Metabolic Panel results updated for patient PAT-1082.',
    timestamp: 'Yesterday',
    read: true,
    severity: 'info'
  },
  {
    id: 'notif-08',
    type: 'new_appointment',
    title: 'New Emergency Walk-in',
    message: 'Patient Aarav Patel checked into Pediatric Emergency ward.',
    timestamp: 'Yesterday',
    read: true,
    severity: 'urgent'
  }
];

export const departmentRevenueData = [
  { name: 'Cardiology', percentage: 35, color: '#0d9488' },
  { name: 'Orthopedics', percentage: 25, color: '#0284c7' },
  { name: 'Neurology', percentage: 20, color: '#6366f1' },
  { name: 'General Medicine', percentage: 12, color: '#10b981' },
  { name: 'Pediatrics', percentage: 8, color: '#f59e0b' }
];

export const initialPatients = INITIAL_PATIENTS;
export const initialDoctors = INITIAL_DOCTORS;
export const initialAppointments = INITIAL_APPOINTMENTS;
export const initialBeds = INITIAL_BEDS;
export const initialMedicines = INITIAL_MEDICINES;
export const initialPrescriptions = INITIAL_PRESCRIPTIONS;
export const initialBills = INITIAL_BILLS;
export const initialNotifications = INITIAL_NOTIFICATIONS;
export const initialEHRRecords = INITIAL_EHRS;
export const monthlyRevenueData = MONTHLY_REVENUE_DATA.map(m => ({
  month: m.month,
  revenue: Math.round(m.revenue / 100000), // in Lakhs
  target: 35
}));

