import Validator from "validator";
import isEmpty from "is-empty";
import { DeleteUserInput } from "types/generated";
import { isValidObjectId } from "mongoose";

export const DeleteUser = (args: DeleteUserInput) => {
  let errors: Partial<Record<keyof DeleteUserInput, string>> = {};

  if (Validator.isEmpty(args._id)) {
    errors._id = "Please provide the _id of user to delete.";
  } else {
    if (!isValidObjectId(args._id)) {
      errors._id = "The _id provided is invliad.";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
