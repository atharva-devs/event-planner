import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { EventPlan, ChatMessage } from '../types';
import { chatWithAssistant } from '../services/geminiService';

interface GenieChatTabProps {
  plan: EventPlan;
  onUpdatePlan: (updated: EventPlan) => void;
}

const QUICK_PROMPTS = [
  'How can I trim $2,000 from catering without sacrificing quality?',
  'Draft a professional negotiation email to the venue manager',
  'What are 3 interactive party icebreakers for this guest count?',
  'What timeline adjustments should we make if dinner runs 30 minutes late?',
];

export const GenieChatTab: React.FC<GenieChatTabProps> = ({ plan, onUpdatePlan }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(plan.chatHistory || []);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isThinking) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsThinking(true);

    try {
      const reply = await chatWithAssistant(
        plan,
        newHistory.map((m) => ({ sender: m.sender, text: m.text })),
        text
      );

      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: reply,
      };

      const finalHistory = [...newHistory, assistantMsg];
      setMessages(finalHistory);
      onUpdatePlan({ ...plan, chatHistory: finalHistory });
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-850 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Sparkles className="h-5 w-5 animate-pulse-slow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>EventGenie Co-Pilot</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Context-Aware
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consult your AI assistant for adjustments, vendor advice, copy drafts, and budget questions
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white shadow-sm rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1 opacity-70 text-[10px]">
                <span className="font-bold">{msg.sender === 'user' ? 'You' : 'EventGenie'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <div className="whitespace-pre-line font-normal space-y-2">{msg.text}</div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl rounded-tl-none p-3.5 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
              <span>EventGenie is strategizing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Suggestions:</span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask EventGenie anything about your event plan..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={isThinking}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isThinking || !inputText.trim()}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition flex items-center space-x-1.5"
        >
          <span>Send</span>
          <CornerDownLeft className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

