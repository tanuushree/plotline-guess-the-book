import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      googleId?: string
      accessToken?: string
      email?: string
    } & DefaultSession["user"]
  }

  interface Profile {
    sub?: string
    id?: string
    name?: string
    picture?: string
    image?: string
    email?: string
  }

  interface JWT {
    googleId?: string
    accessToken?: string
    username?: string
    profilePic?: string
    email?: string
  }
}
