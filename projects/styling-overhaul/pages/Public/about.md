# Cursor Task: Refactor about.jsx

## 1. Context & Goal

The "About Us" page should be minimalist, impactful, and focus on the mission. It serves as the "Trust" page for the entire organization.

## 2. Dependencies

- `@/components/ui/card`
- `Users`, `Microscope` from `lucide-react`

## 3. Implementation Steps

### A. Visual Metaphor (The Bridge)

- **Hero:** Use a centered layout. "Connecting Voices to Science."
- **Visual:** If possible, ask Cursor to create a simple CSS/Tailwind visual of two circles (PWS and Researchers) overlapping with "SSStutterBuddy" in the middle.

### B. Core Philosophy

- **Component:** Use a wide, borderless `Card` with a large font size for the main text: "Our platform serves as a bridge..."
- **Highlighting:** Use a `bg-blue-50` highlight or bold text for key phrases like "power of research to improve lives."

### C. The Team / Founder (Optional but recommended)

- If applicable, create a small section for "The Mission" using a shadcn `Card`.
- Mention that this is a non-profit, volunteer-led initiative to build credibility.

### D. Call to Action

- End with two side-by-side `Button` components: "Join as a Participant" and "Post as a Researcher."
- Outer padding: `py-24` to give the content plenty of room to "breathe."
