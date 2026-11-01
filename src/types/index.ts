export type EventType =
  | 'wedding'
  | 'birthday'
  | 'college'
  | 'corporate'
  | 'community'
  | 'anniversary';

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface EventPreferences {
  id?: string;
  eventType: EventType;
  title: string;
  location: string;
  date: string;
  durationHours: number;
  guestCount: number;
  totalBudget: number;
  currency: CurrencyCode;
  theme: string;
  vibe: string;
  dietary: string[];
  specialRequirements: string;
}

export interface BudgetSubItem {
  id: string;
  name: string;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  iconName: string;
  percentage: number; // e.g. 30 for 30%
  allocatedAmount: number;
  actualSpent: number;
  description: string;
  subItems: BudgetSubItem[];
}

export interface CostSavingTip {
  id: string;
  title: string;
  category: string;
  potentialSavings: number; // programmatic amount or benchmark
  suggestion: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
}

export interface BudgetBreakdown {
  totalBudget: number;
  allocatedTotal: number;
  actualTotalSpent: number;
  remainingBuffer: number;
  contingencyAmount: number;
  contingencyPercentage: number;
  costPerGuest: number;
  categories: BudgetCategory[];
  costSavingTips: CostSavingTip[];
}

export interface TimelineItem {
  id: string;
  task: string;
  category: string;
  completed: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  deadlineNotes: string;
}

export interface TimelinePhase {
  id: string;
  phaseName: string; // e.g., "12 - 8 Weeks Before", "4 - 2 Weeks Before", "Day Before & Day of"
  timeOffset: string;
  items: TimelineItem[];
}

export type VendorStatus = 'researching' | 'contacted' | 'negotiating' | 'booked' | 'paid';

export interface VendorItem {
  id: string;
  category: string;
  name: string;
  role: string;
  estimatedCost: number;
  status: VendorStatus;
  contactInfo: string;
  notes: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface CreativeConcept {
  themeName: string;
  tagline: string;
  colorPalette: ColorSwatch[];
  decorIdeas: string[];
  moodKeywords: string[];
  signatureTouches: string[];
  musicAndVibeSuggestions: string[];
  invitationDraft: {
    headline: string;
    body: string;
    rsvpDeadline: string;
  };
}

export interface RunOfShowItem {
  id: string;
  time: string;
  activity: string;
  leadPerson: string;
  location: string;
  notes: string;
}

export interface ContingencyPlan {
  weatherFallback: string;
  technicalAVBackup: string;
  guestSurgePlan: string;
  vendorCancellationPlan: string;
  healthSafetyProtocols: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
}

export interface EventPlan {
  id: string;
  createdAt: string;
  lastUpdated: string;
  preferences: EventPreferences;
  budget: BudgetBreakdown;
  timeline: TimelinePhase[];
  vendors: VendorItem[];
  creative: CreativeConcept;
  runOfShow: RunOfShowItem[];
  contingency: ContingencyPlan;
  aiSummary: string;
  chatHistory?: ChatMessage[];
}

