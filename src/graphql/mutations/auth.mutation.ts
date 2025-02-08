import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      status
      message
      success
      data {
        token
        user {
          id
          name
          email
        }
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      success
      data {
        token
        user {
          id
          name
          email
        }
      }
    }
  }
`;
