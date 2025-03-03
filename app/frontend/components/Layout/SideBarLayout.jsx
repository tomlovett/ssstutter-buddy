import { useState } from 'react'

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar/AppSidebar'

const SideBarLayout = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="">
      <AppSidebar />
      <SidebarInset>
        <main className="px-4 py-6">
          <SidebarTrigger className="my-2" />
          <div className="container mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
export { SideBarLayout }
