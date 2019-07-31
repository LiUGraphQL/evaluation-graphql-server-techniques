import Product from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../helpers";

const getProductByNr = nrs => {
  let query = db
    .select()
    .from("product")
    .whereIn("nr", nrs);

  return query.then(response => response.map(product => new Product(product)));
};

export const productByNrLoader = new DataLoader(getProductByNr, { cache });

export default class ProductRepository {
  async get(nr) {
    return productByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(Product, "product");
  }

  async findBy({ producerNr, productType, productFeature }) {
    if (typeof producerNr !== "undefined" && producerNr !== null) {
      return db("product")
        .where({ producer: producerNr })
        .then(products => products.map(product => new Product(product)));
    } else if (typeof productType !== "undefined" && productType !== null) {
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
