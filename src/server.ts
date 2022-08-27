import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { ApolloServer } from "apollo-server";
import { schema } from "@src/graphql";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
//import { ApolloServerPluginGraphQLPaywall } from "@the-devoyage/paywall-helpers";
import { Mutation, Query } from "types/generated";
import { Context } from "types/context";
import { User } from "@src/models";

dotenv.config();

const apolloServer = new ApolloServer({
  schema: schema,
  context: async ({ req }) => {
    const context = Helpers.Subgraph.GenerateContext({
      req,
    }) as Context;

    context.currentQuantity = {
      activeUsers: await User.count({
        "memberships.account": context.auth.payload.account?._id,
        "memberships.status": "ACTIVE",
      }),
    };

    return context;
  },
  plugins: [
    // ApolloServerPluginGraphQLPaywall<Query & Mutation>({
    //   paywallURI: "http://localhost:5010",
    //   serviceName: "users",
    //   resolversConfig: {
    //     getUsers: "LTE",
    //     updateUser: "LTE",
    //     me: "LTE",
    //     deleteUser: "LTE",
    //     inviteUser: "LT",
    //     loginUser: "LTE",
    //     switchUserMembership: "LTE",
    //   },
    //   defaultLimits: [
    //     {
    //       name: "activeUsers",
    //       scopes: [
    //         {
    //           paywall: {
    //             _id: "626b0eefdcdf4efcc17164d1",
    //           },
    //           quantity: 3,
    //         },
    //       ],
    //     },
    //   ],
    // }),
  ],
});

const DB = process.env.MONGO_URI;

if (DB) {
  mongoose
    .connect(DB)
    .then(() => console.log("Mongo DB Connected..."))
    .catch((err) => console.log(err));
} else {
  console.log("Mongo URI Not provided, failed to connect to DB.");
}

const port = process.env.BACKEND_PORT || 5002;

apolloServer
  .listen({ port })
  .then(({ url }) => console.log(`Users service ready at ${url}`));
