import ProductFeature from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class ProductFeatureRepository {
  async get(nr) {
    if (typeof nr !== "undefined" && nr !== null) {
      return getGeneric(nr, ProductFeature, "productfeature");
    }
    return null;
  }

  async all() {
    return allGeneric(ProductFeature, "productfeature");
  }

  async findBy({ product }) {
    if (typeof product !== "undefined" && product !== null) {
      return db
        .select("productfeature")
        .from("productfeatureproduct")
        .where("product", product)
        .then(response => {
          const productFeatureNrs = response.map(
            productFeatureProduct => productFeatureProduct.productfeature
          );
          return db
            .select()
            .from("productfeature")
            .where("nr", "in", productFeatureNrs)
            .then(productFeatures =>
              productFeatures.map(
                productFeature => new ProductFeature(productFeature)
              )
            );
        });
    } else {
      throw Error("Required argument is invalid");
    }
  }
}
