import { Calendar, Home, Inbox, LogOut, Search, Settings } from 'lucide-react'
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

const AppSidebar = ({ user }) => {
  const items = [
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
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Account',
      url: `/u/${user.id}/edit`,
      icon: Settings,
    },
  ]

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
