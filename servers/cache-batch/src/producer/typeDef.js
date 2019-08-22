import { gql } from "apollo-server";

export default gql`
  type Producer {
    nr: ID!
    label: String
    comment: String
    homepage: String
    country: Country
    products: [Product]
  }

  extend type Query {
    producer(nr: ID!): Producer
    producers: [Producer]
  }
`;
