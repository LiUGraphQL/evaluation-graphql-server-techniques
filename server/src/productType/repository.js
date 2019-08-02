import ProductType from "./model";
import { model as ProductTypeProduct } from "../productTypeProduct";
import db from "../database";
import DataLoader from "dataloader";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../config";

const getProductTypeByNr = nrs => {
  let query = db
    .select()
    .from("producttype")
    .whereIn("nr", nrs);

  // ensure response has rows in correct order
  return query.then(rows => simpleSortRows(rows, nrs, ProductType));
};

const getProductTypeProductByProductNr = productNrs => {
  let query = db
    .select()
    .from("producttypeproduct")
    .whereIn("product", productNrs);

  // ensure response has rows in correct order
  return query.then(rows =>
    productNrs.map(
      nr => new ProductTypeProduct(rows.find(row => row.product === nr))
    )
  );
};

export default class ProductTypeRepository {
  productTypeByNrLoader = new DataLoader(getProductTypeByNr, { cache });
  productTypeProductByProductLoader = new DataLoader(
    getProductTypeProductByProductNr,
    {
      cache
    }
  );

  // ! DATALOADED
  async get(nr) {
    return this.productTypeByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(ProductType, "producttype");
  }

  // ! DATALOADED
  async findBy({ product }) {
    const productTypeProduct = await this.productTypeProductByProductLoader.load(
      product
    );
    return this.productTypeByNrLoader.load(productTypeProduct.productType);
  }
}
