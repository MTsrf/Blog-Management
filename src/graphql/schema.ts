import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Post {
    id: String!
    title: String!
    content: String!
    author: User!
    authorId: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type AuthResponse {
    status: Int
    message: String
    success: Boolean
    data: AuthPayload
  }

  type CreatePostResponse {
    status: Int
    message: String
    success: Boolean
    data: Post
  }

  type PageInfo {
    currentPage: Int!
    totalPages: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type PostConnection {
    posts: [Post!]!
    pageInfo: PageInfo
    totalPosts: Int
  }

  type Query {
    getPosts(page: Int, limit: Int, search: String): PostConnection
    getPostById(id: ID!): CreatePostResponse
    searchPosts(keyword: String!): [Post!]!
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse
    createPost(title: String!, content: String!): CreatePostResponse
    updatePost(id: ID!, title: String, content: String, category: String): Post!
    deletePost(id: ID!): Post!
    logout: Boolean!
  }
`;
