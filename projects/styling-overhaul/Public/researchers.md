# Cursor Task: Refactor researchers.jsx

## 1. Context & Goal

Modernize the Researcher landing page to look professional and clinical. Transition from basic shadow boxes to a high-utility, card-based layout using shadcn/ui.

## 2. Dependencies

- `@/components/ui/card`
- `@/components/ui/badge`
- `@/components/ui/button`
- `Zap`, `ShieldCheck`, `Globe`, `Mail` from `lucide-react`

## 3. Implementation Steps

### A. Hero Section

- Change "For Researchers" to `font-display` (Lexend), `text-5xl`, `font-extrabold`.
- Center the subheadline and use `text-slate-600`.
- Background: Use a very subtle grid pattern or `bg-slate-50`.

### B. "How It Works" Flow

- **Visual:** Replace the bulleted list with a responsive grid of 3-4 shadcn `Card` components or a vertical step indicator.
- **Content Mapping:**
  1. **Post Study:** Use `Zap` icon. Mention location and methodology.
  2. **Smart Invites:** Use `Globe` icon. Highlight the 100-mile automated invitation logic.
  3. **Digital Friendly:** Use `Mail` icon. Mention the "Digital-Friendly" section and weekly digest.
  4. **Direct Connection:** Use `ShieldCheck` icon. Mention the email connection logic.

### C. Fraud Prevention Section

- **Component:** Use a single large `Card` with a subtle `border-blue-100` and `bg-blue-50/30`.
- **Title:** "Research Integrity & Fraud Prevention" (Lexend, `text-2xl`).
- **Feature Items:** Use `Badge` components for the "Study Completion Badges" mention and a code-styled span for the "Six-digit PIN" feature.

### D. Call to Action

- Add a prominent "Start Your Study" `Button` (variant: default, size: lg) at the bottom.
