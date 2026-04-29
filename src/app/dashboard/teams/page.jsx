import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserGroupIcon, Facebook01Icon, InstagramIcon, ActivityIcon } from "@hugeicons/core-free-icons"

const riders = [
  { id: 1, name: "Muhammad Abdurrohman", role: "Climber", initials: "MA" },
  { id: 2, name: "Yosandy Darmawan Oetomo", role: "Sprinter", initials: "YD" },
  { id: 3, name: "Ilham Sultansyah Hefnar", role: "Climber", initials: "IS" },
  { id: 4, name: "Muhammad Reihan", role: "Sprinter", initials: "MR" },
  { id: 5, name: "Dealton Nur Arif Prayogo", role: "Sprinter", initials: "DN" },
]

const staff = [
  { id: 1, name: "Frederick Murtanu", role: "Sport Director", initials: "FM" },
  { id: 2, name: "Roy Aldrie Widhijanto", role: "Representative Of The Team", initials: "RW" },
  { id: 3, name: "Yan Murtanu", role: "ASS. SPORTS DIRECTOR", initials: "YM" },
]

function MemberCard({ member }) {
  return (
    <Card className="bg-card border-border relative overflow-hidden">
      <div className="absolute top-2 right-2 flex gap-1 z-10">
        <Button variant="destructive" size="icon" className="size-6">
          <Trash2 className="size-3" />
        </Button>
        <Button variant="ghost" size="icon" className="size-6">
          <Pencil className="size-3" />
        </Button>
      </div>
      <CardContent className="p-0">
        {/* Photo placeholder */}
        <div className="w-full aspect-[3/4] bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
          <span className="text-3xl font-bold text-zinc-500">{member.initials}</span>
        </div>
        {/* Info */}
        <div className="p-3">
          <p className="text-sm font-semibold text-foreground leading-tight">{member.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
          {/* Social icons */}
          <div className="flex gap-1.5 mt-3">
            <Button variant="ghost" size="icon" className="size-6">
              <HugeiconsIcon icon={Facebook01Icon} strokeWidth={2} className="size-3" />
            </Button>
            <Button variant="ghost" size="icon" className="size-6">
              <HugeiconsIcon icon={ActivityIcon} strokeWidth={2} className="size-3" />
            </Button>
            <Button variant="ghost" size="icon" className="size-6">
              <HugeiconsIcon icon={InstagramIcon} strokeWidth={2} className="size-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teams</h1>
          <p className="text-sm text-muted-foreground mt-1">Organize professional elite riders, and technical staff</p>
        </div>
        <Button className="bg-[#F16F00] hover:bg-[#F16F00]/90 text-white shrink-0 gap-2">
          <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} className="size-4" />
          Add New Member
        </Button>
      </div>

      {/* Riders Section */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Management Staff</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {riders.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Staff Section */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Management Staff</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
          {staff.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  )
}
