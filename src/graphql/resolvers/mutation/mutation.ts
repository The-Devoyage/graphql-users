import { checkAuth, limitRole } from "@src/helpers";
import { User } from "@src/models";
import { Validate } from "@src/validate";
import { UserInputError } from "apollo-server-express";
import { UpdateQuery } from "mongoose";
import { MutationResolvers, User as IUser } from "types/generated";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isHttpQueryError } from "apollo-server-core";

export const Mutation: MutationResolvers = {
  loginUser: async (_, args, context) => {
    try {
      checkAuth({ context });

      const user = await User.findOne<IUser>({
        _id: args.loginUserInput._id,
        account: context.token.account?._id,
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
        user.account._id.toString() !== context.token.account?._id.toString()
      ) {
        throw new Error("User does not belong to this account.");
      }

      const payload = {
        account: context.token.account,
        user: { _id: user._id, role: user.role },
      };

      if (process.env.JWT_ENCRYPTION_KEY) {
        const token = jwt.sign(payload, process.env.JWT_ENCRYPTION_KEY, {
          expiresIn: "10h",
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
  createUser: async (_parent, args, context) => {
    const { errors, isValid } = Validate.User.CreateUser(args.createUserInput);
    try {
      checkAuth({ context });

      if (!isValid) {
        throw new UserInputError("Invalid data.", { errors });
      }

      if (args.createUserInput.account) {
        if (args.createUserInput.account !== context.token.account?._id) {
          checkAuth({ context, requireUser: true });
          limitRole(
            context.token.user?.role,
            1,
            "You may not add users to an account that is not your own."
          );
        }
      }

      const accountHasUsers = await User.countDocuments({
        account: context.token.account?._id,
      });

      const created_by: string | undefined =
        context.token.user?._id ?? undefined;
      const role = accountHasUsers ? 100 : 10;

      const newUser = new User({
        ...args.createUserInput,
        role,
        account: args.createUserInput.account ?? context.token.account?._id,
        created_by,
      });

      await newUser.save();

      const user = await User.findOne({ _id: newUser._id });

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
    const { errors, isValid } = Validate.User.UpdateUser(args.updateUserInput);

    try {
      checkAuth({ context });

      if (!isValid) {
        throw new UserInputError("Invalid data.", { errors });
      }

      const user = await User.findOne<IUser>({ _id: args.updateUserInput._id });

      if (!user) {
        throw new Error("User does not exist.");
      }

      if (
        args.updateUserInput.role &&
        args.updateUserInput.role < 10 &&
        args.updateUserInput.account !== context.token.account?._id
      ) {
        checkAuth({ context, requireUser: true });
        limitRole(
          context.token.user?.role,
          1,
          "Only admins can manage external accounts and admin level roles."
        );
      }

      const updateQuery = { ...args.updateUserInput };

      const updatedUser = await User.findOneAndUpdate(
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
    const { isValid, errors } = Validate.User.DeleteUser(args.deleteUserInput);

    try {
      checkAuth({ context, requireUser: true });

      if (!isValid) {
        throw new UserInputError("Invalid data.", { errors });
      }

      const user = await User.findOne<IUser>({
        _id: args.deleteUserInput._id,
      });

      const userBelongsToAccount =
        user?.account._id === context.token.account?._id;

      if (!userBelongsToAccount) {
        limitRole(context.token.user?.role, 1);
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
