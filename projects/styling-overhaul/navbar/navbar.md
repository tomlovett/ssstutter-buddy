# Project: SideNavbar Redesign & Mobile Responsiveness

## 1. Objective

Refactor `app/frontend/components/SideNavbar.jsx` to improve information architecture, visual hierarchy, and mobile responsiveness. The goal is to move away from the "dense admin" look to a modern, spacious navigation that clearly distinguishes between **Participant** (Discovery/Community focus) and **Researcher** (Management/Efficiency focus) roles.

## 2. Component Structure & Grouping

### A. Header (Brand)

- **Current:** Solid blue background with white text.
- **New:** Transparent/White background with `text-primary`.
- **Content:**
  - **Logo:** `SSStutterBuddy` (Font: Lexend, Bold, Text-xl).
  - **Visual:** Add a small brand icon (e.g., `Brain` or `Sparkles` from lucide-react) colored `text-blue-600`.

### B. Navigation Groups (SidebarContent)

Divide the links into logical groups using `<SidebarGroup>` and `<SidebarGroupLabel>`.

#### **Scenario 1: Participant (User is PWS)**

_Theme: "Discovery & Community"_

- **Group 1: Explore**
  - Label: "Discover"
  - **Home:** Icon `LayoutDashboard` | Label "Dashboard" | URL `user.home_page`
  - **Studies:** Icon `Telescope` (represents seeking/finding) | Label "Find Studies" | URL `/p/digital-studies`
- **Group 2: Community**
  - Label: "My Journey"
  - **Profile:** Icon `UserCircle` | Label "My Profile" | URL `/p/participants/${user.participant.id}`
  - **Invites:** Icon `HeartHandshake` (represents connection/support) | Label "Invite Friends" | URL `/invite`
- **Group 3: Connections (Optional/Future)**
  - _Keep commented out code for "My Connections" here._

#### **Scenario 2: Researcher**

_Theme: "Management & Efficiency"_

- **Group 1: Management**
  - Label: "Research"
  - **Home:** Icon `LayoutDashboard` | Label "Overview" | URL `user.home_page`
  - **Studies:** Icon `FolderOpen` (represents organized files) | Label "My Studies" | URL `/r/studies`
- **Group 2: Team**
  - Label: "Collaboration"
  - **Profile:** Icon `BadgeCheck` (represents verified authority) | Label "Researcher Profile" | URL `/r/researchers/${user.researcher.id}`
  - **Collaborators:** Icon `Users` | Label "Invite Team" | URL `/invite`

#### **Scenario 3: Unauthenticated (Guest)**

_Theme: "Welcome"_

- **Group 1: Start Here**
  - **Studies:** Icon `Telescope` | Label "Browse Studies" | URL `/p/digital-studies`
  - **Sign Up:** Icon `Sparkles` | Label "Join Community" | URL `/signup`

### C. Footer (System)

- **Settings:** Icon `Settings2` | Label "Account" | URL `/u/${user.id}/edit`
- **User Info:** Display a condensed `<UserButton />` or similar:
  - Left: Small Avatar (shadcn `<Avatar>`) or Initials.
  - Right: User Name (Truncated).
- **Logout:** Icon `LogOut` | Ghost button styling.

---

## 3. Mobile Responsiveness Strategy

The current sidebar is fixed. Implement the standard **Shadcn Sidebar Mobile Pattern**:

1.  **Sidebar Prop:** Update `<Sidebar>` to use `collapsible="icon"`.
2.  **Mobile Trigger:**
    - We need a way to open this menu on mobile.
    - **Action:** Ensure the parent layout (likely `Layout.jsx` or similar) includes the `<SidebarTrigger />` component from `@/components/ui/sidebar` inside the main content area (usually the top navbar).
    - _If the Sidebar component detects mobile context (via `useSidebar` hook), it should automatically render as a Sheet/Drawer._

**Implementation Detail for SideNavbar.jsx:**
Ensure the component accepts a `className` prop to allow the parent layout to control positioning if needed.

```jsx
// Example Mobile Logic to consider during implementation
import { useSidebar } from "@/components/ui/sidebar"

// Inside component
const { isMobile } = useSidebar()

#### **Scenario: Unauthenticated (Guest)**
- **Primary Action:** Since guests don't need "Settings" or "Logout," use this prime real estate for acquisition.
- **Component:**
    - **Composite Button:** Create a `SidebarMenuItem` that serves as a "Log in / Sign up" trigger.
    - **Icon:** `LogIn` (from lucide-react).
    - **Label:** "Log in / Sign up"
    - **URL:** `/login` (or a dual-action route if available).
    - **Visual Emphasis:** Consider giving this specific button a subtle background (e.g., `bg-blue-50 text-blue-700`) to differentiate it from navigation links and encourage action.
```
