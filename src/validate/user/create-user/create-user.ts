import Validator from "validator";
import isEmpty from "is-empty";
import { CreateUserInput } from "types/generated";
import { isOptionalButEmpty } from "@src/helpers";

export const CreateUser = (args: CreateUserInput) => {
  let errors: Partial<Record<keyof CreateUserInput, string>> = {};

  if (!Validator.isEmail(args.email)) {
    errors.email = "Email is invalid.";
  }

  errors = isOptionalButEmpty({
    errors,
    args,
    keyNames: ["phone", "last_name", "first_name", "profile_img"],
  });

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
