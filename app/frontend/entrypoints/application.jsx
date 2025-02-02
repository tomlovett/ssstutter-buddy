import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { render } from 'react-dom'


// console.log(pages[`../pages/${"Base"}.jsx`]())

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('../pages/*.jsx')
    console.log('pages:', pages)
    console.log('name:', name)
    return pages[`../pages/${name}.jsx`]
  },
  // resolve: async name => {
  //   const page = (await pages[`../pages/${name}.jsx`]()).default;
  //
  //   return page
  // },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
