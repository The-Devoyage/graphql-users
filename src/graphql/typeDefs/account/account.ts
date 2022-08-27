import { gql } from "apollo-server-express";

export const Account = gql`
  type Account @key(fields: "_id") {
    _id: ObjectID!
    email: EmailAddress! @external
    users(getUsersInput: GetUsersInput!): GetUsersResponse!
      @requires(fields: "email")
  }
`;
