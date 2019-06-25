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
    title
    text
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

  enum OffersSortingField {
    nr
    price
    validFrom
    validTo
    deliveryDays
    offersWebpage
    publisher
    publishDate
  }
`;
