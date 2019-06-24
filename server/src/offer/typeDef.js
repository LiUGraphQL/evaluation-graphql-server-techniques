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
    NOT: OfferWhereInput
    OR: [OfferWhereInput]
    vendor: VendorFieldInput
  }

  input VendorFieldInput {
    nr: ID
    comment: [StringMatching]
    publishDate: [DateMatching]
  }

  input StringMatching {
    criterion: StringCriterion
    pattern: String
  }

  input DateMatching {
    criterion: DateCriterion
    date: Date
  }

  extend type Query {
    offer(nr: ID!): Offer
    offers: [Offer]
  }
`;
