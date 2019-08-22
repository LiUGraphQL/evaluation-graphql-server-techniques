import { repository as productRepo } from "./product";
import { repository as personRepo } from "./person";
import { repository as reviewRepo } from "./review";
import { repository as productTypeRepo } from "./productType";
import { repository as productFeatureRepo } from "./productFeature";
import { repository as producerRepo } from "./producer";
import { repository as offerRepo } from "./offer";
import { repository as vendorRepo } from "./vendor";
export default (() => {
  return {
    repository: {
      product: new productRepo(),
      person: new personRepo(),
      review: new reviewRepo(),
      productType: new productTypeRepo(),
      productFeature: new productFeatureRepo(),
      producer: new producerRepo(),
      offer: new offerRepo(),
      vendor: new vendorRepo()
    }
  };
});