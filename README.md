# 🧞 EventGenie AI
> **GenAI-Powered Intelligent Event Architecture & Smart Budget Planning**

EventGenie AI is a production-ready, full-stack event planning assistant designed to help everyday organizers, couples, student committees, and event producers plan memorable celebrations—from dream weddings and milestone birthdays to university hackathons and community festivals.

It combines **Google Gemini generative intelligence** for creative themes, custom schedules, vendor checklists, and contingency playbooks with a **deterministic programmatic financial engine** that ensures 100% mathematical accuracy on budget allocations, contingency buffers, and cost-saving calculations.

---

## 🌟 Key Features

### 1. 🤖 AI Event Architect (Google Gemini 1.5 / 2.5 Flash)
- **Multi-Event Type Specialization:** Pre-configured profiles for **Weddings**, **Birthday Bashes**, **College Hackathons/Fests**, **Corporate Summits**, **Community Fairs**, and **Milestone Anniversaries**.
- **Context-Aware Blueprinting:** Integrates destination, guest count, duration, budget cap, custom aesthetic theme, and dietary needs.
- **Executive Vision Statement:** Generates an executive event brief articulating guest journey and execution philosophy.

### 2. 💰 Smart Deterministic Budget Planner (Zero Hallucinated Math)
- **Programmatic Allocation Engine:** Allocates budget using industry benchmarks (Venue, Catering, AV/Production, Decor/Florals, Entertainment, Attire/Swag, and Contingency).
- **Exact Financial Floating Precision:** Guarantees arithmetic consistency down to floating-point cents with automatic contingency calculation (`Contingency = Total Budget - Category Sum`).
- **Dynamic Real-Time Reallocation:** Users can adjust sliders or edit individual category allocations; total allocated, cost-per-guest, and safety buffers update instantly with live over-budget alerts.
- **Programmatic Cost-Saving Opportunities:** Financial optimization engine calculates exact dollar/euro/rupee savings for tactics like buffet vs. plated dining, BYOB corkage licenses, floral repurposing, and digital RSVP stationery.

### 3. ⏱️ Milestone Preparation Timeline & Countdown
- **Phased Roadmap:** Organized into 12-8 Weeks Prior (Foundation), 6-4 Weeks Prior (Coordination), 2-1 Weeks Prior (Final Details), and Day-of Execution.
- **Priority Badging:** Critical, High, Medium, Low badges with operational deadline notes.
- **Interactive Checklists & Celebration:** Live completion progress bar with celebratory confetti animations upon milestone completion.

### 4. 🤝 Vendor Procurement Matrix & Pipeline
- **Status Pipeline Tracking:** Move vendors smoothly across `Researching` → `Contacted` → `Negotiating` → `Contract Booked` → `Deposit Paid`.
- **Committed Expenditure Tracker:** Real-time calculation of contracted amounts vs. remaining budget.
- **Contact & Role Repository:** Centralized notes, phone/email directory, and inclusion checklists.

### 5. 🎨 Creative Direction & Aesthetic Moodboard
- **Color Swatches:** Interactive color palette with 1-click Hex code copy to clipboard for decorators and design agencies.
- **Scenic Decor & Signature Touches:** Tailored experiential ideas and sensory details.
- **Atmospheric Progression:** Curated musical and lighting suggestions for each phase of the event.
- **Ready-to-Send Invitation Copy:** Drafted invitation headline, body text, and RSVP instructions with 1-click clipboard export.

### 6. 📋 Day-of Master Run-of-Show (Cue Sheet)
- Minute-by-minute operational run sheet with time stamps, activity descriptions, lead coordinators, locations, and stage/AV cues.
- Fully editable schedule with instant addition or removal of production cues.

### 7. 🛡️ Risk Management & Contingency Playbook
- Concrete backup plans for **Adverse Weather**, **Technical AV / Power Outages**, **Guest Headcount Surges**, **Last-Minute Vendor No-Shows**, and **Health/Safety Protocols**.

### 8. 💬 Genie Co-Pilot (Interactive AI Chat Assistant)
- In-dashboard conversation partner aware of your specific active event parameters.
- Ask questions like *"How can I cut $2,000 from catering?"*, *"Draft an email to the venue manager"*, or *"What icebreakers work for 150 college students?"*.

### 9. 📤 Universal Export & Persistence
- **1-Click Print / PDF:** Pre-formatted print stylesheet for client proposals or stage manager binders.
- **Markdown (.md):** Formatted documentation for Notion, Obsidian, GitHub, or emails.
- **JSON Data Package:** Complete machine-readable data snapshot for backups and migrations.
- **LocalStorage Multi-Event Management:** Save multiple blueprints, switch seamlessly between them, or load 1-click demo presets.

---

## 🛠️ Tech Stack & Architecture

- **Frontend & UI:** React 18, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti.
- **Build System:** Vite 6 with ultra-fast ESBuild and Rollup production bundling.
- **Generative AI:** Google Gemini API (`@google/generative-ai` - Gemini 1.5 Flash / Gemini 2.5 Flash).
- **Financial Architecture:** Deterministic TypeScript calculation engine with automated boundary unit testing.
- **Zero-Dependency Cloud Deployability:** Client-side architecture runs anywhere (Google Cloud Run, Firebase Hosting, Vercel, Netlify, GitHub Pages, or Docker).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone or navigate to the project directory
cd event-planner

# Install dependencies
npm install

# Run automated tests
npm test

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Configuring Google Gemini API Key
EventGenie AI is designed to be frictionless:
1. **With an API Key:** Click the **API Key** button in the top navigation bar, paste your Google AI Studio key, and click Save. The key is stored locally in your browser's `localStorage` and never shared externally.
2. **Without an API Key (Demo Mode):** EventGenie includes an intelligent deterministic fallback generator with rich contextual data for every event type. Every screen, calculator, slider, checklist, and export is 100% functional out of the box!

---

## 🧪 Verified Automated Test Results

The mathematical precision of the budget calculation engine was verified using automated unit tests (`npm test`):
```text
🧪 Starting EventGenie AI Automated Test Suite...

Test 1: Wedding ($35,000 for 150 guests)
- Allocated: $32900
- Contingency (6%): $2100
- Cost per guest: $233.33
  -> PASS ✅

Test 2: Birthday ($4,000 for 50 guests)
- Cost per guest: $80
  -> PASS ✅

Test 3: College Hackathon ($12,000 for 200 students with custom ratios)
  -> PASS ✅

Test 4: Odd numbers and fractional cents handling ($13,333.33 for 77 guests)
- Cost per guest: $173.16
  -> PASS ✅

🎉 ALL 4 CORE PROGRAMMATIC BUDGET & CALCULATION TESTS PASSED!
```

---

## 📄 License
MIT License. Built with passion for hackathon innovation.

