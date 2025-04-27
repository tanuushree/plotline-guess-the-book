// API utility functions for client components

export async function fetchUserProfile() {
  try {
    const res = await fetch("/api/profile")
    if (!res.ok) throw new Error("Failed to fetch profile")
    return await res.json()
  } catch (error) {
    console.error("Error fetching profile:", error)
    throw error
  }
}

export async function updateUserProfile(data: any) {
  try {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update profile")
    return await res.json()
  } catch (error) {
    console.error("Error updating profile:", error)
    throw error
  }
}

export async function createOrUpdateUser() {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
    })
    if (!res.ok) throw new Error("Failed to create/update user")
    return await res.json()
  } catch (error) {
    console.error("Error creating/updating user:", error)
    throw error
  }
}

export async function submitGuess(data: {
  bookSlug: string
  wasCorrect: boolean
  usedHint: boolean
}) {
  try {
    const res = await fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to submit guess")
    return await res.json()
  } catch (error) {
    console.error("Error submitting guess:", error)
    throw error
  }
}

export async function recordHintUsage(data: {
  bookSlug: string
  hintType: string
}) {
  try {
    const res = await fetch("/api/hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to record hint usage")
    return await res.json()
  } catch (error) {
    console.error("Error recording hint usage:", error)
    throw error
  }
}

export async function fetchLeaderboard(
  params: {
    limit?: number
    genre?: string
  } = {},
) {
  const queryParams = new URLSearchParams()
  if (params.limit) queryParams.append("limit", params.limit.toString())
  if (params.genre) queryParams.append("genre", params.genre)

  try {
    const res = await fetch(`/api/leaderboard?${queryParams.toString()}`)
    if (!res.ok) throw new Error("Failed to fetch leaderboard")
    return await res.json()
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    throw error
  }
}
