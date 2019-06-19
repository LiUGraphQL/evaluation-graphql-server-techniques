import ProductType from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class ProductTypeRepository {
  async get(nr) {
    if (typeof nr !== "undefined" && nr !== null) {
      return getGeneric(nr, ProductType, "producttype");
    }
    return null;
  }

  async all() {
    return allGeneric(ProductType, "producttype");
  }

  async findBy({ product }) {
    if (typeof product !== "undefined" && product !== null) {
      return db
        .select("producttype")
        .from("producttypeproduct")
        .where("product", product)
        .first()
        .then(response => {
          return db
            .select()
            .from("producttype")
            .where("nr", response.producttype)
            .first()
            .then(productType => new ProductType(productType));
        });
    } else {
      throw Error("Required argument is invalid.");
    }
  }
}
