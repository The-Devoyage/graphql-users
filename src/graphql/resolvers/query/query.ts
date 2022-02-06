import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { checkAuth } from "@src/helpers";
import { User } from "@src/models";
import { QueryResolvers, User as IUser } from "types/generated";

export const Query: QueryResolvers = {
  me: async (_parent, _args, context) => {
    try {
      checkAuth({ context, requireUser: true });
      const me = await User.findOne({ _id: context.token.user?._id }).select(
        "-password"
      );
      if (!me) {
        throw new Error("User can not be found.");
      }
      return me;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getUsers: async (_parent, args, context) => {
    try {
      checkAuth({ context });

      const { filters, options } = GenerateMongo({
        fieldFilters: args.getUsersInput,
        config: args.getUsersInput.config,
      });

      const users = await User.findAndPaginate<IUser>(filters, options);

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
