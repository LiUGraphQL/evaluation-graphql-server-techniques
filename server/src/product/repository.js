import Product from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class ProductRepository {
  async get(nr) {
    return getGeneric(nr, Product, "product");
  }

  async all() {
    return allGeneric(Product, "product");
  }

  async findBy({ productType, productFeature }) {
    if (typeof productType !== "undefined" && productType !== null) {
      return db
        .select("product")
        .from("producttypeproduct")
        .where("producttype", productType)
        .then(response => {
          const productNrs = response.map(
            productTypeProduct => productTypeProduct.product
          );
          return db
            .select()
            .from("product")
            .where("nr", "in", productNrs)
            .then(products => products.map(product => new Product(product)));
        });
    } else if (
      typeof productFeature !== "undefined" &&
      productFeature !== null
    ) {
      return db
        .select("product")
        .from("productfeatureproduct")
        .where("productfeature", productFeature)
        .then(response => {
          const productNrs = response.map(
            productFeatureProduct => productFeatureProduct.product
          );
          return db
            .select()
            .from("product")
            .where("nr", "in", productNrs)
            .then(products => products.map(product => new Product(product)));
        });
    } else {
      throw Error;
    }
  }
}
