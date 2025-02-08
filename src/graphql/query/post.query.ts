import { gql } from "@apollo/client";

export const POSTS_LIST = gql`
  query getPosts($page: Int!, $limit: Int!, $search: String) {
    getPosts(page: $page, limit: $limit, search: $search) {
      posts {
        id
        title
        content
        updatedAt
        author {
          id
          name
        }
      }
      pageInfo {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
      }
      totalPosts
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($page: Int, $limit: Int) {
    getPosts(page: $page, limit: $limit) {
      posts {
        id
        title
        content
        updatedAt
        author {
          id
          name
        }
      }
    }
  }
`;
export const GET_POST_BY_ID = gql`
  query getPostById($id: ID!) {
    getPostById(id: $id) {
      status
      message
      success
      data {
        id
        title
        content
        createdAt
        updatedAt
        author {
          id
          name
        }
      }
    }
  }
`;
