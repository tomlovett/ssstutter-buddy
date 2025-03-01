import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar/AppSidebar"

const SideBarLayout = ({ children })=> {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container px-4 py-6">
      <SidebarTrigger className="my-2" />
        {children}
      </main>
    </SidebarProvider>
  )
}
export { SideBarLayout }