import { gql } from "apollo-server-express";

export const User = gql`
  type User @key(fields: "_id") {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    created_by: User
    first_name: String
    last_name: String
    phone: String
    address: Address
    email: String!
    image: Media
    memberships: [Membership!]!
    about: String
  }

  type LocalUserDetails {
    first_name: String
    last_name: String
    phone: String
    address: Address
    image: Media
    about: String
  }

  type Membership {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: Int!
    created_by: User!
    account: Account!
    status: MembershipStatusEnum
    local: LocalUserDetails
    default: Boolean!
  }

  enum MembershipStatusEnum {
    PENDING
    ACTIVE
    INACTIVE
    REVOKED
  }

  type Address {
    lineOne: String!
    lineTwo: String
    city: String!
    state: String!
    zip: String!
  }
`;
