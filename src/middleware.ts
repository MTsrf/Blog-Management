/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { apiAuthPrefix, authorizedRoutes, authRoutes } from "@/routes";

export const pathMatchesRoute = (pathname: string, Array: any) => {
  const routeRegexes = Array.map((route: any) => {
    const regexPattern = route.replace(/\[\w+\]/, "\\w+");
    return new RegExp(`^${regexPattern}$`);
  });

  return routeRegexes.some((regex: any) => regex.test(pathname));
};
const { auth } = NextAuth(authConfig);

export default auth((req: { auth?: any; url?: any; nextUrl?: any }) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProtectRoute = authorizedRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = pathMatchesRoute(nextUrl.pathname, authRoutes);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && isProtectRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isAuthRoutes) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
