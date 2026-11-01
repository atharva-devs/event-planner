import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Heart,
  Cake,
  GraduationCap,
  Briefcase,
  Trees,
  Wine,
  HelpCircle,
  Loader2,
  Clock,
} from 'lucide-react';
import { EventPreferences, EventType, CurrencyCode } from '../types';
import { DEMO_PRESETS } from '../data/presets';

interface EventFormProps {
  initialValues?: EventPreferences | null;
  onSubmit: (prefs: EventPreferences) => void;
  isLoading: boolean;
}

const EVENT_TYPE_OPTIONS: { type: EventType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    type: 'wedding',
    label: 'Wedding',
    icon: <Heart className="h-5 w-5 text-pink-500" />,
    desc: 'Ceremony, reception, florals, seating & catering',
  },
  {
    type: 'birthday',
    label: 'Birthday Party',
    icon: <Cake className="h-5 w-5 text-purple-500" />,
    desc: 'Milestone bashes, custom cakes, games & DJ',
  },
  {
    type: 'college',
    label: 'College Event',
    icon: <GraduationCap className="h-5 w-5 text-indigo-500" />,
    desc: 'Hackathons, symposiums, fests & guest lectures',
  },
  {
    type: 'corporate',
    label: 'Corporate Summit',
    icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    desc: 'Conferences, networking dinners & product launches',
  },
  {
    type: 'community',
    label: 'Community Fair',
    icon: <Trees className="h-5 w-5 text-emerald-500" />,
    desc: 'Festivals, charity runs, block parties & picnics',
  },
  {
    type: 'anniversary',
    label: 'Anniversary',
    icon: <Wine className="h-5 w-5 text-amber-500" />,
    desc: 'Silver/golden jubilees & celebratory dinners',
  },
];

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Halal',
  'Kosher',
  'Nut-Free',
  'Dairy-Free',
];

const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'USD', label: 'USD ($)', symbol: '$' },
  { code: 'INR', label: 'INR (₹)', symbol: '₹' },
  { code: 'EUR', label: 'EUR (€)', symbol: '€' },
  { code: 'GBP', label: 'GBP (£)', symbol: '£' },
  { code: 'CAD', label: 'CAD ($)', symbol: 'CA$' },
  { code: 'AUD', label: 'AUD ($)', symbol: 'A$' },
];

export const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
}) => {
  const [eventType, setEventType] = useState<EventType>(initialValues?.eventType || 'wedding');
  const [title, setTitle] = useState(initialValues?.title || 'Liam & Sophia’s Tuscan Vineyard Wedding');
  const [location, setLocation] = useState(initialValues?.location || 'Napa Valley, CA');
  const [date, setDate] = useState(initialValues?.date || '2026-09-18');
  const [durationHours, setDurationHours] = useState(initialValues?.durationHours || 7);
  const [guestCount, setGuestCount] = useState(initialValues?.guestCount || 120);
  const [totalBudget, setTotalBudget] = useState(initialValues?.totalBudget || 32000);
  const [currency, setCurrency] = useState<CurrencyCode>(initialValues?.currency || 'USD');
  const [theme, setTheme] = useState(initialValues?.theme || 'Tuscan Garden & Romantic Candlelight');
  const [vibe, setVibe] = useState(initialValues?.vibe || 'Warm, elegant, floral, intimate');
  const [dietary, setDietary] = useState<string[]>(initialValues?.dietary || ['Vegetarian Options', 'Gluten-Free Options']);
  const [specialRequirements, setSpecialRequirements] = useState(
    initialValues?.specialRequirements || 'Sunset ceremony outside, indoor wine cellar reception after 7 PM'
  );

  const handleSelectPreset = (presetData: EventPreferences) => {
    setEventType(presetData.eventType);
    setTitle(presetData.title);
    setLocation(presetData.location);
    setDate(presetData.date);
    setDurationHours(presetData.durationHours);
    setGuestCount(presetData.guestCount);
    setTotalBudget(presetData.totalBudget);
    setCurrency(presetData.currency);
    setTheme(presetData.theme);
    setVibe(presetData.vibe);
    setDietary(presetData.dietary);
    setSpecialRequirements(presetData.specialRequirements);
  };

  const toggleDietary = (item: string) => {
    if (dietary.includes(item)) {
      setDietary(dietary.filter((d) => d !== item));
    } else {
      setDietary([...dietary, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      eventType,
      title: title.trim() || 'Milestone Celebration',
      location: location.trim() || 'Metropolitan Hall',
      date: date || new Date().toISOString().split('T')[0],
      durationHours: Number(durationHours) || 5,
      guestCount: Math.max(1, Number(guestCount) || 50),
      totalBudget: Math.max(100, Number(totalBudget) || 5000),
      currency,
      theme: theme.trim() || 'Modern Celebration',
      vibe: vibe.trim() || 'Festive and joyful',
      dietary,
      specialRequirements: specialRequirements.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Hero Welcome */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 animate-pulse-slow" />
          <span>GenAI-Powered Event & Budget Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Design your dream event in seconds.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Personalized master schedules, programmatic budget breakdowns, vendor procurement checklists, and contingency playbooks—engineered with Google Gemini.
        </p>
      </div>

      {/* Quick Demo Presets */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="flex items-center">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-500" />
            Quick Demo Presets (1-Click Sample Blueprints)
          </span>
          <span className="text-[11px] font-normal text-slate-400">Click to fill form</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {DEMO_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p.data)}
              className="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition group"
            >
              <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center justify-between">
                <span>{p.name}</span>
                <span className="text-[10px] text-purple-500 font-semibold uppercase">{p.data.eventType}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-tight">
                {p.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Configuration Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        {/* Step 1: Event Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            1. Select Event Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EVENT_TYPE_OPTIONS.map((opt) => {
              const isSelected = eventType === opt.type;
              return (
                <div
                  key={opt.type}
                  onClick={() => setEventType(opt.type)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700/80 hover:border-purple-300 dark:hover:border-purple-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 mb-1">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                      {opt.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Basic Details */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            2. Event Name & Destination
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event Title / Occasion
              </label>
              <input
                type="text"
                placeholder="e.g. Liam & Sophia’s Tuscan Vineyard Wedding"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location / City / Venue Style
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Napa Valley, CA or Downtown Chicago"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Date, Time & Numbers */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            3. Date, Duration & Headcount
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Duration (Hours)
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="72"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseInt(e.target.value) || 1)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Guest Count
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min="5"
                  max="10000"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Budget & Currency */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            4. Budget Allocation Cap
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Budget Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 5: Theme & Vibe */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            5. Creative Theme & Atmosphere
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Theme Concept
              </label>
              <input
                type="text"
                placeholder="e.g. Tuscan Garden & Romantic Candlelight"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Desired Vibe / Atmosphere
              </label>
              <input
                type="text"
                placeholder="e.g. Elegant, warm, floral, intimate, high-energy"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Step 6: Dietary & Special Requirements */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            6. Dietary Accommodations & Special Notes
          </label>

          {/* Dietary Tags */}
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((item) => {
              const active = dietary.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleDietary(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    active
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Special Requirements / Logistics Needs
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Outdoor rain plan required, wheelchair accessibility, live band power requirements, quiet decompression zone"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 text-white font-extrabold text-base shadow-xl shadow-purple-500/25 transition active:scale-98 flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating Comprehensive Event Blueprint with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 animate-pulse-slow" />
                <span>Generate Master Event Blueprint ✨</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

