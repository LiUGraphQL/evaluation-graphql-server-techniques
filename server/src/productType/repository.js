import _ from "lodash";
import ProductType from "./model";
import { model as ProductTypeProduct } from "../productTypeProduct";
import db from "../database";
import { memoize, allGeneric } from "../helpers";

const getProductTypeByNr = nr => {
  let query = db
    .select()
    .from("producttype")
    .where("nr", nr);

  return query.then(rows => new ProductType(rows[0]));
};

const getProductTypeProductByProductNr = productNr => {
  let query = db
    .select()
    .from("producttypeproduct")
    .where("product", productNr);

  return query.then(rows => new ProductTypeProduct(rows[0]));
};

export default class ProductTypeRepository {
  memoizedGetProductTypeByNr = memoize(getProductTypeByNr);
  memoizedGetProductTypeProductByProductNr = memoize(
    getProductTypeProductByProductNr
  );

  // ! DUMB
  async get(nr) {
    return this.memoizedGetProductTypeByNr(nr);
  }

  async all() {
    return allGeneric(ProductType, "producttype");
  }

  // ! DUMB
  async findBy({ product: productNr }) {
    const productTypeProduct = await this.memoizedGetProductTypeProductByProductNr(
      productNr
    );
    return this.memoizedGetProductTypeByNr(productTypeProduct.productType);
  }
}
