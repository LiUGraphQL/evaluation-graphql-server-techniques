import { gql } from "apollo-server";

export default gql`
  type Product {
    nr: ID!
    label: String
    comment: String
    producer: Producer
    productType: ProductType
    productFeature: [ProductFeature]
    publishDate: Date
    reviews(order: ReviewSortingCriterion): [Review]
    offers(where: OfferWhereInput): [Offer]
  }

  input ReviewSortingCriterion {
    field: ReviewFieldInput
    direction: SortDirection
  }

  input OfferWhereInput {
    AND: OfferWhereInput
    OR: OfferWhereInput
    NOT: OfferWhereInput
    vendor: VendorFieldInput
  }

  input VendorFieldInput {
    nr: ID
    comment: StringCriterion
    publishDate: DateCriterion
  }

  input StringCriterion {
    criterion: MatchCriterion
    pattern: String
  }

  input DateCriterion {
    criterion: MatchCriterion
    date: Date
  }

  extend type Query {
    product(nr: ID!): Product
    products: [Product]
  }
`;
