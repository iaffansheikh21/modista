import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SocialFeed } from "@/components/social/social-feed"

export default function SocialPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Social Feed</h1>
        <SocialFeed />
      </main>
      <Footer />
    </div>
  )
}
