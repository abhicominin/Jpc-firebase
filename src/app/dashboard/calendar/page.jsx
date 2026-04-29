"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Pencil, Search, Plus } from "lucide-react"

const races = [
  { id: 1, dateStart: "02", dateEnd: null, month: "JAN", name: "Omloop Het Nieuwsblad", location: "Gent, Belgium" },
  { id: 2, dateStart: "8", dateEnd: "15", month: "JAN", name: "Paris - Nice ME", location: "France" },
  { id: 3, dateStart: "21", dateEnd: null, month: "JAN", name: "Milano-Sanremo", location: "Italy" },
  { id: 4, dateStart: "05", dateEnd: null, month: "JAN", name: "Tour of Flanders", location: "Belgium" },
  { id: 5, dateStart: "6", dateEnd: "11", month: "JAN", name: "Itzulia Basque Country", location: "Spain" },
  { id: 6, dateStart: "02", dateEnd: null, month: "JAN", name: "Omloop Het Nieuwsblad", location: "Gent, Belgium" },
  { id: 7, dateStart: "8", dateEnd: "15", month: "JAN", name: "Paris - Nice ME", location: "France" },
  { id: 8, dateStart: "21", dateEnd: null, month: "JAN", name: "Milano-Sanremo", location: "Italy" },
  { id: 9, dateStart: "05", dateEnd: null, month: "JAN", name: "Tour of Flanders", location: "Belgium" },
  { id: 10, dateStart: "6", dateEnd: "11", month: "JAN", name: "Itzulia Basque Country", location: "Spain" },
]

function RaceRow({ race }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      {/* Date */}
      <div className="min-w-[56px]">
        {race.dateEnd ? (
          <div className="relative pl-3">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#F16F00] rounded-full" />
            <p className="text-sm font-bold text-foreground leading-tight">{race.dateStart} {race.month}</p>
            <p className="text-sm font-bold text-foreground leading-tight">{race.dateEnd} {race.month}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground leading-none">{race.dateStart}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{race.month}</p>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{race.name}</p>
        <p className="text-xs text-[#F16F00]">{race.location}</p>
      </div>
      {/* Thumbnail placeholder */}
      <div className="w-12 h-14 shrink-0 rounded bg-gradient-to-br from-zinc-700 to-zinc-900" />
      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const half = Math.ceil(races.length / 2)
  const leftCol = races.slice(0, half)
  const rightCol = races.slice(half)

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Race Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">Plan and track the full season&#39;s competitive schedule</p>
        </div>
        <Button className="bg-teal-700 hover:bg-teal-600 text-white shrink-0 gap-2">
          <Plus className="size-4" />
          Add New Race
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="International" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="international">International</SelectItem>
            <SelectItem value="national">National</SelectItem>
            <SelectItem value="regional">Regional</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="shrink-0">Apply</Button>
      </div>

      {/* Race Schedule Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Race Schedule</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div>{leftCol.map((race) => <RaceRow key={race.id} race={race} />)}</div>
            <div>{rightCol.map((race) => <RaceRow key={race.id} race={race} />)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
