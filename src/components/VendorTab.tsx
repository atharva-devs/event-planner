import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Plus,
  Trash2,
  DollarSign,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { VendorItem, VendorStatus, CurrencyCode } from '../types';
import { formatCurrency } from '../services/budgetCalculator';

interface VendorTabProps {
  vendors: VendorItem[];
  currency: CurrencyCode;
  onUpdateVendors: (newVendors: VendorItem[]) => void;
}

const STATUS_CONFIG: Record<
  VendorStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  researching: {
    label: 'Researching',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-700',
  },
  contacted: {
    label: 'Contacted',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  negotiating: {
    label: 'Negotiating',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
  booked: {
    label: 'Contract Booked',
    bg: 'bg-purple-50 dark:bg-purple-950/50',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
  paid: {
    label: 'Deposit Paid',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
};

export const VendorTab: React.FC<VendorTabProps> = ({
  vendors,
  currency,
  onUpdateVendors,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New vendor form state
  const [newCategory, setNewCategory] = useState('Venue');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleStatusChange = (id: string, newStatus: VendorStatus) => {
    const updated = vendors.map((v) => (v.id === id ? { ...v, status: newStatus } : v));
    onUpdateVendors(updated);
  };

  const handleDeleteVendor = (id: string) => {
    onUpdateVendors(vendors.filter((v) => v.id !== id));
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newVendor: VendorItem = {
      id: `vendor_${Date.now()}`,
      category: newCategory,
      name: newName.trim(),
      role: newRole.trim() || `${newCategory} Specialist`,
      estimatedCost: parseFloat(newCost) || 0,
      status: 'researching',
      contactInfo: newContact.trim() || 'Pending verification',
      notes: newNotes.trim() || 'Added to vendor matrix',
    };

    onUpdateVendors([...vendors, newVendor]);
    setNewName('');
    setNewRole('');
    setNewCost('');
    setNewContact('');
    setNewNotes('');
    setIsAdding(false);
  };

  const filteredVendors =
    filterStatus === 'all'
      ? vendors
      : vendors.filter((v) => v.status === filterStatus);

  const totalCommitted = vendors
    .filter((v) => v.status === 'booked' || v.status === 'paid')
    .reduce((sum, v) => sum + v.estimatedCost, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Vendor Status Metrics */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Vendor Procurement Matrix</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              {vendors.length} Partners
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track status, quotes, agreements, and deliverables across all production departments
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Committed Contracts</span>
            <span className="text-base font-extrabold text-purple-600 dark:text-purple-400">
              {formatCurrency(totalCommitted, currency)}
            </span>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Vendor</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filterStatus === 'all'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          All ({vendors.length})
        </button>
        {(['researching', 'contacted', 'negotiating', 'booked', 'paid'] as VendorStatus[]).map((st) => {
          const count = vendors.filter((v) => v.status === st).length;
          const config = STATUS_CONFIG[st];
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                filterStatus === st
                  ? `${config.bg} ${config.text} ${config.border} ring-2 ring-purple-500/30`
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Add Vendor Form */}
      {isAdding && (
        <form
          onSubmit={handleAddVendor}
          className="p-5 rounded-2xl bg-gradient-to-r from-purple-50/60 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 border border-purple-200 dark:border-purple-800/60 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Add New Vendor / Contractor
            </h4>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Venue & Staging">Venue & Staging</option>
                <option value="Catering & Bar">Catering & Bar</option>
                <option value="Photography & Cinema">Photography & Cinema</option>
                <option value="Sound, DJ & Music">Sound, DJ & Music</option>
                <option value="Decor & Florals">Decor & Florals</option>
                <option value="Hair & Makeup / Attire">Hair & Makeup / Attire</option>
                <option value="Stationery & Digital">Stationery & Digital</option>
                <option value="Logistics & Security">Logistics & Security</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Company / Vendor Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Sound Productions"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Estimated Cost ({currency})
              </label>
              <input
                type="number"
                placeholder="0"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Specific Role / Deliverable
              </label>
              <input
                type="text"
                placeholder="e.g. 6-hour DJ set + lighting"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Contact Info / Website
              </label>
              <input
                type="text"
                placeholder="email@vendor.com or phone"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Key Notes / Inclusions
              </label>
              <input
                type="text"
                placeholder="Deposit terms, power needs..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow transition"
            >
              Add to Matrix
            </button>
          </div>
        </form>
      )}

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVendors.map((vendor) => {
          const config = STATUS_CONFIG[vendor.status] || STATUS_CONFIG.researching;

          return (
            <div
              key={vendor.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-purple-300 dark:hover:border-purple-800 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    {vendor.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {vendor.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {vendor.role}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">
                    {formatCurrency(vendor.estimatedCost, currency)}
                  </span>
                  <div className="text-[10px] text-slate-400">Target allocation</div>
                </div>
              </div>

              {/* Contact & Notes */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 space-y-1 text-xs">
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-400 shrink-0" />
                  <span className="truncate">{vendor.contactInfo}</span>
                </div>
                {vendor.notes && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-0.5">
                    "{vendor.notes}"
                  </p>
                )}
              </div>

              {/* Status Switcher & Delete */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] text-slate-400">Status:</span>
                  <select
                    value={vendor.status}
                    onChange={(e) => handleStatusChange(vendor.id, e.target.value as VendorStatus)}
                    className={`text-xs font-semibold px-2 py-1 rounded-md border ${config.bg} ${config.text} ${config.border} focus:outline-none cursor-pointer`}
                  >
                    <option value="researching">Researching</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiating">Negotiating</option>
                    <option value="booked">Booked</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDeleteVendor(vendor.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                  title="Remove vendor"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

