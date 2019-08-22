import { gql } from "apollo-server";

export default gql`
  type ProductType {
    nr: ID!
    label: String
    comment: String
    parent: ProductType
    products: [Product]
  }

  extend type Query {
    productType(nr: ID!): ProductType
    productTypes: [ProductType]
  }
`;
