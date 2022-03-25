import { gql } from "apollo-server-express";

export const Query = gql`
  input GetUsersInput {
    created_by: [StringFieldFilter]
    email: [StringFieldFilter]
    _id: [StringFieldFilter]
    account: [StringArrayFieldFilter]
    first_name: [StringFieldFilter]
    last_name: [StringFieldFilter]
    phone: [StringFieldFilter]
    config: FilterConfig
    image: [StringFieldFilter]
    role: [IntFieldFilter]
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
  }

  type GetUsersResponse {
    data: [User!]!
    stats: Stats!
  }

  extend type Query {
    getUsers(getUsersInput: GetUsersInput!): GetUsersResponse!
    me: User!
  }
`;
