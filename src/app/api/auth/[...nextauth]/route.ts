import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_OAUTH_ID || '',
      clientSecret: process.env.GITHUB_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      if (!email) {
        return false;
      }
      addUser({
        id,
        email,
        name: name || '',
        username: email.split('@')[0],
        image: image || '',
      });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
