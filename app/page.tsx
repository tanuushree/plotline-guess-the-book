"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Book, BookOpen, LogIn, Loader2, LogOut, User } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const genres = [
    { id: "romance", name: "Romance", icon: "💕", color: "bg-pink-50" },
    { id: "classics", name: "Classics", icon: "📜", color: "bg-amber-50" },
    { id: "fantasy", name: "Fantasy", icon: "🧙", color: "bg-purple-50" },
    { id: "scifi", name: "Sci-Fi", icon: "🚀", color: "bg-blue-50" },
    { id: "mystery", name: "Mystery", icon: "🔍", color: "bg-green-50" },
    { id: "horror", name: "Horror", icon: "👻", color: "bg-red-50" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut({ redirect: false })
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsSigningOut(false)
      setShowUserMenu(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b border-dusty-rose/10">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-dusty-rose mr-2" />
          <h1 className="text-xl font-playfair">Plotline</h1>
        </div>
        <nav className="flex space-x-4 items-center">
          <Link href="/daily" className="text-charcoal/70 hover:text-dusty-rose transition-colors">
            Daily
          </Link>
          <Link href="/leaderboard" className="text-charcoal/70 hover:text-dusty-rose transition-colors">
            Leaderboard
          </Link>
          {status === "loading" ? (
            <span className="text-charcoal/70 flex items-center">
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Loading...
            </span>
          ) : status === "authenticated" ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-charcoal/70 hover:text-dusty-rose transition-colors"
              >
                <User className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">{session.user?.name?.split(" ")[0] || "Profile"}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-dusty-rose/10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-beige/50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {isSigningOut ? (
                      <span className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Signing out...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <LogOut className="w-4 h-4 mr-1" />
                        Sign Out
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-charcoal/70 hover:text-dusty-rose transition-colors flex items-center"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Sign In
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair mb-4">Welcome to Plotline</h1>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
          Enough of Instagram scrolling, let’s see if you can guess the book from the plot!
          </p>

          {status === "unauthenticated" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4">
              <Link href="/auth/signin">
                <button className="btn-primary flex items-center mx-auto">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign in with Google
                </button>
              </Link>
              <p className="text-sm text-charcoal/60 mt-2">
                Sign in to track your progress and compete on leaderboards
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {genres.map((genre) => (
            <motion.div key={genre.id} variants={item}>
              <Link href={`/genre/${genre.id}`}>
                <div className={`genre-card ${genre.color} h-40 md:h-48`}>
                  <span className="text-4xl mb-2">{genre.icon}</span>
                  <h2 className="text-xl font-playfair text-center">{genre.name}</h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-col items-center"
        >
          <h2 className="text-2xl font-playfair mb-6">Daily Challenge</h2>
          <Link href="/daily">
            <button className="btn-primary flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Try Today's Book
            </button>
          </Link>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Plotline</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-dusty-rose transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-dusty-rose transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-dusty-rose transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
