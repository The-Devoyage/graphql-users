import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
import { User } from "types/generated";

const Schema = mongoose.Schema;

const UserSchema = new Schema<User, FindAndPaginateModel>(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: Object,
      required: true,
      default: {
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zip: "",
      },
    },
    email: {
      type: String,
      required: false,
    },
    stripe_customer_id: {
      type: String,
      required: false,
    },
    stripe_connected_account_id: {
      type: String,
      required: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    image: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    role: {
      type: Number,
      required: true,
      default: 100,
    },
    account: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User, FindAndPaginateModel>("User", UserSchema);

export { User };
