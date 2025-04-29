import { Calendar, Home, Inbox, LogOut, Plus, Settings } from 'lucide-react'
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

// TODO: add argumen for making it short for mobile

const AppSidebar = ({ user }) => {
  const participantItems = [
    {
      title: 'Home',
      url: user.home_page,
      icon: Home,
    },
    {
      title: 'Studies',
      url: '/p/',
      icon: Inbox,
    },
    {
      title: 'My connections',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Account',
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
      title: 'Account',
      url: `/u/${user.id}/edit`,
      icon: Settings,
    },
  ]

  const items = user.participant ? participantItems : researcherItems

  return (
    <Sidebar collapsible="none">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
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
          <a href={`/logout`} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
