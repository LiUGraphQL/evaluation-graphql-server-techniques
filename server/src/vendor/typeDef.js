import { gql } from "apollo-server";

export default gql`
  type Vendor {
    nr: ID!
    label: String
    comment: String
    homepage: String
    country: Country
    publisher: Int
    publishDate: Date
    offers(limit: Int, offset: Int): [Offer]
    offersConnection(first: Int, after: String): CollectionOfEdgesToOffers
  }

  type CollectionOfEdgesToOffers {
    aggregate: AggregateOffers
  }

  type AggregateOffers {
    count: Int!
    sum: Float
    avg: Float
    max: Float
    min: Float
  }

  extend type Query {
    vendor(nr: ID!): Vendor
    vendors: [Vendor]
  }
`;
