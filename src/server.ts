import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { ApolloServer } from "apollo-server";
import { schema } from "@src/graphql";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

dotenv.config();

const apolloServer = new ApolloServer({
  schema: schema,
  context: ({ req }) => Helpers.Subgraph.GenerateContext({ req }),
});

let DB = process.env.MONGO_URI!;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo DB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.BACKEND_PORT || 5002;

apolloServer
  .listen({ port })
  .then(({ url }) => console.log(`Users service ready at ${url}`));
