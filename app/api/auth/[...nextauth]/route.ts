import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getTenantByDomain } from '../../../lib/tenant'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        domain: { label: 'Domain', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.domain || !credentials?.password) {
          return null
        }

        const tenant = await getTenantByDomain(credentials.domain)
        if (!tenant) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, tenant.adminPassword)
        if (!isValid) {
          return null
        }

        return {
          id: tenant._id!,
          name: tenant.name,
          email: tenant.email,
          domain: tenant.domain
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.domain = user.domain
      }
      return token
    },
    async session({ session, token }) {
      session.user.domain = token.domain as string
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }