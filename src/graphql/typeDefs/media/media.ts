import { gql } from "apollo-server-express";

export const Media = gql`
  type Media @key(fields: "_id", resolvable: false) {
    _id: ObjectID!
  }
`;
