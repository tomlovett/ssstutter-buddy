import React from 'react'
import { Head } from '@inertiajs/react'
import { Toaster } from '@/components/ui/sonner'

const Layout = ({ children }) => {
  return (
    <div>
      <Head />
      <main className="p-6 justify-center">{children}</main>
      <Toaster />
    </div>
  )
}

export { Layout }
