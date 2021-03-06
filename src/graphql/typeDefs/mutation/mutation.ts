import { gql } from "apollo-server-express";

export const Mutation = gql`
  input InviteUserInput {
    email: String!
    role: Int
    local: LocalMembershipInput
  }

  input UpdateUserInput {
    user: GetUsersInput!
    last_name: String
    first_name: String
    email: String
    phone: String
    address: AddressInput
    image: ObjectID
    about: String
    memberships: MembershipInput
  }

  input MembershipInput {
    role: Int
    account: ObjectID!
    status: MembershipStatusEnum
    local: LocalMembershipInput
    default: Boolean
  }

  input LocalMembershipInput {
    first_name: String
    last_name: String
    phone: String
    address: AddressInput
    image: ObjectID
    about: String
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

  input SwitchUserMembershipInput {
    membership_id: ObjectID!
  }

  type LoginUserResponse {
    user: User!
    token: String!
  }

  extend type Mutation {
    loginUser: LoginUserResponse!
    switchUserMembership(
      switchUserMembershipInput: SwitchUserMembershipInput!
    ): LoginUserResponse!
    updateUser(updateUserInput: UpdateUserInput!): User!
    inviteUser(inviteUserInput: InviteUserInput!): User!
    deleteUser(deleteUserInput: DeleteUserInput!): User!
  }
`;
