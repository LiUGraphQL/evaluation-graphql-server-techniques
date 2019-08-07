import _ from "lodash";
import ProductType from "./model";
import { model as ProductTypeProduct } from "../productTypeProduct";
import db from "../database";
import { allGeneric } from "../helpers";

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
  // ! DUMB
  async get(nr) {
    return getProductTypeByNr(nr);
  }

  async all() {
    return allGeneric(ProductType, "producttype");
  }

  // ! DUMB
  async byProductNr({ nr }) {
    const productTypeProduct = await getProductTypeProductByProductNr(nr);
    return getProductTypeByNr(productTypeProduct.productType);
  }
}
