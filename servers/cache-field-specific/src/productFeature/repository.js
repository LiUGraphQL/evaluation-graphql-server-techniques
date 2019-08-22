import _ from "lodash";
import ProductFeature from "./model";
import { model as ProductFeatureProduct } from "../productFeatureProduct";
import db from "../database";
import { memoize, allGeneric } from "../helpers";

const getProductFeatureByNr = nr => {
  let query = db
    .select()
    .from("productfeature")
    .where("nr", nr);

  return query.then(rows => new ProductFeature(rows[0]));
};

const getProductFeaturesByNrs = nrs => {
  let query = db
    .select("nr")
    .from("productfeature")
    .whereIn("nr", nrs);

  return query.then(rows => rows.map(({ nr }) => ({ nr })));
};

const getProductFeatureProductsByProductNr = productNr => {
  let query = db
    .select()
    .from("productfeatureproduct")
    .where("product", productNr);

  return query.then(rows => rows.map(row => new ProductFeatureProduct(row)));
};

export default class ProductFeatureRepository {
  memoizedGetProductFeatureByNr = memoize(getProductFeatureByNr);
  memoizedGetProductFeaturesByNrs = memoize(getProductFeaturesByNrs);
  memoizedGetProductFeatureProductsByProductNr = memoize(
    getProductFeatureProductsByProductNr
  );

  // ! DUMB
  async get(nr) {
    return this.memoizedGetProductFeatureByNr(nr);
  }

  async all() {
    return allGeneric(ProductFeature, "productfeature");
  }

  // ! DUMB
  async byProductNr({ nr }) {
    const productFeatureProducts = await this.memoizedGetProductFeatureProductsByProductNr(
      nr
    );
    return this.memoizedGetProductFeaturesByNrs(
      productFeatureProducts.map(pfp => pfp.productFeature)
    );
  }
}
