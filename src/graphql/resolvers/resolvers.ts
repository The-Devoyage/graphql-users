import { Resolvers } from "types/generated/index";
import {
  DateTimeScalar,
  GraphQLObjectID,
} from "@the-devoyage/mongo-filter-generator";
import { Account } from "./account";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { User } from "./user";

export const resolvers: Resolvers = {
  Account,
  GraphQLObjectID: GraphQLObjectID,
  DateTime: DateTimeScalar,
  Query,
  Mutation,
  User: User,
};
