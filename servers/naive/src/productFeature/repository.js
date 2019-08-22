import _ from "lodash";
import ProductFeature from "./model";
import { model as ProductFeatureProduct } from "../productFeatureProduct";
import db from "../database";
import DataLoader from "dataloader";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../config";

const getProductFeatureByNr = nr => {
  let query = db
    .select()
    .from("productfeature")
    .where("nr", nr);

  return query.then(rows => new ProductFeature(rows[0]));
};

const getProductFeaturesByNrs = nrs => {
  let query = db
    .select()
    .from("productfeature")
    .whereIn("nr", nrs);

  return query.then(rows => rows.map(row => new ProductFeature(row)));
};

const getProductFeatureProductsByProductNr = productNr => {
  let query = db
    .select()
    .from("productfeatureproduct")
    .where("product", productNr);

  return query.then(rows => rows.map(row => new ProductFeatureProduct(row)));
};

export default class ProductFeatureRepository {
  // ! DUMB
  async get(nr) {
    return getProductFeatureByNr(nr);
  }

  async all() {
    return allGeneric(ProductFeature, "productfeature");
  }

  // ! DUMB
  async findBy({ product: productNr }) {
    const productFeatureProducts = await getProductFeatureProductsByProductNr(
      productNr
    );
    return getProductFeaturesByNrs(
      productFeatureProducts.map(pfp => pfp.productFeature)
    );
  }
}
