import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import { ApolloError } from "apollo-server";
import mongoose, { CallbackError } from "mongoose";
import { User } from "types/generated";

const Schema = mongoose.Schema;

const MembershipSchema = new Schema(
  {
    role: {
      type: Number,
      required: true,
      default: 100,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    account: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "PENDING",
      required: true,
    },
    default: {
      type: Boolean,
      required: true,
      default: false,
    },
    local: {
      first_name: { type: String },
      last_name: { type: String },
      phone: { type: String },
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
      image: {
        type: Schema.Types.ObjectId,
        required: false,
      },
      about: { type: String },
    },
  },
  { timestamps: true }
);

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
      required: true,
      unique: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    image: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    memberships: [{ type: MembershipSchema }],
    about: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

MembershipSchema.index({ account: 1, default: 1 }, { sparse: true });

type NextFunction = (err?: CallbackError) => void;
interface Error {
  code: number;
  name: string;
}

UserSchema.post(
  "save",
  function (error: Partial<Error>, _: User, next: NextFunction) {
    if (error.code === 11000 && error.name === "MongoServerError") {
      next(
        new ApolloError(
          "A user with this email already exists.",
          "DUPLICATE_USER"
        )
      );
    } else {
      next();
    }
  }
);

UserSchema.post(
  "update",
  function (error: Partial<Error>, _: User, next: NextFunction) {
    if (error.code === 11000 && error.name === "MongoServerError") {
      next(
        new ApolloError(
          "A user with this email already exists.",
          "DUPLICATE_USER"
        )
      );
    } else {
      next();
    }
  }
);

const User = mongoose.model<User, FindAndPaginateModel>("User", UserSchema);

export { User };
