# UI/UX Overhaul: Authentication & Onboarding
## shadcn/ui Optimized

---

## 1. Project Objective

Modernize the authentication flow and post-registration onboarding pages. The goal is to replace the current standard HTML forms and basic layouts with high-trust, centered card interfaces using shadcn/ui, consistent with the established slate and blue design system.

---

## 2. Global Auth Layout Refactor

**File:** `app/frontend/components/Layout/Layout.jsx`

### Background
Update the `isAuthRoute` wrapper to use:
- `min-h-screen bg-slate-50 flex items-center justify-center p-4`

### Layout Structure
- Use a 2-column grid (`grid-cols-1 lg:grid-cols-2`) where appropriate
- Or a centered single column for focused tasks

### PublicHeader
- Ensure the `PublicHeader` is present
- Consider a "minimalist" version for auth routes to keep users focused on the form

---

## 3. Page-Specific Implementations

### Login (`/login`) & Sign Up (`/signup`)

#### Container
- Use a shadcn `Card` component with a `max-w-md` width

#### Typography
- **Headings:** `text-3xl font-extrabold tracking-tight font-display text-slate-900` (Font: Lexend)
- **Body/Labels:** `font-sans text-slate-600` (Font: Inter)

#### Form Components
- Replace custom styled inputs with shadcn `Form`, `FormControl`, `FormItem`, and `FormLabel`

#### Sign Up Context
- Use a shadcn `Alert` (variant: info) to wrap the researcher/participant email instructions currently in the `Label` tags of `signup.jsx`

#### Actions
- Standardize primary buttons to `bg-blue-600 hover:bg-blue-700` using shadcn `<Button size="lg">`

---

### Forgot Password (`/forgot-password`)

#### Component
- Use shadcn `Card`

#### Success State
- Upon submission, use a shadcn `Alert` with a `MailCheck` icon to display the "login instructions sent" message
- Do not force a full page redirect

#### Navigation
- Ensure the "Back to login" link uses `Button variant="link"` for a cleaner look

---

### Await Confirmation (`/await-confirmation`)

#### Layout
- Remove the `bg-gray-100` and use the centralized `AuthLayout`

#### Visuals
- Add a large `MailOpen` icon (Lucide) above the "Account created!" heading to provide immediate visual context

#### Input Styling
- Convert the native email input to a shadcn `Input` component

#### Action
- Style "Resend confirmation email" as a `Button variant="outline"`

---

### Confirm Provisional (`/confirm-provisional`)

#### Structure
- Wrap the current text in a `Card` centered on the page

#### Visuals
- Add a `CheckCircle2` icon in green to signify successful progress

#### Navigation
- Update "Back to Home Page" to a standard button or a high-visibility link centered at the bottom

---

### Change Password (`/change-password`)

#### Consistency
- Refactor to use the same `max-w-md` `Card` layout as Login/Signup instead of the custom flex column

#### Cancel Action
- Update the "Cancel" link to use `Button variant="ghost"` or `variant="outline"` for better visual hierarchy against the "Change Password" submit button

---

## 4. Technical Specs & Components

### A. Technical Standards

#### Typography
- Apply `font-sans` (Inter) for body text
- Apply `font-display` (Lexend) for headings

#### Colors
- Use `text-slate-900` for primary text
- Use `text-slate-600` for secondary text

#### Spacing
- Utilize `py-20` or `py-24` to create professional whitespace between sections

---

### B. Components to Import

```javascript
import { Button } from "@/components/ui/button"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
```

---

### C. Implementation Checklist

1. **Initialize Components**
   - Ensure `form`, `label`, `input`, `alert`, and `card` are added via `npx shadcn-ui@latest`

2. **Typography Mapping**
   - Replace all instances of `text-gray-900` with `text-slate-900`
   - Replace all instances of `text-indigo-600` with `text-blue-600`

3. **Loading States**
   - Add `disabled={form.formState.isSubmitting}` to all submit buttons to prevent double-posts

4. **Zod Integration**
   - Maintain existing `zodResolver` logic
   - Ensure `FormMessage` is used to display errors
