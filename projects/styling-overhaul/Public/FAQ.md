# Cursor Task: Refactor FAQ.jsx

## 1. Context & Goal

The goal is to modernize the existing `FAQ.jsx` using the established design system in `intent.md`. We are moving from a plain, centered list to a more interactive, breathable, and searchable interface using shadcn/ui components.

## 2. Dependencies

Ensure the following are available/imported:

- `@/components/ui/accordion`
- `@/components/ui/input` (New)
- `@/components/ui/button` (New)
- `@/components/ui/card` (Optional, for item containers)
- `Search` from `lucide-react`

## 3. Implementation Steps

### A. Typography & Theming

- Change the `h1` ("FAQ") font to **Lexend** (using `font-display` or `font-lexend` class).
- Set heading size to `text-5xl` with `font-extrabold` and `tracking-tight`.
- Ensure all paragraph and accordion content text uses **Inter** (`font-sans`) and is set to `text-slate-600`.

### B. Add Search Functionality

- Insert a search section directly below the main heading and above the Accordion.
- **Layout:** Use a `max-w-md mx-auto mb-12`.
- **Component:** Wrap a shadcn `Input` in a relative div. Add the Lucide `Search` icon as a decorative element inside the input or as a prefix.
- **Logic:** (Optional but preferred) Filter the `AccordionItem` list based on a local state `searchQuery`.

### C. Restyle Accordion Items

- **Container:** Change the parent `div` background to `bg-slate-50`.
- **Item Styling:** Remove the white background from the main `Accordion` wrapper.
- **The "Card" Look:** Wrap each `AccordionItem` in a white shadcn `Card` or apply `bg-white border rounded-xl shadow-sm mb-4`.
- **Padding:**
