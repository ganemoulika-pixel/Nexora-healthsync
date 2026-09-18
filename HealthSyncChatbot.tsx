import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  HelpCircle, 
  BedDouble, 
  Stethoscope, 
  Pill, 
  AlertTriangle, 
  User,
  ChevronRight
} from 'lucide-react';
import { Bed, Doctor, Medicine, Patient, HospitalNotification } from '../types';

interface HealthSyncChatbotProps {
  beds: Bed[];
  doctors: Doctor[];
  medicines: Medicine[];
  patients: Patient[];
  notifications: HospitalNotification[];
  onNavigateTab: (tab: string) => void;
  isDarkMode: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: { label: string; tab: string };
}

export const HealthSyncChatbot: React.FC<HealthSyncChatbotProps> = ({
  beds = [],
  doctors = [],
  medicines = [],
  patients = [],
  notifications = [],
  onNavigateTab,
  isDarkMode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! I am HealthSync Assistant, your clinical and operational AI copilot. How can I assist you today?',
      timestamp: 'Just now',
      suggestions: [
        'Show available beds',
        "Find Dr. Sharma's schedule",
        'Check Insulin stock',
        'Recent emergency admissions'
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const processQuery = (rawQuery: string) => {
    const q = rawQuery.toLowerCase();
    let reply = '';
    let link: { label: string; tab: string } | undefined = undefined;

    if (q.includes('bed') || q.includes('available bed') || q.includes('occupancy')) {
      const avail = (beds || []).filter(b => b.status === 'Available');
      const icuAvail = (beds || []).filter(b => b.status === 'Available' && b.ward === 'ICU');
      reply = `Currently, HealthSync Hospital has ${avail.length} available beds across wards (Overall Occupancy is 69%). There are ${icuAvail.length} ICU beds immediately ready for intake.`;
      link = { label: 'Open Bed Management Grid', tab: 'beds' };
    } else if (q.includes('sharma') || q.includes('doctor schedule') || q.includes('priya')) {
      const drSharma = (doctors || []).find(d => d.name.includes('Sharma')) || doctors[0] || { name: 'Dr. Priya Sharma', specialization: 'Cardiology', status: 'Available', roomNumber: 'OPD-102', currentPatientLoad: 14, availableSlots: 6 };
      reply = `${drSharma.name} (${drSharma.specialization}) is currently ${drSharma.status} in ${drSharma.roomNumber}. Patient load: ${drSharma.currentPatientLoad} patients, with ${drSharma.availableSlots} consultation slots available today.`;
      link = { label: 'View Doctor Roster', tab: 'doctors' };
    } else if (q.includes('insulin') || q.includes('aspirin') || q.includes('medicine') || q.includes('stock')) {
      const insulin = (medicines || []).find(m => m.name.toLowerCase().includes('insulin'));
      if (insulin) {
        reply = `⚠️ ${insulin.name} (${insulin.medicineId}): Current stock is ${insulin.availableQty} units (Status: ${insulin.stockStatus}, Minimum safety threshold: ${insulin.minStockLevel} units). Reorder is strongly recommended.`;
      } else {
        reply = `Pharmacy formulary checked: 6 active formulations. Low stock alerts active for Insulin (18 units) and Aspirin (15 units).`;
      }
      link = { label: 'Open Pharmacy & Formulary', tab: 'pharmacy' };
    } else if (q.includes('emergency') || q.includes('admission') || q.includes('er')) {
      const emergencies = (notifications || []).filter(n => n.type === 'Emergency');
      reply = `Emergency Triage: ${emergencies.length > 0 ? emergencies[0].message : 'Trauma Bay 2 active with acute coronary syndrome triage under Dr. Priya Sharma.'}`;
      link = { label: 'Check Emergency Notifications', tab: 'notifications' };
    } else if (q.includes('patient') || q.includes('status')) {
      reply = `There are currently ${(patients || []).length} active registered patients. Latest inpatient intake: ${patients[0]?.name || 'Vikram Singh'} (${patients[0]?.diagnosis || 'Stable'}) in ${patients[0]?.roomBed || 'ICU-04'}.`;
      link = { label: 'View Patient Registry', tab: 'patients' };
    } else if (q.includes('revenue') || q.includes('billing') || q.includes('income')) {
      reply = `Hospital fiscal health: Monthly revenue is ₹31.4 Lakhs, tracking smoothly toward our December target of ₹35 Lakhs. Outstanding invoices stand at ₹3.82 Lakhs.`;
      link = { label: 'Open Revenue Dashboard', tab: 'billing' };
    } else {
      reply = `I parsed your request regarding "${rawQuery}". I can retrieve live metrics across Bed Occupancy, Doctor Roster, Pharmacy Inventory, Patient EHRs, and Financial Invoicing. Try one of the quick suggestions below!`;
    }

    const newBotMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionLink: link,
      suggestions: [
        'Show available beds',
        "Find Dr. Sharma's schedule",
        'Check Insulin stock',
        'Recent emergency admissions'
      ]
    };

    setMessages(prev => [...prev, newBotMsg]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const newUserMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputQuery('');

    setTimeout(() => {
      processQuery(userText);
    }, 450);
  };

  const handleSuggestionClick = (sug: string) => {
    const newUserMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: sug,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMsg]);
    setTimeout(() => {
      processQuery(sug);
    }, 350);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Minimized Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="btn-open-healthsync-assistant"
          className="relative group p-4 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-xl shadow-teal-500/30 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-3 border border-teal-400/40"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-teal-600 animate-pulse" />
          </div>
          <span className="font-bold text-xs tracking-wide pr-1">HealthSync Assistant</span>
          <span className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-black animate-bounce">
            AI
          </span>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className={`
          w-[360px] sm:w-[400px] h-[520px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300
          ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}
        `}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  HealthSync Assistant
                  <Sparkles className="w-3 h-3 text-cyan-200" />
                </h4>
                <p className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Clinical & Operations Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`
                    p-3.5 rounded-2xl max-w-[85%] leading-relaxed shadow-xs
                    ${m.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-br-xs' 
                      : isDarkMode 
                        ? 'bg-slate-800/90 text-slate-100 border border-slate-700 rounded-bl-xs' 
                        : 'bg-slate-100 text-slate-800 border border-slate-200/80 rounded-bl-xs'}
                  `}
                >
                  <p>{m.text}</p>

                  {/* Navigation Action Link */}
                  {m.actionLink && (
                    <button
                      onClick={() => {
                        onNavigateTab(m.actionLink!.tab);
                      }}
                      className="mt-2 text-[11px] font-bold text-teal-600 dark:text-teal-300 underline flex items-center gap-1 hover:text-teal-500 cursor-pointer"
                    >
                      <span>{m.actionLink.label}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {m.timestamp}
                </span>

                {/* Quick Prompts Suggestions if provided */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSuggestionClick(sug)}
                        className={`
                          text-[10px] font-semibold px-2.5 py-1 rounded-xl border transition-all cursor-pointer
                          ${isDarkMode 
                            ? 'bg-slate-800/80 border-slate-700 text-teal-300 hover:bg-slate-700' 
                            : 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100'}
                        `}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Bar below messages */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-1 overflow-x-auto text-[10px] text-slate-400">
            <span className="font-semibold text-slate-500 shrink-0">Quick Queries:</span>
            <button
              onClick={() => handleSuggestionClick('Show available beds')}
              className="px-2 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
            >
              Beds
            </button>
            <button
              onClick={() => handleSuggestionClick("Find Dr. Sharma's schedule")}
              className="px-2 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
            >
              Dr. Sharma
            </button>
            <button
              onClick={() => handleSuggestionClick('Check Insulin stock')}
              className="px-2 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
            >
              Insulin
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask HealthSync Assistant..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className={`
                flex-1 px-3.5 py-2 rounded-xl text-xs border outline-none
                ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}
              `}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
