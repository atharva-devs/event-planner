import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TimelinePhase, TimelineItem } from '../types';

interface TimelineTabProps {
  timeline: TimelinePhase[];
  onUpdateTimeline: (newTimeline: TimelinePhase[]) => void;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({ timeline, onUpdateTimeline }) => {
  const [addingToPhaseId, setAddingToPhaseId] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Logistics');
  const [newTaskPriority, setNewTaskPriority] = useState<'critical' | 'high' | 'medium' | 'low'>('high');

  // Calculate overall completion statistics
  const allItems = timeline.flatMap((p) => p.items);
  const completedCount = allItems.filter((i) => i.completed).length;
  const totalCount = allItems.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleTask = (phaseId: string, taskId: string) => {
    const updated = timeline.map((phase) => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          items: phase.items.map((item) => {
            if (item.id === taskId) {
              const nextCompleted = !item.completed;
              if (nextCompleted) {
                confetti({
                  particleCount: 35,
                  spread: 60,
                  origin: { y: 0.7 },
                });
              }
              return { ...item, completed: nextCompleted };
            }
            return item;
          }),
        };
      }
      return phase;
    });

    onUpdateTimeline(updated);
  };

  const handleAddTask = (phaseId: string) => {
    if (!newTaskName.trim()) return;

    const newItem: TimelineItem = {
      id: `task_${Date.now()}`,
      task: newTaskName.trim(),
      category: newTaskCategory,
      completed: false,
      priority: newTaskPriority,
      deadlineNotes: 'Added to master schedule',
    };

    const updated = timeline.map((p) =>
      p.id === phaseId ? { ...p, items: [...p.items, newItem] } : p
    );

    onUpdateTimeline(updated);
    setNewTaskName('');
    setAddingToPhaseId(null);
  };

  const handleDeleteTask = (phaseId: string, taskId: string) => {
    const updated = timeline.map((p) =>
      p.id === phaseId ? { ...p, items: p.items.filter((i) => i.id !== taskId) } : p
    );
    onUpdateTimeline(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Completion Metric */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Milestone Preparation Timeline</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              {completedCount} of {totalCount} Completed
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Countdowns and operational deadlines prioritized for zero last-minute panic
          </p>
        </div>

        {/* Circular / Linear Progress Meter */}
        <div className="flex items-center space-x-3 sm:w-64">
          <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
            <div
              style={{ width: `${completionPercentage}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
            />
          </div>
          <span className="text-sm font-extrabold text-purple-600 dark:text-purple-400 w-10 text-right">
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Phased Timeline Cards */}
      <div className="space-y-6">
        {timeline.map((phase, pIndex) => (
          <div
            key={phase.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Phase Title & Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                  {pIndex + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {phase.phaseName}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Target Window: {phase.timeOffset}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setAddingToPhaseId(addingToPhaseId === phase.id ? null : phase.id)}
                className="flex items-center space-x-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Task Items */}
            <div className="space-y-2">
              {phase.items.map((item) => {
                const priorityStyles = {
                  critical: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
                  high: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
                  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
                  low: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
                };

                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleTask(phase.id, item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      item.completed
                        ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 opacity-60'
                        : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <button
                        type="button"
                        className="text-purple-600 dark:text-purple-400 shrink-0"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/40" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${
                            item.completed
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {item.task}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                          <span className="font-medium text-slate-500 dark:text-slate-400">
                            {item.category}
                          </span>
                          <span>•</span>
                          <span>{item.deadlineNotes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          priorityStyles[item.priority]
                        }`}
                      >
                        {item.priority}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(phase.id, item.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inline Add Task Form */}
            {addingToPhaseId === phase.id && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Task title (e.g. Schedule cake tasting)"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Category (e.g. Catering)"
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleAddTask(phase.id)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition"
                >
                  Save Task
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

