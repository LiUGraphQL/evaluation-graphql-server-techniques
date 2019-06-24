import { gql } from "apollo-server";

export default gql`
  enum Code {
    US
    UK
    JP
    CN
    DE
    FR
    ES
    RU
    KR
    AT
    GB
  }

  enum ReviewFieldInput {
    nr
    title
    text
    reviewDate
    rating1
    rating2
    rating3
    rating4
    publishDate
  }

  enum SortDirection {
    ASC
    DESC
  }

  enum StringCriterion {
    CONTAINS
    START_WITH
    END_WITH
    EQUALS
  }

  enum DateCriterion {
    BEFORE
    AFTER
    EQUALS
  }
`;
