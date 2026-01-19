import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
  BadgeCheck,
  FolderOpen,
  HeartHandshake,
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings2,
  Telescope,
  UserCircle,
  Users,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'

const AppSidebar = ({ user, className }) => {
  const { url } = usePage()

  const isActive = React.useCallback(
    path => {
      if (!path) return false
      if (path === '/') return url === '/'
      return url.startsWith(path)
    },
    [url]
  )

  const guest = [
    {
      label: 'Browsing Anonymously',
      items: [{ title: 'View Studies', url: '/p/digital-studies', icon: Telescope }],
    },
  ]

  const participant = [
    {
      label: 'Discover',
      items: [
        { title: 'Dashboard', url: user?.home_page, icon: LayoutDashboard },
        { title: 'Find Studies', url: '/p/digital-studies', icon: Telescope },
      ],
    },
    {
      label: 'My Journey',
      items: [
        { title: 'My Profile', url: `/p/participants/${user?.participant?.id}`, icon: UserCircle },
        { title: 'Invite Friends', url: '/invite', icon: HeartHandshake },
      ],
    },
  ]

  const researcher = [
    {
      label: 'Research',
      items: [
        { title: 'Overview', url: user?.home_page, icon: LayoutDashboard },
        { title: 'My Studies', url: '/r/studies', icon: FolderOpen },
      ],
    },
    {
      label: 'Collaboration',
      items: [
        { title: 'Researcher Profile', url: `/r/researchers/${user?.researcher?.id}`, icon: BadgeCheck },
        { title: 'Invite Colleagues', url: '/invite', icon: Users },
      ],
    },
  ]

  let primaryMenuItems = []

  if (!user) {
    primaryMenuItems = guest
  } else if (user?.participant) {
    primaryMenuItems = participant
  } else if (user?.researcher) {
    primaryMenuItems = researcher
  }

  return (
    <Sidebar collapsible="icon" className={className}>
      <SidebarHeader className="bg-blue-600 text-white p-4 rounded-br-xl">
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="font-display font-semibold text-2xl text-white">SSStutterBuddy</div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {primaryMenuItems.map(group => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      aria-disabled={!item.url}
                    >
                      <Link href={item.url || '#'}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(`/u/${user.id}/edit`)} tooltip="Account">
                <Link href={`/u/${user.id}/edit`}>
                  <Settings2 />
                  <span>Account</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Logout">
                <Link href="/logout">
                  <LogOut />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Log in / Sign up">
                <Link href="/login">
                  <LogIn />
                  <span>Log in / Sign up</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>

      {/* Desktop: keep collapse/expand affordance without the top trigger */}
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
