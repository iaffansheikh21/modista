"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, RefreshCw, Download, Share2 } from "lucide-react"

export function TryOnExperience() {
  const [activeTab, setActiveTab] = useState("camera")
  const [cameraActive, setCameraActive] = useState(false)
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock outfits data
  const outfits = [
    { id: 1, name: "Casual Denim", image: "/placeholder.svg?height=300&width=200" },
    { id: 2, name: "Business Casual", image: "/placeholder.svg?height=300&width=200" },
    { id: 3, name: "Summer Style", image: "/placeholder.svg?height=300&width=200" },
    { id: 4, name: "Winter Layers", image: "/placeholder.svg?height=300&width=200" },
  ]

  useEffect(() => {
    // Clean up camera when component unmounts
    return () => {
      if (cameraActive && videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current && cameraActive) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // If an outfit is selected, overlay it on the canvas
        if (selectedOutfit !== null) {
          // This is where you would implement the AR overlay
          // For now, we'll just add a placeholder text
          context.font = "30px Arial"
          context.fillStyle = "white"
          context.fillText("Outfit Overlay", 50, 50)
        }
      }
    }
  }

  // Capture frames continuously when camera is active
  useEffect(() => {
    let animationFrame: number

    const updateCanvas = () => {
      captureFrame()
      animationFrame = requestAnimationFrame(updateCanvas)
    }

    if (cameraActive) {
      animationFrame = requestAnimationFrame(updateCanvas)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [cameraActive, selectedOutfit])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab}>
              <div className="p-4 border-b">
                <TabsList>
                  <TabsTrigger value="camera">Live Camera</TabsTrigger>
                  <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="camera" className="m-0">
                <div className="relative aspect-video bg-black">
                  {cameraActive ? (
                    <>
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Button onClick={startCamera}>
                        <Camera className="mr-2 h-4 w-4" />
                        Start Camera
                      </Button>
                    </div>
                  )}
                </div>

                {cameraActive && (
                  <div className="p-4 flex justify-between">
                    <Button variant="outline" onClick={stopCamera}>
                      Stop Camera
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upload" className="m-0">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-muted-foreground mb-4">Upload a full-body photo to try on outfits</p>
                    <Button>Upload Photo</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Select an Outfit</h2>
            <div className="space-y-3">
              {outfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className={`border rounded-lg p-2 flex items-center space-x-3 cursor-pointer transition-colors ${
                    selectedOutfit === outfit.id ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" : ""
                  }`}
                  onClick={() => setSelectedOutfit(outfit.id)}
                >
                  <div className="w-16 h-24 bg-muted rounded overflow-hidden">
                    <img
                      src={outfit.image || "/placeholder.svg"}
                      alt={outfit.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{outfit.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {outfit.id === 1
                        ? "4 items"
                        : outfit.id === 2
                          ? "3 items"
                          : outfit.id === 3
                            ? "5 items"
                            : "6 items"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Instructions</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                <li>Stand about 2 meters away from the camera</li>
                <li>Ensure your full body is visible in the frame</li>
                <li>Select an outfit from the list to try it on</li>
                <li>Move around to see how the outfit looks from different angles</li>
                <li>Take a screenshot or share your virtual outfit</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
