import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { User } from "@src/models";
import bcrypt from "bcryptjs";
import { AccountResolvers, User as IUser } from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Account: AccountResolvers = {
  loginUser: async (account, args) => {
    if (!args.loginUserInput) {
      return null;
    }
    try {
      const user = await User.findOne<IUser>({
        _id: args.loginUserInput?._id,
      });

      if (!user) {
        throw new Error("Something went wrong when logging user in.");
      }

      if (user.account.toString() !== account._id.toString()) {
        return null;
      }

      if (user?.password) {
        if (args.loginUserInput?.credentials) {
          const authenticated = await bcrypt.compare(
            args.loginUserInput?.credentials?.password,
            user.password
          );
          if (!authenticated) {
            throw new Error("Something went wrong when logging user in.");
          }
        }
      }

      if (process.env.JWT_ENCRYPTION_KEY) {
        const token = Helpers.Resolver.GenerateToken({
          payload: {
            account: {
              _id: account._id,
              email: account.email,
            },
            user: { _id: user._id, role: user.role, email: user.email },
          },
          secretOrPublicKey: process.env.JWT_ENCRYPTION_KEY,
          options: { expiresIn: "10h" },
        });

        if (token) {
          const verifiedUser = await User.findOne({
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
            location: "account",
            fieldFilter: {
              string: account._id,
              filterBy: "OBJECTID",
              operator: "AND",
            },
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
