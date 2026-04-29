"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { DashboardSquare01Icon, Database01Icon, UserGroupIcon, File01Icon, Camera01Icon, UserCircle02Icon, Calendar01Icon } from "@hugeicons/core-free-icons"
import Logo from "@/assets/svg/logo"
import { NavUser } from "@/components/nav-user"
import useAuth from "@/app/backend/context/auth"

const navItems = [
  { title: "Dashboard", icon: DashboardSquare01Icon, href: "/dashboard" },
  { title: "Sponsors", icon: Database01Icon, href: "/dashboard/sponsors" },
  { title: "Teams", icon: UserGroupIcon, href: "/dashboard/teams" },
  { title: "Race Reports", icon: File01Icon, href: "/dashboard/race-reports" },
  { title: "Calendar", icon: Calendar01Icon, href: "/dashboard/calendar" },
  { title: "Gallery", icon: Camera01Icon, href: "/dashboard/gallery" },
  { title: "Users", icon: UserCircle02Icon, href: "/dashboard/users" },
]

export function AppSidebar({ ...props }) {
  const pathname = usePathname()
  const { user } = useAuth()

  const navUser = {
    name: user?.displayName || 'User',
    email: user?.email || '',
    avatar: user?.photoURL || '',
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-5 pb-6">
        <Link href="/dashboard">
          <Logo width={64} height={44} />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={
                    isActive
                      ? "bg-[#F16F00]! text-white! hover:bg-[#F16F00]/90! hover:text-white!"
                      : ""
                  }
                >
                  <Link href={item.href}>
                    <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <NavUser user={navUser} />
      </SidebarFooter>
    </Sidebar>
  )
}

