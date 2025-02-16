import React from 'react'
import { Head } from '@inertiajs/react'

const Layout = ({ children }) => {
  return (
    <div>
      <Head/>
      <main className="p-6 flex justify-center">{children}</main>
    </div>
  )
}

export { Layout }
