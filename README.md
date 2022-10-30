# @the-devoyage/graphql-users

A Federated GraphQL Users API featuring user creation, management, authentication, and memberships.

## Docs

[The Devoyage - GraphQL Users](https://www.thedevoyage.com/users/intro)

## Quick Start

1. Login to the Github registry with NPM.

```bash
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

With Docker:

```bash
docker build -t name:tag --build-arg GITHUB_TOKEN="ghp_abcdefgxyzhijklmnop"
```

3. Configure Environment Variables

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

### Create an Admin User

To create an admin user you must have access to the mongo database as the system does not create admin users by default. Once you have access to the mongo database, simply change the user's membership role to 1. 

```
db.users.findOneAndUpdate({email: "admin@email.com", "memberships._id": ObjectId("12345")}, {$set: {"memberships.$.role": 1}})
```
