import assert from 'node:assert';
import { calculateBudget, EVENT_BENCHMARKS } from '../src/services/budgetCalculator.js';

console.log('--- RUNNING BUDGET CALCULATOR UNIT TESTS ---');

// Test 1: Wedding Budget Calculation
const weddingBudget = 25000;
const weddingGuests = 120;
const weddingResult = calculateBudget(weddingBudget, 'wedding', weddingGuests);

assert.strictEqual(weddingResult.totalBudget, 25000, 'Total budget should match input');
assert.strictEqual(weddingResult.costPerGuest, Math.round((25000 / 120) * 100) / 100, 'Cost per guest calculation');

// Verify categories sum + contingency equals total budget
const categorySum = weddingResult.categories.reduce((acc, c) => acc + c.allocatedAmount, 0);
const fullSum = categorySum + weddingResult.contingencyAmount;
console.log(`Wedding: Category sum: $${categorySum}, Contingency: $${weddingResult.contingencyAmount}, Total: $${fullSum}`);
assert.ok(Math.abs(fullSum - weddingBudget) < 1.0, 'Total sum should match budget within floating point cent tolerance');

// Test 2: Birthday Budget Calculation
const bdayBudget = 3000;
const bdayGuests = 40;
const bdayResult = calculateBudget(bdayBudget, 'birthday', bdayGuests);
assert.strictEqual(bdayResult.totalBudget, 3000);
assert.strictEqual(bdayResult.costPerGuest, 75);
assert.ok(bdayResult.costSavingTips.length > 0, 'Should generate programmatic cost saving tips');

// Test 3: Custom Category Ratios
const customResult = calculateBudget(10000, 'corporate', 50, {
  venue_conference: 40,
  catering_executive: 30,
  av_hybrid: 15,
  branding_collateral: 5
});
const customSum = customResult.categories.reduce((acc, c) => acc + c.allocatedAmount, 0);
assert.strictEqual(customSum, 9000, 'Custom categories should sum to 90% ($9000)');
assert.strictEqual(customResult.contingencyAmount, 1000, 'Contingency should automatically be 10% ($1000)');

console.log('✅ ALL BUDGET CALCULATOR TESTS PASSED SUCCESSFULLY!');

