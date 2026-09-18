import React, { useState, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  PhoneOff, 
  Clock, 
  User, 
  FileText, 
  Pill, 
  Plus, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Stethoscope, 
  AlertCircle 
} from 'lucide-react';
import { Patient, Doctor, Prescription } from '../types';

interface VirtualConsultationProps {
  currentDoctor: Doctor;
  patients: Patient[];
  onAddPrescription: (prescription: Prescription) => void;
  onEndConsultation: (summary: string) => void;
  isDarkMode: boolean;
}

export const VirtualConsultation: React.FC<VirtualConsultationProps> = ({
  currentDoctor,
  patients = [],
  onAddPrescription,
  onEndConsultation,
  isDarkMode
}) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>((patients && patients[0]) || {
    id: 'PAT-1082',
    name: 'Vikram Singh',
    age: 46,
    gender: 'Male',
    contact: '+91 98450 12345',
    bloodGroup: 'B+',
    diagnosis: 'Hypertensive Heart Disease',
    doctor: 'Dr. Priya Sharma',
    admissionStatus: 'Outpatient',
    roomBed: 'Tele-Consult Bay 4',
    admissionDate: '2026-09-03',
    insuranceProvider: 'Star Health Allied',
    allergies: ['Penicillin']
  });

  // Call states
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [seconds, setSeconds] = useState(384); // 06:24 into call
  const [activeSidePanel, setActiveSidePanel] = useState<'ehr' | 'rx' | 'notes'>('rx');

  // E-prescription writing form
  const [rxMedicine, setRxMedicine] = useState('Telmisartan 40mg');
  const [rxDosage, setRxDosage] = useState('1 tablet daily after breakfast');
  const [rxDuration, setRxDuration] = useState('30 days');
  const [rxInstructions, setRxInstructions] = useState('Monitor morning sitting BP; keep salt intake below 4g/day');
  const [rxSuccessMsg, setRxSuccessMsg] = useState(false);

  // Clinical notes
  const [consultationNotes, setConsultationNotes] = useState(
    'Patient reports mild morning headaches. Blood pressure self-logged at 138/88 mmHg. Compliant with current dosage. Advised lifestyle modifications and routine ambulatory ECG next month.'
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxMedicine) return;

    const newPrescription: Prescription = {
      id: `RX-VIRTUAL-${Date.now()}`,
      patientName: selectedPatient.name,
      patientId: selectedPatient.id,
      doctor: currentDoctor.name,
      medicine: rxMedicine,
      dosage: rxDosage,
      duration: rxDuration,
      prescriptionStatus: 'Pending',
      date: new Date().toISOString().split('T')[0],
      instructions: rxInstructions
    };

    onAddPrescription(newPrescription);
    setRxSuccessMsg(true);
    setTimeout(() => setRxSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-teal-500" />
              TeleHealth Encrypted Virtual Consultation
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              WebRTC Peer-to-Peer 256-bit Encrypted
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time interactive video session with synchronized live clinical notes & direct E-prescription dispatcher.
          </p>
        </div>

        {/* Timer & Patient Selector */}
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-mono font-bold text-xs flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
            <span>Duration: {formatTimer(seconds)}</span>
          </div>

          <select
            value={selectedPatient.id}
            onChange={(e) => {
              const p = patients.find(pat => pat.id === e.target.value);
              if (p) setSelectedPatient(p);
            }}
            className={`
              px-3 py-1.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer
              ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}
            `}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                Patient: {p.name} ({p.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Video & Clinical Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Stage */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
            {/* Main Feed: Patient Feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                alt="Patient Video Feed"
                className="w-full h-full object-cover opacity-90 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Patient Overlay Status */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {selectedPatient.name} (Patient Feed)
                </span>
                <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-emerald-400 text-[10px] font-mono">
                  HD 1080p • 60fps
                </span>
              </div>

              {/* Vitals Telemetry HUD on Screen */}
              <div className="absolute top-4 right-4 hidden sm:flex items-center space-x-2">
                <div className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
                  BP: <span className="text-teal-400 font-bold">128/82</span> | HR: <span className="text-cyan-400 font-bold">74</span>
                </div>
              </div>
            </div>

            {/* Doctor Pip Feed (Self-view bottom right) */}
            <div className="absolute bottom-5 right-5 w-36 sm:w-48 aspect-video rounded-2xl overflow-hidden border-2 border-teal-500/80 shadow-2xl bg-slate-900 z-10">
              {isVideoOn ? (
                <img
                  src={currentDoctor.avatar}
                  alt={currentDoctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400">
                  <VideoOff className="w-6 h-6 mb-1" />
                  <span className="text-[9px]">Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-1 left-2 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-md">
                You ({currentDoctor.name.split(' ')[1] || 'Doctor'})
              </div>
            </div>

            {/* In-Call HUD Controls Bar */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-black/70 backdrop-blur-md p-2 rounded-2xl border border-white/10 z-20">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-xl transition-colors cursor-pointer ${isMicOn ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500 text-white'}`}
                title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-xl transition-colors cursor-pointer ${isVideoOn ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500 text-white'}`}
                title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-xl transition-colors cursor-pointer ${isScreenSharing ? 'bg-teal-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                title="Share Medical Imaging / Screen"
              >
                <Monitor className="w-5 h-5" />
              </button>

              <button
                onClick={() => onEndConsultation(consultationNotes)}
                className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
                title="End Consultation"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">End Call</span>
              </button>
            </div>
          </div>

          {/* Quick Doctor Guidance Banner */}
          <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs flex items-center justify-between text-teal-800 dark:text-teal-200">
            <span className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              Live session audio transcribed and mapped to clinical encounter documentation.
            </span>
            <span className="font-mono text-[10px] text-teal-600 font-bold">SESSION ID #VC-99182</span>
          </div>
        </div>

        {/* Right 1 Col: Interactive E-Prescription & Doctor Note Panel */}
        <div className={`
          p-5 rounded-3xl border shadow-xs flex flex-col justify-between
          ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
        `}>
          <div>
            {/* Panel Tabs */}
            <div className="flex items-center space-x-1 border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
              <button
                onClick={() => setActiveSidePanel('rx')}
                className={`
                  flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5
                  ${activeSidePanel === 'rx' 
                    ? 'bg-teal-600 text-white shadow-xs' 
                    : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}
                `}
              >
                <Pill className="w-3.5 h-3.5" />
                <span>E-Prescription</span>
              </button>
              <button
                onClick={() => setActiveSidePanel('notes')}
                className={`
                  flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5
                  ${activeSidePanel === 'notes' 
                    ? 'bg-teal-600 text-white shadow-xs' 
                    : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}
                `}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Clinical Notes</span>
              </button>
              <button
                onClick={() => setActiveSidePanel('ehr')}
                className={`
                  flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5
                  ${activeSidePanel === 'ehr' 
                    ? 'bg-teal-600 text-white shadow-xs' 
                    : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}
                `}
              >
                <User className="w-3.5 h-3.5" />
                <span>Patient Snapshot</span>
              </button>
            </div>

            {/* TAB: E-PRESCRIPTION PANEL */}
            {activeSidePanel === 'rx' && (
              <form onSubmit={handleSendPrescription} className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white">Direct E-Prescription</h4>
                  <span className="text-[10px] text-teal-600 font-semibold">Instantly sent to Pharmacy</span>
                </div>

                {rxSuccessMsg && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Prescription issued and sent to patient SMS & central pharmacy!</span>
                  </div>
                )}

                <div>
                  <label className="font-semibold block mb-1">Medication Name</label>
                  <input
                    type="text"
                    required
                    value={rxMedicine}
                    onChange={(e) => setRxMedicine(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    placeholder="e.g. Telmisartan 40mg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold block mb-1">Dosage</label>
                    <input
                      type="text"
                      required
                      value={rxDosage}
                      onChange={(e) => setRxDosage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      placeholder="1 tablet daily"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      value={rxDuration}
                      onChange={(e) => setRxDuration(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      placeholder="30 days"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Dietary & Intake Instructions</label>
                  <textarea
                    rows={2}
                    value={rxInstructions}
                    onChange={(e) => setRxInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    placeholder="e.g. Take with morning breakfast, low sodium..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit E-Prescription</span>
                </button>
              </form>
            )}

            {/* TAB: CLINICAL NOTES */}
            {activeSidePanel === 'notes' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white">Consultation Encounter Notes</h4>
                  <span className="text-[10px] text-slate-400">Auto-saved</span>
                </div>
                <textarea
                  rows={9}
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  placeholder="Record symptoms, exam observations, assessment and follow-up plan..."
                  className="w-full p-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 leading-relaxed"
                />
                <button
                  onClick={() => alert('Encounter note saved to patient record.')}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Save Note to EHR
                </button>
              </div>
            )}

            {/* TAB: PATIENT SNAPSHOT */}
            {activeSidePanel === 'ehr' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient Name:</span>
                    <span className="font-bold">{selectedPatient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Age / Gender:</span>
                    <span className="font-semibold">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blood Group:</span>
                    <span className="font-bold text-rose-500">{selectedPatient.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Diagnosis:</span>
                    <span className="font-semibold text-teal-600">{selectedPatient.diagnosis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Allergies:</span>
                    <span className="font-bold text-rose-600">{selectedPatient.allergies.join(', ') || 'None'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-800 dark:text-teal-200">
                  Patient verified identity via DigiLocker / Aadhaar Health ID (ABHA: 91-4402-9982-1049).
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <button
              onClick={() => onEndConsultation(consultationNotes)}
              className="w-full py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Complete & Finalize Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
