import React from 'react';
import {
  Sparkles,
  Key,
  FolderOpen,
  PlusCircle,
  Share2,
  Moon,
  Sun,
  ShieldCheck,
} from 'lucide-react';
import { EventPlan } from '../types';

interface NavbarProps {
  currentPlan: EventPlan | null;
  onNewPlan: () => void;
  onOpenSavedPlans: () => void;
  onOpenApiKeyModal: () => void;
  onOpenExportModal: () => void;
  hasApiKey: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPlan,
  onNewPlan,
  onOpenSavedPlans,
  onOpenApiKeyModal,
  onOpenExportModal,
  hasApiKey,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onNewPlan}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25 text-white">
            <Sparkles className="h-5 w-5 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
                EventGenie
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                AI 2.5
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Intelligent Event & Budget Architecture
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Saved Plans */}
          <button
            onClick={onOpenSavedPlans}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            title="Saved Event Plans"
          >
            <FolderOpen className="h-4 w-4" />
            <span className="hidden md:inline">Plans</span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${
              hasApiKey
                ? 'border-emerald-300 bg-emerald-50/80 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-purple-200 bg-purple-50/80 text-purple-700 dark:border-purple-800/60 dark:bg-purple-950/40 dark:text-purple-300'
            }`}
            title="Configure Gemini API Key"
          >
            {hasApiKey ? <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <Key className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
            <span className="hidden sm:inline">
              {hasApiKey ? 'Gemini Live' : 'API Key'}
            </span>
          </button>

          {/* Export Plan (enabled if plan exists) */}
          {currentPlan && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition"
              title="Export Master Plan"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">Export</span>
            </button>
          )}

          {/* New Event Plan */}
          <button
            onClick={onNewPlan}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 transition active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Plan</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

