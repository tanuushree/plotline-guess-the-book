"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Award, BookOpen, Edit, LogOut, Settings, Trophy, Share2, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"
import html2canvas from "html2canvas"
import { fetchUserProfile, createOrUpdateUser } from "@/lib/api"

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"stats" | "badges">("stats")
  const [userData, setUserData] = useState<any>(null)
  const [badges, setBadges] = useState<any[]>([])
  const [genreStats, setGenreStats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSharing, setIsSharing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const fetchUserData = async () => {
      if (status === "authenticated") {
        setIsLoading(true)
        setError(null)

        try {
          // First, ensure the user exists in our database
          await createOrUpdateUser()

          // Then fetch user data
          const data = await fetchUserProfile()

          setUserData(data.user)
          setBadges(data.badges || [])
          setGenreStats(data.genreStats || [])
        } catch (err) {
          console.error("Error fetching user data:", err)
          setError("Failed to load user data. Please try again later.")
        } finally {
          setIsLoading(false)
        }
      } else if (status === "unauthenticated") {
        router.push("/auth/signin")
      }
    }

    if (mounted && status !== "loading") {
      fetchUserData()
    }
  }, [mounted, status, router])

  const handleShareStats = async () => {
    if (!shareCardRef.current) return

    setIsSharing(true)

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#F5F0E8",
        scale: 2,
      })

      const dataUrl = canvas.toDataURL("image/png")

      // Create a blob from the data URL
      const blob = await (await fetch(dataUrl)).blob()

      // Create a file from the blob
      const file = new File([blob], "plotline-stats.png", { type: "image/png" })

      // Check if the Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: "My Plotline Stats",
          text: "Check out my reading stats on Plotline!",
          files: [file],
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = "plotline-stats.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error("Error sharing stats:", error)
    } finally {
      setIsSharing(false)
    }
  }

  if (!mounted) return null

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-dusty-rose animate-spin mb-4" />
          <p className="text-charcoal/70">Loading profile data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 p-6 rounded-xl text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-playfair text-red-700 mb-2">Error Loading Profile</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-dusty-rose text-white rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null // Will redirect in useEffect
  }

  return (

    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <button
          onClick={() => router.push("/")}
          className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-playfair">Profile</h1>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/auth/signout" className="text-charcoal/70 hover:text-dusty-rose transition-colors">
            <LogOut className="w-5 h-5" />
          </Link>
          <button className="text-charcoal/70 hover:text-dusty-rose transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="card mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Display profile picture or fallback to first letter */}
            {/* {userData?.profilePic ? (
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={userData.profilePic}
                  alt={userData.username || "User"}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-dusty-rose/20 flex items-center justify-center text-dusty-rose text-4xl font-medium">
                <span className="text-2xl font-bold text-white">
                  {userData.username
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
            )} */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h2 className="text-2xl font-playfair">{userData?.username || "User"}</h2>
                {/* <button className="inline-flex items-center text-sm text-charcoal/70 hover:text-dusty-rose transition-colors">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Profile
                </button> */}
              </div>
              {userData?.email && <p className="text-charcoal/60 text-sm mb-2">{userData.email}</p>}
              {/* <p className="text-charcoal/80 mb-4">
                {userData?.bio ||
                  "Avid reader and literature enthusiast. I love getting lost in fictional worlds and guessing books from their descriptions!"}
              </p> */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-dusty-rose mr-1" />
                  <span className="text-sm">
                    <span className="font-medium">{userData?.totalCorrect || 0}</span> correct guesses
                  </span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-dusty-rose mr-1" />
                  <span className="text-sm">
                    <span className="font-medium">{userData?.streak || 0}</span> day streak
                  </span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-dusty-rose mr-1" />
                  <span className="text-sm">
                    <span className="font-medium">{badges.length}</span> badges
                  </span>
                </div>
                <button
                  onClick={handleShareStats}
                  disabled={isSharing}
                  className="flex items-center text-sm text-charcoal/70 hover:text-dusty-rose transition-colors"
                >
                  <Share2 className="w-5 h-5 mr-1" />
                  {isSharing ? "Generating..." : "Share Stats"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs for Statistics or Badges */}
        <div className="flex border-b border-dusty-rose/10 mb-6">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-medium text-sm ${activeTab === "stats" ? "text-dusty-rose border-b-2 border-dusty-rose" : "text-charcoal/70 hover:text-charcoal"}`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-4 py-2 font-medium text-sm ${activeTab === "badges" ? "text-dusty-rose border-b-2 border-dusty-rose" : "text-charcoal/70 hover:text-charcoal"}`}
          >
            Badges
          </button>
        </div>

        {/* Statistics Content */}
        {activeTab === "stats" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-playfair mb-4">Overall Statistics</h3>
              <div ref={shareCardRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-beige/30">
                <div className="bg-ivory p-4 rounded-xl text-center">
                  <p className="text-sm text-charcoal/70 mb-1">Total Guesses</p>
                  <p className="text-2xl font-medium">{userData?.totalGuesses || 0}</p>
                </div>
                <div className="bg-ivory p-4 rounded-xl text-center">
                  <p className="text-sm text-charcoal/70 mb-1">Correct</p>
                  <p className="text-2xl font-medium">{userData?.totalCorrect || 0}</p>
                </div>
                <div className="bg-ivory p-4 rounded-xl text-center">
                  <p className="text-sm text-charcoal/70 mb-1">Accuracy</p>
                  <p className="text-2xl font-medium">
                    {userData?.totalCorrect && userData.totalGuesses
                      ? Math.round((userData.totalCorrect / userData.totalGuesses) * 100)
                      : 0}
                    %
                  </p>
                </div>
                <div className="bg-ivory p-4 rounded-xl text-center">
                  <p className="text-sm text-charcoal/70 mb-1">Current Streak</p>
                  <p className="text-2xl font-medium">{userData?.streak || 0}</p>
                </div>
                <div className="col-span-2 sm:col-span-4 text-center pt-2">
                  <p className="text-sm font-medium">Plotline Stats • {userData?.username}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <motion.div
                  key={badge._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-beige/50 flex items-center justify-center text-2xl">
                    {getBadgeIcon(badge.badgeType)}
                  </div>
                  <div>
                    <h4 className="font-playfair font-medium">{badge.badgeType}</h4>
                    <p className="text-sm text-charcoal/70">{getBadgeDescription(badge.badgeType)}</p>
                    <p className="text-xs text-charcoal/50">
                      Earned on {new Date(badge.awardedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-lg text-charcoal/70">No badges earned yet. Keep guessing!</p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>

  )
}

// Helper functions for badges
function getBadgeIcon(badgeType: string): string {
  const icons: Record<string, string> = {
    Bookworm: "📚",
    "Classic Conqueror": "📜",
    "Plot Twister": "🔍",
    "Blind Booker": "👁️",
    "First Line Hero": "📝",
    "Streak Master": "🔥",
    "Genre Expert": "🏆",
    "Daily Champion": "📅",
  }
  return icons[badgeType] || "🏅"
}

function getBadgeDescription(badgeType: string): string {
  const descriptions: Record<string, string> = {
    Bookworm: "Correctly guessed 10 books",
    "Classic Conqueror": "10 correct guesses in the Classics genre",
    "Plot Twister": "5 correct thriller guesses in a row",
    "Blind Booker": "Guessed correctly without using hints",
    "First Line Hero": "Guessed using only the first line",
    "Streak Master": "Maintained a 10-day streak",
    "Genre Expert": "Achieved 90% accuracy in a genre",
    "Daily Champion": "Completed 7 daily challenges in a row",
  }
  return descriptions[badgeType] || "A special achievement"
}
