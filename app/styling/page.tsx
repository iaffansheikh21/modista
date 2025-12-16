import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIStylingRecommendations } from "@/components/styling/ai-styling-recommendations"

export default function StylingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">AI Styling</h1>
        <AIStylingRecommendations />
      </main>
      <Footer />
    </div>
  )
}
