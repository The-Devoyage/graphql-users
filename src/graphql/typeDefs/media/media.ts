import { gql } from "apollo-server-express";

export const Media = gql`
  extend type Media @key(fields: "_id") {
    _id: ObjectID! @external
  }
`;
