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
    about: String
  }

  type Address {
    lineOne: String!
    lineTwo: String
    city: String!
    state: String!
    zip: String!
  }
`;
