import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { typeDefs } from "@/graphql/schema";
import { authenticateUser, resolvers } from "@/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error("GraphQL Error:", error);
    return {
      message: error.message || "Internal Server Error",
      locations: error.locations,
      path: error.path,
      code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
    };
  },
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const user = await authenticateUser(req);
    return { user: user ?? undefined };
  },
});

export async function POST(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("Handler error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  return new Response("GraphQL endpoint is working", { status: 200 });
}
