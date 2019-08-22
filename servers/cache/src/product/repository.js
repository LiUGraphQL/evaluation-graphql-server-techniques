import Product from "./model";
import _ from "lodash";
import { model as ProductTypeProduct } from "../productTypeProduct";
import { model as ProductFeatureProduct } from "../productFeatureProduct";
import db from "../database";
import { memoize, allGeneric } from "../helpers";

const getProductByNr = nr => {
  let query = db
    .select()
    .from("product")
    .where("nr", nr);

  return query.then(rows => new Product(rows[0]));
};

const getProductsByNrs = nrs => {
  let query = db
    .select()
    .from("product")
    .whereIn("nr", nrs);

  return query.then(rows => rows.map(row => new Product(row)));
};

const getProductsByProducerNr = producerNr => {
  let query = db
    .select()
    .from("product")
    .where("producer", producerNr);

  return query.then(rows => rows.map(row => new Product(row)));
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
  memoizedGetProductByNr = memoize(getProductByNr);
  memoizedGetProductsByNrs = memoize(getProductsByNrs);
  memoizedGetProductsByProducerNr = memoize(getProductsByProducerNr);
  memoizedGetProductTypeProductByProductType = memoize(
    getProductTypeProductByProductType
  );
  memoizedGetProductFeatureProductsByProductFeature = memoize(
    getProductFeatureProductsByProductFeature
  );

  // ! DUMB
  async get(nr) {
    return this.memoizedGetProductByNr(nr);
  }

  async all() {
    return allGeneric(Product, "product");
  }

  // ! DUMB
  async findBy({ producerNr, productType, productFeature }) {
    if (producerNr) {
      return this.memoizedGetProductsByProducerNr(producerNr);
    } else if (productType) {
      const productTypeProducts = await this.memoizedGetProductTypeProductByProductType(
        productType
      );
      return this.memoizedGetProductsByNrs(
        productTypeProducts.map(ptp => ptp.product)
      );
    } else if (productFeature) {
      const productFeatureProducts = await this.memoizedGetProductTypeProductByProductType(
        productFeature
      );
      return this.memoizedGetProductsByNrs(
        productFeatureProducts.map(pfp => pfp.product)
      );
    } else {
      throw Error("Missing argument.");
    }
  }
}
