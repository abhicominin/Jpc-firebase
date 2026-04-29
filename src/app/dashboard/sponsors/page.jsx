"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil, ExternalLink } from "lucide-react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Database01Icon } from "@hugeicons/core-free-icons"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const sponsors = [
  { id: 1, name: "POLYGON" },
  { id: 2, name: "conato" },
  { id: 3, name: "bryton" },
  { id: 4, name: "LAZER" },
  { id: 5, name: "FACECRAFT" },
  { id: 6, name: "SHIMANO" },
  { id: 7, name: "LAZER" },
  { id: 8, name: "POLYGON" },
]

export default function SponsorsPage() {
  const [title, setTitle] = useState("Our Sponsors")
  const [subheading, setSubheading] = useState(
    "Proudly supported by brands that invest in our passion and our community"
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sponsors</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your team sponsors and partnerships</p>
        </div>
        <Button className="bg-emerald-700 hover:bg-emerald-600 text-white shrink-0 gap-2">
          <HugeiconsIcon icon={Database01Icon} strokeWidth={2} className="size-4" />
          Add New Sponsor
        </Button>
      </div>

      {/* Edit Text Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Edit Text</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="sponsor-title">Title</Label>
              <Input
                id="sponsor-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Our Sponsors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sponsor-subheading">Sub-heading</Label>
              <Textarea
                id="sponsor-subheading"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#F16F00] hover:bg-[#F16F00]/90 text-white">Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sponsors */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Active Sponsors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sponsors.map((sponsor) => (
            <Card key={sponsor.id} className="bg-card border-border relative">
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                <Button variant="destructive" size="icon" className="size-6">
                  <Trash2 className="size-3" />
                </Button>
                <Button variant="ghost" size="icon" className="size-6">
                  <Pencil className="size-3" />
                </Button>
              </div>
              <CardContent className="p-5 pt-8 flex flex-col items-center gap-4">
                <div className="w-full h-14 flex items-center justify-center rounded bg-muted/20">
                  <span className="text-sm font-bold text-foreground tracking-widest uppercase">{sponsor.name}</span>
                </div>
                <Button variant="link" size="sm" className="text-[#F16F00] h-auto p-0 text-xs gap-1.5">
                  Visit Website <ExternalLink className="size-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
