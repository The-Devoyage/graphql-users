import { buildSubgraphSchema } from "@apollo/federation";
import { typeDefs, resolvers } from "./";
import { typeDefs as MFGTypeDefs } from "@the-devoyage/mongo-filter-generator";

export const schema = buildSubgraphSchema([
  { typeDefs, resolvers },
  { typeDefs: MFGTypeDefs },
]);
