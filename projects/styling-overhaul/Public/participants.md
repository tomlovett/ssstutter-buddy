# Cursor Task: Refactor participants.jsx

## 1. Context & Goal

The goal is to create a high-trust, welcoming environment for People Who Stutter (PWS). The design should feel supportive and easy to navigate.

## 2. Dependencies

- `@/components/ui/card`
- `@/components/ui/button`
- `UserPlus`, `Search`, `Bell`, `CreditCard`, `Heart` from `lucide-react`

## 3. Implementation Steps

### A. Hero Section

- Change "For People Who Stutter (PWS)" to Lexend `text-5xl`.
- Use a warmer primary color accent (e.g., Indigo or Teal) for this page to feel more approachable.

### B. The Roadmap (How it Works)

- **Component:** Replace the bulleted list with a horizontal "Process Map" on desktop and vertical on mobile.
- **Steps:**
  1. **Create Account:** (Icon: `UserPlus`)
  2. **Browse:** (Icon: `Search`)
  3. **Get Notified:** (Icon: `Bell`)
  4. **Connect & Complete:** (Icon: `Heart`)
  5. **Earn:** (Icon: `CreditCard`)

### C. "Why Participate?" Section

- **Layout:** A 2-column grid of shadcn `Card` components.
- **Styling:** Each card should have a small icon in the top right corner.
- **Points:** - Experience & Research (Use clinical icons)
  - Community Impact (Use heart icon)
  - Treatment & Therapy (Use medical icon)
  - Compensation (Use cash/coin icon)

### D. Typography & Spacing

- Ensure `line-height` is generous (`leading-relaxed`) for better readability.
- Outer container: `bg-white`, Section dividers: `border-t border-slate-100`.
