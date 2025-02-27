import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { Layout } from 'components/Layout/Layout'
import '@/styles/base.css'

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
