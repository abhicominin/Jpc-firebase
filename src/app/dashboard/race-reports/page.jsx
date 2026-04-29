"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Pencil, Search } from "lucide-react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Analytics01Icon } from "@hugeicons/core-free-icons"

const reports = [
  { id: 1, title: "Podium Finish: Grit and Glory at the Tour of Flanders", date: "03 June 2025", status: "Published", image: "/Images/reports/reports_one.jpeg" },
  { id: 2, title: "Stage 3 Breakdown: Tactical Masterclass in the Mountains", date: "03 June 2025", status: "Draft", image: "/Images/reports/reports_two.jpeg" },
  { id: 3, title: "Sprint Showdown: How JPC Dominated the Final Kilometre", date: "03 June 2025", status: "Draft", image: "/Images/reports/reports_three.jpeg" },
  { id: 4, title: "Pre-Season Training Camp: Building Champions Off-Season", date: "03 June 2025", status: "Published", image: "/Images/reports/reports_four.jpeg" },
  { id: 5, title: "Cross-Country Classic: Navigating Rain and Cobblestones", date: "03 June 2025", status: "Published", image: "/Images/reports/reports_one.jpeg" },
]

export default function RaceReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Race Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage team news reports</p>
        </div>
        <Button className="bg-violet-700 hover:bg-violet-600 text-white shrink-0 gap-2">
          <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-4" />
          Add New Report
        </Button>
      </div>

      {/* Main Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">JPC Race Reports</h2>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Reports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="shrink-0">Apply</Button>
          </div>

          {/* Report List */}
          <div className="flex flex-col divide-y divide-border">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded bg-muted">
                  <Image src={report.image} alt={report.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold uppercase text-foreground leading-snug line-clamp-2">{report.title}</p>
                  <p className="text-xs text-[#F16F00] mt-1">{report.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    report.status === "Published"
                      ? "bg-green-600/20 text-green-400 border-green-600/30 hover:bg-green-600/20 shrink-0"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted shrink-0"
                  }
                >
                  {report.status}
                </Badge>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="destructive" size="icon">
                    <Trash2 />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
