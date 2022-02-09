import { gql } from "apollo-server-express";

export const Account = gql`
  extend type Account @key(fields: "_id") {
    _id: ObjectID! @external
    email: String! @external
    loginUser(loginUserInput: LoginUserInput): LoginUserResponse
      @requires(fields: "_id email")
    users(getUsersInput: GetUsersInput!): GetUsersResponse
      @requires(fields: "_id")
  }
`;
