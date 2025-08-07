import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { Layout } from 'components/Layout/Layout'
import * as Sentry from '@sentry/react'
import '@/styles/base.css'

// Initialize Sentry
Sentry.init({
  dsn: 'https://d7d480213057d96b54e11a22ea0ee90a@o4509804242337793.ingest.us.sentry.io/4509804243189760',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const pages = import.meta.glob('../pages/**/*.jsx', { eager: true })

createInertiaApp({
  resolve: name => {
    const page = pages[`../pages/${name}.jsx`]
    page.default.layout =
      // eslint-disable-next-line react/no-children-prop
      page.default.layout || (page => <Layout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
