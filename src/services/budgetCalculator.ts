import { BudgetBreakdown, BudgetCategory, CostSavingTip, EventType } from '../types';

export interface CategoryRatioBenchmark {
  id: string;
  name: string;
  iconName: string;
  ratio: number; // Decimal (sums to ~0.90 - 0.95, leaving remaining as contingency buffer)
  description: string;
  defaultSubItems: { name: string; shareOfCategory: number }[];
}

export const EVENT_BENCHMARKS: Record<EventType, CategoryRatioBenchmark[]> = {
  wedding: [
    {
      id: 'venue_rentals',
      name: 'Venue & Rentals',
      iconName: 'Building',
      ratio: 0.30,
      description: 'Ceremony & reception hall rental, tables, chairs, staging and linens',
      defaultSubItems: [
        { name: 'Ceremony & Reception Space', shareOfCategory: 0.70 },
        { name: 'Chairs, Tables & Linens Rental', shareOfCategory: 0.20 },
        { name: 'Permits & Cleaning Surcharges', shareOfCategory: 0.10 },
      ]
    },
    {
      id: 'catering_beverage',
      name: 'Food & Beverage',
      iconName: 'Utensils',
      ratio: 0.28,
      description: 'Appetizers, main dinner, bar service, servers and wedding cake',
      defaultSubItems: [
        { name: 'Plated / Buffet Dinner', shareOfCategory: 0.65 },
        { name: 'Bar & Beverage Package', shareOfCategory: 0.25 },
        { name: 'Wedding Cake / Dessert Bar', shareOfCategory: 0.10 },
      ]
    },
    {
      id: 'photography_video',
      name: 'Photography & Cinema',
      iconName: 'Camera',
      ratio: 0.12,
      description: 'Full-day coverage, second shooter, photo album & drone highlights',
      defaultSubItems: [
        { name: 'Primary Photographer & Album', shareOfCategory: 0.60 },
        { name: 'Cinematic Videography & Teaser', shareOfCategory: 0.40 },
      ]
    },
    {
      id: 'decor_florals',
      name: 'Decor & Florals',
      iconName: 'Sparkles',
      ratio: 0.10,
      description: 'Ceremony floral arch, table centerpieces, bouquets and accent lighting',
      defaultSubItems: [
        { name: 'Bridal Bouquet & Boutonnieres', shareOfCategory: 0.30 },
        { name: 'Ceremony Arch & Focal Decor', shareOfCategory: 0.35 },
        { name: 'Guest Table Centerpieces & Candles', shareOfCategory: 0.35 },
      ]
    },
    {
      id: 'music_entertainment',
      name: 'Music & Entertainment',
      iconName: 'Music',
      ratio: 0.08,
      description: 'DJ or live band, ceremony sound system, MC and dance floor lighting',
      defaultSubItems: [
        { name: 'DJ & Sound System / MC', shareOfCategory: 0.75 },
        { name: 'Dancefloor Lighting & Special Effects', shareOfCategory: 0.25 },
      ]
    },
    {
      id: 'attire_beauty',
      name: 'Attire & Beauty',
      iconName: 'Shirt',
      ratio: 0.06,
      description: 'Wedding attire, alterations, accessories, bridal hair and makeup',
      defaultSubItems: [
        { name: 'Attire & Alterations', shareOfCategory: 0.65 },
        { name: 'Hair & Makeup Styling', shareOfCategory: 0.35 },
      ]
    }
  ],

  birthday: [
    {
      id: 'venue_party',
      name: 'Venue & Space Hire',
      iconName: 'Building',
      ratio: 0.25,
      description: 'Private room, event space or lounge rental fee',
      defaultSubItems: [
        { name: 'Venue Rental Fee', shareOfCategory: 0.85 },
        { name: 'Cleaning & Security Deposit', shareOfCategory: 0.15 },
      ]
    },
    {
      id: 'catering_drinks',
      name: 'Food & Drinks',
      iconName: 'Utensils',
      ratio: 0.35,
      description: 'Finger food, dinner spread, signature cocktail, juices and beer/wine',
      defaultSubItems: [
        { name: 'Main Dinner / Finger Food Spread', shareOfCategory: 0.65 },
        { name: 'Drinks & Punch Station', shareOfCategory: 0.35 },
      ]
    },
    {
      id: 'cake_desserts',
      name: 'Custom Cake & Treats',
      iconName: 'Cake',
      ratio: 0.08,
      description: 'Customized tiered celebration cake, cupcakes & dessert platters',
      defaultSubItems: [
        { name: 'Designer Themed Birthday Cake', shareOfCategory: 0.75 },
        { name: 'Cupcakes / Candy Bar Extras', shareOfCategory: 0.25 },
      ]
    },
    {
      id: 'decor_balloons',
      name: 'Decor, Backdrop & Balloons',
      iconName: 'Sparkles',
      ratio: 0.12,
      description: 'Custom photo backdrop, organic balloon garland, banners & tableware',
      defaultSubItems: [
        { name: 'Balloon Arch & Photo Backdrop', shareOfCategory: 0.60 },
        { name: 'Themed Tableware & Centerpieces', shareOfCategory: 0.40 },
      ]
    },
    {
      id: 'entertainment_games',
      name: 'DJ, Games & Entertainment',
      iconName: 'Music',
      ratio: 0.12,
      description: 'DJ, photo booth rental, party host or interactive games',
      defaultSubItems: [
        { name: 'DJ / Sound Setup', shareOfCategory: 0.55 },
        { name: 'Photobooth with instant prints', shareOfCategory: 0.45 },
      ]
    }
  ],

  college: [
    {
      id: 'venue_stage',
      name: 'Auditorium, Staging & Venue',
      iconName: 'Building',
      ratio: 0.20,
      description: 'Hall rental, staging, acoustic permits, chairs and crowd barriers',
      defaultSubItems: [
        { name: 'Hall / Stage Rental', shareOfCategory: 0.75 },
        { name: 'Crowd Barriers & Security', shareOfCategory: 0.25 },
      ]
    },
    {
      id: 'av_production',
      name: 'Audio/Visual & Lighting',
      iconName: 'Radio',
      ratio: 0.22,
      description: 'Line array sound system, mics, LED wall, projection & stage lighting',
      defaultSubItems: [
        { name: 'Sound System & Microphones', shareOfCategory: 0.45 },
        { name: 'LED Stage Wall & Projection', shareOfCategory: 0.35 },
        { name: 'Stage Lighting Trusses', shareOfCategory: 0.20 },
      ]
    },
    {
      id: 'refreshments',
      name: 'Food & Student Refreshments',
      iconName: 'Utensils',
      ratio: 0.26,
      description: 'Lunch boxes, energy drinks, snack stalls, water stations',
      defaultSubItems: [
        { name: 'Participant Meal Boxes', shareOfCategory: 0.70 },
        { name: 'Hydration & Snack Stations', shareOfCategory: 0.30 },
      ]
    },
    {
      id: 'marketing_swag',
      name: 'Merchandise, Badges & Promo',
      iconName: 'Sparkles',
      ratio: 0.14,
      description: 'T-shirts, lanyards, delegate kits, social media banners & posters',
      defaultSubItems: [
        { name: 'Event T-Shirts & Tote Bags', shareOfCategory: 0.65 },
        { name: 'Badges, Lanyards & Print Banners', shareOfCategory: 0.35 },
      ]
    },
    {
      id: 'prizes_speakers',
      name: 'Prizes, Mementos & Guests',
      iconName: 'Award',
      ratio: 0.10,
      description: 'Competition prize money, trophies, guest travel honorarium',
      defaultSubItems: [
        { name: 'Winner Cash Prizes / Gift Vouchers', shareOfCategory: 0.60 },
        { name: 'Trophies, Certificates & Mementos', shareOfCategory: 0.40 },
      ]
    }
  ],

  corporate: [
    {
      id: 'venue_conference',
      name: 'Conference Venue & Facilities',
      iconName: 'Building',
      ratio: 0.35,
      description: 'Hotel ballroom or convention center, breakout rooms, high-speed Wi-Fi',
      defaultSubItems: [
        { name: 'Ballroom & Breakout Rooms', shareOfCategory: 0.80 },
        { name: 'Dedicated High-Speed Bandwidth', shareOfCategory: 0.20 },
      ]
    },
    {
      id: 'catering_executive',
      name: 'Corporate Catering & Breaks',
      iconName: 'Utensils',
      ratio: 0.28,
      description: 'Morning continental breakfast, coffee & networking lunch buffet',
      defaultSubItems: [
        { name: 'Executive Lunch Buffet', shareOfCategory: 0.65 },
        { name: 'Morning/Afternoon Coffee Breaks', shareOfCategory: 0.35 },
      ]
    },
    {
      id: 'av_hybrid',
      name: 'AV, Live Streaming & Stage',
      iconName: 'Radio',
      ratio: 0.18,
      description: 'Live broadcast streaming, confidence monitors, dual projection, lapel mics',
      defaultSubItems: [
        { name: 'Live Stream Broadcast & Recording', shareOfCategory: 0.50 },
        { name: 'Audio System, Podiums & Lavalier Mics', shareOfCategory: 0.50 },
      ]
    },
    {
      id: 'branding_collateral',
      name: 'Branding, Signage & Swag',
      iconName: 'Sparkles',
      ratio: 0.10,
      description: 'Welcome booths, step-and-repeat backdrops, badges, executive gifts',
      defaultSubItems: [
        { name: 'Executive Attendee Welcome Kits', shareOfCategory: 0.60 },
        { name: 'Wayfinding Signage & Backdrops', shareOfCategory: 0.40 },
      ]
    }
  ],

  community: [
    {
      id: 'venue_permits',
      name: 'Park/Hall Rental & City Permits',
      iconName: 'Building',
      ratio: 0.20,
      description: 'Public park permit, pavilion hire, electrical hookup, sanitation',
      defaultSubItems: [
        { name: 'Park Pavilion / Hall Permit Fee', shareOfCategory: 0.65 },
        { name: 'Portable Restrooms & Trash Services', shareOfCategory: 0.35 },
      ]
    },
    {
      id: 'community_food',
      name: 'Community Feasts & Drinks',
      iconName: 'Utensils',
      ratio: 0.32,
      description: 'BBQ grill supply, bulk family meals, cold beverages, paper plates',
      defaultSubItems: [
        { name: 'Main Community BBQ / Potluck supplies', shareOfCategory: 0.70 },
        { name: 'Water, Lemonade & Disposables', shareOfCategory: 0.30 },
      ]
    },
    {
      id: 'family_activities',
      name: 'Games, Inflatables & Activities',
      iconName: 'Smile',
      ratio: 0.22,
      description: 'Bounce houses, face painters, tug-of-war, cornhole tournaments',
      defaultSubItems: [
        { name: 'Inflatable Obstacle Course / Bounce', shareOfCategory: 0.60 },
        { name: 'Face Painter & Lawn Games', shareOfCategory: 0.40 },
      ]
    },
    {
      id: 'music_safety',
      name: 'Sound, Safety & Promotion',
      iconName: 'Radio',
      ratio: 0.14,
      description: 'Portable PA speaker system, neighborhood flyers, first aid booth',
      defaultSubItems: [
        { name: 'PA Speaker System & Microphone', shareOfCategory: 0.55 },
        { name: 'Flyers, Road Banners & First Aid', shareOfCategory: 0.45 },
      ]
    }
  ],

  anniversary: [
    {
      id: 'venue_atmosphere',
      name: 'Intimate Venue & Atmosphere',
      iconName: 'Building',
      ratio: 0.32,
      description: 'Boutique estate, winery or private dining salon',
      defaultSubItems: [
        { name: 'Private Room / Garden Space', shareOfCategory: 0.85 },
        { name: 'Ambiance & Draped Lighting', shareOfCategory: 0.15 },
      ]
    },
    {
      id: 'fine_dining',
      name: 'Curated Dinner & Wine',
      iconName: 'Utensils',
      ratio: 0.34,
      description: 'Multi-course chef tasting dinner, wine pairing, toast champagne',
      defaultSubItems: [
        { name: 'Multi-Course Plated Dinner', shareOfCategory: 0.70 },
        { name: 'Selected Wine & Toast Champagne', shareOfCategory: 0.30 },
      ]
    },
    {
      id: 'photo_keepsake',
      name: 'Photographer & Memory Album',
      iconName: 'Camera',
      ratio: 0.14,
      description: 'Portrait session, milestone video retrospective, guest memory book',
      defaultSubItems: [
        { name: 'Milestone Portrait Photographer', shareOfCategory: 0.70 },
        { name: 'Archival Keepsake Album', shareOfCategory: 0.30 },
      ]
    },
    {
      id: 'florals_music',
      name: 'Floral Styling & Acoustic Music',
      iconName: 'Sparkles',
      ratio: 0.12,
      description: 'Elegant candlelit florals, acoustic guitarist or string duo',
      defaultSubItems: [
        { name: 'Candlelit Floral Arrangements', shareOfCategory: 0.55 },
        { name: 'Live Acoustic Musician', shareOfCategory: 0.45 },
      ]
    }
  ]
};

/**
 * Programmatically computes budget allocations based on verified event benchmarks.
 * Uses exact floating-point rounding to 2 decimal places to guarantee arithmetic consistency.
 */
export function calculateBudget(
  totalBudget: number,
  eventType: EventType,
  guestCount: number,
  customRatios?: Record<string, number>
): BudgetBreakdown {
  const safeBudget = Math.max(0, totalBudget);
  const safeGuests = Math.max(1, guestCount);
  const benchmarks = EVENT_BENCHMARKS[eventType] || EVENT_BENCHMARKS.wedding;

  let totalAllocatedPercentage = 0;

  // First calculate category amounts
  const categories: BudgetCategory[] = benchmarks.map((bm) => {
    // If user provided a custom percentage, use it; otherwise use default benchmark
    const pct = customRatios && customRatios[bm.id] !== undefined
      ? customRatios[bm.id]
      : Math.round(bm.ratio * 100);

    totalAllocatedPercentage += pct;

    const allocatedAmount = Math.round((safeBudget * (pct / 100)) * 100) / 100;

    // Sub-items computed programmatically
    const subItems = bm.defaultSubItems.map((sub, idx) => {
      const estimatedCost = Math.round((allocatedAmount * sub.shareOfCategory) * 100) / 100;
      return {
        id: `${bm.id}_sub_${idx + 1}`,
        name: sub.name,
        estimatedCost,
        actualCost: 0,
      };
    });

    return {
      id: bm.id,
      name: bm.name,
      iconName: bm.iconName,
      percentage: pct,
      allocatedAmount,
      actualSpent: 0,
      description: bm.description,
      subItems,
    };
  });

  // Calculate contingency programmatically
  const contingencyPercentage = Math.max(0, 100 - totalAllocatedPercentage);
  const contingencyAmount = Math.round((safeBudget * (contingencyPercentage / 100)) * 100) / 100;

  // Total allocated summing strictly from category allocations
  const allocatedTotal = categories.reduce((sum, c) => sum + c.allocatedAmount, 0);
  const remainingBuffer = Math.round((safeBudget - allocatedTotal - contingencyAmount) * 100) / 100;
  const costPerGuest = Math.round((safeBudget / safeGuests) * 100) / 100;

  // Programmatic Cost Saving Tips tailored to the numbers
  const costSavingTips = generateProgrammaticCostSavings(safeBudget, eventType, safeGuests, categories);

  return {
    totalBudget: safeBudget,
    allocatedTotal,
    actualTotalSpent: 0,
    remainingBuffer,
    contingencyAmount,
    contingencyPercentage,
    costPerGuest,
    categories,
    costSavingTips,
  };
}

/**
 * Generates cost saving suggestions with programmatic calculations of potential savings.
 */
export function generateProgrammaticCostSavings(
  totalBudget: number,
  eventType: EventType,
  guestCount: number,
  categories: BudgetCategory[]
): CostSavingTip[] {
  const tips: CostSavingTip[] = [];

  const foodCat = categories.find(c => c.id.includes('catering') || c.id.includes('food') || c.id.includes('refreshment'));
  if (foodCat) {
    // Switching to buffet or family-style saves ~15% on catering
    const buffetSavings = Math.round(foodCat.allocatedAmount * 0.15);
    tips.push({
      id: 'tip_buffet_switch',
      title: 'Buffet / Action Stations vs Plated Dining',
      category: foodCat.name,
      potentialSavings: buffetSavings,
      suggestion: `Opting for interactive food stations or elevated buffet instead of multi-course plated dinner eliminates high server-to-guest labor ratios, saving an estimated $${buffetSavings.toLocaleString()}.`,
      difficulty: 'easy'
    });

    // BYOB or Corkage model saves ~25% on alcohol
    const barSavings = Math.round(foodCat.allocatedAmount * 0.18);
    tips.push({
      id: 'tip_byob_corkage',
      title: 'BYO Beverage Licensing & Curated Signature Cocktails',
      category: foodCat.name,
      potentialSavings: barSavings,
      suggestion: `Select a venue that permits sourcing your own spirits and wine with a nominal corkage fee, and limit bar choices to 2 signature drinks plus beer/wine to save roughly $${barSavings.toLocaleString()}.`,
      difficulty: 'moderate'
    });
  }

  const venueCat = categories.find(c => c.id.includes('venue'));
  if (venueCat) {
    // Off-peak or weekday timing discount ~20%
    const timingSavings = Math.round(venueCat.allocatedAmount * 0.20);
    tips.push({
      id: 'tip_off_peak_date',
      title: 'Friday/Sunday or Shoulder Season Advantage',
      category: venueCat.name,
      potentialSavings: timingSavings,
      suggestion: `Booking a Friday or Sunday evening or an off-peak month typically yields 15-25% rental discounts from premium venues, saving approximately $${timingSavings.toLocaleString()}.`,
      difficulty: 'moderate'
    });
  }

  const decorCat = categories.find(c => c.id.includes('decor'));
  if (decorCat) {
    // Repurposing ceremony florals to reception
    const floralSavings = Math.round(decorCat.allocatedAmount * 0.30);
    tips.push({
      id: 'tip_repurpose_florals',
      title: 'Repurpose Ceremony Arrangements to Reception',
      category: decorCat.name,
      potentialSavings: floralSavings,
      suggestion: `Coordinate with your decorator to transfer ceremony arch florals and aisle arrangements directly to the bridal table and photobooth, saving up to $${floralSavings.toLocaleString()} on duplicate blooms.`,
      difficulty: 'easy'
    });
  }

  // Digital invitations save $300 - $1200 depending on guest count
  const printSavings = Math.round(Math.min(1500, guestCount * 4.5));
  tips.push({
    id: 'tip_digital_stationery',
    title: 'Digital RSVP & High-End QR Experience',
    category: 'Stationery & Printing',
    potentialSavings: printSavings,
    suggestion: `Send beautifully animated digital invites with direct SMS/WhatsApp RSVP tracking. Eliminates calligraphy, heavy paper stocks, wax seals, and return postage, saving roughly $${printSavings.toLocaleString()}.`,
    difficulty: 'easy'
  });

  return tips;
}

/**
 * Format currency with locale and symbol.
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'A$',
  };
  const sym = currencySymbols[currency] || '$';
  return `${sym}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

