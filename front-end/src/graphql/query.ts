import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      birthData
      motherName
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    users {
      id
      name
      birthData
      motherName
    }
  }
`;
