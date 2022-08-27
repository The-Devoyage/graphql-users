import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { User } from "@src/models";
import { AccountResolvers, User as IUser } from "types/generated";

export const Account: AccountResolvers = {
  users: async (account, args) => {
    try {
      const { filter, options } = GenerateMongo<IUser>({
        fieldFilters: args.getUsersInput.query,
        config: {
          pagination: args.getUsersInput.config?.pagination,
        },
        fieldRules: [
          {
            location: "memberships.account",
            fieldFilter: {
              string: account._id,
              filterBy: "OBJECTID",
              operator: "AND",
              groups: ["account_users.and"],
            },
            action: "OVERRIDE",
          },
        ],
      });

      const users = await User.findAndPaginate<IUser>(filter, options);

      await User.populate(users.data, { path: "created_by" });
      await User.populate(users.data, { path: "memberships.created_by" });

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
