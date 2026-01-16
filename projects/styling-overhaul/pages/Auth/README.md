# Authentication Pages UI Overhaul - Technical Documentation

## Overview

This document provides a comprehensive technical reference for the authentication pages UI overhaul implemented in this commit. The changes modernize all authentication-related pages by replacing custom HTML layouts with shadcn/ui components, implementing a consistent design system using slate and blue color schemes, and standardizing typography using Lexend (headings) and Inter (body) fonts.

## Architecture Changes

### Global Layout Refactoring

**File:** `app/frontend/components/Layout/Layout.jsx`

#### Before
```jsx
if (isAuthRoute) {
  return (
    <div>
      <Head />
      <main className="p-6 justify-center">{children}</main>
      <Toaster />
    </div>
  )
}
```

#### After
```jsx
if (isAuthRoute) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Head />
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>
      <Toaster />
    </div>
  )
}
```

#### Key Changes:
1. **Layout Structure**: Changed from simple div to flexbox column layout with `min-h-screen bg-slate-50 flex flex-col`
2. **PublicHeader Integration**: Added `PublicHeader` component to provide consistent navigation across auth pages
3. **Centering Logic**: Moved centering from individual pages to Layout component using `flex-1 flex items-center justify-center p-4`
4. **Background Color**: Applied `bg-slate-50` for consistent background across all auth routes

#### Technical Rationale:
- Centralizes layout logic, removing redundant centering code from individual pages
- Ensures consistent header presence across all authentication flows
- Provides proper vertical centering using flexbox without requiring individual page wrappers
- The `flex-1` on main ensures it takes available space, allowing proper vertical centering

---

## Page-Specific Implementations

### 1. Login Page (`app/frontend/pages/u/login.jsx`)

#### Structural Changes

**Before:**
```jsx
<div className="flex min-h-screen items-center justify-center">
  <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
    {/* content */}
  </div>
</div>
```

**After:**
```jsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
      Sign in to your account
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

#### Typography Updates

**Heading:**
- **Before**: `text-3xl font-bold tracking-tight text-gray-900`
- **After**: `text-3xl font-extrabold tracking-tight font-display text-slate-900`
- **Changes**: 
  - `font-bold` → `font-extrabold` (increased weight)
  - `text-gray-900` → `text-slate-900` (color system migration)
  - Added `font-display` (Lexend font family)

**Body Text:**
- **Before**: `text-sm text-gray-600`
- **After**: `font-sans text-slate-600`
- **Changes**:
  - `text-gray-600` → `text-slate-600` (color system migration)
  - Added explicit `font-sans` (Inter font family)

#### Color System Migration

**Links:**
- **Before**: `text-indigo-600 hover:text-indigo-500`
- **After**: `text-blue-600 hover:text-blue-500`
- **Rationale**: Aligns with design system using blue as primary accent color

#### Button Updates

**Before:**
```jsx
<Button type="submit" className="w-full">
  Sign in
</Button>
```

**After:**
```jsx
<Button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700"
  size="lg"
  disabled={form.formState.isSubmitting}
>
  Sign in
</Button>
```

**Changes:**
- Added explicit color classes: `bg-blue-600 hover:bg-blue-700`
- Added `size="lg"` for consistent button sizing
- Added `disabled={form.formState.isSubmitting}` to prevent double submissions

#### Removed Elements

1. **"Or create a new account" link** - Removed from CardHeader (simplified UI)
2. **Footer navigation links** - Removed "Back to homepage" and "View studies anonymously" links (streamlined focus)

#### Component Imports Added
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
```

---

### 2. Signup Page (`app/frontend/pages/u/signup.jsx`)

#### Structural Changes

**Before:**
```jsx
<div className="flex min-h-screen items-center justify-center">
  <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
    {/* content */}
  </div>
</div>
```

**After:**
```jsx
<Card className="w-full max-w-md">
  <CardHeader>
    <ModalHeader />
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

#### Alert Component Integration

**Before:**
```jsx
<div className="space-y-4 text-sm text-gray-600">
  <div>
    <Label>
      If you plan to sign up as both researcher <b>and</b> participant...
    </Label>
    <br />
    <br />
    <Label>
      If you are signing up as a researcher...
    </Label>
  </div>
</div>
```

**After:**
```jsx
<Alert variant="info">
  <AlertDescription className="font-sans text-slate-600">
    <div className="space-y-2">
      <p>
        If you are signing up as a <strong>researcher</strong>, please use an email address
        associated with your institution.
      </p>
      <p>
        If you plan to sign up as both <strong>researcher</strong> and{' '}
        <strong>participant</strong>, use two separate email addresses to create two separate
        accounts.
      </p>
    </div>
  </AlertDescription>
</Alert>
```

**Key Changes:**
- Wrapped instructions in `Alert` component with `variant="info"`
- Reordered content (researcher instructions first, then both roles)
- Changed `<b>` tags to `<strong>` for semantic HTML
- Improved spacing with `space-y-2` instead of `<br />` tags
- Applied `font-sans text-slate-600` for consistent typography

#### Button Updates

**Cancel Button:**
- **Before**: Custom styled link with `bg-gray-100 hover:bg-gray-200`
- **After**: `Button variant="outline" asChild` wrapping Link component
- **Rationale**: Better visual hierarchy and consistency with design system

**Submit Button:**
- Added `bg-blue-600 hover:bg-blue-700`
- Added `size="lg"`
- Added `disabled={form.formState.isSubmitting}`

#### Typography Updates

**Heading:**
- Updated to `text-3xl font-extrabold tracking-tight font-display text-slate-900`
- Removed "Already have an account? Sign in" link from header

#### Component Imports Added
```jsx
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
```

**Note:** `CardTitle` import was removed as it's not used (heading is in ModalHeader component)

---

### 3. Forgot Password Page (`app/frontend/pages/u/forgot-password.jsx`)

#### State Management Addition

**New State:**
```jsx
const [isSubmitted, setIsSubmitted] = useState(false)
```

**Purpose:** Tracks form submission to conditionally render success Alert instead of form

#### Success State Implementation

**Before:**
```jsx
await postRequest('/forgot-password', data).then(() => {
  toast('If an account exists with this email, you will receive login instructions.', {
    duration: 5000,
  })
})
```

**After:**
```jsx
const onSubmit = async data => {
  try {
    await postRequest('/forgot-password', data).then(() => {
      setIsSubmitted(true)
    })
  } catch (_error) {
    // Error handling can be added here if needed
  }
}
```

**Conditional Rendering:**
```jsx
{isSubmitted ? (
  <Alert variant="info" className="mb-6">
    <MailCheck className="h-4 w-4" />
    <AlertDescription className="font-sans text-slate-600">
      If an account exists with this email, you will receive login instructions.
    </AlertDescription>
  </Alert>
) : (
  <Form {...form}>
    {/* form content */}
  </Form>
)}
```

**Key Changes:**
- Replaced toast notification with inline Alert component
- Added `MailCheck` icon from lucide-react for visual context
- Alert persists on page (no auto-dismiss)
- Better UX: user sees confirmation without page redirect

#### Structural Changes

**Before:**
```jsx
<div className="flex min-h-screen items-center justify-center">
  <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
    <div>
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Reset your password
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Enter your email address and we'll send you an email to reset your password.
      </p>
    </div>
    {/* form */}
  </div>
</div>
```

**After:**
```jsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
      Reset your password
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* conditional content */}
  </CardContent>
</Card>
```

**Removed:**
- Descriptive paragraph text from CardHeader (user modification)
- Outer wrapper div with centering (handled by Layout)

#### Navigation Link Update

**Before:**
```jsx
<Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
  Back to login
</Link>
```

**After:**
```jsx
<Button variant="link" asChild>
  <Link href="/login" className="font-medium text-blue-600">
    Back to login
  </Link>
</Button>
```

**Changes:**
- Wrapped in Button component with `variant="link"`
- Updated color from `text-indigo-600` to `text-blue-600`
- Removed `hover:text-indigo-500` (handled by Button variant)

#### Button Width Modification

**User Modification:**
- Button width changed from `w-full` to `w-1/2` (half-width button)

#### Component Imports Added
```jsx
import { useState } from 'react'
import { MailCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
```

---

### 4. Await Confirmation Page (`app/frontend/pages/u/await-confirmation.jsx`)

#### Layout Cleanup

**Before:**
```jsx
<div className="min-h-screen bg-gray-100">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
  <PublicFooter />
</div>
```

**After:**
```jsx
<Card className="w-full max-w-md">
  <CardHeader className="text-center">
    {/* content */}
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

**Removed:**
- `min-h-screen bg-gray-100` (handled by Layout component)
- `PublicFooter` component (not needed in auth layout)
- Custom max-width container with padding

#### Icon Integration

**Added:**
```jsx
<div className="flex justify-center mb-4">
  <MailOpen className="h-16 w-16 text-blue-600" />
</div>
```

**Purpose:**
- Provides immediate visual context for "check your email" action
- Large icon (64x64px) draws attention
- Blue color matches design system

#### Input Component Migration

**Before:**
```jsx
<input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-4"
  placeholder="Email"
/>
```

**After:**
```jsx
<Input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  placeholder="Email"
/>
```

**Benefits:**
- Consistent styling with other form inputs
- Automatic focus states and accessibility
- Reduced custom CSS

#### Button Update

**Before:**
```jsx
<button
  onClick={handleResend}
  className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  Resend confirmation email
</button>
```

**After:**
```jsx
<Button onClick={handleResend} variant="outline" className="w-full">
  Resend confirmation email
</Button>
```

**Changes:**
- Replaced custom button with shadcn Button component
- Changed to `variant="outline"` for secondary action styling
- Full width (`w-full`) for better mobile UX
- Simplified code (removed 100+ characters of custom classes)

#### Typography Updates

**Heading:**
- Updated to `text-3xl font-extrabold tracking-tight font-display text-slate-900`
- Body text updated to `font-sans text-slate-600`

#### Component Imports Added
```jsx
import { MailOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
```

#### Component Imports Removed
```jsx
import PublicFooter from '@/components/Layout/PublicFooter'
```

---

### 5. Confirm Provisional Page (`app/frontend/pages/u/confirm-provisional.jsx`)

#### Layout Cleanup

**Before:**
```jsx
<div className="min-h-screen">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
    <p className="mt-4 text-xl">Please check your email for a confirmation link.</p>
    {/* content */}
  </div>
  <div className="flex-1" />
  <div className="flex justify-center">
    <a href="/" className="text-blue-600 hover:underline">
      Back to Home Page
    </a>
  </div>
</div>
```

**After:**
```jsx
<Card className="w-full max-w-md">
  <CardHeader className="text-center">
    <div className="flex justify-center mb-4">
      <CheckCircle2 className="h-16 w-16 text-green-600" />
    </div>
    <CardTitle className="text-3xl font-extrabold tracking-tight font-display text-slate-900">
      Check your email
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

**Removed:**
- `min-h-screen` wrapper (handled by Layout)
- Descriptive paragraph "Please check your email for a confirmation link" (user modification)
- "Back to Home Page" link (user modification)
- Spacer divs

#### Icon Integration

**Added:**
```jsx
<div className="flex justify-center mb-4">
  <CheckCircle2 className="h-16 w-16 text-green-600" />
</div>
```

**Purpose:**
- Visual indicator of successful progress
- Green color (`text-green-600`) signifies success/completion
- Large size (64x64px) for visibility

#### Input Component Migration

**Before:**
```jsx
<input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-4"
  placeholder="Email"
/>
```

**After:**
```jsx
<Input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  placeholder="Email"
/>
```

#### Button Update

**Before:**
```jsx
<Button onClick={handleRequestNewEmail} className="mt-3">
  Send new confirmation email
</Button>
```

**After:**
```jsx
<Button onClick={handleRequestNewEmail} className="w-full" size="lg">
  Send new confirmation email
</Button>
```

**Changes:**
- Added `w-full` for full-width button
- Added `size="lg"` for consistent sizing

#### Component Imports Added
```jsx
import { CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
```

#### Component Imports Removed
```jsx
import { Link } from '@inertiajs/react'  // No longer needed
```

---

## Design System Standards

### Typography

#### Headings
- **Font Family**: `font-display` (Lexend)
- **Size**: `text-3xl`
- **Weight**: `font-extrabold`
- **Tracking**: `tracking-tight`
- **Color**: `text-slate-900`

**Example:**
```jsx
<CardTitle className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
  Page Title
</CardTitle>
```

#### Body Text
- **Font Family**: `font-sans` (Inter)
- **Color**: `text-slate-600` (secondary) or `text-slate-900` (primary)

**Example:**
```jsx
<p className="font-sans text-slate-600">
  Body text content
</p>
```

### Color System Migration

#### Primary Text
- **Before**: `text-gray-900`
- **After**: `text-slate-900`

#### Secondary Text
- **Before**: `text-gray-600`
- **After**: `text-slate-600`

#### Accent Colors (Links, Buttons)
- **Before**: `text-indigo-600`, `bg-indigo-600`, `hover:bg-indigo-700`
- **After**: `text-blue-600`, `bg-blue-600`, `hover:bg-blue-700`

#### Success Indicators
- **Icon Color**: `text-green-600` (CheckCircle2 icon)

### Component Sizing

#### Cards
- **Width**: `max-w-md` (28rem / 448px) - consistent across all auth pages
- **Container**: `w-full` to allow responsive behavior

#### Buttons
- **Primary Actions**: `size="lg"` with `bg-blue-600 hover:bg-blue-700`
- **Secondary Actions**: `variant="outline"`
- **Tertiary Actions**: `variant="link"` or `variant="ghost"`

### Spacing

#### Card Structure
- **CardHeader**: Contains title and optional description
- **CardContent**: Contains form fields and actions
- **Internal Spacing**: `space-y-6` for form fields, `space-y-4` for grouped content

---

## Component Dependencies

### New shadcn/ui Components Used

1. **Card** (`@/components/ui/card`)
   - `Card`: Main container
   - `CardHeader`: Header section with title
   - `CardTitle`: Title component
   - `CardContent`: Main content area

2. **Alert** (`@/components/ui/alert`)
   - `Alert`: Container with variant support
   - `AlertDescription`: Content wrapper
   - **Variant Added**: `info` variant for informational messages

3. **Input** (`@/components/ui/input`)
   - Replaces native HTML input elements
   - Consistent styling and focus states

4. **Button** (`@/components/ui/button`)
   - Already existed, but usage standardized
   - Variants: `default`, `outline`, `link`, `ghost`
   - Sizes: `lg` for primary actions

### Lucide React Icons

1. **MailCheck** - Used in forgot-password success state
2. **MailOpen** - Used in await-confirmation page
3. **CheckCircle2** - Used in confirm-provisional page

### Existing Components Maintained

- **Form** (`@/components/ui/form`) - React Hook Form integration
- **FormInput** (`@/components/ui/custom/formInput`) - Custom form field wrapper
- **PublicHeader** (`@/components/Layout/PublicHeader`) - Navigation header

---

## Form Handling Patterns

### Loading States

All submit buttons now include:
```jsx
disabled={form.formState.isSubmitting}
```

**Purpose:**
- Prevents double submissions
- Provides visual feedback during async operations
- Improves UX by disabling button during processing

### Validation

Existing Zod validation schemas maintained:
- `LoginSchema` - Email and password validation
- `ForgotPasswordSchema` - Email validation
- `UserSchema` - Signup form validation

Form error display handled by `FormInput` component using `FormMessage`.

### State Management

#### Forgot Password Page
- Added `isSubmitted` state to toggle between form and success message
- Replaces toast notifications with persistent Alert component

#### Other Pages
- Continue using React Hook Form's built-in state management
- No additional state required for conditional rendering

---

## Accessibility Considerations

### Semantic HTML
- Replaced `<b>` tags with `<strong>` in Alert content
- Proper heading hierarchy maintained
- Button components provide proper ARIA attributes

### Focus Management
- shadcn Input components include proper focus states
- Button components handle keyboard navigation
- Form submission accessible via Enter key

### Visual Indicators
- Icons provide visual context alongside text
- Color contrast maintained (slate-900 on slate-50 background)
- Button states (hover, disabled) clearly visible

---

## Performance Implications

### Bundle Size
- Additional shadcn/ui components add minimal bundle size
- Lucide React icons are tree-shakeable
- No new heavy dependencies added

### Rendering
- Card components use CSS for styling (no runtime overhead)
- Conditional rendering in forgot-password page is lightweight
- No performance regressions expected

---

## Migration Notes

### Breaking Changes
None - all changes are UI-only, no API or routing changes.

### Backward Compatibility
- All existing form submission logic maintained
- React Hook Form integration unchanged
- API endpoints unchanged
- Route paths unchanged

### Testing Considerations
1. **Visual Regression**: All pages have new layouts - visual testing recommended
2. **Form Submission**: Verify all forms still submit correctly
3. **Loading States**: Test button disabled states during submission
4. **Responsive Design**: Verify Card components work on mobile devices
5. **Accessibility**: Test keyboard navigation and screen readers

---

## Future Maintenance

### Adding New Auth Pages
When adding new authentication-related pages:

1. **Layout**: Use Card component with `max-w-md` width
2. **Typography**: Apply `font-display` for headings, `font-sans` for body
3. **Colors**: Use slate-900/slate-600 for text, blue-600 for accents
4. **Buttons**: Use `size="lg"` for primary actions, appropriate variants for secondary
5. **Loading States**: Always include `disabled={form.formState.isSubmitting}`

### Updating Design System
If design system colors change:
- Search for `text-slate-*` and `bg-blue-*` classes
- Update Alert `info` variant if blue color changes
- Maintain contrast ratios for accessibility

### Component Updates
If shadcn/ui components are updated:
- Review Card component API changes
- Check Alert variant support
- Verify Button variant behavior
- Test Input component styling

---

## File Change Summary

### Modified Files
1. `app/frontend/components/Layout/Layout.jsx` - Global auth layout
2. `app/frontend/pages/u/login.jsx` - Login page refactor
3. `app/frontend/pages/u/signup.jsx` - Signup page refactor
4. `app/frontend/pages/u/forgot-password.jsx` - Forgot password refactor
5. `app/frontend/pages/u/await-confirmation.jsx` - Await confirmation refactor
6. `app/frontend/pages/u/confirm-provisional.jsx` - Confirm provisional refactor

### New Components Added
1. `app/frontend/components/ui/alert.tsx` - Alert component with info variant

### Dependencies
- No new npm packages required (all components from existing shadcn/ui setup)
- Lucide React icons already in dependencies

---

## Code Examples

### Standard Auth Page Structure
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const AuthPage = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
          Page Title
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form or content */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Alert Usage Pattern
```jsx
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MailCheck } from 'lucide-react'

<Alert variant="info" className="mb-6">
  <MailCheck className="h-4 w-4" />
  <AlertDescription className="font-sans text-slate-600">
    Informational message content
  </AlertDescription>
</Alert>
```

### Icon Integration Pattern
```jsx
import { IconName } from 'lucide-react'

<CardHeader className="text-center">
  <div className="flex justify-center mb-4">
    <IconName className="h-16 w-16 text-blue-600" />
  </div>
  <CardTitle>...</CardTitle>
</CardHeader>
```

---

## Conclusion

This overhaul standardizes the authentication UI across all pages, improves visual consistency, and provides a better user experience through modern component patterns. All changes maintain backward compatibility with existing functionality while significantly improving code maintainability and design consistency.
