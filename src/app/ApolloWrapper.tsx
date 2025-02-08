"use client";
import { client } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SessionProvider>
  );
}
