import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, FileText, Code } from 'lucide-react';
import { EventPlan } from '../types';
import { exportPlanAsMarkdown } from '../services/storageService';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: EventPlan;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, plan }) => {
  const [copiedType, setCopiedType] = useState<'md' | 'json' | null>(null);

  if (!isOpen) return null;

  const mdContent = exportPlanAsMarkdown(plan);
  const jsonContent = JSON.stringify(plan, null, 2);

  const handleCopy = (content: string, type: 'md' | 'json') => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Export Event Blueprint
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Download or share "{plan.preferences.title}" with clients, vendors, and stakeholders.
          </p>
        </div>

        <div className="space-y-3">
          {/* Print / Save PDF */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Printer className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Print or Save as PDF
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Formatted for crisp physical handouts or PDF archiving
                </p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition"
            >
              Print / PDF
            </button>
          </div>

          {/* Markdown File */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Markdown (.md)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Perfect for Notion, Obsidian, GitHub, or email briefs
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopy(mdContent, 'md')}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs transition"
                title="Copy Markdown"
              >
                {copiedType === 'md' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    mdContent,
                    `${plan.preferences.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_blueprint.md`,
                    'text/markdown'
                  )
                }
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition"
                title="Download Markdown"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* JSON Data */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Code className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  JSON Data Package
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Machine-readable data for backup, import, or API sync
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopy(jsonContent, 'json')}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs transition"
                title="Copy JSON"
              >
                {copiedType === 'json' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    jsonContent,
                    `${plan.preferences.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_data.json`,
                    'application/json'
                  )
                }
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                title="Download JSON"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

