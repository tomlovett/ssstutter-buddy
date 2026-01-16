import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const PublicHeader = () => {
  const { url } = usePage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/p/digital-studies', label: 'View Studies' },
    { href: '/faq', label: 'FAQ' },
    { href: '/participants', label: 'For PWS' },
    { href: '/researchers', label: 'For Researchers' },
    { href: 'mailto:support@ssstutterbuddy.com', label: 'Contact Us', isExternal: true },
  ]

  const isActive = path => {
    if (path === '/') {
      return url === '/'
    }
    return url.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-xl text-slate-900 hover:text-slate-700 transition-colors"
        >
          SSStutterBuddy
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map(link => {
              const active = isActive(link.href)
              if (link.isExternal) {
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink asChild>
                      <a
                        href={link.href}
                        className={cn(navigationMenuTriggerStyle(), active && 'text-blue-600 font-semibold')}
                      >
                        {link.label}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              }
              return (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(navigationMenuTriggerStyle(), active && 'text-blue-600 font-semibold')}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="font-display font-bold text-2xl text-slate-900 mb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                SSStutterBuddy
              </Link>
              <nav className="flex flex-col gap-2">
                {navLinks.map(link => {
                  const active = isActive(link.href)
                  if (link.isExternal) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={cn(
                          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                          active
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-700 hover:bg-slate-100'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )
                  }
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                        active
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild className="justify-start">
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default PublicHeader
