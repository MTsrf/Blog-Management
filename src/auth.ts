import NextAuth, { User } from "next-auth";
import { authConfig } from "./auth.config";
interface ExtendedUser extends User {
  auth_token?: string;
}
export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      session.user = session.user;
      if (token.auth_token) {
        session.auth_token = token.auth_token;
        session.isAuthenticated = true;
      }
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      const extendedUser = user as ExtendedUser;
      //   if (trigger === "update" && session.name) {
      //     token.name = session.name;
      //   }

      if (extendedUser?.auth_token) {
        token.auth_token = extendedUser.auth_token;
      }

      return token;
    },
  },

  ...authConfig,
});
