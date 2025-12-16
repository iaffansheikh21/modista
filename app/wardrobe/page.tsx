import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WardrobeGallery } from "@/components/wardrobe/wardrobe-gallery"
import { WardrobeUploader } from "@/components/wardrobe/wardrobe-uploader"

export default function WardrobePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wardrobe</h1>
        <WardrobeUploader />
        <WardrobeGallery />
      </main>
      <Footer />
    </div>
  )
}
