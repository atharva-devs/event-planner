import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  EventPreferences,
  EventPlan,
  BudgetBreakdown,
  TimelinePhase,
  VendorItem,
  CreativeConcept,
  RunOfShowItem,
  ContingencyPlan,
} from '../types';
import { calculateBudget } from './budgetCalculator';

const LOCAL_STORAGE_KEY = 'eventgenie_gemini_key';

export function getStoredApiKey(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
  }
  return '';
}

export function saveStoredApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
  }
}

/**
 * Generates an event plan using Google Gemini API or intelligent deterministic fallback.
 */
export async function generateEventPlan(
  prefs: EventPreferences,
  apiKeyOverride?: string
): Promise<EventPlan> {
  const apiKey = (apiKeyOverride || getStoredApiKey()).trim();

  // 1. Programmatically calculate budget allocations first (no hallucinated arithmetic)
  const budget: BudgetBreakdown = calculateBudget(
    prefs.totalBudget,
    prefs.eventType,
    prefs.guestCount
  );

  let creative: CreativeConcept;
  let timeline: TimelinePhase[];
  let vendors: VendorItem[];
  let runOfShow: RunOfShowItem[];
  let contingency: ContingencyPlan;
  let aiSummary: string;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Try gemini-1.5-flash or gemini-2.5-flash
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const prompt = `You are EventGenie AI, an elite event planner and production director.
Create a comprehensive, personalized event blueprint in JSON format based on the following specifications:

Event Type: ${prefs.eventType}
Event Title: ${prefs.title}
Location: ${prefs.location}
Date: ${prefs.date}
Duration: ${prefs.durationHours} hours
Guest Count: ${prefs.guestCount} people
Total Budget: ${prefs.currency} ${prefs.totalBudget.toLocaleString()}
Theme & Vibe: ${prefs.theme} (${prefs.vibe})
Dietary Preferences: ${prefs.dietary.join(', ') || 'Standard variety'}
Special Notes / Requirements: ${prefs.specialRequirements || 'None specified'}

Output ONLY a JSON object with this exact structure:
{
  "aiSummary": "A 2-3 paragraph inspiring, strategic overview of the event concept, guest journey, and execution philosophy.",
  "creative": {
    "themeName": "Creative theme name",
    "tagline": "Catchy evocative tagline",
    "moodKeywords": ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4"],
    "colorPalette": [
      { "name": "Color name", "hex": "#HEX" },
      { "name": "Color name", "hex": "#HEX" },
      { "name": "Color name", "hex": "#HEX" },
      { "name": "Color name", "hex": "#HEX" }
    ],
    "decorIdeas": ["Specific decor idea 1", "Specific decor idea 2", "Specific decor idea 3", "Specific decor idea 4"],
    "signatureTouches": ["Memorable experiential touch 1", "Touch 2", "Touch 3"],
    "musicAndVibeSuggestions": ["Music playlist direction 1", "Direction 2", "Direction 3"],
    "invitationDraft": {
      "headline": "Formal or festive invitation headline",
      "body": "Warm, engaging invitation copy customized to this event",
      "rsvpDeadline": "Recommended RSVP cutoff date"
    }
  },
  "timeline": [
    {
      "id": "phase_1",
      "phaseName": "8 - 12 Weeks Prior",
      "timeOffset": "-10 weeks",
      "items": [
        { "id": "t1", "task": "Task description", "category": "Venue & Legal", "completed": false, "priority": "critical", "deadlineNotes": "Why this matters now" },
        { "id": "t2", "task": "Task description", "category": "Design", "completed": false, "priority": "high", "deadlineNotes": "Notes" }
      ]
    },
    {
      "id": "phase_2",
      "phaseName": "4 - 6 Weeks Prior",
      "timeOffset": "-5 weeks",
      "items": [
        { "id": "t3", "task": "Task description", "category": "Catering", "completed": false, "priority": "high", "deadlineNotes": "Tastings & headcounts" }
      ]
    },
    {
      "id": "phase_3",
      "phaseName": "1 - 2 Weeks Prior",
      "timeOffset": "-1.5 weeks",
      "items": [
        { "id": "t4", "task": "Task description", "category": "Logistics", "completed": false, "priority": "critical", "deadlineNotes": "Final vendor confirmations" }
      ]
    },
    {
      "id": "phase_4",
      "phaseName": "Day of the Event",
      "timeOffset": "0 days",
      "items": [
        { "id": "t5", "task": "Morning load-in & check", "category": "Operations", "completed": false, "priority": "critical", "deadlineNotes": "Vendor walk-through" }
      ]
    }
  ],
  "vendors": [
    {
      "id": "v1",
      "category": "Venue",
      "name": "Primary Venue Partner",
      "role": "Host space & setup",
      "estimatedCost": 0,
      "status": "researching",
      "contactInfo": "Check local listings in ${prefs.location}",
      "notes": "Verify curfew and liquor license"
    },
    {
      "id": "v2",
      "category": "Catering",
      "name": "Bespoke Catering Team",
      "role": "Food & Beverage",
      "estimatedCost": 0,
      "status": "researching",
      "contactInfo": "Local catering specialist",
      "notes": "Account for ${prefs.dietary.join(', ') || 'dietary requests'}"
    },
    {
      "id": "v3",
      "category": "Photography",
      "name": "Lead Visual Storyteller",
      "role": "Photo & Video",
      "estimatedCost": 0,
      "status": "researching",
      "contactInfo": "Portfolio review required",
      "notes": "Capture candid guest moments"
    },
    {
      "id": "v4",
      "category": "Entertainment",
      "name": "Live Sound & Music Artist",
      "role": "Atmosphere & Dancing",
      "estimatedCost": 0,
      "status": "researching",
      "contactInfo": "Sound engineer / DJ",
      "notes": "Acoustic requirements check"
    }
  ],
  "runOfShow": [
    { "id": "r1", "time": "T - 2:00", "activity": "Vendor Load-in & Tech Check", "leadPerson": "Event Coordinator", "location": "Main Hall", "notes": "Test mics, sound and stage lights" },
    { "id": "r2", "time": "T + 0:00", "activity": "Guest Arrival & Welcome Refreshment", "leadPerson": "Host / Greeters", "location": "Foyer / Lounge", "notes": "Soft background music and drinks" },
    { "id": "r3", "time": "T + 1:00", "activity": "Main Program / Ceremony / Keynote", "leadPerson": "Master of Ceremonies", "location": "Main Stage", "notes": "Key highlights and speeches" },
    { "id": "r4", "time": "T + 2:30", "activity": "Dinner / Feast & Mingling", "leadPerson": "Catering Lead", "location": "Dining Area", "notes": "Food stations open smoothly" },
    { "id": "r5", "time": "T + 4:00", "activity": "Celebration, Dancing & Grand Finale", "leadPerson": "DJ / Entertainment", "location": "Dancefloor", "notes": "Energy peak followed by send-off" }
  ],
  "contingency": {
    "weatherFallback": "Clear rain plan, indoor backup space or tenting reservation.",
    "technicalAVBackup": "Secondary laptop, backup microphone, wired spare cables, power generator.",
    "guestSurgePlan": "10-15% extra place settings and catering buffer ready.",
    "vendorCancellationPlan": "Vetted emergency backup list for DJ, photographer, and transport.",
    "healthSafetyProtocols": "First aid kit on site, clear emergency exits, designated contact."
  }
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text);

      aiSummary = parsed.aiSummary || getDefaultSummary(prefs);
      creative = parsed.creative || getDefaultCreative(prefs);
      timeline = parsed.timeline || getDefaultTimeline(prefs);
      vendors = parsed.vendors || getDefaultVendors(prefs, budget);
      runOfShow = parsed.runOfShow || getDefaultRunOfShow(prefs);
      contingency = parsed.contingency || getDefaultContingency(prefs);
    } catch (err) {
      console.warn('Gemini API call returned an error or JSON parse failed. Falling back to deterministic planner engine:', err);
      aiSummary = getDefaultSummary(prefs);
      creative = getDefaultCreative(prefs);
      timeline = getDefaultTimeline(prefs);
      vendors = getDefaultVendors(prefs, budget);
      runOfShow = getDefaultRunOfShow(prefs);
      contingency = getDefaultContingency(prefs);
    }
  } else {
    // Deterministic instant plan generation engine
    aiSummary = getDefaultSummary(prefs);
    creative = getDefaultCreative(prefs);
    timeline = getDefaultTimeline(prefs);
    vendors = getDefaultVendors(prefs, budget);
    runOfShow = getDefaultRunOfShow(prefs);
    contingency = getDefaultContingency(prefs);
  }

  // Cross-link vendor estimated costs from programmatic budget categories
  budget.categories.forEach((cat) => {
    const match = vendors.find(v => v.category.toLowerCase().includes(cat.name.split(' ')[0].toLowerCase()));
    if (match && match.estimatedCost === 0) {
      match.estimatedCost = cat.allocatedAmount;
    }
  });

  const now = new Date().toISOString();
  return {
    id: prefs.id || `plan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now,
    lastUpdated: now,
    preferences: prefs,
    budget,
    timeline,
    vendors,
    creative,
    runOfShow,
    contingency,
    aiSummary,
    chatHistory: [
      {
        id: 'msg_init',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `✨ Hello! I have drafted the comprehensive event blueprint for **"${prefs.title}"**. I calculated your programmatic budget breakdown (${prefs.currency} ${prefs.totalBudget.toLocaleString()}), organized an interactive timeline, vendor matrix, creative concept, and contingency playbook. How would you like to refine it?`,
      },
    ],
  };
}

/**
 * Interactive Chat Assistant with Gemini or Deterministic Assistant
 */
export async function chatWithAssistant(
  plan: EventPlan,
  history: { sender: 'user' | 'assistant'; text: string }[],
  userMessage: string,
  apiKeyOverride?: string
): Promise<string> {
  const apiKey = (apiKeyOverride || getStoredApiKey()).trim();

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const conversationContext = history
        .slice(-6)
        .map((h) => `${h.sender === 'user' ? 'User' : 'EventGenie'}: ${h.text}`)
        .join('\n');

      const prompt = `You are EventGenie AI, a top-tier luxury and event planner assistant.
Current Event Context:
- Title: ${plan.preferences.title} (${plan.preferences.eventType})
- Location: ${plan.preferences.location}
- Date: ${plan.preferences.date}
- Guest Count: ${plan.preferences.guestCount}
- Total Budget: ${plan.preferences.currency} ${plan.budget.totalBudget.toLocaleString()}
- Allocated Budget: ${plan.preferences.currency} ${plan.budget.allocatedTotal.toLocaleString()}
- Contingency Reserve: ${plan.preferences.currency} ${plan.budget.contingencyAmount.toLocaleString()}
- Theme: ${plan.creative.themeName} (${plan.preferences.theme})

Recent Conversation:
${conversationContext}

User Question: ${userMessage}

Provide a crisp, actionable, encouraging answer (2-4 paragraphs or formatted bullet points). Include concrete suggestions, vendor negotiation advice, cost-saving ideas, or timeline refinements tailored to this exact event.`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.warn('Gemini chat error:', err);
    }
  }

  // Fallback intelligent responder
  const lower = userMessage.toLowerCase();
  if (lower.includes('budget') || lower.includes('cost') || lower.includes('save') || lower.includes('cut')) {
    return `💡 **Budget Optimization Strategy for ${plan.preferences.title}**:
1. **F&B Service Style**: Switch from plated courses to curated family-style platters or food stations. This can save 12-18% on service staffing while keeping guests engaged.
2. **Off-Peak Date/Hours**: In ${plan.preferences.location}, shifting the timeline or selecting a Friday/Sunday slot often unlocks 15-20% venue rental waivers.
3. **Floral Repurposing**: Shift ceremony floral installations directly into the dining backdrop during the cocktail interlude.
4. **Current Contingency**: You have an allocated safety reserve of **${plan.preferences.currency} ${plan.budget.contingencyAmount.toLocaleString()}** to protect against unexpected price increases!`;
  }

  if (lower.includes('invite') || lower.includes('rsvp') || lower.includes('email') || lower.includes('wording')) {
    return `💌 **Suggested Invitation Copy for "${plan.preferences.title}"**:
**Headline**: ${plan.creative.invitationDraft.headline}
**Body**:
${plan.creative.invitationDraft.body}
**RSVP Cutoff**: ${plan.creative.invitationDraft.rsvpDeadline}

*Tip*: Include a digital QR code directly linked to a personalized RSVP form with dietary selections to streamline headcount confirmation!`;
  }

  if (lower.includes('timeline') || lower.includes('schedule') || lower.includes('hour') || lower.includes('day of')) {
    return `⏱️ **Run-of-Show Recommendation**:
For a ${plan.preferences.durationHours}-hour gathering with ${plan.preferences.guestCount} guests, the most critical buffer is between guest arrival and formal programming. We recommend allocating a 45-minute welcome cocktail window so late arrivals don't delay the main program. Your first scheduled activity starts at ${plan.runOfShow[0]?.time || 'T-2:00'}!`;
  }

  return `✨ Great idea for **"${plan.preferences.title}"**! For an event with ${plan.preferences.guestCount} guests themed around *${plan.creative.themeName}*, focusing on personal guest touchpoints (like custom welcome drinks, interactive guestbooks, and seamless music transitions) will create an unforgettable experience. Would you like me to refine the vendor checklist, adjust specific budget categories, or draft an announcement?`;
}

// ==================== DETERMINISTIC RICH FALLBACK GENERATORS ====================

function getDefaultSummary(prefs: EventPreferences): string {
  return `Welcome to the comprehensive master plan for "${prefs.title}". Designed specifically for ${prefs.guestCount} guests in ${prefs.location}, this blueprint blends a distinctive "${prefs.theme}" aesthetic with disciplined fiscal management. 

Our programmatic strategy balances memorable guest experiences with strict cost containment, maintaining a dedicated contingency buffer and clear operational timelines. Every milestone—from initial vendor selection to the final send-off—is structured to ensure a smooth, stress-free execution.`;
}

function getDefaultCreative(prefs: EventPreferences): CreativeConcept {
  const typePalettes: Record<string, { theme: string; tagline: string; colors: { name: string; hex: string }[]; decor: string[]; keywords: string[] }> = {
    wedding: {
      theme: prefs.theme || 'Enchanted Tuscan Romance',
      tagline: 'Timeless elegance under warm candlelight and lush greenery',
      colors: [
        { name: 'Champagne Gold', hex: '#E5C158' },
        { name: 'Sage Green', hex: '#87A987' },
        { name: 'Ivory Cream', hex: '#FAF5EE' },
        { name: 'Dusty Rose', hex: '#DCAEAE' },
      ],
      decor: [
        'Trailing eucalyptus and white garden rose arch for ceremony backdrop',
        'Fairy light canopy with vintage Edison bulbs over dining tables',
        'Calligraphy mirror welcome sign with custom wax seal accents',
        'Taper candles in vintage brass holders with sheer chiffon runners',
      ],
      keywords: ['Romantic', 'Intimate', 'Luminous', 'Timeless'],
    },
    birthday: {
      theme: prefs.theme || 'Neon Velvet Glow & Glam',
      tagline: 'An electric milestone celebration filled with color and beats',
      colors: [
        { name: 'Electric Violet', hex: '#8B5CF6' },
        { name: 'Hot Magenta', hex: '#EC4899' },
        { name: 'Midnight Obsidian', hex: '#0F172A' },
        { name: 'Metallic Chrome', hex: '#94A3B8' },
      ],
      decor: [
        'Custom LED neon name sign with dual-toned organic balloon garland',
        'Retro disco ball cluster suspended above the dance floor',
        'Polaroid camera guestbook station with metallic pens',
        'Illuminated acrylic bar with themed cocktail stirrers',
      ],
      keywords: ['Electric', 'High-Energy', 'Glamorous', 'Playful'],
    },
    college: {
      theme: prefs.theme || 'Future Horizons Tech Festival',
      tagline: 'Empowering next-generation innovators, coders, and creators',
      colors: [
        { name: 'Cyan Spark', hex: '#06B6D4' },
        { name: 'Electric Indigo', hex: '#6366F1' },
        { name: 'Deep Space', hex: '#0B0F19' },
        { name: 'Signal Emerald', hex: '#10B981' },
      ],
      decor: [
        'High-resolution LED video wall backdrop for main keynote & demos',
        'Modular hacking lounges with charging hubs and beanbags',
        'Interactive digital leaderboard and projection-mapped branding',
        'Eco-friendly lanyard & sustainable swag distribution station',
      ],
      keywords: ['Innovative', 'Dynamic', 'Collaborative', 'Futuristic'],
    },
    corporate: {
      theme: prefs.theme || 'Executive Momentum Summit',
      tagline: 'Inspiring visionary leadership and meaningful cross-industry connection',
      colors: [
        { name: 'Navy Executive', hex: '#1E3A8A' },
        { name: 'Slate Gray', hex: '#64748B' },
        { name: 'Platinum Silver', hex: '#E2E8F0' },
        { name: 'Accent Amber', hex: '#D97706' },
      ],
      decor: [
        'Architectural stage design with curved confidence monitors',
        'Dedicated networking lounge with plush seating and espresso bar',
        'Precision branded wayfinding totem displays',
        'Executive gift lounge featuring sustainable artisanal goods',
      ],
      keywords: ['Sophisticated', 'Polished', 'Seamless', 'Impactful'],
    },
    community: {
      theme: prefs.theme || 'Harmony In Bloom Community Fair',
      tagline: 'Bringing families and neighborhoods together through food, art, and laughter',
      colors: [
        { name: 'Sunny Marigold', hex: '#F59E0B' },
        { name: 'Forest Green', hex: '#059669' },
        { name: 'Sky Azure', hex: '#38BDF8' },
        { name: 'Warm Terracotta', hex: '#EA580C' },
      ],
      decor: [
        'Festive colorful bunting and overhead festoon lighting across open lawns',
        'Wooden artisan market booths with canvas awnings',
        'Community chalkboard mural where guests write wishes for the town',
        'Kid-friendly activity lawn with giant wooden games',
      ],
      keywords: ['Welcoming', 'Vibrant', 'Family-Friendly', 'Heartfelt'],
    },
    anniversary: {
      theme: prefs.theme || 'Golden Jubilee Reflections',
      tagline: 'Honoring decades of love, resilience, and unforgettable memories',
      colors: [
        { name: 'Antique Gold', hex: '#D4AF37' },
        { name: 'Midnight Navy', hex: '#0F172A' },
        { name: 'Ivory Silk', hex: '#FFFBEB' },
        { name: 'Burgundy Velvet', hex: '#831843' },
      ],
      decor: [
        'Curated photo gallery timeline with framed pictures from every decade',
        'Low, fragrant floral centerpieces with amber votive candles',
        'Personalized linen menus with gold foil typography',
        'Champagne tower display for the celebration toast',
      ],
      keywords: ['Elegant', 'Nostalgic', 'Heartfelt', 'Luxurious'],
    },
  };

  const chosen = typePalettes[prefs.eventType] || typePalettes.wedding;

  return {
    themeName: chosen.theme,
    tagline: chosen.tagline,
    colorPalette: chosen.colors,
    decorIdeas: chosen.decor,
    moodKeywords: chosen.keywords,
    signatureTouches: [
      `Customized welcome amenity highlighting ${prefs.location}'s local flavors`,
      `Signature drink inspired by "${chosen.theme}"`,
      `Interactive memory or digital photo-share wall using a dedicated QR tag`,
    ],
    musicAndVibeSuggestions: [
      'Acoustic live duo during guest arrival and cocktail hour',
      'Warm ambient jazz/lo-fi during dinner or formal mingling',
      'High-tempo celebration set to peak energy for the closing hours',
    ],
    invitationDraft: {
      headline: `You're Invited to Celebrate ${prefs.title}!`,
      body: `Join us for an unforgettable gathering celebrating ${prefs.title} on ${prefs.date || 'the upcoming milestone'} in ${prefs.location}. Expect delightful food, craft drinks, and joyous moments as we bring our community together.`,
      rsvpDeadline: 'Please confirm attendance at least 3 weeks before the event.',
    },
  };
}

function getDefaultTimeline(prefs: EventPreferences): TimelinePhase[] {
  return [
    {
      id: 'phase_1',
      phaseName: '12 - 8 Weeks Before (Foundation)',
      timeOffset: '-10 Weeks',
      items: [
        {
          id: 't_venue_lock',
          task: `Secure venue contract & deposit in ${prefs.location}`,
          category: 'Venue',
          completed: false,
          priority: 'critical',
          deadlineNotes: 'Confirms capacity for ' + prefs.guestCount + ' guests',
        },
        {
          id: 't_caterer_interview',
          task: 'Shortlist caterers and schedule menu tasting',
          category: 'Catering',
          completed: false,
          priority: 'high',
          deadlineNotes: `Review dietary accommodations: ${prefs.dietary.join(', ') || 'Standard'}`,
        },
        {
          id: 't_theme_lock',
          task: `Finalize design board & color scheme (${prefs.theme || 'Master Theme'})`,
          category: 'Design',
          completed: false,
          priority: 'medium',
          deadlineNotes: 'Needed before ordering stationery and rentals',
        },
      ],
    },
    {
      id: 'phase_2',
      phaseName: '6 - 4 Weeks Before (Coordination)',
      timeOffset: '-5 Weeks',
      items: [
        {
          id: 't_invites_send',
          task: 'Send digital/print invitations and launch RSVP portal',
          category: 'Guest Management',
          completed: false,
          priority: 'critical',
          deadlineNotes: 'Track headcounts weekly',
        },
        {
          id: 't_vendor_contracts',
          task: 'Confirm Photographer, DJ/Band, and Florist bookings',
          category: 'Vendors',
          completed: false,
          priority: 'high',
          deadlineNotes: 'Verify power requirements and arrival windows',
        },
        {
          id: 't_order_rentals',
          task: 'Order furniture, sound system, and lighting equipment',
          category: 'Logistics',
          completed: false,
          priority: 'medium',
          deadlineNotes: 'Cross-check venue delivery access guidelines',
        },
      ],
    },
    {
      id: 'phase_3',
      phaseName: '2 - 1 Weeks Before (Final Details)',
      timeOffset: '-1.5 Weeks',
      items: [
        {
          id: 't_headcount_lock',
          task: 'Lock final headcount with caterer and beverage vendor',
          category: 'Catering',
          completed: false,
          priority: 'critical',
          deadlineNotes: 'Avoid paying for unused plates',
        },
        {
          id: 't_run_of_show_review',
          task: 'Distribute Day-of Run-of-Show to all key leads & MC',
          category: 'Operations',
          completed: false,
          priority: 'high',
          deadlineNotes: 'Coordinate arrival times and stage cues',
        },
        {
          id: 't_contingency_check',
          task: 'Verify weather forecast and activate backup protocols if needed',
          category: 'Risk Management',
          completed: false,
          priority: 'high',
          deadlineNotes: 'Confirm tenting/indoor plan',
        },
      ],
    },
    {
      id: 'phase_4',
      phaseName: 'Event Day & Execution',
      timeOffset: 'Day Of',
      items: [
        {
          id: 't_day_loadin',
          task: 'Coordinate morning vendor load-in and room setup',
          category: 'Logistics',
          completed: false,
          priority: 'critical',
          deadlineNotes: '2 hours prior to guest arrival',
        },
        {
          id: 't_sound_check',
          task: 'Audio-visual sound check and microphone line test',
          category: 'Tech & AV',
          completed: false,
          priority: 'critical',
          deadlineNotes: 'Test primary and spare wireless mic batteries',
        },
        {
          id: 't_enjoy_celebrate',
          task: 'Host, mingle, and celebrate the milestone!',
          category: 'Experience',
          completed: false,
          priority: 'high',
          deadlineNotes: 'Celebrate smooth execution',
        },
      ],
    },
  ];
}

function getDefaultVendors(prefs: EventPreferences, budget: BudgetBreakdown): VendorItem[] {
  return [
    {
      id: 'v_venue',
      category: 'Venue & Facilities',
      name: `${prefs.location} Premier Event Venue`,
      role: 'Main Gathering & Reception Venue',
      estimatedCost: budget.categories.find(c => c.id.includes('venue'))?.allocatedAmount || 0,
      status: 'contacted',
      contactInfo: 'events@venuepartner.com',
      notes: `Targeting capacity for ${prefs.guestCount} guests. Inquire about curfew and prep kitchen.`,
    },
    {
      id: 'v_catering',
      category: 'Food & Beverage',
      name: 'Artisan Culinary Group',
      role: 'Full-Service Catering & Bar',
      estimatedCost: budget.categories.find(c => c.id.includes('catering') || c.id.includes('food') || c.id.includes('refreshment'))?.allocatedAmount || 0,
      status: 'researching',
      contactInfo: 'chef@artisanculinary.com',
      notes: `Accommodates dietary: ${prefs.dietary.join(', ') || 'Varied diets'}. Bar service included.`,
    },
    {
      id: 'v_photo',
      category: 'Photography & Cinema',
      name: 'Lens & Light Visuals',
      role: 'Event Photographer & Video Highlights',
      estimatedCost: budget.categories.find(c => c.id.includes('photo') || c.id.includes('marketing'))?.allocatedAmount || 0,
      status: 'researching',
      contactInfo: 'hello@lensandlight.com',
      notes: '6-8 hours coverage, full digital rights, fast 48h highlight reel.',
    },
    {
      id: 'v_music',
      category: 'Entertainment & Audio',
      name: 'Groove Collective Sound & DJ',
      role: 'Master of Ceremonies & Sound Design',
      estimatedCost: budget.categories.find(c => c.id.includes('music') || c.id.includes('entertainment') || c.id.includes('av'))?.allocatedAmount || 0,
      status: 'researching',
      contactInfo: 'booking@groovecollective.com',
      notes: 'Wireless mics for speeches, ambient dinner playlist + high energy party set.',
    },
    {
      id: 'v_decor',
      category: 'Floral & Decor Design',
      name: 'Botanical Bloom & Decor Studio',
      role: 'Theme Styling & Lighting Accents',
      estimatedCost: budget.categories.find(c => c.id.includes('decor') || c.id.includes('branding'))?.allocatedAmount || 0,
      status: 'researching',
      contactInfo: 'design@botanicalbloom.com',
      notes: `Focal arch and table centerpieces matching the ${prefs.theme || 'chosen'} theme.`,
    },
  ];
}

function getDefaultRunOfShow(prefs: EventPreferences): RunOfShowItem[] {
  return [
    {
      id: 'ros_1',
      time: '14:00',
      activity: 'Vendor Load-In & Audio Visual Setup',
      leadPerson: 'Event Coordinator & AV Tech',
      location: 'Main Event Space',
      notes: 'Tables dressed, floral placement, microphone sound checks completed.',
    },
    {
      id: 'ros_2',
      time: '16:00',
      activity: 'Guest Arrival, Welcome Mocktails & Red Carpet Photos',
      leadPerson: 'Welcome Hostess',
      location: 'Entrance Foyer / Reception Garden',
      notes: 'Ambient acoustic playlist, welcome bites, digital guestbook open.',
    },
    {
      id: 'ros_3',
      time: '17:00',
      activity: `Main Program & Keynote / Ceremony for ${prefs.title}`,
      leadPerson: 'Lead MC / Celebrant',
      location: 'Main Stage / Altar',
      notes: 'Lighting dim, spotlight on stage, official toast & opening address.',
    },
    {
      id: 'ros_4',
      time: '18:15',
      activity: 'Dinner Service & Social Mingling',
      leadPerson: 'Banquet Lead',
      location: 'Dining Hall',
      notes: 'Plated / station dining begins. Background jazz ambiance.',
    },
    {
      id: 'ros_5',
      time: '19:45',
      activity: 'Cake Cutting / Speeches / Milestone Toast',
      leadPerson: 'Host & Honorees',
      location: 'Center Stage',
      notes: 'Champagne poured for all guests. Sparkling dessert presentation.',
    },
    {
      id: 'ros_6',
      time: '20:30',
      activity: 'Dance Floor Opening & Live Celebration Set',
      leadPerson: 'DJ / Band Lead',
      location: 'Dance Floor',
      notes: 'Uptempo music, atmospheric party lighting, late night snack station.',
    },
    {
      id: 'ros_7',
      time: '22:30',
      activity: 'Grand Finale Send-Off & Farewell',
      leadPerson: 'Coordination Team',
      location: 'Portico / Exitway',
      notes: 'Sparkler / ribbon send-off, guest favor distribution, load-out commences.',
    },
  ];
}

function getDefaultContingency(prefs: EventPreferences): ContingencyPlan {
  return {
    weatherFallback: `For outdoor segments in ${prefs.location}, reserve rain-cover marquee canopies or execute immediate transition to indoor secondary hall with a 3-hour notice protocol.`,
    technicalAVBackup: 'Maintain dual wireless microphones, redundant laptop with offline presentation files, and pre-configured portable power station for stage equipment.',
    guestSurgePlan: `Coordinate with caterer for a 10% inventory buffer (accommodating ~${Math.round(prefs.guestCount * 1.1)} people) and reserve 2 auxiliary overflow tables with matching linens.`,
    vendorCancellationPlan: 'Retain an on-call emergency vendor list with 3 local photographers and mobile DJs with contracted 2-hour arrival guarantees.',
    healthSafetyProtocols: 'Designate a clearly marked first aid kit, ensure unblocked ADA accessibility ramps, and designate a quiet decompression zone.',
  };
}

