"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An unknown error occurred")
  const [errorType, setErrorType] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get("error")
    setErrorType(error)

    // Map error codes to user-friendly messages
    if (error === "Configuration") {
      setErrorMessage("There is a problem with the server configuration. Please try again later.")
    } else if (error === "AccessDenied") {
      setErrorMessage("You denied access to your Google account. Please try again and allow the requested permissions.")
    } else if (error === "Verification") {
      setErrorMessage("The verification link is invalid or has expired. Please try signing in again.")
    } else if (error === "OAuthSignin") {
      setErrorMessage("Error in the OAuth sign-in process. Please try again.")
    } else if (error === "OAuthCallback") {
      setErrorMessage("Error in the OAuth callback process. Please try again.")
    } else if (error === "OAuthCreateAccount") {
      setErrorMessage("Error creating your account. Please try again.")
    } else if (error === "EmailCreateAccount") {
      setErrorMessage("Error creating your account with email. Please try again.")
    } else if (error === "Callback") {
      setErrorMessage("Error during the callback process. Please try again.")
    } else if (error === "OAuthAccountNotLinked") {
      setErrorMessage(
        "This email is already associated with another account. Please sign in using the original provider.",
      )
    } else if (error === "EmailSignin") {
      setErrorMessage("Error sending the verification email. Please try again.")
    } else if (error === "CredentialsSignin") {
      setErrorMessage("Invalid credentials. Please check your username and password.")
    } else if (error === "SessionRequired") {
      setErrorMessage("You must be signed in to access this page.")
    } else {
      setErrorMessage("An unknown error occurred during authentication. Please try again.")
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <Link href="/" className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-playfair">Authentication Error</h1>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-playfair mb-4">Authentication Error</h1>
          <p className="text-charcoal/70">{errorMessage}</p>
          {errorType && <p className="mt-2 text-xs text-charcoal/50">Error code: {errorType}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full"
        >
          <Link href="/auth/signin">
            <button className="w-full py-3 px-4 bg-dusty-rose text-white rounded-xl font-medium transition-all hover:shadow-md">
              Try Again
            </button>
          </Link>

          <Link href="/">
            <button className="w-full mt-4 py-3 px-4 bg-beige border border-dusty-rose/20 rounded-xl font-medium transition-all hover:bg-beige/70">
              Return Home
            </button>
          </Link>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Plotline</p>
      </footer>
    </div>
  )
}
