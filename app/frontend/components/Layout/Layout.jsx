import React from 'react'
import { Head, usePage } from '@inertiajs/react'

import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SideNavbar from '@/components/SideNavbar'

const Layout = ({ children }) => {
  const {
    props: { user },
  } = usePage()

  const UnAuthedLayout = () => (
    <div>
      <Head />
      <main className="p-6 justify-center">{children}</main>
      <Toaster />
    </div>
  )

  if (!user || (!user.participant && !user.researcher)) {
    return <UnAuthedLayout />
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <SideNavbar user={user} />
        <div className="flex-1">
          <Head />
          <main className="p-6 overflow-y-auto h-full">
            {false && <SidebarTrigger />}
            {children}
          </main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  )
}

export { Layout }
