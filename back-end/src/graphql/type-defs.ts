import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    birthData: String!
    motherName: String!
  }

  input CreateUserInput {
    name: String!
    password: String!
    birthData: String!
    motherName: String!
  }

  input UpdateUserInput {
    name: String
    birthData: String
    motherName: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;