import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

// const getApiUrl = () => {
//   if (process.env.NEXT_PUBLIC_API_URL) {
//     return process.env.NEXT_PUBLIC_API_URL;
//   }
//   if (typeof window !== "undefined") {
//     const protocol = window.location.protocol;
//     const host = window.location.host;
//     return `${protocol}//${host}/api/graphql`;
//   }

//   return process.env.VERCEL_URL
//     ? `${process.env.VERCEL_URL}/api/graphql`
//     : "http://localhost:8000/api/graphql";
// };

const httpLink = createHttpLink({
  uri: "https://blog-management-lilac.vercel.app/api/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      authorization: session?.auth_token ? `Bearer ${session.auth_token}` : "",
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

export const clientServer = () => {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "https://blog-management-lilac.vercel.app/api/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};
