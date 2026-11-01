import React, { useState } from 'react';
import {
  ShieldAlert,
  CloudRain,
  Radio,
  Users,
  AlertOctagon,
  HeartPulse,
  Save,
  Check,
} from 'lucide-react';
import { ContingencyPlan } from '../types';

interface ContingencyTabProps {
  contingency: ContingencyPlan;
  onUpdateContingency: (newContingency: ContingencyPlan) => void;
}

export const ContingencyTab: React.FC<ContingencyTabProps> = ({
  contingency,
  onUpdateContingency,
}) => {
  const [formData, setFormData] = useState<ContingencyPlan>(contingency);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContingency(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Risk Management & Contingency Playbook</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              Active Protocol
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pre-planned operational fallbacks so unexpected hurdles never disrupt the live event
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition active:scale-95"
        >
          {savedSuccess ? (
            <>
              <Check className="h-4 w-4" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Playbook</span>
            </>
          )}
        </button>
      </div>

      {/* Contingency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Weather Fallback */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <CloudRain className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Adverse Weather & Outdoor Contingency
              </h4>
              <p className="text-xs text-slate-400">Rain plan, heat waves, tenting triggers</p>
            </div>
          </div>
          <textarea
            rows={3}
            value={formData.weatherFallback}
            onChange={(e) => setFormData({ ...formData, weatherFallback: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
          />
        </div>

        {/* Technical AV Backup */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Technical Audio/Visual & Power Redundancy
              </h4>
              <p className="text-xs text-slate-400">Backup laptops, microphones, power generators</p>
            </div>
          </div>
          <textarea
            rows={3}
            value={formData.technicalAVBackup}
            onChange={(e) => setFormData({ ...formData, technicalAVBackup: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
          />
        </div>

        {/* Guest Surge / Overflow */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Guest Headcount Surge & Overflow
              </h4>
              <p className="text-xs text-slate-400">Extra meals buffer, overflow seating, parking</p>
            </div>
          </div>
          <textarea
            rows={3}
            value={formData.guestSurgePlan}
            onChange={(e) => setFormData({ ...formData, guestSurgePlan: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
          />
        </div>

        {/* Vendor Cancellation Emergency */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Last-Minute Vendor No-Show / Cancellation
              </h4>
              <p className="text-xs text-slate-400">Standby contacts, contract penalty enforcement</p>
            </div>
          </div>
          <textarea
            rows={3}
            value={formData.vendorCancellationPlan}
            onChange={(e) => setFormData({ ...formData, vendorCancellationPlan: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
          />
        </div>

        {/* Health & Safety Protocols */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Health, Safety & Medical Readiness
              </h4>
              <p className="text-xs text-slate-400">First-aid station, emergency exits, allergen protocols</p>
            </div>
          </div>
          <textarea
            rows={2}
            value={formData.healthSafetyProtocols}
            onChange={(e) => setFormData({ ...formData, healthSafetyProtocols: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
};

