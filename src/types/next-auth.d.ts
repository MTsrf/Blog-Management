import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    auth_token?: string;
    iAuthenticated: boolean;
  }

  interface Session {
    user: User;
    auth_token?: string | object;
    isAuthenticated: boolean;
  }
}
