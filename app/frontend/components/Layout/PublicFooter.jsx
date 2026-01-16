import React from 'react'

const PublicFooter = () => (
  <footer className="border-t border-slate-200 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-slate-600 text-center text-sm font-sans">
        <p>© {new Date().getFullYear()} SSStutterBuddy. All rights reserved.</p>
        <p className="mt-2">
          <a
            href="mailto:support@ssstutterbuddy.com"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            support@ssstutterbuddy.com
          </a>
        </p>
      </div>
    </div>
  </footer>
)

export default PublicFooter
