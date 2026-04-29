import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 56)",
        "--header-height": "calc(var(--spacing) * 14)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6 bg-background min-h-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
