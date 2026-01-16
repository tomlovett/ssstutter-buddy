# UI/UX Overhaul Intent: SSStutterBuddy.com (shadcn/ui Optimized)

## 1. Project Objective

Transition the current text-heavy, centered-column layout into a modern platform using shadcn/ui components. Focus on visual hierarchy and accessibility while maintaining the site's non-profit mission.

## 2. Documentation Structure & Workflow

To ensure precision during implementation, this overhaul follows a modular documentation strategy:

- **Master Intent:** This file (`intent.md`) serves as the high-level visual and technical North Star.
- **Page-Specific Implementation Docs:** Each individual page will have its own dedicated guidance file located in `../pages/`.
- **Workflow:** Cursor should reference the specific file in `../pages/[page-name].md` when working on a particular route to ensure all component logic and layout specs are followed exactly.

## 3. Updated Tech Stack Integration

- **Framework:** React / Next.js
- **Styling:** Tailwind CSS (Utility-first)
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React (standard with shadcn)

---

## 3. Revised Page Layouts (Component-Specific)

### Header (Global)

- **Component:** shadcn `Navigation Menu`.
- **Logic:** Move links from the footer to a sticky `header` element.
- **Style:** Use `blur-md` background with a subtle bottom border. Use `Button` (variant: ghost) for secondary links and `Button` (variant: default) for "Sign Up".

### Home Page (Hero & Layout)

- **Hero:** A custom `<section>` using Tailwind flexbox/grid.
- **Content Blocks:** Use shadcn `Card` components for the "For PWS" and "For Researchers" sections.
- **Recent Studies:** A list of `Card` components with `Badge` (variant: outline) for status tags like "Paid" or "Remote".

### FAQ Page

- **Component:** shadcn `Accordion`.
- **Refinement:** Replace the current flat list with a `type="single" collapsible` Accordion. This is a native shadcn component and will immediately fix the "wall of text" issue.

### For PWS / For Researchers

- **Component:** shadcn `Tabs`.
- **Logic:** If we want to keep the info compact, use a `Tabs` component to toggle between "Participant Info" and "Researcher Info".
- **Visuals:** Use shadcn `Alert` or `Callout` components to highlight the "Free-to-use" and "Compensation" notes.

### Contact Page

- **Component:** shadcn `Form` (built with `react-hook-form` and `zod`).
- **Layout:** Two-column layout using Tailwind `grid-cols-1 md:grid-cols-2`. Use `Input` and `Textarea` components for a clean, uniform look.

---

## 4. Implementation Strategy for Cursor

1. **Theme Initialization:** Update `globals.css` with shadcn CSS variables (Primary: Blue/Indigo).
2. **Component Generation:** Command Cursor to `npx shadcn-ui@latest add accordion card button navigation-menu badge tabs`.
3. **Layout Refactor:** Wrap existing content in the new layout components.
4. **Spacing:** Use Tailwind's standard spacing scale (`gap-8`, `py-20`) to replace custom CSS.
