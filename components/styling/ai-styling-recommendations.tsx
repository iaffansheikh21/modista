"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Calendar, Briefcase, Heart, Utensils, ThumbsUp, ThumbsDown, RefreshCw, Share2 } from "lucide-react"

// Mock data for styling recommendations
const mockRecommendations = [
  {
    id: 1,
    title: "Casual Weekend",
    description: "Perfect for a relaxed weekend outing or coffee with friends.",
    items: [
      { name: "Blue Denim Jacket", image: "/placeholder.svg?height=150&width=150" },
      { name: "White T-Shirt", image: "/placeholder.svg?height=150&width=150" },
      { name: "Black Jeans", image: "/placeholder.svg?height=150&width=150" },
      { name: "Brown Leather Boots", image: "/placeholder.svg?height=150&width=150" },
    ],
    occasion: "casual",
  },
  {
    id: 2,
    title: "Office Ready",
    description: "Professional look that's comfortable for a full day at work.",
    items: [
      { name: "Navy Blue Blazer", image: "/placeholder.svg?height=150&width=150" },
      { name: "White Button-Up Shirt", image: "/placeholder.svg?height=150&width=150" },
      { name: "Gray Dress Pants", image: "/placeholder.svg?height=150&width=150" },
      { name: "Black Dress Shoes", image: "/placeholder.svg?height=150&width=150" },
    ],
    occasion: "work",
  },
  {
    id: 3,
    title: "Date Night",
    description: "Stylish and attractive outfit for a special evening out.",
    items: [
      { name: "Black Dress Shirt", image: "/placeholder.svg?height=150&width=150" },
      { name: "Dark Jeans", image: "/placeholder.svg?height=150&width=150" },
      { name: "Leather Jacket", image: "/placeholder.svg?height=150&width=150" },
      { name: "Chelsea Boots", image: "/placeholder.svg?height=150&width=150" },
    ],
    occasion: "date",
  },
  {
    id: 4,
    title: "Dinner Party",
    description: "Elegant yet comfortable for a dinner with friends or family.",
    items: [
      { name: "Burgundy Sweater", image: "/placeholder.svg?height=150&width=150" },
      { name: "Khaki Chinos", image: "/placeholder.svg?height=150&width=150" },
      { name: "Brown Belt", image: "/placeholder.svg?height=150&width=150" },
      { name: "Loafers", image: "/placeholder.svg?height=150&width=150" },
    ],
    occasion: "dinner",
  },
]

export function AIStylingRecommendations() {
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<Record<number, "like" | "dislike" | null>>({})

  const filteredRecommendations =
    activeTab === "all" ? mockRecommendations : mockRecommendations.filter((rec) => rec.occasion === activeTab)

  const handleGenerateMore = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const handleFeedback = (id: number, type: "like" | "dislike") => {
    setFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }))
  }

  const getOccasionIcon = (occasion: string) => {
    switch (occasion) {
      case "casual":
        return <Calendar className="h-5 w-5" />
      case "work":
        return <Briefcase className="h-5 w-5" />
      case "date":
        return <Heart className="h-5 w-5" />
      case "dinner":
        return <Utensils className="h-5 w-5" />
      default:
        return <Sparkles className="h-5 w-5" />
    }
  }

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
              AI-Powered Outfit Recommendations
            </h2>
            <Button onClick={handleGenerateMore} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate New Outfits
                </>
              )}
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">
            Our AI analyzes your wardrobe, preferences, body type, and current trends to create personalized outfit
            recommendations just for you.
          </p>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Occasions</TabsTrigger>
              <TabsTrigger value="casual">Casual</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="date">Date Night</TabsTrigger>
              <TabsTrigger value="dinner">Dinner Party</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="overflow-hidden">
                    <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center">
                        {getOccasionIcon(recommendation.occasion)}
                        <h3 className="font-semibold ml-2">{recommendation.title}</h3>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={feedback[recommendation.id] === "like" ? "text-green-600" : ""}
                          onClick={() => handleFeedback(recommendation.id, "like")}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={feedback[recommendation.id] === "dislike" ? "text-red-600" : ""}
                          onClick={() => handleFeedback(recommendation.id, "dislike")}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="aspect-square bg-muted rounded-md overflow-hidden mb-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs truncate">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button variant="outline" size="sm">
                        Try On
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Styling Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Color Coordination</h3>
              <p className="text-sm text-muted-foreground">
                Based on your wardrobe, try pairing complementary colors like your blue items with neutral tones for a
                balanced look.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Layering Technique</h3>
              <p className="text-sm text-muted-foreground">
                For the current season, try layering your lighter jackets over t-shirts for a stylish and adaptable
                outfit.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Accessorizing</h3>
              <p className="text-sm text-muted-foreground">
                Your collection would benefit from a few more accessories. Consider adding a watch or minimalist jewelry
                to elevate your outfits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
