import { User } from "@src/models";
import { UpdateQuery } from "mongoose";
import {
  MembershipStatusEnum,
  MutationResolvers,
  StringFilterByEnum,
  User as IUser,
} from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { updateMembership } from "./update-membership";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { ApolloError } from "apollo-server";

export const Mutation: MutationResolvers = {
  createUser: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });
      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
      });

      const {
        email,
        about,
        image,
        phone,
        address,
        last_name,
        first_name,
      } = args.createUserInput.payload;

      const newUser = new User({
        email,
        about,
        image,
        phone,
        address,
        last_name,
        first_name,
      });
      await newUser.save();

      const user = await User.findOne<IUser>({ _id: newUser._id });

      if (!user) {
        throw new Error("Could not find newly created user.");
      }

      if (args.createUserInput.payload.memberships) {
        const {
          status,
          local,
          role,
          account,
          default: isAccountOwner,
        } = args.createUserInput.payload.memberships;

        const userWithMembership = await updateMembership(
          {
            query: {
              _id: [
                {
                  filterBy: "OBJECTID" as StringFilterByEnum,
                  string: user._id,
                },
              ],
            },
            payload: {
              memberships: {
                role: role ?? 100,
                account,
                status: status ?? ("PENDING" as MembershipStatusEnum),
                local,
                default: isAccountOwner,
              },
            },
          },
          context
        );

        if (!userWithMembership) {
          throw new Error("Failed to create membership.");
        }
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
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
            location: "memberships.account",
            fieldFilter: {
              string: account._id,
              groups: ["loginUser.and"],
              filterBy: "OBJECTID",
              operator: "OR",
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
            query: {
              _id: [
                {
                  filterBy: "OBJECTID" as StringFilterByEnum,
                  string: user._id,
                },
              ],
            },
            payload: {
              memberships: {
                role: 10,
                account: account._id,
                status: "ACTIVE" as MembershipStatusEnum,
                default: true,
              },
            },
          },
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

      if (
        args.inviteUserInput.payload.memberships?.account !==
        context.auth.payload.account?._id
      ) {
        Helpers.Resolver.LimitRole({
          roleLimit: 1,
          userRole: context.auth.payload.user?.role,
        });
      }

      if (Object.keys(args.inviteUserInput.query).length === 0) {
        throw new Error("You may not invite all users to your account.");
      }

      const { filter } = GenerateMongo<IUser>({
        fieldFilters: args.inviteUserInput.query,
      });

      let user = await User.findOne<IUser>(filter);

      if (!user) {
        const created_by = context.auth.payload?.user?._id;

        const {
          first_name,
          last_name,
          phone,
          email,
          address,
          image,
          about,
        } = args.inviteUserInput.payload;

        const newUser = new User({
          email,
          first_name,
          last_name,
          phone,
          address,
          image,
          about,
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
          (args.inviteUserInput.payload.memberships?.account ??
            context.auth.payload.account?._id.toString())
      );

      if (membership) {
        throw new ApolloError(
          "This user has already been invited to this account.",
          "USER_EXISTS",
          {
            errors: {
              query: {
                _id: "This user has already been invited to this account.",
              },
            },
          }
        );
      }

      const { account, role, local, status } =
        args.inviteUserInput.payload.memberships ?? {};

      user = await updateMembership(
        {
          query: {
            _id: [
              {
                string: user._id.toString(),
                filterBy: "OBJECTID" as StringFilterByEnum,
              },
            ],
          },
          payload: {
            memberships: {
              role: role ?? 100,
              account: account ?? (context.auth.payload.account?._id as string),
              status: status ?? ("PENDING" as MembershipStatusEnum),
              local: {
                about: local?.about,
                image: local?.image,
                phone: local?.phone,
                address: local?.address,
                last_name: local?.last_name,
                first_name: local?.first_name,
              },
            },
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

      const { filter } = GenerateMongo<IUser>({
        fieldFilters: args.updateUserInput.query,
      });

      const user = await User.findOne<IUser>(filter);

      if (!user) {
        throw new Error("User does not exist.");
      }

      let shouldUpdateMembership = true;

      if (user?._id.toString() !== context.auth.payload.user?._id.toString()) {
        const payloadKeys = Object.keys(args.updateUserInput.payload);

        if (payloadKeys.length === 1 && payloadKeys[0] === "memberships") {
          await updateMembership(args.updateUserInput, context);
          shouldUpdateMembership = false;
        } else {
          Helpers.Resolver.LimitRole({
            userRole: context.auth.payload?.user?.role,
            roleLimit: 1,
            errorMessage: "Only admins and owners may edit user details.",
          });
        }
      }

      shouldUpdateMembership &&
        (await updateMembership(args.updateUserInput, context));

      delete args.updateUserInput.payload.memberships;

      const updateQuery = { ...args.updateUserInput.payload };

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
  deleteUsers: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { filter } = GenerateMongo<IUser>({
        fieldFilters: args.deleteUsersInput.query,
      });

      const users = await User.find<IUser>(filter);

      if (users.some((u) => u?._id !== context.auth.payload.user?._id)) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload?.user?.role,
          roleLimit: 1,
          errorMessage: "Only admin may delete users.",
        });
      }

      const deletedUsers = await User.deleteMany(filter);

      if (deletedUsers.deletedCount === 0) {
        throw new Error("Something went wrong when deleting the user.");
      }

      return { deletedCount: deletedUsers.deletedCount };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
