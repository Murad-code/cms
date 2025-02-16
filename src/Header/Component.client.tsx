'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Menu, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="w-full px-6 sm:px-20 z-20 bg-black"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex items-center justify-center">
          <Link className="text-white flex" href="/search">
            {/* <span className="sr-only">Search</span> */}
            <SearchIcon className="w-4 m-2" />
          </Link>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button className="text-white bg-black">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {data?.navItems?.map(({ link }, i) => {
                  return (
                    <DropdownMenuItem
                      className="active:bg-card"
                      key={i}
                      onClick={() => setOpen(false)}
                    >
                      <CMSLink className="text-black p-2" key={i} {...link} appearance="link" />
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex">
          <HeaderNav data={data} />
        </nav>
      </div>
    </header>
  )
}
