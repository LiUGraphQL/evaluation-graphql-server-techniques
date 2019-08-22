import { gql } from "apollo-server";

export default gql`
  type Product {
    nr: ID!
    label: String
    comment: String
    producer: Producer
    type: ProductType
    features: [ProductFeature]
    publishDate: Date
    reviews(order: ReviewSortingCriterion): [Review]
    offers(where: OfferWhereInput): [Offer]
  }

  extend type Query {
    product(nr: ID!): Product
    products: [Product]
  }
`;
