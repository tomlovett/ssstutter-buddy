import React from 'react'
import { Head, usePage } from '@inertiajs/react'

import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar'
import SideNavbar from '@/components/SideNavbar'

const Layout = ({ children }) => {
  const {
    props: { user },
  } = usePage()

  const publicRoutes = ['/', '/about', '/faq', '/researchers', '/participants']
  const isPublicRoute = publicRoutes.includes(window.location.pathname)

  if (isPublicRoute) {
    return (
      <div>
        <Head />
        <main className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    )
  }

  const userNotOnboarded = !user || (!user.participant && !user.researcher)
  if (userNotOnboarded) {
    return (
      <div>
        <Head />
        <main className="p-6 justify-center">{children}</main>
        <Toaster />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SideNavbar user={user} />
        <div className="flex-1">
          <Head title="SSStutterBuddy" />
          <div className="bg-gray-100 p-4">
            <strong>SSStutterBuddy is still in early beta</strong>, please be
            patient.
            <br />
            Please report any bugs or issues to tom@tomlovett.com
            <br />
            Thank you for your patience and thank you for being here!
          </div>
          <main className="p-6 overflow-y-auto h-full">
            {/* <SidebarTrigger /> */}
            {children}
          </main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  )
}

export { Layout }
