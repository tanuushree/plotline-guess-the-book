"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/profile"
  const error = searchParams.get("error")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn("google", { callbackUrl })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <Link href="/" className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-playfair">Sign In</h1>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-dusty-rose" />
          </div>
          <h1 className="text-3xl font-playfair mb-2">Welcome to Plotline</h1>
          <p className="text-charcoal/70">
            Sign in with Google to track your progress, compete on leaderboards, and earn badges.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start"
          >
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Error signing in</p>
              <p className="text-sm">
                {error === "OAuthSignin" && "Error starting the sign-in process. Please try again."}
                {error === "OAuthCallback" && "Error during the authentication process. Please try again."}
                {error === "OAuthCreateAccount" && "Error creating your account. Please try again."}
                {error === "OAuthAccountNotLinked" && "This email is already associated with another account."}
                {error === "AccessDenied" && "You denied access to your Google account."}
                {error === "Configuration" && "There is a server configuration issue. Please try again later."}
                {![
                  "OAuthSignin",
                  "OAuthCallback",
                  "OAuthCreateAccount",
                  "OAuthAccountNotLinked",
                  "AccessDenied",
                  "Configuration",
                ].includes(error) && "An unknown error occurred. Please try again."}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full"
        >
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 text-charcoal rounded-xl font-medium transition-all hover:shadow-md disabled:opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? "Connecting..." : "Sign in with Google"}
          </button>

          <p className="mt-6 text-sm text-center text-charcoal/60">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-dusty-rose hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-dusty-rose hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Plotline</p>
      </footer>
    </div>
  )
}
