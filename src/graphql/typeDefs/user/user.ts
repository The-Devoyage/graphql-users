import { gql } from "apollo-server-express";

export const User = gql`
  type User @key(fields: "_id") @key(fields: "account") {
    _id: ObjectID!
    first_name: String
    last_name: String
    phone: String
    address: Address
    email: String!
    password: String
    created_by: User
    stripe_customer_id: String
    stripe_connected_account_id: String
    image: Media
    createdAt: DateTime!
    updatedAt: DateTime!
    account: Account!
    role: Int!
  }

  type Address {
    lineOne: String!
    lineTwo: String
    city: String!
    state: String!
    zip: String!
  }

  input AddressInput {
    lineOne: String!
    lineTwo: String
    city: String!
    state: String!
    zip: String!
  }

  input CreateUserInput {
    email: String!
    first_name: String
    last_name: String
    phone: String
    profile_img: ID
    account: ID
  }

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

  input UpdateUserInput {
    email: String
    phone: String
    last_name: String
    first_name: String
    profile_img: ObjectID
    _id: ObjectID!
    address: AddressInput
    image: ObjectID
    role: Int
    account: ObjectID
  }

  input DeleteUserInput {
    _id: ObjectID!
  }

  type GetUsersResponse {
    data: [User]
    stats: Stats
  }

  input LoginUserCredentialsInput {
    email: String!
    password: String!
  }

  input LoginUserInput {
    _id: ObjectID!
    credentials: LoginUserCredentialsInput
  }

  type LoginUserResponse {
    user: User!
    token: String!
  }
`;
