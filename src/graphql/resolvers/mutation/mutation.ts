import { User } from "@src/models";
import { UpdateQuery } from "mongoose";
import { MutationResolvers, User as IUser } from "types/generated";
import bcrypt from "bcryptjs";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Mutation: MutationResolvers = {
  loginUser: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const user = await User.findOne<IUser>({
        _id: args.loginUserInput._id,
        account: context.auth.payload?.account?._id,
      });

      if (!user) {
        throw new Error("Something went wrong when logging user in.");
      }

      if (user?.password) {
        if (args.loginUserInput.credentials) {
          const authenticated = await bcrypt.compare(
            args.loginUserInput.credentials?.password,
            user.password
          );
          if (!authenticated) {
            throw new Error("Something went wrong when logging user in.");
          }
        }
      }

      if (
        user.account._id.toString() !==
        context.auth.payload?.account?._id.toString()
      ) {
        throw new Error("User does not belong to this account.");
      }

      if (process.env.JWT_ENCRYPTION_KEY) {
        const token = Helpers.Resolver.GenerateToken({
          payload: {
            account: context.auth.payload.account,
            user: { _id: user._id, role: user.role, email: user.email },
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
  createUser: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      if (args.createUserInput.account) {
        if (
          args.createUserInput.account !== context.auth.payload?.account?._id
        ) {
          Helpers.Resolver.CheckAuth({ context, requireUser: true });
          Helpers.Resolver.LimitRole({
            userRole: context.auth.payload?.user?.role,
            roleLimit: 1,
            errorMessage:
              "You may not add users to an account that is not your own.",
          });
        }
      }

      const accountHasUsers = await User.countDocuments({
        account: context.auth.payload?.account?._id,
      });

      const created_by: string | undefined =
        context.auth.payload?.user?._id ?? undefined;

      if (args.createUserInput.role && args.createUserInput.role < 10) {
        Helpers.Resolver.CheckAuth({ context, requireUser: true });
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
          errorMessage:
            "You do not have permission to add a role of this level.",
        });
      }

      const role = args.createUserInput.role
        ? args.createUserInput.role
        : accountHasUsers
        ? 100
        : 10;

      const newUser = new User({
        ...args.createUserInput,
        role,
        account:
          args.createUserInput.account ?? context.auth.payload?.account?._id,
        created_by,
      });

      await newUser.save();

      const user = await User.findOne<IUser>({ _id: newUser._id });

      if (!user) {
        throw new Error(
          "Something went wrong when finding newly created user."
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
      Helpers.Resolver.CheckAuth({ context });

      const user = await User.findOne<IUser>({ _id: args.updateUserInput._id });

      if (!user) {
        throw new Error("User does not exist.");
      }

      if (args.updateUserInput.role && args.updateUserInput.role < 10) {
        Helpers.Resolver.CheckAuth({ context, requireUser: true });
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload?.user?.role,
          roleLimit: 1,
          errorMessage:
            "Only admins can manage external accounts and admin level roles.",
        });
      }

      const updateQuery = { ...args.updateUserInput };

      const updatedUser = await User.findOneAndUpdate<IUser>(
        { _id: args.updateUserInput._id },
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

      const userBelongsToAccount =
        user?.account._id === context.auth.payload?.account?._id;

      if (!userBelongsToAccount) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload?.user?.role,
          roleLimit: 1,
        });
      }

      if (!user) {
        throw new Error("Can not find user to delete.");
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
