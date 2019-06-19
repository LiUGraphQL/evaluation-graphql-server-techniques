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

  extend type Query {
    offer(nr: ID!): Offer
    offers: [Offer]
  }
`;
