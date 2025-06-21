import React from 'react'
import { Head, usePage, Link } from '@inertiajs/react'
import { Toaster, toast } from 'sonner'

import { SidebarProvider } from '@/components/ui/sidebar'
import SideNavbar from '@/components/Layout/SideNavbar'

const Layout = ({ children, notice, alert }) => {
  const { user } = usePage().props

  const publicRoutes = ['/', '/about', '/faq', '/researchers', '/participants']
  const isPublicRoute = publicRoutes.includes(window.location.pathname)

  if (isPublicRoute) {
    return (
      <div className="flex flex-col items-stretch min-h-dvh overflow-y-auto">
        <Head />
        <header className="sticky top-0 flex justify-between items-center py-8 lg:py-4 px-6 md:px-10 z-50 w-full">
          <nav>
            <Link href="/" className="hover:text-blue-900">
              <h1 className='text-blue-500 text-xl'>SSStutterBuddy</h1>
            </Link>
          </nav>
        </header>
        <main className="relative self-center px-6 md:px-10 w-full lg:max-w-5xl lg:mx-auto">
          {children}
        </main>
        <Toaster />
        <footer className="mt-auto py-6">
          <div className="flex  gap-10 w-full py-4 px-6 md:px-10 border-t border-gray-200">           
            <Link href="/faq" className="hover:text-yellow-900">
              FAQ
            </Link>
            <Link href="/participants" className="hover:text-gray-900">
              PWS
            </Link>
            <Link href="/researchers" className="hover:text-gray-900">
              Researchers
            </Link></div>
        </footer>
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

  if (notice) {
    toast.success(notice)
  }

  if (alert) {
    toast.error(alert)
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
          <Toaster duration={8000} />
        </div>
      </div>
    </SidebarProvider>
  )
}

export { Layout }
