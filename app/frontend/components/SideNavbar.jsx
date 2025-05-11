import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Plus,
  Settings,
  UserRound,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'

// TODO: add argument for making it short for mobile

const AppSidebar = ({ user }) => {
  const participantItems = [
    {
      title: 'Home',
      url: user.home_page,
      icon: Home,
    },
    {
      title: 'View studies',
      url: '/p/',
      icon: Inbox,
    },
    {
      title: 'My profile',
      url: `/p/participants/${user?.participant?.id}`,
      icon: UserRound,
    },
    {
      title: 'My connections',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Account settings',
      url: `/u/${user.id}/edit`,
      icon: Settings,
    },
  ]

  const researcherItems = [
    {
      title: 'Home',
      url: user.home_page,
      icon: Home,
    },
    {
      title: 'Studies',
      url: '/r/studies',
      icon: Inbox,
    },
    {
      title: 'New study',
      url: '/r/studies/new',
      icon: Plus,
    },
    {
      title: 'My profile',
      url: `/r/researchers/${user?.researcher?.id}`,
      icon: UserRound,
    },
    {
      title: 'Account',
      url: `/u/${user.id}/edit`,
      icon: Settings,
    },
  ]

  const menuItems = user.participant ? participantItems : researcherItems

  return (
    <Sidebar collapsible="none">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-black mb-2">
            SSStutterBuddy
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 text-black"
                    >
                      <item.icon className="h-4 w-4 text-blue-500" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <a href={`/logout`} className="flex items-center gap-2 text-black">
            <LogOut className="h-4 w-4 text-blue-500" />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
