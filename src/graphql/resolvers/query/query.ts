import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { User } from "@src/models";
import { QueryResolvers, User as IUser } from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Query: QueryResolvers = {
  me: async (_parent, _args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const me = await User.findOne<IUser>({
        _id: context.auth.payload.user?._id,
      }).select("-password");

      if (!me) {
        throw new Error("User can not be found.");
      }

      await User.populate(me, { path: "created_by" });
      await User.populate(me, { path: "memberships.created_by" });

      return me;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getUsers: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<IUser>({
        fieldFilters: args.getUsersInput.query,
        config: args.getUsersInput.config,
      });

      const users = await User.findAndPaginate<IUser>(filter, options, {
        history: {
          filter: {
            interval: args.getUsersInput.config?.history?.interval ?? [],
          },
        },
      });

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
