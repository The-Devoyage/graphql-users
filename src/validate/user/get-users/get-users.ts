import Validator from "validator";
import isEmpty from "is-empty";
import { isValidObjectId } from "mongoose";
import { GetUsersInput } from "types/generated";

export const GetUsers = (args: GetUsersInput) => {
  const errors: { created_by?: string; email?: string } = {};

  if (args && "created_by" in args && typeof args.created_by === "string") {
    if (Validator.isEmpty(args.created_by)) {
      errors.created_by = "If created_by is supplied, provide a value.";
    } else if (
      !Validator.isEmpty(args.created_by) &&
      !isValidObjectId(args.created_by)
    ) {
      errors.created_by = "Invalid ID for property created_by.";
    }
  }

  if (args && "email" in args && typeof args.email === "string") {
    if (Validator.isEmpty(args.email)) {
      errors.email = "Please provide an email to query.";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
