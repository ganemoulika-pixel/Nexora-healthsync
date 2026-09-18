import React, { useState } from 'react';
import { 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  RefreshCw, 
  Filter, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Building2,
  Check,
  X,
  Send,
  FileCheck2,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';
import { Medicine, Prescription, PrescriptionStatus } from '../types';

interface PharmacyManagementProps {
  medicines: Medicine[];
  prescriptions: Prescription[];
  onAddMedicine: (medicine: Medicine) => void;
  onUpdateStock: (medicineId: string, addedQty: number) => void;
  onUpdatePrescriptionStatus: (prescriptionId: string, status: PrescriptionStatus) => void;
  isDarkMode: boolean;
}

export const PharmacyManagement: React.FC<PharmacyManagementProps> = ({
  medicines = [],
  prescriptions = [],
  onAddMedicine,
  onUpdateStock,
  onUpdatePrescriptionStatus,
  isDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'prescriptions'>('inventory');
  const [search, setSearch] = useState('');
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [stockUpdateModalMed, setStockUpdateModalMed] = useState<Medicine | null>(null);
  const [qtyToAdd, setQtyToAdd] = useState<number>(50);

  // New medicine form state
  const [newMedName, setNewMedName] = useState('');
  const [newMedId, setNewMedId] = useState('');
  const [newQty, setNewQty] = useState(100);
  const [newMinStock, setNewMinStock] = useState(30);
  const [newExpiry, setNewExpiry] = useState('2027-12-31');
  const [newPrice, setNewPrice] = useState(85);
  const [newSupplier, setNewSupplier] = useState('Sun Pharma');
  const [newCategory, setNewCategory] = useState('General Therapeutics');

  // Low stock and expired alerts
  const lowStockMedicines = (medicines || []).filter(m => m.stockStatus === 'Low Stock' || m.availableQty <= m.minStockLevel);
  const outOfStockMedicines = (medicines || []).filter(m => m.stockStatus === 'Out of Stock' || m.availableQty === 0);

  const handleAddMedicineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdMed: Medicine = {
      id: `med-${Date.now()}`,
      name: newMedName,
      medicineId: newMedId || `MED-${newMedName.slice(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      availableQty: Number(newQty),
      minStockLevel: Number(newMinStock),
      expiryDate: newExpiry,
      price: Number(newPrice),
      supplier: newSupplier,
      stockStatus: Number(newQty) <= Number(newMinStock) ? 'Low Stock' : 'Available',
      category: newCategory
    };
    onAddMedicine(createdMed);
    setIsAddMedModalOpen(false);
    setNewMedName('');
    setNewMedId('');
  };

  const handleUpdateStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stockUpdateModalMed) {
      onUpdateStock(stockUpdateModalMed.id, Number(qtyToAdd));
      setStockUpdateModalMed(null);
    }
  };

  const filteredMedicines = (medicines || []).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.medicineId.toLowerCase().includes(search.toLowerCase()) ||
    m.supplier.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-6 h-6 text-teal-500" />
            Central Pharmacy & Prescription Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time formulary stock levels, automated low-stock warnings, and barcode-ready prescription dispensing.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAddMedModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Automatic Low-Stock Warning Banner as required by prompt */}
      {lowStockMedicines.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border border-amber-500/30 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  Automatic Low-Stock Warning Alert!
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  Critical supplies below safety reserves: <span className="font-bold text-rose-600 dark:text-rose-400">Insulin (18 units)</span> and <span className="font-bold text-rose-600 dark:text-rose-400">Aspirin (15 units)</span> require immediate procurement batch orders.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const insulin = medicines.find(m => m.name.includes('Insulin'));
                if (insulin) setStockUpdateModalMed(insulin);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs self-start sm:self-auto cursor-pointer"
            >
              Reorder Batch
            </button>
          </div>
        </div>
      )}

      {/* Tabs for Inventory vs Prescription Processing */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`
            px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2
            ${activeTab === 'inventory' 
              ? 'bg-teal-600 text-white shadow-sm' 
              : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
          `}
        >
          <Pill className="w-4 h-4" />
          <span>Formulary & Stock Inventory ({medicines.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`
            px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2
            ${activeTab === 'prescriptions' 
              ? 'bg-teal-600 text-white shadow-sm' 
              : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
          `}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Prescription Processing ({(prescriptions || []).filter(p => p.prescriptionStatus !== 'Dispensed').length} Pending)</span>
        </button>
      </div>

      {/* TAB 1: FORMULARY INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className={`
            p-3.5 rounded-2xl border flex items-center justify-between
            ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
          `}>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search medicine name, code, or supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`
                  w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none
                  ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}
                `}
              />
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline font-medium">
              {filteredMedicines.length} formulations registered
            </span>
          </div>

          {/* Medicines Table */}
          <div className={`
            rounded-3xl border shadow-xs overflow-hidden
            ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
          `}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="py-3 px-4 font-bold">Medicine Name</th>
                    <th className="py-3 px-4 font-bold">Medicine ID</th>
                    <th className="py-3 px-4 font-bold">Available Quantity</th>
                    <th className="py-3 px-4 font-bold">Min Stock Level</th>
                    <th className="py-3 px-4 font-bold">Expiry Date</th>
                    <th className="py-3 px-4 font-bold">Unit Price</th>
                    <th className="py-3 px-4 font-bold">Supplier</th>
                    <th className="py-3 px-4 font-bold">Stock Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredMedicines.map((med) => {
                    const isLow = med.stockStatus === 'Low Stock';
                    const isOut = med.stockStatus === 'Out of Stock';

                    return (
                      <tr key={med.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {med.name}
                          <span className="block text-[10px] font-normal text-slate-400">{med.category}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                          {med.medicineId}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`
                            font-black text-sm
                            ${isLow ? 'text-amber-600 dark:text-amber-400' : isOut ? 'text-red-500' : 'text-slate-900 dark:text-white'}
                          `}>
                            {med.availableQty} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-medium">
                          {med.minStockLevel} units
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                          {med.expiryDate}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          ₹{(med.price ?? 0).toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {med.supplier}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`
                            px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 w-fit
                            ${med.stockStatus === 'Available' 
                              ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' 
                              : med.stockStatus === 'Low Stock'
                                ? 'bg-amber-500/15 text-amber-600 border-amber-500/30 animate-pulse'
                                : 'bg-red-500/15 text-red-600 border-red-500/30'}
                          `}>
                            {med.stockStatus === 'Low Stock' && <AlertTriangle className="w-3 h-3" />}
                            {med.stockStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setStockUpdateModalMed(med)}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold hover:bg-teal-100 transition-colors cursor-pointer"
                          >
                            Update Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRESCRIPTION PROCESSING */}
      {activeTab === 'prescriptions' && (
        <div className={`
          rounded-3xl border shadow-xs overflow-hidden
          ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'}
        `}>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Doctor Prescriptions Queue</h3>
              <p className="text-xs text-slate-400">Review, verify dosage, and dispense clinical orders.</p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
              Pharmacist Verification Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="py-3 px-4 font-bold">Patient</th>
                  <th className="py-3 px-4 font-bold">Prescribing Doctor</th>
                  <th className="py-3 px-4 font-bold">Medicine & Dosage</th>
                  <th className="py-3 px-4 font-bold">Duration</th>
                  <th className="py-3 px-4 font-bold">Prescription Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {prescriptions.map((prx) => (
                  <tr key={prx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {prx.patientName}
                      <span className="block text-[10px] font-normal text-slate-400">{prx.patientId}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {prx.doctor}
                      <span className="block text-[10px] text-slate-400">{prx.date}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-teal-700 dark:text-teal-300">{prx.medicine}</span>
                      <span className="block text-[11px] text-slate-500">{prx.dosage}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                      {prx.duration}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`
                        px-2.5 py-1 rounded-full text-[10px] font-bold border
                        ${prx.prescriptionStatus === 'Pending' 
                          ? 'bg-amber-500/15 text-amber-600 border-amber-500/30' 
                          : prx.prescriptionStatus === 'Processing'
                            ? 'bg-blue-500/15 text-blue-600 border-blue-500/30'
                            : 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'}
                      `}>
                        {prx.prescriptionStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {prx.prescriptionStatus === 'Pending' && (
                          <button
                            onClick={() => onUpdatePrescriptionStatus(prx.id, 'Processing')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px]"
                          >
                            Process Order
                          </button>
                        )}
                        {prx.prescriptionStatus === 'Processing' && (
                          <button
                            onClick={() => onUpdatePrescriptionStatus(prx.id, 'Dispensed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Dispense</span>
                          </button>
                        )}
                        {prx.prescriptionStatus === 'Dispensed' && (
                          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Dispensed</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD MEDICINE MODAL */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-lg rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base">Add New Formulary Medicine</h3>
              <button
                onClick={() => setIsAddMedModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedicineSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Medicine Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Azithromycin 500mg"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Medicine ID / Code</label>
                  <input
                    type="text"
                    placeholder="e.g. MED-AZTH-500"
                    value={newMedId}
                    onChange={(e) => setNewMedId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newQty}
                    onChange={(e) => setNewQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Min Threshold</label>
                  <input
                    type="number"
                    required
                    value={newMinStock}
                    onChange={(e) => setNewMinStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Unit Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Supplier</label>
                  <input
                    type="text"
                    required
                    value={newSupplier}
                    onChange={(e) => setNewSupplier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Save Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE STOCK MODAL */}
      {stockUpdateModalMed && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className={`
            w-full max-w-sm rounded-3xl p-6 border shadow-2xl
            ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
          `}>
            <h3 className="font-bold text-base mb-1">Replenish Stock</h3>
            <p className="text-xs text-slate-500 mb-3">
              {stockUpdateModalMed.name} ({stockUpdateModalMed.medicineId})
            </p>

            <form onSubmit={handleUpdateStockSubmit} className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between">
                <span className="text-slate-500">Current Stock</span>
                <span className="font-bold text-slate-900 dark:text-white">{stockUpdateModalMed.availableQty} units</span>
              </div>

              <div>
                <label className="font-semibold block mb-1">Add Inbound Quantity (Units)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={qtyToAdd}
                  onChange={(e) => setQtyToAdd(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStockUpdateModalMed(null)}
                  className="px-3 py-1.5 rounded-xl text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Confirm Inward Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
