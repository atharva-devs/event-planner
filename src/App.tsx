import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EventPlan, EventPreferences } from './types';
import { generateEventPlan, getStoredApiKey } from './services/geminiService';
import {
  loadCurrentPlan,
  saveCurrentPlan,
  loadAllPlans,
  deletePlan,
} from './services/storageService';
import { Navbar } from './components/Navbar';
import { EventForm } from './components/EventForm';
import { PlanDashboard } from './components/PlanDashboard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SavedPlansModal } from './components/SavedPlansModal';
import { ExportModal } from './components/ExportModal';

export const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<EventPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<EventPlan[]>([]);
  const [view, setView] = useState<'form' | 'dashboard'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isSavedPlansModalOpen, setIsSavedPlansModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load stored key
    const key = getStoredApiKey();
    setApiKey(key);

    // Load saved plans
    const all = loadAllPlans();
    setSavedPlans(all);

    // Load current plan if exists
    const current = loadCurrentPlan();
    if (current) {
      setCurrentPlan(current);
      setView('dashboard');
    }

    // Check system dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleGeneratePlan = async (prefs: EventPreferences) => {
    setIsLoading(true);
    try {
      const plan = await generateEventPlan(prefs, apiKey);
      setCurrentPlan(plan);
      saveCurrentPlan(plan);
      setSavedPlans(loadAllPlans());
      setView('dashboard');

      // Celebration confetti
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('Failed to generate event plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePlan = (updated: EventPlan) => {
    setCurrentPlan(updated);
    saveCurrentPlan(updated);
    setSavedPlans(loadAllPlans());
  };

  const handleSelectPlan = (plan: EventPlan) => {
    setCurrentPlan(plan);
    saveCurrentPlan(plan);
    setView('dashboard');
  };

  const handleDeletePlan = (id: string) => {
    deletePlan(id);
    const updated = loadAllPlans();
    setSavedPlans(updated);
    if (currentPlan?.id === id) {
      setCurrentPlan(null);
      setView('form');
    }
  };

  const handleNewPlan = () => {
    setView('form');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        currentPlan={currentPlan}
        onNewPlan={handleNewPlan}
        onOpenSavedPlans={() => setIsSavedPlansModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {view === 'form' ? (
          <EventForm
            initialValues={currentPlan?.preferences}
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
          />
        ) : (
          currentPlan && (
            <PlanDashboard
              plan={currentPlan}
              onUpdatePlan={handleUpdatePlan}
              onBackToForm={() => setView('form')}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              EventGenie AI
            </span>
            <span>•</span>
            <span>GenAI-Powered Intelligent Event & Budget Architecture</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Deterministic Financial Math + Google Gemini Flash</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={apiKey}
        onKeySaved={(newKey) => setApiKey(newKey)}
      />

      <SavedPlansModal
        isOpen={isSavedPlansModalOpen}
        onClose={() => setIsSavedPlansModalOpen(false)}
        savedPlans={savedPlans}
        onSelectPlan={handleSelectPlan}
        onDeletePlan={handleDeletePlan}
      />

      {currentPlan && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          plan={currentPlan}
        />
      )}
    </div>
  );
};

export default App;

