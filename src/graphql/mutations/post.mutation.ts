import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      status
      message
      success
      data {
        title
        content
        createdAt
        updatedAt
      }
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost($id: ID!, $input: EditPostInput!) {
    editPost(id: $id, input: $input) {
      status
      message
      success
      data {
        id
        title
        content
        updatedAt
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      status
      message
      success
    }
  }
`;
