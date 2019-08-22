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
    offersConnection: CollectionOfEdgesToOffers
  }

  extend type Query {
    vendor(nr: ID!): Vendor
    vendors: [Vendor]
  }
`;
