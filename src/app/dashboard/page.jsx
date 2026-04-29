import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Database01Icon,
  UserGroupIcon,
  Analytics01Icon,
  File01Icon,
  PlusSignCircleIcon,
  Camera01Icon,
} from "@hugeicons/core-free-icons"

const quickActions = [
  { label: "Add Sponsor", icon: Database01Icon, iconBg: "bg-emerald-950", iconColor: "text-emerald-400" },
  { label: "Add Team Member", icon: UserGroupIcon, iconBg: "bg-orange-950", iconColor: "text-orange-400" },
  { label: "Add Report", icon: Analytics01Icon, iconBg: "bg-purple-950", iconColor: "text-purple-400" },
  { label: "Add Race", icon: File01Icon, iconBg: "bg-teal-950", iconColor: "text-teal-400" },
]

const recentUpdates = [
  { icon: PlusSignCircleIcon, iconBg: "bg-emerald-950", iconColor: "text-emerald-400", name: "Tour De France 2026", description: "Race Updated", time: "2 hours ago" },
  { icon: UserGroupIcon, iconBg: "bg-orange-950", iconColor: "text-orange-400", name: "Aiman Cahyadi", description: "Team Member Added", time: "2 hours ago" },
  { icon: Database01Icon, iconBg: "bg-emerald-950", iconColor: "text-emerald-400", name: "Shimano", description: "Sponsor Added", time: "2 hours ago" },
  { icon: Camera01Icon, iconBg: "bg-purple-950", iconColor: "text-purple-400", name: "Off Saddle Photos", description: "10 Photos Uploaded", time: "2 hours ago" },
]

const upcomingRaces = [
  { dateNum: "02", dateNumEnd: null, dateMonth: "JAN", name: "Zilvermeercross ME", location: "Mol, Belgium" },
  { dateNum: "17", dateNumEnd: "19", dateMonth: "JAN", name: "Zilvermeercross ME", location: "Mol, Belgium" },
  { dateNum: "02", dateNumEnd: null, dateMonth: "JAN", name: "Zilvermeercross ME", location: "Mol, Belgium" },
  { dateNum: "02", dateNumEnd: null, dateMonth: "JAN", name: "Zilvermeercross ME", location: "Mol, Belgium" },
]

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      {/* Quick Actions */}
      <section>
        <h1 className="text-2xl font-bold text-foreground mb-1">Quick Actions</h1>
        <p className="text-sm text-muted-foreground mb-6">Quickly manage sponsors, athletes, and event data</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.label}
              className="cursor-pointer hover:bg-accent/60 transition-colors bg-card border-border"
            >
              <CardContent className="p-6 flex flex-col gap-8">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.iconBg}`}>
                  <HugeiconsIcon icon={action.icon} strokeWidth={2} className={`size-5 ${action.iconColor}`} />
                </div>
                <span className="text-foreground font-medium">{action.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Updates + Upcoming Races */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Recent Updates</h2>
            <div className="flex flex-col gap-5">
              {recentUpdates.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    <HugeiconsIcon icon={item.icon} strokeWidth={2} className={`size-5 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Races</h2>
                    <Button variant="link" className="text-[#F16F00] h-auto p-0 text-sm">View All</Button>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {upcomingRaces.map((race, i) => (
                <div key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-[52px]">
                    {race.dateNumEnd ? (
                      <div className="relative pl-3">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#F16F00] rounded-full" />
                        <p className="text-sm font-bold text-foreground leading-tight">{race.dateNum} {race.dateMonth}</p>
                        <p className="text-sm font-bold text-foreground leading-tight">{race.dateNumEnd} {race.dateMonth}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground leading-none">{race.dateNum}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{race.dateMonth}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{race.name}</p>
                    <p className="text-xs text-[#F16F00]">{race.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

