import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { User } from "@src/models";
import {
  AccountResolvers,
  UpdateUserInput,
  User as IUser,
} from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { updateMembership } from "../mutation/update-membership";

export const Account: AccountResolvers = {
  loginUser: async (account) => {
    try {
      const { filter } = GenerateMongo<IUser>({
        fieldFilters: {},
        fieldRules: [
          {
            action: "OVERRIDE",
            location: "email",
            fieldFilter: {
              string: account.email,
              filterBy: "MATCH",
              operator: "OR",
              groups: ["loginUser.and"],
            },
          },
          {
            action: "OVERRIDE",
            location: "memberships.default",
            fieldFilter: {
              bool: true,
              groups: ["loginUser.and"],
              filterBy: "EQ",
              operator: "OR",
            },
          },
          {
            action: "OVERRIDE",
            location: "memberships.account",
            fieldFilter: {
              string: account._id,
              groups: ["loginUser.and"],
              filterBy: "OBJECTID",
              operator: "OR",
            },
          },
        ],
      });

      let user = await User.findOne<IUser>(filter);

      if (!user) {
        const newUser = new User({ email: account.email });
        await newUser.save();
        user = await User.findOne<IUser>({
          email: account.email,
        });

        if (!user) {
          throw new Error("Something went wrong when logging user in.");
        }
      }

      let membership = user?.memberships.find(
        (m) => m.account._id.toString() === account?._id.toString()
      );

      if (!membership) {
        user = await updateMembership(
          {
            user: {
              _id: [
                {
                  filterBy: "OBJECTID",
                  string: user._id,
                },
              ],
            },
            memberships: {
              role: 10,
              account: account._id,
              status: "ACTIVE",
              default: true,
            },
          } as UpdateUserInput,
          {
            auth: {
              isAuth: true,
              payload: {
                account: { _id: account._id, email: account.email },
                user: { _id: user._id, role: 100, email: user.email },
              },
            },
          }
        );
        membership = user?.memberships.find(
          (m) => m.account._id.toString() === account?._id.toString()
        );

        if (!membership) {
          throw new Error(
            "Failed to create new membership when loggin user in."
          );
        }
      }

      if (!user) {
        throw new Error("Something went wrong when logging user in.");
      }

      if (process.env.JWT_ENCRYPTION_KEY) {
        const token = Helpers.Resolver.GenerateToken({
          payload: {
            account: {
              _id: account._id,
              email: account.email,
            },
            user: { _id: user._id, role: membership.role, email: user.email },
          },
          secretOrPublicKey: process.env.JWT_ENCRYPTION_KEY,
          options: { expiresIn: "10h" },
        });

        if (token) {
          const verifiedUser = await User.findOne<IUser>({
            _id: user._id,
          }).select("-password");
          if (!verifiedUser) {
            throw new Error("Something went wrong when logging user in.");
          }
          return { token: token, user: verifiedUser };
        } else {
          throw new Error("Something went wrong when logging user in.");
        }
      } else {
        throw new Error("Something went wrong when logging user in.");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  users: async (account, args) => {
    try {
      const { filter, options } = GenerateMongo({
        fieldFilters: args.getUsersInput,
        config: {
          pagination: args.getUsersInput.config?.pagination,
        },
        fieldRules: [
          {
            location: "memberships.account",
            fieldFilter: {
              string: account._id,
              filterBy: "OBJECTID",
              operator: "OR",
              groups: ["account_users.and"],
            },
            action: "OVERRIDE",
          },
          {
            location: "email",
            fieldFilter: {
              string: account.email,
              filterBy: "MATCH",
              operator: "OR",
              groups: ["account_users.and"],
            },
            action: "INITIAL",
          },
        ],
      });

      const users = await User.findAndPaginate<IUser>(filter, options);

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
