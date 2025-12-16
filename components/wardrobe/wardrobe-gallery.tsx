"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Grid, LayoutList, Search, Filter, X, Shirt, PenIcon as Pants, FootprintsIcon as Shoe } from "lucide-react"

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    name: "Blue Denim Jacket",
    category: "tops",
    color: "blue",
    season: "all",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Black Jeans",
    category: "bottoms",
    color: "black",
    season: "all",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "White T-Shirt",
    category: "tops",
    color: "white",
    season: "summer",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Brown Leather Boots",
    category: "shoes",
    color: "brown",
    season: "winter",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Red Sweater",
    category: "tops",
    color: "red",
    season: "winter",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Gray Sweatpants",
    category: "bottoms",
    color: "gray",
    season: "all",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Navy Blue Blazer",
    category: "outerwear",
    color: "blue",
    season: "fall",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Black Dress Shoes",
    category: "shoes",
    color: "black",
    season: "all",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function WardrobeGallery() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter items based on search and category
  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tops":
        return <Shirt className="h-4 w-4" />
      case "bottoms":
        return <Pants className="h-4 w-4" />
      case "shoes":
        return <Shoe className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">My Items</h2>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="absolute right-2.5 top-2.5" onClick={() => setSearchTerm("")}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <div className="border rounded-md flex">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setView("list")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tops">Tops</TabsTrigger>
          <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
          <TabsTrigger value="outerwear">Outerwear</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found. Try adjusting your search or filters.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                      </div>
                      {getCategoryIcon(item.category)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span className="capitalize">{item.category}</span>
                          <span>•</span>
                          <span className="capitalize">{item.color}</span>
                          <span>•</span>
                          <span className="capitalize">{item.season}</span>
                        </div>
                      </div>
                      {getCategoryIcon(item.category)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
