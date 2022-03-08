import { gql } from "apollo-server-express";

export const Query = gql`
  input GetUsersInput {
    created_by: StringFieldFilter
    email: StringFieldFilter
    _id: StringFieldFilter
    account: StringArrayFilter
    first_name: StringFieldFilter
    last_name: StringFieldFilter
    phone: StringFieldFilter
    config: FilterConfig
    image: StringFieldFilter
  }

  type GetUsersResponse {
    data: [User]
    stats: Stats
  }

  extend type Query {
    getUsers(getUsersInput: GetUsersInput!): GetUsersResponse!
    me: User!
  }
`;
