"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, LogOut } from "lucide-react"
import Link from "next/link"

export default function SignOut() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <Link href="/" className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-playfair">Sign Out</h1>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-playfair mb-4">Are you sure you want to sign out?</h1>
          <p className="text-charcoal/70">
            Your progress is saved, and you can sign back in anytime to continue your literary journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full flex flex-col gap-4"
        >
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500 text-white rounded-xl font-medium transition-all hover:shadow-md disabled:opacity-70"
          >
            <LogOut className="w-5 h-5" />
            {isLoading ? "Signing out..." : "Sign Out"}
          </button>

          <button
            onClick={() => router.back()}
            className="w-full py-3 px-4 bg-beige border border-dusty-rose/20 rounded-xl font-medium transition-all hover:bg-beige/70"
          >
            Cancel
          </button>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Guess the Book</p>
      </footer>
    </div>
  )
}
