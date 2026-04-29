"use client"

import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HugeiconsIcon } from "@hugeicons/react"
import { CloudUploadIcon } from "@hugeicons/core-free-icons"

const SLOTS = Array.from({ length: 9 })

function UploadSlot() {
  const inputRef = useRef(null)

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[#F16F00]/60 bg-card aspect-square cursor-pointer hover:bg-[#F16F00]/5 transition-colors"
    >
      <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" />
      <HugeiconsIcon icon={CloudUploadIcon} strokeWidth={1.5} className="size-10 text-[#F16F00]" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Drag your file(s) or{" "}
          <span className="text-[#F16F00] hover:underline">browse</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">PNG Max 2MB</p>
      </div>
    </div>
  )
}

const tabCategories = ["In Motion", "The Podium", "Off the Saddle"]

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Media Archive</h1>
        <p className="text-sm text-muted-foreground mt-1">Organize your visual history and press kits</p>
      </div>

      {/* Tabs + Grid */}
      <Tabs defaultValue="in-motion">
        <TabsList variant="line" className="mb-6 w-full justify-start">
          {tabCategories.map((cat) => {
            const value = cat.toLowerCase().replace(/\s+/g, "-")
            return (
              <TabsTrigger
                key={value}
                value={value}
                className="data-active:text-[#F16F00] data-active:after:bg-[#F16F00] text-sm px-3"
              >
                {cat}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {tabCategories.map((cat) => {
          const value = cat.toLowerCase().replace(/\s+/g, "-")
          return (
            <TabsContent key={value} value={value}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SLOTS.map((_, i) => (
                  <UploadSlot key={i} />
                ))}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

