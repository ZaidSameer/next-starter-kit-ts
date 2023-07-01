"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="ml-4 hidden md:flex">
      <Link href="/" className="ml-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6 ml-2" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/users"
          className={cn(
            "transition-colors ml-2 hover:text-foreground/80",
            pathname === "/users" ? "text-foreground" : "text-foreground/60"
          )}
        >
          المستخدمين
        </Link>
        <Link
          href="/todos"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/todos")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          المهمات
        </Link>
      </nav>
    </div>
  )
}