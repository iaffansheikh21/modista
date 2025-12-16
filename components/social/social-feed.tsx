"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Bookmark, Camera, ImageIcon, Send } from "lucide-react"

// Mock data for social feed
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just put together this outfit for a friend's wedding next weekend. What do you all think?",
    image: "/placeholder.svg?height=500&width=400",
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    user: {
      name: "Sam Taylor",
      username: "samtaylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "My new minimalist wardrobe setup. Been focusing on quality basics that mix and match well.",
    image: "/placeholder.svg?height=500&width=400",
    likes: 56,
    comments: 12,
    timestamp: "5 hours ago",
    liked: true,
    saved: true,
  },
  {
    id: 3,
    user: {
      name: "Jordan Lee",
      username: "jlee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Got some styling help from the AI and put together this business casual look. Thoughts?",
    image: "/placeholder.svg?height=500&width=400",
    likes: 42,
    comments: 15,
    timestamp: "1 day ago",
    liked: false,
    saved: false,
  },
]

export function SocialFeed() {
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState(mockPosts)
  const [newPostText, setNewPostText] = useState("")
  const [showComments, setShowComments] = useState<Record<number, boolean>>({})

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const handleSave = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            saved: !post.saved,
          }
        }
        return post
      }),
    )
  }

  const toggleComments = (postId: number) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0 space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        @{post.user.username} • {post.timestamp}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4">{post.content}</p>

                  <div className="rounded-md overflow-hidden mb-4">
                    <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full object-cover" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={post.liked ? "text-red-500" : ""}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`mr-1 h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleComments(post.id)}>
                        <MessageCircle className="mr-1 h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-1 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={post.saved ? "text-yellow-500" : ""}
                      onClick={() => handleSave(post.id)}
                    >
                      <Bookmark className={`h-4 w-4 ${post.saved ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardContent>

                {showComments[post.id] && (
                  <CardFooter className="p-4 pt-0 border-t mt-4 flex flex-col items-stretch">
                    <div className="mb-4 max-h-60 overflow-y-auto space-y-4">
                      {Array.from({ length: post.comments }).map((_, i) => (
                        <div key={i} className="flex space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-baseline">
                              <span className="font-medium text-sm mr-2">User{i}</span>
                              <span className="text-xs text-muted-foreground">{i + 1}h ago</span>
                            </div>
                            <p className="text-sm">
                              {i % 3 === 0
                                ? "Love this look! Where did you get that jacket?"
                                : i % 3 === 1
                                  ? "This outfit is perfect for the occasion!"
                                  : "Have you tried adding accessories to this?"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                      <Input placeholder="Add a comment..." className="flex-1" />
                      <Button size="icon" variant="ghost">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            <Textarea
              placeholder="Share your outfit or ask for styling advice..."
              className="mb-4"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Camera className="mr-1 h-4 w-4" />
                  Take Photo
                </Button>
                <Button variant="outline" size="sm">
                  <ImageIcon className="mr-1 h-4 w-4" />
                  Upload
                </Button>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700" disabled={!newPostText.trim()}>
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
            <div className="space-y-3">
              {["#SummerFashion", "#MinimalistStyle", "#SustainableFashion", "#VintageFinds", "#OfficeLooks"].map(
                (topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{topic}</div>
                      <div className="text-xs text-muted-foreground">{100 - index * 15} posts</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Explore
                    </Button>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
