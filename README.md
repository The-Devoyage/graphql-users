# @the-devoyage/graphql-users

A ready to spin up users microservice with prebuilt features for user authentication and user data storage. This can be used out of the box with some simple configurations applied, or as a starting point for a users microservice of your own.

## Features

### User

Add users to your api with this users microservice. This service is a secondary authentication service as each user is scoped to an account -- meaning each account can have multiple users.

```graphql
type User {
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
```

### Built In Resolvers

- Get Users - Returns a paginated and filterable list of users. Filter by any property that a user has.

- User Login - Allows an authenticated account to select and authenticate a user. Password optional.

- Update User - Update user properties. Users can only update their own User data. Admin may update all users.

- Create User - Add user to the currently authenticated account. Admin may add users to any account.

- Delete User - Allows users to delete their own user data. Admin may delete any user.

- Get Me - Allows an authenticated user to request their own user data.

### Security

**Running The Server**

You should never expose the service directly to the public. Instead it should sit behind a gateway, which handles authorization parsing.

**Passwords in the Database**

Passwords are hashed and salted before being saved to a mongo database. Provide the mongo URI in the Environment Variables to connect the database.

## Usage

### Access Required Repositories

First, be sure you have been granted instant access as a collaborator to the `@the-devoyage/graphql-users` repository by purchasing access at our [BaseTools Checkout](https://basetools.io/checkout/dQe81uv0) page. This will give you access to clone this repo.

### Install Dependencies

1. Once you have access to the required repos above, be sure to login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass the github token along to the build process.

Assign an environment variable to the Github Token locally:

```bash
export GITHUB_TOKEN=mytoken
```

For docker, you can run:

```bash
docker build -t --build-arg GTIHUB_TOKEN=${GITHUB_TOKEN} .
```

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

## Querying the Server

The server should sit behind a federated gateway. Query the gateway to query the server. Use the Apollo Sandbox for generated documentation on available resolvers and queries.

**Required Headers**

All routes within this service require a `context` header to be passed with the request. The `context` header should be stringified JSON of the type Context. Be sure to include the `auth` property.

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

## Recommended Services

- `@the-devoyage/graphql-gateway` - An apollo gateway server with pre-configured features such as user authorization, file routing/file upload routing, and supergraph configuration. This repo is compatible with this service and can act as the gateway for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr)

- `@the-devoyage/graphql-accounts` - An accounts service that handles account creation, authentication, and verification. It is compatible with this service out and can handle supplying the requirements for the `account` property of the user above. [Purchase Access](https://basetools.io/checkout/v0cv56df)

- `@the-devoyage/graphql-media` - A file upload and file server that can be used to store the "image" attribute of a user, above. This repo provides a ready to go version fully compatible with this service. [Purchase Access](https://basetools.io/checkout/mwsLnkUZ)
