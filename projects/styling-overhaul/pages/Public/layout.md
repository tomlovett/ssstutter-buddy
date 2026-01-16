# Cursor Task: Refactor Global Layout & Navigation

## 1. Context & Goal

Replace the minimal layout wrapper with a professional, sticky navigation header and a responsive container. This will provide a consistent user experience across the Home, FAQ, Researchers, and Participants pages.

## 2. Dependencies

- `@/components/ui/navigation-menu`
- `@/components/ui/button`
- `@/components/ui/sheet` (for mobile mobile menu/drawer)
- `Menu`, `X`, `Globe` from `lucide-react`

## 3. Implementation Steps

### A. Sticky Header Component

- **Structure:** Create a `<header>` element that is `sticky top-0 z-50`.
- **Styling:** - `w-full border-b border-slate-200`
  - `bg-white/80 backdrop-blur-md`
- **Inner Container:** `max-w-7xl mx-auto px-4 h-16 flex items-center justify-between`.

### B. Navigation Elements

- **Left (Logo):** A simple text logo "SSStutterBuddy" or a placeholder for an SVG icon. Use `font-display` (Lexend) and `font-bold`.
- **Center (Desktop Nav):** Use shadcn `NavigationMenu`.
  - Links: **View Studies**, **FAQ**, **For PWS**, **For Researchers**, **About Us**, **Contact Us**.
  - Hover state: Subtle background tint or underline.
- **Right (CTAs):**
  - "Login" (Button variant: ghost).
  - "Sign Up" (Button variant: default).

### C. Responsive Mobile Menu

- **Logic:** Hide the central links on small screens and show a shadcn `Sheet` (Drawer) triggered by a `Menu` icon.
- **Mobile Links:** Stack the navigation links vertically within the drawer for easy thumb access.

### D. Main Content Area

- Update the `<main>` tag from the current snippet:
  - Remove the hardcoded `py-12` from the layout wrapper; padding should be managed by individual pages to allow for full-width hero sections.
  - Keep `flex-1` to ensure the footer stays at the bottom on short pages.

## 4. Technical Specs for Cursor

- **Z-Index:** Ensure the header is `z-50` so it stays above all page content.
- **Transition:** Add a subtle transition to the header background if the user scrolls.
- **Active State:** Highlight the current active route in the navigation menu using a slightly bolder text weight or a different color (`text-blue-600`).

## 5. Components to Import

- `import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"`
- `import { Button } from "@/components/ui/button"`
- `import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"`
