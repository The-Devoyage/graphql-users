import { User as UserModel } from "@src/models";
import { User as IUser } from "types/generated";
import { UserResolvers } from "types/generated";

export const User: UserResolvers = {
  __resolveReference: async (ref: IUser) => {
    try {
      const user = await UserModel.findOne<IUser>({ _id: ref._id });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
