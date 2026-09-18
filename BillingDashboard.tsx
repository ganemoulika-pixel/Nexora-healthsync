import React, { useState } from 'react';
import { 
  Receipt, 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  PieChart as PieIcon, 
  ArrowUpRight, 
  Sparkles,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { Bill, PaymentStatus, Patient } from '../types';

interface BillingDashboardProps {
  bills: Bill[];
  patients: Patient[];
  monthlyRevenue: { month: string; revenue: number; target: number }[];
  departmentRevenue: { name: string; percentage: number; color: string }[];
  onAddBill: (bill: Bill) => void;
  onUpdatePaymentStatus: (billId: string, status: PaymentStatus, method?: string) => void;
  isDarkMode: boolean;
}

export const BillingDashboard: React.FC<BillingDashboardProps> = ({
  bills = [],
  patients = [],
  monthlyRevenue = [],
  departmentRevenue = [],
  onAddBill,
  onUpdatePaymentStatus,
  isDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'bills' | 'analytics'>('bills');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | PaymentStatus>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Bill | null>(null);
  const [isGenerateInvoiceOpen, setIsGenerateInvoiceOpen] = useState(false);

  // New Invoice generator form state
  const [selectedPatientId, setSelectedPatientId] = useState((patients && patients[0]?.id) || '');
  const [roomCharges, setRoomCharges] = useState(12000);
  const [doctorFees, setDoctorFees] = useState(6000);
  const [medicationCharges, setMedicationCharges] = useState(4800);
  const [labFees, setLabFees] = useState(3500);
  const [otherServices, setOtherServices] = useState(1500);
  const [discountPercent, setDiscountPercent] = useState(5);
  const [taxPercent, setTaxPercent] = useState(5); // GST
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Pending');

  // Total calculation
  const subtotal = Number(roomCharges) + Number(doctorFees) + Number(medicationCharges) + Number(labFees) + Number(otherServices);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = Math.round((taxableAmount * taxPercent) / 100);
  const totalCalculatedAmount = taxableAmount + taxAmount;

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = (patients || []).find(p => p.id === selectedPatientId) || patients[0] || { name: 'Walk-in Patient', id: 'P-999' };
    const dateStr = new Date().toISOString().split('T')[0];
    const newBill: Bill = {
      id: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: pat.name,
      patientId: pat.id,
      roomCharges: Number(roomCharges),
      doctorConsultationFees: Number(doctorFees),
      consultationFee: Number(doctorFees),
      medicationCharges: Number(medicationCharges),
      pharmacyCharges: Number(medicationCharges),
      laboratoryTestFees: Number(labFees),
      labCharges: Number(labFees),
      otherServices: Number(otherServices),
      otherCharges: Number(otherServices),
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      totalAmount: totalCalculatedAmount,
      paymentStatus,
      status: paymentStatus === 'Insurance Claimed' ? 'Paid' : (paymentStatus as any),
      paymentMethod: paymentStatus === 'Paid' ? 'UPI / NetBanking' : undefined,
      invoiceDate: dateStr,
      date: dateStr,
      insuranceClaimStatus: paymentStatus === 'Insurance Claimed' ? 'Approved & Disbursed' : 'Under Direct Settlement'
    };
    onAddBill(newBill);
    setIsGenerateInvoiceOpen(false);
    setSelectedInvoice(newBill);
  };

  const filteredBills = (bills || []).filter((b) => {
    const matchesSearch = 
      b.patientName.toLowerCase().includes(search.toLowerCase()) ||
      b.patientId.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-teal-500" />
            Billing & Hospital Revenue Intelligence
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automated medical invoice generator, insurance claims clearinghouse, and revenue trend analytics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsGenerateInvoiceOpen(true)}
            id="btn-open-invoice-generator"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Invoice</span>
          </button>
        </div>
      </div>

      {/* Top 5 Revenue KPI Summary Cards matching Section 11 requirements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className={`p-4 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Total Revenue (YTD)</span>
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600"><TrendingUp className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">₹3.18 Cr</p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +14.2% YoY growth
          </span>
        </div>

        <div className={`p-4 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Daily Revenue</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><DollarSign className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹4.85 L</p>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">42 billed transactions today</span>
        </div>

        <div className={`p-4 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Monthly Revenue</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600"><TrendingUp className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">₹31.4 L</p>
          <span className="text-[10px] text-teal-600 font-bold mt-1 block">Tracking toward Dec 35L</span>
        </div>

        <div className={`p-4 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Outstanding Bills</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600"><Clock className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">₹3.82 L</p>
          <span className="text-[10px] text-amber-600 font-medium mt-1 block">8 invoices awaiting clearance</span>
        </div>

        <div className={`p-4 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Insurance Claims</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600"><ShieldCheck className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400">₹14.6 L</p>
          <span className="text-[10px] text-purple-600 font-medium mt-1 block">98.2% cashless clearance</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('bills')}
          className={`
            px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2
            ${activeTab === 'bills' 
              ? 'bg-teal-600 text-white shadow-sm' 
              : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
          `}
        >
          <FileText className="w-4 h-4" />
          <span>Patient Invoices & Processing ({bills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`
            px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2
            ${activeTab === 'analytics' 
              ? 'bg-teal-600 text-white shadow-sm' 
              : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
          `}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Hospital Revenue Analytics & Dept Share</span>
        </button>
      </div>

      {/* TAB 1: PATIENT INVOICES */}
      {activeTab === 'bills' && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className={`
            p-3.5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3
            ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
          `}>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient, ID, invoice #..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`
                  w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none
                  ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}
                `}
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Status:
              </span>
              {['All', 'Paid', 'Pending', 'Insurance Claimed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st as any)}
                  className={`
                    px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors
                    ${statusFilter === st 
                      ? 'bg-teal-600 text-white' 
                      : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
                  `}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Table */}
          <div className={`
            rounded-3xl border shadow-xs overflow-hidden
            ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
          `}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="py-3 px-4 font-bold">Invoice & Patient</th>
                    <th className="py-3 px-4 font-bold">Room Charges</th>
                    <th className="py-3 px-4 font-bold">Doctor Fees</th>
                    <th className="py-3 px-4 font-bold">Meds & Labs</th>
                    <th className="py-3 px-4 font-bold">Total Amount</th>
                    <th className="py-3 px-4 font-bold">Payment Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {bill.patientName}
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 font-normal mt-0.5">
                          <span>{bill.id}</span>
                          <span>•</span>
                          <span className="text-teal-600">{bill.patientId}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        ₹{(bill.roomCharges ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        ₹{(bill.doctorConsultationFees ?? bill.consultationFee ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 dark:text-slate-300 block">
                          ₹{((bill.medicationCharges ?? bill.pharmacyCharges ?? 0) + (bill.laboratoryTestFees ?? bill.labCharges ?? 0)).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (M: ₹{bill.medicationCharges ?? bill.pharmacyCharges ?? 0} | L: ₹{bill.laboratoryTestFees ?? bill.labCharges ?? 0})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-black text-sm text-teal-700 dark:text-teal-300">
                          ₹{(bill.totalAmount ?? 0).toLocaleString()}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-mono">{bill.invoiceDate || bill.date || '2026-09-03'}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`
                          px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 w-fit
                          ${(bill.paymentStatus || bill.status) === 'Paid' 
                            ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' 
                            : (bill.paymentStatus || bill.status) === 'Pending' 
                              ? 'bg-amber-500/15 text-amber-600 border-amber-500/30' 
                              : 'bg-purple-500/15 text-purple-600 border-purple-500/30'}
                        `}>
                          {(bill.paymentStatus || bill.status) === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                          {bill.paymentStatus || bill.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {bill.paymentStatus === 'Pending' && (
                            <button
                              onClick={() => onUpdatePaymentStatus(bill.id, 'Paid', 'Cash / POS')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                            >
                              Process Payment
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedInvoice(bill)}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 font-bold hover:bg-teal-100 transition-colors text-[11px] flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Invoice</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOSPITAL REVENUE DASHBOARD (Section 11) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Monthly Revenue Chart (Targeting Jan 18L to Dec 35L) */}
          <div className={`p-6 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  Monthly Hospital Revenue Trajectory (Jan: 18L ➔ Dec: 35L)
                </h3>
                <p className="text-xs text-slate-500">Continuous fiscal trajectory benchmarked against quarterly bed and surgical utilization.</p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center gap-1 text-teal-600 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                  Actual Revenue (Lakhs)
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  Target
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#64748b'} textAnchor="end" tick={{ fontSize: 11 }} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} tickFormatter={(v) => `₹${v}L`} tick={{ fontSize: 11 }} domain={[10, 40]} />
                  <Tooltip 
                    formatter={(val: any) => [`₹${val} Lakhs`, 'Revenue']}
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                      borderRadius: '16px', 
                      borderColor: '#0d9488',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
                  <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Revenue Contribution (Cardiology 35%, Ortho 25%, Neuro 20%, GenMed 12%, Peds 8%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <PieIcon className="w-5 h-5 text-teal-500" />
                Department Revenue Contribution
              </h3>
              <p className="text-xs text-slate-500 mb-4">Relative billing distribution across primary clinical specialties.</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentRevenue}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="percentage"
                    >
                      {departmentRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: any) => [`${val}% of Gross Hospital Inflow`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {departmentRevenue.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white block mt-0.5">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cashless vs Insurance Settlement Breakdown */}
            <div className={`p-6 rounded-3xl border shadow-xs ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}`}>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-teal-500" />
                Insurance Claim Pipeline & Clearance
              </h3>
              <p className="text-xs text-slate-500 mb-6">Payer breakdown with TPA verification and turnaround times.</p>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>HDFC ERGO Cashless Health</span>
                    <span className="text-emerald-600">₹6.4 L (99.1% Approved)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Star Health Allied Insurance</span>
                    <span className="text-teal-600">₹4.2 L (97.8% Approved)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Max Bupa / Niva Bupa</span>
                    <span className="text-cyan-600">₹2.8 L (96.5% Approved)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-200 mt-4">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    IRDAI & TPA Direct Clearinghouse Active
                  </span>
                  Average claim settlement duration: <strong>42 minutes</strong> for inpatient pre-authorization.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GENERATE INVOICE MODAL (Interactive Invoice Generator) */}
      {isGenerateInvoiceOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`
            w-full max-w-xl rounded-3xl p-6 border shadow-2xl my-8
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div>
                <h3 className="font-bold text-base">Generate Medical Bill & Invoice</h3>
                <p className="text-xs text-slate-400">Calculates itemized medical service tariffs with real-time tax/discount computation.</p>
              </div>
              <button
                onClick={() => setIsGenerateInvoiceOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Select Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.roomBed}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Room Charges (₹)</label>
                  <input
                    type="number"
                    value={roomCharges}
                    onChange={(e) => setRoomCharges(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Doctor Fees (₹)</label>
                  <input
                    type="number"
                    value={doctorFees}
                    onChange={(e) => setDoctorFees(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Medications (₹)</label>
                  <input
                    type="number"
                    value={medicationCharges}
                    onChange={(e) => setMedicationCharges(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Lab Tests (₹)</label>
                  <input
                    type="number"
                    value={labFees}
                    onChange={(e) => setLabFees(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Other Services (₹)</label>
                  <input
                    type="number"
                    value={otherServices}
                    onChange={(e) => setOtherServices(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Discount %</label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  <option value="Pending">Pending (Invoice Dispatched)</option>
                  <option value="Paid">Paid (Cash / Card / NetBanking)</option>
                  <option value="Insurance Claimed">Insurance Claimed (TPA Disbursal)</option>
                </select>
              </div>

              {/* Automatic Calculation Preview Box */}
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Subtotal:</span>
                  <span>₹{(subtotal ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-₹{(discountAmount ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>GST Tax ({taxPercent}%):</span>
                  <span>+₹{(taxAmount ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-teal-800 dark:text-teal-200 pt-2 border-t border-teal-200 dark:border-teal-700">
                  <span>Total Payable:</span>
                  <span>₹{(totalCalculatedAmount ?? 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGenerateInvoiceOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Generate & Preview Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROFESSIONAL MEDICAL INVOICE VIEW / PRINT MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`
            w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl my-8
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            {/* Invoice Top Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-teal-600">{selectedInvoice.id}</span>
                <span className={`
                  px-2.5 py-0.5 rounded-full text-[10px] font-bold border
                  ${selectedInvoice.paymentStatus === 'Paid' ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' : 'bg-amber-500/15 text-amber-600 border-amber-500/30'}
                `}>
                  {selectedInvoice.paymentStatus}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Official Invoice Sheet */}
            <div className="space-y-6 text-xs">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-black text-teal-600 dark:text-teal-400">HealthSync Hospital</h4>
                  <p className="text-slate-400 text-[11px]">Nexora Health Campus, Sector 9, Digital Health City</p>
                  <p className="text-slate-400 text-[11px]">GSTIN: 07AAACH2419M1Z8 • Lic: NABH-EXP-8891</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">TAX INVOICE</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedInvoice.id}</span>
                  <p className="text-slate-400 text-[11px]">{selectedInvoice.invoiceDate}</p>
                </div>
              </div>

              {/* Patient Info Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Patient Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedInvoice.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Patient ID</span>
                  <span className="font-mono font-bold text-teal-600">{selectedInvoice.patientId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Payment Method</span>
                  <span className="font-semibold">{selectedInvoice.paymentMethod || 'Hospital Cashless Portal'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Insurance Clearance</span>
                  <span className="font-semibold text-emerald-600">{selectedInvoice.insuranceClaimStatus || 'Direct'}</span>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr>
                    <td className="py-2 font-medium">Inpatient Room & Bed Telemetry Charges</td>
                    <td className="py-2 text-right font-semibold">₹{(selectedInvoice.roomCharges ?? 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Specialist Doctor Consultation & Attending Round Fees</td>
                    <td className="py-2 text-right font-semibold">₹{(selectedInvoice.doctorConsultationFees ?? selectedInvoice.consultationFee ?? 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Pharmacy Medication Dispensation</td>
                    <td className="py-2 text-right font-semibold">₹{(selectedInvoice.medicationCharges ?? selectedInvoice.pharmacyCharges ?? 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Pathology Diagnostic Laboratory Tests</td>
                    <td className="py-2 text-right font-semibold">₹{(selectedInvoice.laboratoryTestFees ?? selectedInvoice.labCharges ?? 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Ancillary Medical Services & Nursing Care</td>
                    <td className="py-2 text-right font-semibold">₹{(selectedInvoice.otherServices ?? selectedInvoice.otherCharges ?? 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals Calculation */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{(selectedInvoice.subtotal ?? selectedInvoice.totalAmount ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-₹{(selectedInvoice.discount ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>GST (5%):</span>
                    <span>+₹{(selectedInvoice.tax ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-black text-base text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span>Total Net Amount:</span>
                    <span className="text-teal-600 dark:text-teal-400">₹{(selectedInvoice.totalAmount ?? 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-center text-teal-800 dark:text-teal-300 text-[11px] font-medium">
                Thank you for choosing HealthSync Hospital. This is a computer-generated electronically sealed invoice verified under NABH guidelines.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
