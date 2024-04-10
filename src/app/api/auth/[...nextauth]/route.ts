
import { addUser } from '@/service/user';
import { createClient } from '@sanity/client';
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions: NextAuthOptions= {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async signIn({ user: { id, name, email, image} }) {
      if (!email) {
        return false
      }
      addUser({
        id, 
        name: name || '', 
        image,
        email, 
        username: email.split('@')[0]
      })
      return true;
    },
    async session({ session }) {
      const user = session?.user;
      if(user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || ''
        }
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


