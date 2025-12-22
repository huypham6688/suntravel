"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [destination, setDestination] = useState("")

  return (
    <section className="relative -mt-16 z-10 container mx-auto px-4">
      <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Bạn muốn đi đâu?"
              className="pl-10 h-12"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="date" className="pl-10 h-12" />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Số người" type="number" min="1" className="pl-10 h-12" />
          </div>
          <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-5 h-5 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </section>
  )
}
