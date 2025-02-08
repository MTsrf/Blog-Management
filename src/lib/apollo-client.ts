import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/api/graphql",
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
      uri: "http://localhost:8000/api/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};
