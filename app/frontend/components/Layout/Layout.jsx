import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Toaster, toast } from 'sonner'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SideNavbar from '@/components/Layout/SideNavbar'
import PublicHeader from '@/components/Layout/PublicHeader'

const Layout = ({ children, notice, alert }) => {
  const { user } = usePage().props

  const publicRoutes = ['/', '/faq', '/researchers', '/participants']
  const isPublicRoute = publicRoutes.includes(window.location.pathname)

  if (isPublicRoute) {
    return (
      <div className="flex flex-col min-h-screen">
        <Head />
        <PublicHeader />
        <main className="flex-1">{children}</main>
      </div>
    )
  }

  const isAuthRoute = [
    '/login',
    '/signup',
    '/confirm-provisional',
    '/await-confirmation',
    '/forgot-password',
  ].includes(window.location.pathname)
  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Head />
        <PublicHeader />
        <main className="flex-1 flex items-center justify-center p-4">{children}</main>
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
        <div className="flex min-w-0 flex-1 flex-col">
          <Head title="SSStutterBuddy" />
          <div className="md:hidden bg-blue-600 text-white p-4 rounded-bl-xl sticky top-0 z-40 flex h-12 items-center gap-2 border-b border-slate-200 px-4 backdrop-blur-md">
            <SidebarTrigger />
            <div className="ml-auto flex justify-end gap-2 px-2 py-1">
              <div className="font-display font-semibold text-2xl">SSStutterBuddy</div>
            </div>
          </div>
          <main className="min-h-0 flex-1 overflow-y-auto p-6">{children}</main>
          <Toaster duration={8000} />
        </div>
      </div>
    </SidebarProvider>
  )
}

export { Layout }
