import { gql } from "apollo-server";

export default gql`
  type Person {
    nr: ID!
    name: String
    mbox_sha1sum: String
    country: Country
  }

  extend type Query {
    person(nr: ID!): Person
    persons: [Person]
  }
`;
