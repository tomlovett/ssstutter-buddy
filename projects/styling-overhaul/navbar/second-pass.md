# Project: SideNavbar Color Polish

## 1. Objective

Refactor the colors in `SideNavbar.jsx` to move away from the "clinical gray" look. The goal is to implement a **Dual-Tone Blue** theme that feels welcoming and consistent with the SSStutterBuddy brand.

## 2. Color Specifications

### A. Global Sidebar Background (The "Surface")

- **Change:** Replace the current `bg-slate-50` or `bg-white` with a very subtle blue tint.
- **Class:** `bg-blue-50/50` (or `bg-[#f0f4ff]` if using arbitrary values for precision).
- **Reason:** This creates a soft, approachable foundation that is clearly distinct from the white main content area.

### B. Sidebar Header (The "Brand Anchor")

- **Change:** Create a dedicated brand area that pops.
- **Background:** `bg-blue-600` (Primary Brand Color).
- **Text:** `text-white` for the "SSStutterBuddy" logo.
- **Border:** Remove any bottom borders; the color contrast is enough separation.
- **Padding:** Ensure `p-4` or `p-6` to give the white text breathing room.

### C. Navigation Links

- **Inactive State:**
  - **Text/Icon:** `text-slate-600` (Standard readable text).
  - **Hover:** `hover:bg-blue-100 hover:text-blue-700`.
- **Active State (The "Pill"):**
  - **Background:** `bg-white` (Creates a "cutout" card effect against the blue-50 background).
  - **Text/Icon:** `text-blue-700` (High contrast, brand aligned).
  - **Shadow:** Add `shadow-sm` to lift the active item slightly.

### D. Footer / User Profile

- **Background:** `bg-blue-100/50` (Slightly darker than the main sidebar to ground the bottom).
- **Text:** `text-slate-700`.

## 3. Implementation Instructions for Cursor

1.  **Sidebar Container:** Apply `bg-blue-50/50` and `border-r border-blue-100`.
2.  **SidebarHeader:** Apply `bg-blue-600 text-white`.
3.  **SidebarMenuButton (Active):**
    - Logic: `isActive ? 'bg-white text-blue-700 shadow-sm font-medium' : 'text-slate-600 hover:bg-blue-100 hover:text-blue-700'`
4.  **SidebarFooter:** Apply `bg-blue-100/50` (optional, or just leave transparent to match the body).
