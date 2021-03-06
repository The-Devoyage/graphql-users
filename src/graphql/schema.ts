import { buildSubgraphSchema } from "@apollo/federation";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";

export const schema = buildSubgraphSchema([
  { typeDefs: typeDefs.Query, resolvers: resolvers.Query },
  { typeDefs: typeDefs.User, resolvers: resolvers.User },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
  { typeDefs: typeDefs.Account, resolvers: resolvers.Account },
  { typeDefs: typeDefs.Mutation, resolvers: resolvers.Mutation },
  { typeDefs: typeDefs.Media },
]);
