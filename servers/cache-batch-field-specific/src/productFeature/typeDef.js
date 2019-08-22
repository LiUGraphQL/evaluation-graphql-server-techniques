import { gql } from "apollo-server";

export default gql`
  type ProductFeature {
    nr: ID!
    label: String
    comment: String
    products: [Product]
  }

  extend type Query {
    productFeature(nr: ID!): ProductFeature
    productFeatures: [ProductFeature]
  }
`;
