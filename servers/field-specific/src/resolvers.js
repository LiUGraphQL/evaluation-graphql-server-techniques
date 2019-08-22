import { resolvers as productResolvers } from "./product";
import { resolvers as personResolvers } from "./person";
import { resolvers as reviewResolvers } from "./review";
import { resolvers as productTypeResolvers } from "./productType";
import { resolvers as productFeatureResolvers } from "./productFeature";
import { resolvers as producerResolvers } from "./producer";
import { resolvers as offerResolvers } from "./offer";
import { resolvers as vendorResolvers } from "./vendor";
import { resolvers as countryResolvers } from "./country";

export default [
  productResolvers,
  personResolvers,
  reviewResolvers,
  productTypeResolvers,
  productFeatureResolvers,
  producerResolvers,
  offerResolvers,
  vendorResolvers,
  countryResolvers
];
