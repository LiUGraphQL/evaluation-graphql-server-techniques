import { gql } from "apollo-server";

export default gql`
  type Review {
    nr: ID!
    title: String
    text: String
    reviewDate: Date
    rating1: Int
    rating2: Int
    rating3: Int
    rating4: Int
    publishDate: Date
    reviewer: Person
    reviewFor: Product
  }

  extend type Query {
    review(nr: ID!): Review
    reviews: [Review]
  }
`;
