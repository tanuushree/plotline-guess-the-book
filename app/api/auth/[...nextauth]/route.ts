import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt" as const, // Important! 👈
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT
      account?: any
      profile?: any
    }) {
      if (account) {
        token.accessToken = account.access_token
        if (profile) {
          token.googleId = profile.sub || profile.id
          token.username = profile.name
          token.profilePic = profile.picture || profile.image
          token.email = profile.email
        }
      }
      return token
    },
    async session({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }) {
      if (session.user) {
        (session.user as any).googleId = token.googleId as string
        (session.user as any).accessToken = token.accessToken as string
        (session.user as any).email = token.email as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
