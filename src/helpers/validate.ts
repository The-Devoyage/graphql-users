import { isValidObjectId } from "mongoose";
import Validator from "validator";

export const isOptionalButEmpty = <T>(data: {
  args: Partial<Record<keyof T, any>>;
  errors: Partial<Record<keyof T, any>>;
  keyNames: Array<keyof T>;
}) => {
  for (const k of data.keyNames) {
    if (
      typeof data.args[k] === "string" &&
      k in data.args &&
      Validator.isEmpty(data.args[k])
    ) {
      data.errors[k] = `If ${k} is supplied, provide a value.`;
    }
  }

  return data.errors;
};

export const isPresentButInvalidId = <T extends Record<string, any>>(data: {
  args: Partial<Record<keyof T, any>>;
  errors: Partial<Record<keyof T, any>>;
  keyNames: Array<keyof T>;
}) => {
  for (const k of data.keyNames) {
    if (
      k in data.args &&
      !Validator.isEmpty(data.args[k]) &&
      !isValidObjectId(data.args[k])
    ) {
      data.errors[k] = `Invalid Id.`;
    }
  }

  return data.errors;
};
