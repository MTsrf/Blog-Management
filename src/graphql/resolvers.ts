/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { signToken, verifyToken } from "@/lib/tokenHandler";
import { comparePasswords, hashPassword } from "@/lib/utils";
import { GraphQLError } from "graphql";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export interface TokenPayload {
  id: string;
  name: string | null;
  iat?: number;
  exp?: number;
}

interface Context {
  user?: TokenPayload;
}

export const authenticateUser = async (
  req: NextRequest | Request
): Promise<TokenPayload | null> => {
  try {
    const headers = req instanceof NextRequest ? req.headers : req.headers;
    const authHeader = headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as TokenPayload;

    if (!decoded || !decoded.id) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

const protected_resolver =
  (resolver: Function) =>
  async (parent: any, args: any, context: Context, info: any) => {
    if (!context.user) {
      throw new GraphQLError("Authentication required", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
    return resolver(parent, args, context, info);
  };

export const resolvers = {
  Query: {
    // getPostByDashboard: async () => {
    //   const posts = await prisma.post.findMany({
    //     take: 6,
    //     include: {
    //       author: {
    //         select: {
    //           id: true,
    //           name: true,
    //         },
    //       },
    //     },
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });
    //   return { posts },

    // },
    getPosts: async (
      _: never,
      {
        page = 1,
        limit = 6,
        search = "",
      }: { page?: number; limit?: number; search?: string }
    ) => {
      const skip = (page - 1) * limit;
      const whereCondition: Prisma.PostWhereInput = search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                content: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};
      const totalPosts = await prisma.post.count({
        where: whereCondition,
      });
      const totalPages = Math.ceil(totalPosts / limit);

      const posts = await prisma.post.findMany({
        where: whereCondition,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        posts,
        pageInfo: {
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
        totalPosts,
      };
    },
    getPostById: async (_: never, { id }: { id: string }) => {
      try {
        const post = await prisma.post.findUnique({
          where: { id },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        console.log({ post });
        return {
          status: 200,
          message: "Success",
          success: true,
          data: post,
        };
      } catch (error) {
        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error },
        });
      }
    },
  },
  Mutation: {
    signup: async (
      _: never,
      {
        email,
        password,
        name,
      }: { email: string; password: string; name: string }
    ) => {
      try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        console.log({ existingUser });
        if (existingUser) {
          return {
            status: 400,
            message: "Email already exists",
            success: false,
            data: null,
          };
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        });

        const TokenInfo = { id: user.id, name: user.name };

        const token = signToken(TokenInfo);

        return {
          status: 200,
          message: "User created successfully",
          success: true,
          data: { token, user },
        };
      } catch (error) {
        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error },
        });
      }
    },
    login: async (
      _: never,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return {
            status: 400,
            message: "User not found",
            success: false,
            data: null,
          };
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
          return {
            status: 400,
            message: "Password Is Incorrect",
            success: false,
            data: null,
          };
        }
        const TokenPayload = { id: user.id, name: user.name };

        const token = signToken(TokenPayload);
        return {
          status: 200,
          message: "Login Successfully",
          success: true,
          data: { token, user },
        };
      } catch (error) {
        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error },
        });
      }
    },
    createPost: protected_resolver(
      async (
        _: never,
        { title, content }: { title: string; content: string },
        context: Context
      ) => {
        try {
          const post = await prisma.post.create({
            data: {
              title,
              content,
              authorId: context.user!.id,
            },
          });
          return {
            status: 200,
            message: "Post created successfully",
            success: true,
            data: post,
          };
        } catch (error) {
          throw new GraphQLError("Internal Server Error", {
            extensions: { code: "INTERNAL_SERVER_ERROR", error },
          });
        }
      }
    ),
  },
};
