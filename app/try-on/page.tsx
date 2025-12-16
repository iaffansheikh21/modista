import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TryOnExperience } from "@/components/try-on/try-on-experience"

export default function TryOnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">AR Try-On</h1>
        <TryOnExperience />
      </main>
      <Footer />
    </div>
  )
}
