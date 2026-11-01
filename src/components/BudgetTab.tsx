import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Users,
  Plus,
  Trash2,
  Building,
  Utensils,
  Camera,
  Sparkles,
  Music,
  Shirt,
  Cake,
  Radio,
  Award,
  Smile,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { BudgetBreakdown, BudgetCategory, CurrencyCode } from '../types';
import { formatCurrency } from '../services/budgetCalculator';

interface BudgetTabProps {
  budget: BudgetBreakdown;
  currency: CurrencyCode;
  guestCount: number;
  onUpdateBudget: (newBudget: BudgetBreakdown) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Building: <Building className="h-5 w-5" />,
  Utensils: <Utensils className="h-5 w-5" />,
  Camera: <Camera className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Music: <Music className="h-5 w-5" />,
  Shirt: <Shirt className="h-5 w-5" />,
  Cake: <Cake className="h-5 w-5" />,
  Radio: <Radio className="h-5 w-5" />,
  Award: <Award className="h-5 w-5" />,
  Smile: <Smile className="h-5 w-5" />,
};

export const BudgetTab: React.FC<BudgetTabProps> = ({
  budget,
  currency,
  guestCount,
  onUpdateBudget,
}) => {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newSubItemName, setNewSubItemName] = useState('');
  const [newSubItemCost, setNewSubItemCost] = useState('');

  // Recompute allocations programmatically when a category percentage is changed
  const handlePercentageChange = (categoryId: string, newPercentage: number) => {
    const updatedCategories = budget.categories.map((cat) => {
      if (cat.id === categoryId) {
        const pct = Math.max(0, Math.min(100, newPercentage));
        const allocatedAmount = Math.round((budget.totalBudget * (pct / 100)) * 100) / 100;
        return { ...cat, percentage: pct, allocatedAmount };
      }
      return cat;
    });

    const allocatedTotal = updatedCategories.reduce((sum, c) => sum + c.allocatedAmount, 0);
    const contingencyAmount = Math.max(0, Math.round((budget.totalBudget - allocatedTotal) * 100) / 100);
    const contingencyPercentage = budget.totalBudget > 0
      ? Math.max(0, Math.round((contingencyAmount / budget.totalBudget) * 100))
      : 0;
    const remainingBuffer = Math.round((budget.totalBudget - allocatedTotal - contingencyAmount) * 100) / 100;

    onUpdateBudget({
      ...budget,
      categories: updatedCategories,
      allocatedTotal,
      contingencyAmount,
      contingencyPercentage,
      remainingBuffer,
    });
  };

  // Update actual spent for a category
  const handleActualSpentChange = (categoryId: string, spent: number) => {
    const updatedCategories = budget.categories.map((c) =>
      c.id === categoryId ? { ...c, actualSpent: Math.max(0, spent) } : c
    );
    const actualTotalSpent = updatedCategories.reduce((sum, c) => sum + c.actualSpent, 0);
    onUpdateBudget({
      ...budget,
      categories: updatedCategories,
      actualTotalSpent,
    });
  };

  // Add sub-item to a category
  const handleAddSubItem = (categoryId: string) => {
    if (!newSubItemName.trim()) return;
    const cost = parseFloat(newSubItemCost) || 0;

    const updatedCategories = budget.categories.map((c) => {
      if (c.id === categoryId) {
        return {
          ...c,
          subItems: [
            ...c.subItems,
            {
              id: `${categoryId}_sub_${Date.now()}`,
              name: newSubItemName.trim(),
              estimatedCost: cost,
              actualCost: 0,
            },
          ],
        };
      }
      return c;
    });

    onUpdateBudget({
      ...budget,
      categories: updatedCategories,
    });

    setNewSubItemName('');
    setNewSubItemCost('');
  };

  // Remove sub-item
  const handleRemoveSubItem = (categoryId: string, subItemId: string) => {
    const updatedCategories = budget.categories.map((c) => {
      if (c.id === categoryId) {
        return {
          ...c,
          subItems: c.subItems.filter((s) => s.id !== subItemId),
        };
      }
      return c;
    });

    onUpdateBudget({
      ...budget,
      categories: updatedCategories,
    });
  };

  const isOverBudget = budget.allocatedTotal > budget.totalBudget;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Programmatic Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            <span>Total Budget</span>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(budget.totalBudget, currency)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
            <span className="font-semibold text-purple-600 dark:text-purple-400">100% Target Cap</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            <span>Allocated Sum</span>
            <Sparkles className="h-4 w-4 text-indigo-500" />
          </div>
          <div
            className={`text-2xl font-extrabold ${
              isOverBudget ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
            }`}
          >
            {formatCurrency(budget.allocatedTotal, currency)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {Math.round((budget.allocatedTotal / (budget.totalBudget || 1)) * 100)}% of total allocated
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            <span>Contingency Buffer</span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(budget.contingencyAmount, currency)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {budget.contingencyPercentage}% reserved for surges
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            <span>Cost Per Guest</span>
            <Users className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(budget.costPerGuest, currency)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Across {guestCount} attendees
          </div>
        </div>
      </div>

      {/* Over-budget Warning */}
      {isOverBudget && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center space-x-3 text-rose-800 dark:text-rose-200 text-sm">
          <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <p>
            <strong>Budget Exceeded:</strong> Total allocated exceeds the target budget by{' '}
            <span className="font-bold">
              {formatCurrency(budget.allocatedTotal - budget.totalBudget, currency)}
            </span>
            . Adjust category percentage sliders below to balance.
          </p>
        </div>
      )}

      {/* Visual Allocation Stack Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200">
          <span>Programmatic Allocation Distribution</span>
          <span className="text-xs font-normal text-slate-500">
            Computed with exact financial float rounding
          </span>
        </div>
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex shadow-inner">
          {budget.categories.map((c, i) => {
            const colors = [
              'bg-purple-500',
              'bg-indigo-500',
              'bg-blue-500',
              'bg-pink-500',
              'bg-amber-500',
              'bg-teal-500',
            ];
            const color = colors[i % colors.length];
            return (
              <div
                key={c.id}
                style={{ width: `${Math.min(100, c.percentage)}%` }}
                className={`${color} h-full transition-all duration-300 relative group cursor-pointer`}
                title={`${c.name}: ${c.percentage}% (${formatCurrency(c.allocatedAmount, currency)})`}
              />
            );
          })}
          {budget.contingencyPercentage > 0 && (
            <div
              style={{ width: `${budget.contingencyPercentage}%` }}
              className="bg-emerald-500 h-full transition-all duration-300"
              title={`Contingency: ${budget.contingencyPercentage}% (${formatCurrency(budget.contingencyAmount, currency)})`}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-3 pt-1 text-xs">
          {budget.categories.map((c, i) => {
            const dots = [
              'bg-purple-500',
              'bg-indigo-500',
              'bg-blue-500',
              'bg-pink-500',
              'bg-amber-500',
              'bg-teal-500',
            ];
            return (
              <div key={c.id} className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                <span className={`h-2.5 w-2.5 rounded-full ${dots[i % dots.length]}`} />
                <span>
                  {c.name} ({c.percentage}%)
                </span>
              </div>
            );
          })}
          {budget.contingencyPercentage > 0 && (
            <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>Contingency ({budget.contingencyPercentage}%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Programmatic Category Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Expense Categories & Dynamic Adjustments
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Adjust sliders to reallocate funds in real-time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budget.categories.map((cat) => {
            const isEditing = editingCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-purple-300 dark:hover:border-purple-800/60 transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                      {ICON_MAP[cat.iconName] || <Sparkles className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(cat.allocatedAmount, currency)}
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>

                {/* Percentage Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Allocation Ratio</span>
                    <span>{cat.percentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={cat.percentage}
                    onChange={(e) => handlePercentageChange(cat.id, parseInt(e.target.value) || 0)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                {/* Actual Spend Input */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Actual Spent:</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-400">{currency}</span>
                    <input
                      type="number"
                      min="0"
                      value={cat.actualSpent || ''}
                      placeholder="0.00"
                      onChange={(e) => handleActualSpentChange(cat.id, parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-right text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Sub-Items Toggle */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Sub-Category Items ({cat.subItems.length})
                    </span>
                    <button
                      onClick={() => setEditingCategoryId(isEditing ? null : cat.id)}
                      className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                    >
                      {isEditing ? 'Done' : '+ Add Item'}
                    </button>
                  </div>

                  {/* Sub-item List */}
                  <div className="space-y-1.5">
                    {cat.subItems.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <span className="truncate pr-2">{sub.name}</span>
                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="font-semibold">
                            {formatCurrency(sub.estimatedCost, currency)}
                          </span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveSubItem(cat.id, sub.id)}
                              className="text-rose-500 hover:text-rose-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sub-item Add Form */}
                  {isEditing && (
                    <div className="mt-2 pt-2 flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Item name (e.g. DJ Lighting)"
                        value={newSubItemName}
                        onChange={(e) => setNewSubItemName(e.target.value)}
                        className="flex-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Cost"
                        value={newSubItemCost}
                        onChange={(e) => setNewSubItemCost(e.target.value)}
                        className="w-20 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={() => handleAddSubItem(cat.id)}
                        className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Programmatic Cost Saving Optimizations */}
      {budget.costSavingTips.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/80 dark:from-purple-950/20 dark:via-slate-800/80 dark:to-indigo-950/20 border border-purple-200/80 dark:border-purple-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Programmatic Cost-Saving Opportunities
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calculated financial optimizations tailored to your budget size
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
              Total Potential Savings:{' '}
              {formatCurrency(
                budget.costSavingTips.reduce((sum, t) => sum + t.potentialSavings, 0),
                currency
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {budget.costSavingTips.map((tip) => (
              <div
                key={tip.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 hover:border-purple-300 dark:hover:border-purple-800 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {tip.title}
                  </h4>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded shrink-0">
                    Save ~{formatCurrency(tip.potentialSavings, currency)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tip.suggestion}
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span>Category: {tip.category}</span>
                  <span className="capitalize px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                    {tip.difficulty} to execute
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

