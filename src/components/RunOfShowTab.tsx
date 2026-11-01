import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  UserCheck,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { RunOfShowItem } from '../types';

interface RunOfShowTabProps {
  runOfShow: RunOfShowItem[];
  onUpdateRunOfShow: (newRunOfShow: RunOfShowItem[]) => void;
}

export const RunOfShowTab: React.FC<RunOfShowTabProps> = ({
  runOfShow,
  onUpdateRunOfShow,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTime, setNewTime] = useState('18:00');
  const [newActivity, setNewActivity] = useState('');
  const [newLead, setNewLead] = useState('');
  const [newLocation, setNewLocation] = useState('Main Space');
  const [newNotes, setNewNotes] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    const newItem: RunOfShowItem = {
      id: `ros_${Date.now()}`,
      time: newTime.trim() || '12:00',
      activity: newActivity.trim(),
      leadPerson: newLead.trim() || 'Event Lead',
      location: newLocation.trim() || 'Main Stage',
      notes: newNotes.trim() || 'Coordinate cues with tech lead',
    };

    onUpdateRunOfShow([...runOfShow, newItem]);
    setNewActivity('');
    setNewLead('');
    setNewNotes('');
    setIsAdding(false);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateRunOfShow(runOfShow.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Day-of Master Run-of-Show</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              {runOfShow.length} Operational Cues
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hour-by-hour execution schedule for the MC, venue coordinator, DJ, and caterer
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Add Schedule Cue</span>
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form
          onSubmit={handleAddItem}
          className="p-5 rounded-2xl bg-gradient-to-r from-purple-50/60 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 border border-purple-200 dark:border-purple-800/60 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Add Execution Cue
            </h4>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Time (e.g. 17:30 or T+1:00)
              </label>
              <input
                type="text"
                placeholder="17:30"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Activity / Cue Description
              </label>
              <input
                type="text"
                placeholder="e.g. Champagne Toast & Sponsor Acknowledgement"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Lead Person / MC
              </label>
              <input
                type="text"
                placeholder="Lead MC / Host"
                value={newLead}
                onChange={(e) => setNewLead(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Main Stage"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Technical Notes & Stage Cues
              </label>
              <input
                type="text"
                placeholder="Dim lights 50%, spotlight center stage, hand mic to speaker"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition"
            >
              Insert Schedule Cue
            </button>
          </div>
        </form>
      )}

      {/* Timeline Cue List */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-indigo-500">
        {runOfShow.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 top-3 h-5 w-5 rounded-full border-2 border-purple-500 bg-white dark:bg-slate-900 group-hover:scale-125 transition-transform flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-purple-600" />
            </div>

            {/* Content card */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-800/60 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                    {item.time}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.activity}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <UserCheck className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    Lead: {item.leadPerson}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    {item.location}
                  </span>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                    Cues: {item.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                  title="Delete cue"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

