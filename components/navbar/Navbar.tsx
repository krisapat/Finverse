'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./navbarcom/darkmode/Darkmode"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { path: '/', name: 'Home' },
  { path: '/Real-time_graph', name: 'Real-Time Stock Charts' },
  { path: '/calculation', name: 'Calculation' },
];

const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-20">

        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-bold text-2xl">
            Currensa
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-md">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "pb-1 transition-colors hover:text-primary relative",
                (item.path === '/' ? pathname === '/' : pathname.startsWith(item.path))
                  ? "text-primary font-bold after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-full after:bg-primary after:rounded-full"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-2">

          {/* Mobile Dropdown Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link href={item.path}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
