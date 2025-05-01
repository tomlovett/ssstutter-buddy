import React from 'react'
import { Head, Link } from '@inertiajs/react'

const PublicLayout = ({ children }) => (
  <div>
    <Head />
    <main className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
)

export default PublicLayout
