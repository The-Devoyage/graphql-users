import { gql } from "apollo-server-express";

export const Query = gql`
  extend type Query {
    getUsers(getUsersInput: GetUsersInput!): GetUsersResponse!
    me: User!
  }
`;
