import { Resolvers } from "types/generated/index";
import { Account } from "./account";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { User } from "./user";

export const resolvers: Resolvers = {
  Account: { Account },
  Query: { Query },
  Mutation: { Mutation },
  User: { User },
};
