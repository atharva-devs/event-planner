import assert from 'node:assert';

// Verified Budget Calculation Engine Test
const EVENT_BENCHMARKS = {
  wedding: [
    { id: 'venue_rentals', name: 'Venue & Rentals', ratio: 0.30 },
    { id: 'catering_beverage', name: 'Food & Beverage', ratio: 0.28 },
    { id: 'photography_video', name: 'Photography & Cinema', ratio: 0.12 },
    { id: 'decor_florals', name: 'Decor & Florals', ratio: 0.10 },
    { id: 'music_entertainment', name: 'Music & Entertainment', ratio: 0.08 },
    { id: 'attire_beauty', name: 'Attire & Beauty', ratio: 0.06 }
  ],
  birthday: [
    { id: 'venue_party', name: 'Venue & Space Hire', ratio: 0.25 },
    { id: 'catering_drinks', name: 'Food & Drinks', ratio: 0.35 },
    { id: 'cake_desserts', name: 'Custom Cake & Treats', ratio: 0.08 },
    { id: 'decor_balloons', name: 'Decor & Balloons', ratio: 0.12 },
    { id: 'entertainment_games', name: 'DJ & Games', ratio: 0.12 }
  ],
  college: [
    { id: 'venue_stage', name: 'Auditorium & Staging', ratio: 0.20 },
    { id: 'av_production', name: 'Audio/Visual & Lighting', ratio: 0.22 },
    { id: 'refreshments', name: 'Food & Refreshments', ratio: 0.26 },
    { id: 'marketing_swag', name: 'Swag & Badges', ratio: 0.14 },
    { id: 'prizes_speakers', name: 'Prizes & Honorarium', ratio: 0.10 }
  ]
};

function calculateBudget(totalBudget, eventType, guestCount, customRatios) {
  const safeBudget = Math.max(0, totalBudget);
  const safeGuests = Math.max(1, guestCount);
  const benchmarks = EVENT_BENCHMARKS[eventType] || EVENT_BENCHMARKS.wedding;

  let totalAllocatedPercentage = 0;

  const categories = benchmarks.map((bm) => {
    const pct = customRatios && customRatios[bm.id] !== undefined
      ? customRatios[bm.id]
      : Math.round(bm.ratio * 100);

    totalAllocatedPercentage += pct;
    const allocatedAmount = Math.round((safeBudget * (pct / 100)) * 100) / 100;

    return {
      id: bm.id,
      name: bm.name,
      percentage: pct,
      allocatedAmount,
    };
  });

  const contingencyPercentage = Math.max(0, 100 - totalAllocatedPercentage);
  const contingencyAmount = Math.round((safeBudget * (contingencyPercentage / 100)) * 100) / 100;
  const allocatedTotal = categories.reduce((sum, c) => sum + c.allocatedAmount, 0);
  const remainingBuffer = Math.round((safeBudget - allocatedTotal - contingencyAmount) * 100) / 100;
  const costPerGuest = Math.round((safeBudget / safeGuests) * 100) / 100;

  return {
    totalBudget: safeBudget,
    allocatedTotal,
    contingencyAmount,
    contingencyPercentage,
    remainingBuffer,
    costPerGuest,
    categories,
  };
}

console.log('🧪 Starting EventGenie AI Automated Test Suite...\n');

// Test 1: Wedding Budget
const wedding = calculateBudget(35000, 'wedding', 150);
console.log('Test 1: Wedding ($35,000 for 150 guests)');
console.log(`- Allocated: $${wedding.allocatedTotal}`);
console.log(`- Contingency (${wedding.contingencyPercentage}%): $${wedding.contingencyAmount}`);
console.log(`- Cost per guest: $${wedding.costPerGuest}`);
assert.strictEqual(wedding.totalBudget, 35000);
assert.strictEqual(wedding.costPerGuest, 233.33);
assert.ok(Math.abs((wedding.allocatedTotal + wedding.contingencyAmount) - 35000) < 1.0);
console.log('  -> PASS ✅\n');

// Test 2: Birthday Budget
const birthday = calculateBudget(4000, 'birthday', 50);
console.log('Test 2: Birthday ($4,000 for 50 guests)');
console.log(`- Cost per guest: $${birthday.costPerGuest}`);
assert.strictEqual(birthday.costPerGuest, 80);
assert.strictEqual(birthday.contingencyPercentage, 8);
console.log('  -> PASS ✅\n');

// Test 3: College Hackathon with Custom Allocations
console.log('Test 3: College Hackathon ($12,000 for 200 students with custom ratios)');
const hackathon = calculateBudget(12000, 'college', 200, {
  venue_stage: 15,
  av_production: 25,
  refreshments: 35,
  marketing_swag: 15,
  prizes_speakers: 5
});
assert.strictEqual(hackathon.contingencyPercentage, 5);
assert.strictEqual(hackathon.costPerGuest, 60);
const sumAllocated = hackathon.categories.reduce((acc, c) => acc + c.allocatedAmount, 0);
assert.strictEqual(sumAllocated, 11400); // 95% of 12,000
assert.strictEqual(hackathon.contingencyAmount, 600); // 5% of 12,000
console.log('  -> PASS ✅\n');

// Test 4: Floating Point Boundary Test
console.log('Test 4: Odd numbers and fractional cents handling ($13,333.33 for 77 guests)');
const odd = calculateBudget(13333.33, 'wedding', 77);
assert.ok(!isNaN(odd.costPerGuest));
assert.ok(!isNaN(odd.allocatedTotal));
assert.ok(!isNaN(odd.contingencyAmount));
console.log(`- Cost per guest: $${odd.costPerGuest}`);
console.log('  -> PASS ✅\n');

console.log('🎉 ALL 4 CORE PROGRAMMATIC BUDGET & CALCULATION TESTS PASSED!');

