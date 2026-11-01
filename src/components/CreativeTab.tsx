import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  Copy,
  Check,
  Music,
  Mail,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { CreativeConcept } from '../types';

interface CreativeTabProps {
  creative: CreativeConcept;
  eventTitle: string;
}

export const CreativeTab: React.FC<CreativeTabProps> = ({ creative, eventTitle }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedInvite, setCopiedInvite] = useState(false);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyInvite = () => {
    const text = `${creative.invitationDraft.headline}\n\n${creative.invitationDraft.body}\n\nRSVP: ${creative.invitationDraft.rsvpDeadline}`;
    navigator.clipboard.writeText(text);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Theme Hero Banner */}
      <div className="relative p-8 rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-purple-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Creative Identity & Atmosphere</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {creative.themeName}
          </h2>
          <p className="text-base text-purple-100/90 italic font-medium">
            "{creative.tagline}"
          </p>

          {/* Mood Keywords */}
          <div className="flex flex-wrap gap-2 pt-2">
            {creative.moodKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-semibold text-white tracking-wide"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative background aura */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-1/4 w-60 h-60 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Color Palette Swatches */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Cohesive Color Palette
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any swatch to copy hex code for decorators, print shops, and design assets
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {creative.colorPalette.map((color, i) => (
            <div
              key={i}
              onClick={() => handleCopyHex(color.hex)}
              className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-900/50 hover:shadow-md transition-all space-y-2.5"
            >
              <div
                style={{ backgroundColor: color.hex }}
                className="h-20 w-full rounded-xl shadow-inner relative flex items-center justify-center transition-transform group-hover:scale-102"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-[11px] font-bold px-2 py-1 rounded-md backdrop-blur-sm flex items-center">
                  {copiedHex === color.hex ? (
                    <>
                      <Check className="h-3 w-3 mr-1 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" /> Copy Hex
                    </>
                  )}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {color.name}
                </p>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  {color.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decor & Signature Touches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Decor Concepts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Bespoke Decor & Scenic Installations
            </h3>
          </div>

          <div className="space-y-2.5">
            {creative.decorIdeas.map((idea, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start space-x-2.5"
              >
                <span className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="leading-relaxed">{idea}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Experiential Touches */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Signature Experiential Touches
            </h3>
          </div>

          <div className="space-y-2.5">
            {creative.signatureTouches.map((touch, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start space-x-2.5"
              >
                <Lightbulb className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{touch}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music & Atmosphere + Invitation Draft */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sound & Atmosphere */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Music className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Soundscape & Atmosphere Progression
            </h3>
          </div>

          <div className="space-y-2.5">
            {creative.musicAndVibeSuggestions.map((sugg, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2.5"
              >
                <span className="text-purple-600 dark:text-purple-400 font-bold shrink-0">
                  Phase {i + 1}:
                </span>
                <p className="leading-relaxed">{sugg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Polished Invitation Copy */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/70 to-indigo-50/70 dark:from-slate-850 dark:to-slate-800 border border-purple-200 dark:border-purple-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Drafted Invitation Copy
              </h3>
            </div>
            <button
              onClick={handleCopyInvite}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-sm"
            >
              {copiedInvite ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              {creative.invitationDraft.headline}
            </h4>
            <p className="leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
              {creative.invitationDraft.body}
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
              RSVP Request: {creative.invitationDraft.rsvpDeadline}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

