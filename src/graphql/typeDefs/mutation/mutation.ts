import { gql } from "apollo-server-express";

export const Mutation = gql`
  extend type Mutation {
    loginUser(loginUserInput: LoginUserInput!): LoginUserResponse!
    updateUser(updateUserInput: UpdateUserInput!): User!
    createUser(createUserInput: CreateUserInput!): User!
    deleteUser(deleteUserInput: DeleteUserInput!): User!
  }
`;
