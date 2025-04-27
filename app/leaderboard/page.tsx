"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Loader2, Award } from "lucide-react"
import Image from "next/image"
import { fetchLeaderboard } from "@/lib/api"

export default function LeaderboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    const fetchLeaderboardData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch global leaderboard
        const globalData = await fetchLeaderboard({ limit: 10 })
        setLeaderboardData(globalData)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        setError("Failed to load leaderboard data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (mounted) {
      fetchLeaderboardData()
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <button
          onClick={() => router.push("/")}
          className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-playfair">Leaderboard</h1>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="card">
          <div className="mb-6">
            <h2 className="text-2xl font-playfair mb-4 text-center">Top Book Guessers</h2>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 text-center">
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="mt-2 text-sm underline hover:text-red-800">
                  Try Again
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-dusty-rose animate-spin mb-2" />
                  <p className="text-dusty-rose">Loading leaderboard data...</p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-dusty-rose/10">
                <table className="w-full">
                  <thead className="bg-beige/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70">Score</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70 hidden sm:table-cell">
                        Streak
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-charcoal/70 hidden sm:table-cell">
                        Accuracy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dusty-rose/10">
                    {leaderboardData.map((user: any, index: number) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={index < 3 ? "bg-beige/30" : ""}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            {index === 0 ? (
                              <Trophy className="w-5 h-5 text-yellow-500 mr-1" />
                            ) : index === 1 ? (
                              <Trophy className="w-5 h-5 text-gray-400 mr-1" />
                            ) : index === 2 ? (
                              <Trophy className="w-5 h-5 text-amber-700 mr-1" />
                            ) : (
                              <span className="text-charcoal/70 font-medium">{index + 1}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            {user.profile_pic ? (
                              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                <Image
                                  src={user.profile_pic || "/placeholder.svg"}
                                  alt={user.username}
                                  width={32}
                                  height={32}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-dusty-rose/20 flex items-center justify-center text-dusty-rose font-medium mr-2">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="font-medium">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">{user.total_correct}</td>
                        <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-dusty-rose mr-1" />
                            {user.streak}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                          <div className="w-full bg-beige/50 rounded-full h-2.5">
                            <div
                              className="bg-faded-teal h-2.5 rounded-full"
                              style={{ width: `${user.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-charcoal/70">{user.accuracy}%</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Plotline</p>
      </footer>
    </div>
  )
}
