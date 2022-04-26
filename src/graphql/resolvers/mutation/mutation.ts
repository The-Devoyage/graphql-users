import { User } from "@src/models";
import { UpdateQuery } from "mongoose";
import {
  MembershipStatusEnum,
  MutationResolvers,
  StringFilterByEnum,
  UpdateUserInput,
  User as IUser,
} from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { updateMembership } from "./update-membership";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";

export const Mutation: MutationResolvers = {
  loginUser: async (_parent, _args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { account } = context.auth.payload;

      if (!account?._id || !account?.email) {
        throw new Error("Account ID and Email are required to log in user.");
      }

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
  switchUserMembership: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const user = await User.findOne<IUser>({
        _id: context.auth.payload.user?._id,
      });

      if (!user) {
        throw new Error("Something went wrong when logging user in.");
      }

      const membership = user?.memberships.find(
        (m) =>
          m._id.toString() ===
          args.switchUserMembershipInput.membership_id.toString()
      );

      if (!membership) {
        throw new Error("Can't find membership for this account.");
      }

      if (membership.status !== "ACTIVE") {
        throw new Error(
          `You do not have permission to acccess this membership as it has the status of ${membership.status}.`
        );
      }

      if (process.env.JWT_ENCRYPTION_KEY) {
        const token = Helpers.Resolver.GenerateToken({
          payload: {
            account: {
              _id: membership.account._id.toString(),
              email: membership.account.email,
            },
            user: { _id: user._id, role: membership.role, email: user.email },
          },
          secretOrPublicKey: process.env.JWT_ENCRYPTION_KEY,
          options: { expiresIn: "10h" },
        });

        if (token) {
          return { token: token, user: user };
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
  inviteUser: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      let user = await User.findOne<IUser>({
        email: args.inviteUserInput.email,
      });

      if (!user) {
        const created_by = context.auth.payload?.user?._id;

        const newUser = new User({
          email: args.inviteUserInput.email,
          created_by,
        });

        await newUser.save();

        user = await User.findOne<IUser>({ _id: newUser._id });

        if (!user) {
          throw new Error(
            "Something went wrong when finding newly created user."
          );
        }
      }

      const membership = user.memberships.find(
        (m) =>
          m.account._id.toString() ===
          context.auth.payload.account?._id.toString()
      );

      if (membership) {
        throw new Error("This user has already been invited to this account.");
      }

      user = await updateMembership(
        {
          user: {
            _id: [
              {
                string: user._id.toString(),
                filterBy: "OBJECTID" as StringFilterByEnum,
              },
            ],
          },
          memberships: {
            role: args.inviteUserInput.role ?? 100,
            account: context.auth.payload.account?._id,
            status: "PENDING" as MembershipStatusEnum,
            local: args.inviteUserInput.local,
          },
        },
        context
      );

      if (!user) {
        throw new Error(
          "Something went wrong when updating invited user membership."
        );
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateUser: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      if (
        Object.keys(args.updateUserInput).filter(
          (k) => k !== "user" && k !== "memberships"
        ).length
      ) {
        if (args.updateUserInput.user._id?.length) {
          for (const id of args.updateUserInput.user._id)
            if (context.auth.payload.user?._id !== id?.string) {
              Helpers.Resolver.LimitRole({
                userRole: context.auth.payload?.user?.role,
                roleLimit: 1,
                errorMessage: "Only admins and owners may edit user details.",
              });
            }
        }
      }

      const { filter } = GenerateMongo<IUser>({
        fieldFilters: args.updateUserInput.user,
      });

      const user = await User.findOne<IUser>(filter);

      if (!user) {
        throw new Error("User does not exist.");
      }

      await updateMembership(args.updateUserInput, context);

      delete args.updateUserInput.memberships;

      const updateQuery = { ...args.updateUserInput };

      const updatedUser = await User.findOneAndUpdate<IUser>(
        filter,
        updateQuery as UpdateQuery<typeof User>,
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User does not exist.");
      }

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteUser: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const user = await User.findOne<IUser>({
        _id: args.deleteUserInput._id,
      });

      if (!user) {
        throw new Error("User not found.");
      }

      if (user?._id !== context.auth.payload.user?._id) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload?.user?.role,
          roleLimit: 1,
          errorMessage: "Only admin may delete users.",
        });
      }

      const deletedUser = await User.deleteOne({
        _id: args.deleteUserInput._id,
      });

      if (deletedUser.deletedCount === 0) {
        throw new Error("Something went wrong when deleting the user.");
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
