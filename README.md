# @the-devoyage/graphql-users

The Devoyage's `graphql-users` repository is a production ready "Users and Memberships" Micro Service used to start or extend any API. Enable features like User Management, User Details, Account Memberships, and Roles simply by spinning up this service with an API. (Or use it as a starter for your next Users and Memberships API).

## License

This repository provides a GPL License by default. If you want to use this product in a private commericial setting, you may purchase the MIT Licensed Version [Here!](https://thedevoyage.gumroad.com/l/graphql-users)

## Features

### Save User Details

Create, read, update, and delete data that is pertinent to your users such as names, addresses, phones, and more. This API allows you to store data that is associated with each user.

```ts
export type User = {
  __typename?: "User";
  _id: Scalars["ObjectID"];
  about?: Maybe<Scalars["String"]>;
  address?: Maybe<Address>;
  createdAt: Scalars["DateTime"];
  created_by?: Maybe<User>;
  email: Scalars["String"];
  first_name?: Maybe<Scalars["String"]>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars["String"]>;
  memberships: Array<Membership>;
  phone?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};
```

### User Management

The following resolvers can be used to create, read, update, and delete users.

- me - Fetches the currently logged in user
- getUsers - Find, filter, and paginate all users
- inviteUser - Anyone can invite a new user to your platform
- deleteUser - Users may delete their own user
- updateUser - Users and Membership Owners may update User Details
- loginUser - Use your existing authentication system to create and authenticate a user

### Memberships

Memberships allow users to share assets within your API. The required login parameter, `account_id`, is used to scope users to accounts. Long story short, from here users can share access to each others account after accepting/managing invitations. More on how this works below!

## Tech

- Node
- Apollo Federation
- GraphQL
- JWT Authentication
- Docker

## Getting Started

### Install Dependencies

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass a github token along to the build process as a build arg.

### Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

### Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```

### Querying the Server

The server should sit behind a federated gateway. Query the gateway to query the server. Use the Apollo Sandbox generated documentation to view available queries and mutations.

The gateway should send context to this service with the following required headers.

**Required Headers**

All requests which enter this service require a `context` header as shown below.

```ts
interface Context extends Record<string, any> {
  auth: {
    account: { _id: string; email: string } | null;
    user: {
      _id: string;
      role: number;
      email: string;
    } | null;
    isAuth: boolean;
  };
  // ...context
}
```

### Extended Properties/Required Services

The users service extends federated entities from external services. The following federated services and properties are required in order to run this service.

Account

- \_id
- email

Media

- \_id

## Usage

Once you have everything setup, you can start using the `graphql-users` API.

### 1. Initial Login

Use the resolver, `loginUser`, to login a known or unknown user.

- User is automatically created at initial login.
- Membership to account is automatically created.
- JWT is issued using the package, `the-devoyage/micro-auth-helpers`.

```graphql
mutation LoginUser($loginUserInput: LoginUserInput!) {
  loginUser(loginUserInput: $loginUserInput) {
    token
    user {
      _id
    }
  }
}
```

### 2. Get Users

Find filter and paginate users based on any property that a user type contains.

### 3. Get Me

Use the `me` resolver to fetch user information associated with the logged in user (Refer to Required Headers to determine Logged In User).

### 4. Memberships

Users may manage multiple accounts within the API. Each account that the user may access shows up in the memberships property of user document.

**Invite Users to Your Account, or Remove Users From Your Account**

Invite users by using the `updateUser` mutation. Include the memberships variable with a status of `PENDING` to invite the user to join your account.

You may always set the status to `REVOKED` to remove a user from your account.

Include a role, to limit the user's capability within an account.

```json
{
  "updateUserInput": {
    "user": {
      "email": {
        "filterBy": "MATCH",
        "string": "nickmclean@thedevoyage.com"
      }
    },
    "memberships": {
      "account": "my_account_id",
      "role": 100,
      "status": "PENDING" // "REVOKED"
    }
  }
}
```

**_tip_**: If the user that you are inviting does not exist within the database, simply use the `inviteUser` mutation resolver to automatically create and invite a user.

**Accept Invite From Other User**

You may switch the status of any of your memberships to `ACTIVE` or `INACTIVE`, as long as the membership does not have the status of `REVOKED`.

```json
{
  "updateUserInput": {
    "user": {
      "_id": {
        "filterBy": "OBJECTID",
        "string": "my_unique_object_id"
      }
    },
    "memberships": {
      "account": "my_account_id",
      "status": "ACTIVE" // "INACTIVE"
    }
  }
}
```

**Switch Membership**

Send a mutation with the following variables to the `switchUserMembership` resolver to change account access. Users must be logged in to their own membership before switching memberships.

```json
{
  "switchUserMembershipInput": {
    "membership_id": "6259e0696f90352f2f3b9070"
  }
}
```

A response with a new JWT will be sent back, granting access to the account as the user.
