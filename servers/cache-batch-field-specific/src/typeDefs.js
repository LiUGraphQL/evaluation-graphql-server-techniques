import { gql } from "apollo-server";
import { typeDef as enumsTypeDef } from "./enums";
import { typeDef as productTypeDef } from "./product";
import { typeDef as personTypeDef } from "./person";
import { typeDef as reviewTypeDef } from "./review";
import { typeDef as productTypeTypeDef } from "./productType";
import { typeDef as productFeatureTypeDef } from "./productFeature";
import { typeDef as countryTypeDef } from "./country";
import { typeDef as producerTypeDef } from "./producer";
import { typeDef as offerTypeDef } from "./offer";
import { typeDef as vendorTypeDef } from "./vendor";

const typeDef = gql`
  type Query

  scalar Date
`;

export default [
  typeDef,
  enumsTypeDef,
  productTypeDef,
  personTypeDef,
  reviewTypeDef,
  productTypeTypeDef,
  productFeatureTypeDef,
  countryTypeDef,
  producerTypeDef,
  offerTypeDef,
  vendorTypeDef
];
