import Validator from "validator";
import isEmpty from "is-empty";
import { isValidObjectId } from "mongoose";
import { UpdateUserInput } from "types/generated";

export const UpdateUser = (args: UpdateUserInput) => {
  const errors: {
    _id?: string;
    email?: string;
    phone?: string;
    profile_img?: string;
  } = {};

  if (!args._id) {
    errors._id = "The _id property is required in order to update a user.";
  } else {
    if (!isValidObjectId(args._id)) {
      errors._id = "The _id provided is not valid.";
    }
  }

  if ("profile_img" in args && args.profile_img) {
    if (Validator.isEmpty(args.profile_img)) {
      errors.profile_img =
        "Either include the _id of the profile image or exclude this proptery from the request.";
    } else {
      if (!isValidObjectId(args.profile_img)) {
        errors.profile_img = "Invalid ID of profile image.";
      }
    }
  }

  if ("phone" in args && args.phone) {
    if (Validator.isEmpty(args.phone)) {
      errors.phone = "The phone number is missing on this optional property.";
    } else {
      if (!Validator.isMobilePhone(args.phone))
        errors.phone = "Please provide a valid phone number.";
    }
  }

  if (args && "email" in args && typeof args.email === "string") {
    if (Validator.isEmpty(args.email)) {
      errors.email = "Please provide a new email.";
    } else {
      if (!Validator.isEmail(args.email)) {
        errors.email = "Invalid email address.";
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
