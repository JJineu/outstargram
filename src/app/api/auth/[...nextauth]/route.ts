import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_OAUTH_ID || "",
    //   clientSecret: process.env.GITHUB_OAUTH_SECRET || "",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    //     signOut: "/auth/signout",
    //     error: "/auth/error", // Error code passed in query string as ?error=
    //     verifyRequest: "/auth/verify-request", // (used for check email message)
    //     newUser: "/",
    //   },
    //   callbacks: {
    //     async session({}){
    //         return session
    //     }
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
