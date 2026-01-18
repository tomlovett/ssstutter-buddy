# Implementation Guide: Home Page Overhaul

## 1. Objective

Refactor `home.jsx` from a single-column text layout to a modern, multi-section landing page using **shadcn/ui** components.

## 2. Structural Requirements

### A. Global Layout & Navigation

- **Sticky Header:** Replace the top-level padding with a `<header>` containing the shadcn `NavigationMenu`.
  - Background: `bg-white/80` with `backdrop-blur-md`.
  - Links: View Studies, FAQ, For PWS, For Researchers, Contact Us.
  - Right Side: "Login" (Ghost Button) and "Sign up" (Default Button).
- **Footer:** Retain `<PublicFooter />` but ensure it matches the new site theme.

### B. Hero Section (Top)

- **Grid:** Use a 2-column grid (`grid-cols-1 lg:grid-cols-2`).
- **Left Column:** - Heading: `text-5xl font-extrabold tracking-tight` (Font: Lexend).
  - Subtext: Use the existing "free, non-profit platform" description.
  - CTAs: Primary "Sign up today!" and secondary "View Studies" buttons.
- **Right Column:** - Visual: Place a descriptive SVG or a themed illustration placeholder representing "Research & Community."

### C. Value Proposition Section (Middle)

- **Container:** 3-column grid of shadcn `Card` components.
- **Card 1 (The Problem):** "The Missing Link." Explain that finding participants is the biggest impediment to research.
- **Card 2 (For PWS):** "Make an Impact." Mention supporting researchers and advancing treatment.
- **Card 3 (The Bonus):** "Get Compensated." Highlight that most studies pay for time and effort.

### D. Bottom "Quick Start" Section

- **Component:** Use a shadcn `Alert` or a centered narrow `Card`.
- **Content:** The "Don't have an account? You can still view studies" text.
- **Style:** Subtle background (`bg-slate-50`) to separate it from the main body.

## 3. Technical Specs for Cursor

- **Typography:** Apply `font-sans` (Inter) for body and `font-display` (Lexend) for headings.
- **Colors:** Use `text-slate-900` for primary text and `text-slate-600` for secondary.
- **Spacing:** Replace `py-12` with `py-20` or `py-24` to create more whitespace between sections.
- **Buttons:** Use shadcn `<Button size="lg">` for all primary actions.

## 4. Components to Import

- `import { Button } from "@/components/ui/button"`
- `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"`
- `import { NavigationMenu } from "@/components/ui/navigation-menu"`
