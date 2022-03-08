import { gql } from "apollo-server-express";

export const Mutation = gql`
  input CreateUserInput {
    email: String!
    first_name: String
    last_name: String
    phone: String
    profile_img: ID
    account: ID
    role: Int
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

  input AddressInput {
    lineOne: String!
    lineTwo: String
    city: String!
    state: String!
    zip: String!
  }

  input DeleteUserInput {
    _id: ObjectID!
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

  extend type Mutation {
    loginUser(loginUserInput: LoginUserInput!): LoginUserResponse!
    updateUser(updateUserInput: UpdateUserInput!): User!
    createUser(createUserInput: CreateUserInput!): User!
    deleteUser(deleteUserInput: DeleteUserInput!): User!
  }
`;
