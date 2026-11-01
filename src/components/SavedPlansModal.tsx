import React from 'react';
import { X, Trash2, Calendar, MapPin, Users, DollarSign, ArrowRight } from 'lucide-react';
import { EventPlan } from '../types';
import { formatCurrency } from '../services/budgetCalculator';

interface SavedPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: EventPlan[];
  onSelectPlan: (plan: EventPlan) => void;
  onDeletePlan: (id: string) => void;
}

export const SavedPlansModal: React.FC<SavedPlansModalProps> = ({
  isOpen,
  onClose,
  savedPlans,
  onSelectPlan,
  onDeletePlan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Saved Event Blueprints
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Switch between, review, or manage your planned events
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List of plans */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {savedPlans.length === 0 ? (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="font-semibold text-slate-600 dark:text-slate-400">
                No saved event plans yet
              </p>
              <p className="text-xs mt-1">
                Create a new plan or load one of the demo presets to get started!
              </p>
            </div>
          ) : (
            savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="group relative p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-purple-300 dark:hover:border-purple-800 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                      {plan.preferences.eventType}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">
                      {plan.preferences.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {plan.preferences.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {plan.preferences.guestCount} guests
                    </span>
                    <span className="flex items-center font-semibold text-slate-700 dark:text-slate-300">
                      <DollarSign className="h-3.5 w-3.5 mr-0.5 text-purple-500" />
                      {formatCurrency(plan.budget.totalBudget, plan.preferences.currency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelectPlan(plan);
                      onClose();
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition active:scale-95"
                  >
                    <span>Open Plan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete plan "${plan.preferences.title}"?`)) {
                        onDeletePlan(plan.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Delete plan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

