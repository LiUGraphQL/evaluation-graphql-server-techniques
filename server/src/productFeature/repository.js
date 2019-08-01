import ProductFeature from "./model";
import { model as ProductFeatureProduct } from "../productFeatureProduct";
import db from "../database";
import DataLoader from "dataloader";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../config";

const getProductFeatureByNr = nrs => {
  let query = db
    .select()
    .from("productfeature")
    .whereIn("nr", nrs);

  // ensure response has rows in correct order
  return query.then(rows => simpleSortRows(rows, nrs, ProductFeature));
};

const getProductFeatureProductByProduct = products => {
  let query = db
    .select()
    .from("productfeatureproduct")
    .whereIn("product", products);

  // ensure response has rows in correct order
  return query.then(rows =>
    products.map(nr =>
      rows
        .filter(row => row.product === nr)
        .map(row => new ProductFeatureProduct(row))
    )
  );
};

export default class ProductFeatureRepository {
  productFeatureByNrLoader = new DataLoader(getProductFeatureByNr, { cache });
  productFeatureProductByProductLoader = new DataLoader(
    getProductFeatureProductByProduct,
    { cache }
  );

  // ! DATALOADED
  async get(nr) {
    return this.productFeatureByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(ProductFeature, "productfeature");
  }

  // ! DATALOADED
  async findBy({ product }) {
    const productFeatureProducts = await this.productFeatureProductByProductLoader.load(
      product
    );
    return this.productFeatureByNrLoader.loadMany(
      productFeatureProducts.map(pfp => pfp.productFeature)
    );
  }
}
