import { gql } from "apollo-server-express";

export const Mutation = gql`
  input UpdateUserInput {
    query: UserFieldFiltersInput!
    payload: UserInput!
  }

  input CreateUserInput {
    payload: UserInput!
  }

  input InviteUserInput {
    query: UserFieldFiltersInput!
    payload: UserInput!
  }

  input UserInput {
    last_name: String
    first_name: String
    email: EmailAddress
    phone: PhoneNumber
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
    phone: PhoneNumber
    address: AddressInput
    image: ObjectID
    about: String
  }

  input AddressInput {
    lineOne: String!
    lineTwo: String
    city: String!
    state: String!
    zip: PostalCode!
    country: CountryCode!
  }

  input DeleteUsersInput {
    query: UserFieldFiltersInput!
  }

  input SwitchUserMembershipInput {
    membership_id: ObjectID!
  }

  type DeleteResponse @shareable {
    deletedCount: Int!
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
    deleteUsers(deleteUsersInput: DeleteUsersInput!): DeleteResponse!
    createUser(createUserInput: CreateUserInput!): User!
  }
`;
