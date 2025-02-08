import { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        id: { label: "Id", type: "string" },
        auth_token: { label: "Authentication/Token", type: "string" },
        isAuthenticated: { label: "Authenticated Value", type: "boolean" },
        name: { label: "Name", type: "string" },
      },
      async authorize(credentials) {
        if (credentials.auth_token && credentials?.id) {
          const user: User = await {
            id: credentials.id as string,
            name: credentials.name as string,
            auth_token: credentials.auth_token as string,
            iAuthenticated: true,
          };
          return user;
        }
        return null;
      },
    }),
  ],
};
