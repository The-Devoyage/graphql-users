import { gql } from "apollo-server-express";

export const Query = gql`
  input GetUsersInput {
    created_by: [StringFieldFilter]
    email: [StringFieldFilter]
    _id: [StringFieldFilter]
    first_name: [StringFieldFilter]
    last_name: [StringFieldFilter]
    phone: [StringFieldFilter]
    config: FilterConfig
    image: [StringFieldFilter]
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
    memberships: [GetUserByMembershipInput]
  }

  input GetUserByMembershipInput {
    status: StringFieldFilter
    _id: StringFieldFilter
    createdAt: DateFieldFilter
    updatedAt: DateFieldFilter
    role: [IntFieldFilter]
    account: StringFieldFilter
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
