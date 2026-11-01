import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  PieChart,
  Clock,
  Briefcase,
  Palette,
  ListOrdered,
  ShieldAlert,
  MessageSquare,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import {
  EventPlan,
  BudgetBreakdown,
  TimelinePhase,
  VendorItem,
  RunOfShowItem,
  ContingencyPlan,
} from '../types';
import { formatCurrency } from '../services/budgetCalculator';
import { BudgetTab } from './BudgetTab';
import { TimelineTab } from './TimelineTab';
import { VendorTab } from './VendorTab';
import { CreativeTab } from './CreativeTab';
import { RunOfShowTab } from './RunOfShowTab';
import { ContingencyTab } from './ContingencyTab';
import { GenieChatTab } from './GenieChatTab';

interface PlanDashboardProps {
  plan: EventPlan;
  onUpdatePlan: (updatedPlan: EventPlan) => void;
  onBackToForm: () => void;
  onOpenExport: () => void;
}

type TabType =
  | 'budget'
  | 'timeline'
  | 'vendors'
  | 'creative'
  | 'runOfShow'
  | 'contingency'
  | 'copilot';

export const PlanDashboard: React.FC<PlanDashboardProps> = ({
  plan,
  onUpdatePlan,
  onBackToForm,
  onOpenExport,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('budget');

  const { preferences, budget, timeline, vendors, creative, runOfShow, contingency } = plan;

  const handleUpdateBudget = (newBudget: BudgetBreakdown) => {
    onUpdatePlan({ ...plan, budget: newBudget, lastUpdated: new Date().toISOString() });
  };

  const handleUpdateTimeline = (newTimeline: TimelinePhase[]) => {
    onUpdatePlan({ ...plan, timeline: newTimeline, lastUpdated: new Date().toISOString() });
  };

  const handleUpdateVendors = (newVendors: VendorItem[]) => {
    onUpdatePlan({ ...plan, vendors: newVendors, lastUpdated: new Date().toISOString() });
  };

  const handleUpdateRunOfShow = (newRunOfShow: RunOfShowItem[]) => {
    onUpdatePlan({ ...plan, runOfShow: newRunOfShow, lastUpdated: new Date().toISOString() });
  };

  const handleUpdateContingency = (newContingency: ContingencyPlan) => {
    onUpdatePlan({ ...plan, contingency: newContingency, lastUpdated: new Date().toISOString() });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToForm}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Edit Event Parameters</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">
            Last updated: {new Date(plan.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={onOpenExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Export Blueprint</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                {preferences.eventType}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Created {new Date(plan.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {preferences.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-purple-500 shrink-0" />
                {preferences.location}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-purple-500 shrink-0" />
                {preferences.date} ({preferences.durationHours} Hours)
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-purple-500 shrink-0" />
                {preferences.guestCount} Guests
              </span>
              <span className="flex items-center font-bold text-slate-900 dark:text-white">
                <DollarSign className="h-4 w-4 mr-0.5 text-emerald-500 shrink-0" />
                {formatCurrency(preferences.totalBudget, preferences.currency)} Total Budget
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 lg:max-w-xs space-y-1">
            <div className="flex items-center text-xs font-bold text-purple-700 dark:text-purple-300">
              <Sparkles className="h-4 w-4 mr-1 text-amber-500" />
              <span>Theme Identity</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {creative.themeName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic truncate">
              "{creative.tagline}"
            </p>
          </div>
        </div>

        {/* AI Narrative Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center">
            <Sparkles className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
            Executive Blueprint Strategy
          </p>
          <p className="whitespace-pre-line">{plan.aiSummary}</p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        <nav className="flex space-x-1 sm:space-x-2 pb-1">
          {[
            { id: 'budget', label: 'Smart Budget', icon: <PieChart className="h-4 w-4" />, badge: 'Deterministic' },
            { id: 'timeline', label: 'Preparation Timeline', icon: <Clock className="h-4 w-4" /> },
            { id: 'vendors', label: 'Vendor Matrix', icon: <Briefcase className="h-4 w-4" /> },
            { id: 'creative', label: 'Creative & Vibe', icon: <Palette className="h-4 w-4" /> },
            { id: 'runOfShow', label: 'Day-of Schedule', icon: <ListOrdered className="h-4 w-4" /> },
            { id: 'contingency', label: 'Contingency Playbook', icon: <ShieldAlert className="h-4 w-4" /> },
            { id: 'copilot', label: 'Genie Co-Pilot', icon: <MessageSquare className="h-4 w-4" />, badge: 'AI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Tab Panel */}
      <div className="mt-4">
        {activeTab === 'budget' && (
          <BudgetTab
            budget={budget}
            currency={preferences.currency}
            guestCount={preferences.guestCount}
            onUpdateBudget={handleUpdateBudget}
          />
        )}
        {activeTab === 'timeline' && (
          <TimelineTab timeline={timeline} onUpdateTimeline={handleUpdateTimeline} />
        )}
        {activeTab === 'vendors' && (
          <VendorTab
            vendors={vendors}
            currency={preferences.currency}
            onUpdateVendors={handleUpdateVendors}
          />
        )}
        {activeTab === 'creative' && (
          <CreativeTab creative={creative} eventTitle={preferences.title} />
        )}
        {activeTab === 'runOfShow' && (
          <RunOfShowTab runOfShow={runOfShow} onUpdateRunOfShow={handleUpdateRunOfShow} />
        )}
        {activeTab === 'contingency' && (
          <ContingencyTab
            contingency={contingency}
            onUpdateContingency={handleUpdateContingency}
          />
        )}
        {activeTab === 'copilot' && (
          <GenieChatTab plan={plan} onUpdatePlan={onUpdatePlan} />
        )}
      </div>
    </div>
  );
};

