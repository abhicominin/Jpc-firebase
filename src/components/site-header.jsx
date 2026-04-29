import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex items-center gap-3 px-4 lg:px-6">
        <ModeToggle />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium leading-tight">Tim Cook</span>
          <span className="text-xs text-muted-foreground leading-tight">Admin</span>
        </div>
        <Avatar className="h-9 w-9">
          <AvatarImage src="/Images/avatar/tim.jpg" alt="Tim Cook" />
          <AvatarFallback className="bg-orange-600 text-white text-sm font-semibold">TC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
