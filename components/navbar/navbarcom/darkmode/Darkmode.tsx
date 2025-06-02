'use client'

import * as React from "react"
import { Moon, Sun, Monitor, X, } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const getCurrentIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />
    }
    if (theme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />
    }
    return <Sun className="h-[1.2rem] w-[1.2rem]" />
  }

  return (
    <DropdownMenu onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="transition-transform duration-300">
          {open ? (
            <X className="transition-all duration-300 rotate-90" />
          ) : (
            <>
              {getCurrentIcon()}
              <span className="sr-only">Toggle theme</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
