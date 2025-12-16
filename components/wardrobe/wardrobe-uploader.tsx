"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ImagePlus } from "lucide-react"

export function WardrobeUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    // Here you would implement the actual upload logic
    console.log("Uploading file:", selectedFile)
    // Reset after upload
    setSelectedFile(null)
    setPreview(null)
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors ${
              isDragging ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" : "border-muted-foreground/20"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="relative w-full h-full">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setSelectedFile(null)
                    setPreview(null)
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <>
                <ImagePlus className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">Drag & drop your clothing item image here</p>
                <p className="text-xs text-muted-foreground mb-4">or</p>
                <Input type="file" accept="image/*" className="hidden" id="file-upload" onChange={handleFileChange} />
                <Label htmlFor="file-upload" asChild>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </Label>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="item-name">Item Name</Label>
              <Input id="item-name" placeholder="E.g., Blue Denim Jacket" />
            </div>

            <div>
              <Label htmlFor="item-category">Category</Label>
              <Select>
                <SelectTrigger id="item-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="bottoms">Bottoms</SelectItem>
                  <SelectItem value="dresses">Dresses</SelectItem>
                  <SelectItem value="outerwear">Outerwear</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="item-color">Color</Label>
              <Select>
                <SelectTrigger id="item-color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="item-season">Season</Label>
              <Select>
                <SelectTrigger id="item-season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                  <SelectItem value="all">All Seasons</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!selectedFile}
              onClick={handleUpload}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Item
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
