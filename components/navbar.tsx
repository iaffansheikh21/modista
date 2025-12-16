"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">VirtualWardrobe</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link href="/wardrobe" className="text-sm font-medium hover:underline">
              My Wardrobe
            </Link>
            <Link href="/try-on" className="text-sm font-medium hover:underline">
              AR Try-On
            </Link>
            <Link href="/styling" className="text-sm font-medium hover:underline">
              AI Styling
            </Link>
            <Link href="/social" className="text-sm font-medium hover:underline">
              Social
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <ModeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 border-t">
          <nav className="flex flex-col space-y-3">
            <Link href="/wardrobe" className="text-sm font-medium">
              My Wardrobe
            </Link>
            <Link href="/try-on" className="text-sm font-medium">
              AR Try-On
            </Link>
            <Link href="/styling" className="text-sm font-medium">
              AI Styling
            </Link>
            <Link href="/social" className="text-sm font-medium">
              Social
            </Link>
            <div className="pt-3 flex flex-col space-y-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <div className="pt-2">
                <ModeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
