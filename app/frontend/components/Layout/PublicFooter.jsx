import React from 'react'
import { Link } from '@inertiajs/react'

const PublicFooter = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
    <div className="text-gray-600 text-center text-lg">
      <Link href="/" className="hover:text-gray-900">
        Home
      </Link>
      {' | '}
      <Link href="/faq" className="hover:text-gray-900">
        FAQ
      </Link>
      {' | '}
      <Link href="/participants" className="hover:text-gray-900">
        For PWS
      </Link>
      {' | '}
      <Link href="/researchers" className="hover:text-gray-900">
        For Researchers
      </Link>
      {' | '}
      <Link href="/contact" className="hover:text-gray-900">
        <a href="mailto:tom@tomlovett.com">Contact Us</a>
      </Link>
    </div>
  </div>
)

export default PublicFooter
