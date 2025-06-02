import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      birthData
      motherName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      birthData
      motherName
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      birthData
      motherName
    }
  }
`;
