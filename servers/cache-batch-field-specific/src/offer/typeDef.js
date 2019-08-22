import { gql } from "apollo-server";

export default gql`
  type Offer {
    nr: ID!
    price: Float
    validFrom: Date
    validTo: Date
    deliveryDays: Int
    offerWebpage: String
    publisher: Int
    publishDate: Date
    product: Product
    vendor: Vendor
  }

  type CollectionOfEdgesToOffers {
    aggregate: AggregateOffers!
  }

  type AggregateOffers {
    count: Int!
    price: PriceAggregationOfOffers!
  }

  type PriceAggregationOfOffers {
    sum: Float!
    avg: Float!
    max: Float!
    min: Float!
  }

  input OfferWhereInput {
    AND: [OfferWhereInput!]
    vendor: VendorFieldInput
  }

  input VendorFieldInput {
    nr: ID
    comment: StringMatching
    publishDate: DateMatching
  }

  input StringMatching {
    criterion: StringCriterion
    pattern: String
  }

  input DateMatching {
    criterion: DateCriterion
    date: Date
  }

  input OrderFieldInput {
    orderField1: OffersSortingField
    orderField2: OffersSortingField
  }

  extend type Query {
    offer(nr: ID!): Offer
    offers(
      where: OfferWhereInput
      limit: Int
      order: [OffersSortingField]
    ): [Offer]
  }
`;
