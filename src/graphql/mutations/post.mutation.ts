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
