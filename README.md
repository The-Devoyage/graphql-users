## The Devoyage - Graphql Users

A ready to spin up users microservice with prebuilt features for user authentication and data storage. This can be used out of the box with some simple configurations applied, or as a starting point for a users microservice of your own.

## Features

### Users

Users are saved in a mongo database, easily configured by providing the URI in the environment variables.

```graphql
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
  image: Media # EXTERNAL REQUIREMENT DETAILED BELOW
  createdAt: DateTime!
  updatedAt: DateTime!
  account: Account! # EXTERNAL REQUIREMENT DETAILED BELOW
  role: Int!
}
```

### Built In Resolvers

- getUsers - Returns a list of paginate-able and filterable list of users. Filter by any property that a user has.
- loginUser - Allows an account holder (Separate service for authentication) to select a user to use with the account, allowing each account to utilize multiple users.
- updateUser - Update a user by \_id. Users with a non-admin role, of `role === 1`, can only update accounts owned by themselves. Admin may update all accounts.
- createUser - Account holders (separate service) may create users under their own account. Admin may create users under any account.
- deleteUser - Allows users to delete their own account. Admin may delete any user.
- me - Allows a user to fetch their own logged in data.

## Usage

### Access Required Repositories

First, be sure you have been granted instant access as a collaborator to the `@the-devoyage/graphql-users` repository by purchasing access as our [BaseTools Checkout](https://basetools.io/checkout/dQe81uv0) page.

Clone this repo.

Then make sure you have the following access to other required private repositories.

- Gateway Server - Never run this server standalone without modification for security. The Gateway server should handle authorization. Purchase access to our ready to go gateway server from [@the-devoyage/graphql-gateway](https://basetools.io/checkout/XGUVNNGr) or create your own.

- Accounts Server - Accounts handle primary authentication, login, and JSON Web Token Generation. Each user must have an associated account. Accounts can have more than 1 user. [@the-devoyage/graphql-accounts](https://basetools.io/checkout/v0cv56df)

- Media Server - A file upload server for saving the user profile image. [Purchase Access - Coming Soon]()

- Mailer Server - An automated email service that sends user emails based on events. [@the-devoyage/graphql-mailer](https://basetools.io/checkout/8G2fCyXe).

- Mailer-Connect - A NPM Package that is used to create a connection to the mailer server with typed inputs.[@the-devoyage/mailer-connect](https://basetools.io/checkout/wp7QYNNO)

- Mongo-Filter-Genertaor - A NPM Package that is used to aid in filtering and paginating queries. [@the-devoyage/mongo-filter-genertaor](https://basetools.io/checkout/vyOL9ATx)

### Install Dependencies

The dependencies above are private repos/registries and require a github token. Login to the github registry.

```
npm login --registry=https://npm.pkg.github.com
```

Install

```
npm i
```

If you are using docker, pass your auth token to an environment variable to allow the docker build process to install from private repos/registries. Always expire tokens after use.

```bash
export GITHUB_TOKEN=mytoken
```

### Set Environment Variables

Copy the `.env.example` file to `.env` and fill in the correct variable information.

### Run The Server

In Development:

```
npm run dev
```

In Production:

```
npm run build

npm start
```
