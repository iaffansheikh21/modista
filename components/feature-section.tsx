import { ShirtIcon as Tshirt, Camera, Sparkles, Share2 } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Tshirt className="h-10 w-10 text-purple-600" />,
      title: "Virtual Wardrobe",
      description: "Upload and organize your clothing items in a digital closet accessible anytime, anywhere.",
    },
    {
      icon: <Camera className="h-10 w-10 text-purple-600" />,
      title: "AR Try-On",
      description: "See how clothes look on you without physically wearing them using augmented reality.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-purple-600" />,
      title: "AI Styling",
      description: "Get personalized outfit recommendations based on your style, body type, and the latest trends.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-purple-600" />,
      title: "Social Sharing",
      description: "Share your outfits with friends and get feedback from the community.",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology to transform how you interact with your wardrobe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
