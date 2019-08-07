import Product from "./model";
import _ from "lodash";
import { model as ProductTypeProduct } from "../productTypeProduct";
import { model as ProductFeatureProduct } from "../productFeatureProduct";
import db from "../database";
import { allGeneric } from "../helpers";

const getProductByNr = nr => {
  let query = db
    .select()
    .from("product")
    .where("nr", nr);

  return query.then(rows => new Product(rows[0]));
};

const getProductsByNrs = nrs => {
  let query = db
    .select("nr")
    .from("product")
    .whereIn("nr", nrs);

  return query.then(rows => rows.map(({ nr }) => ({ nr })));
};

const getProductsByProducerNr = producerNr => {
  let query = db
    .select("nr")
    .from("product")
    .where("producer", producerNr);

  return query.then(rows => rows.map(({ nr }) => ({ nr })));
};

const getProductTypeProductByProductType = productTypeNr => {
  let query = db
    .select()
    .from("producttypeproduct")
    .where("producttype", productTypeNr);

  return query.then(rows => rows.map(row => new ProductTypeProduct(row)));
};

const getProductFeatureProductsByProductFeature = productFeaturesNr => {
  let query = db
    .select()
    .from("productfeatureproduct")
    .where("productfeature", productFeaturesNr);

  return query.then(rows => rows.map(row => new ProductFeatureProduct(row)));
};

export default class ProductRepository {
  // ! DUMB
  async get(nr) {
    return getProductByNr(nr);
  }

  async all() {
    return allGeneric(Product, "product");
  }

  // ! DUMB
  async findBy({ producerNr, productType, productFeature }) {
    if (producerNr) {
      return getProductsByProducerNr(producerNr);
    } else if (productType) {
      const productTypeProducts = await getProductTypeProductByProductType(
        productType
      );
      return getProductsByNrs(productTypeProducts.map(ptp => ptp.product));
    } else if (productFeature) {
      const productFeatureProducts = await getProductFeatureProductsByProductFeature(
        productFeature
      );
      return getProductsByNrs(productFeatureProducts.map(pfp => pfp.product));
    } else {
      throw Error("Missing argument.");
    }
  }
}
