import { gql } from "apollo-server-express";

export const Query = gql`
  input GetUsersInput {
    query: UserFieldFiltersInput!
    config: FilterConfig
  }

  input UserFieldFiltersInput {
    created_by: [StringFieldFilter]
    email: [StringFieldFilter]
    _id: [StringFieldFilter]
    first_name: [StringFieldFilter]
    last_name: [StringFieldFilter]
    phone: [StringFieldFilter]
    image: [StringFieldFilter]
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
    memberships: [GetUserByMembershipFilterInput]
  }

  input GetUserByMembershipFilterInput {
    status: [StringFieldFilter]
    _id: StringFieldFilter
    createdAt: DateFieldFilter
    updatedAt: DateFieldFilter
    role: [IntFieldFilter]
    account: StringFieldFilter
    default: BooleanFieldFilter
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
