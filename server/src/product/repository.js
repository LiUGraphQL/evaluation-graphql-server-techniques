import Product from "./model";
import { model as ProductTypeProduct } from "../productTypeProduct";
import { model as ProductFeatureProduct } from "../productFeatureProduct";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getProductByNr = nrs => {
  let query = db
    .select()
    .from("product")
    .whereIn("nr", nrs);

  return query.then(rows => simpleSortRows(rows, nrs, Product));
};

const getProductsByProducerNr = producerNrs => {
  let query = db
    .select()
    .from("product")
    .whereIn("producer", producerNrs);

  return query.then(rows =>
    producerNrs.map(nr =>
      rows.filter(row => row.producer === nr).map(row => new Product(row))
    )
  );
};

const getProductTypeProductByProductType = productTypes => {
  let query = db
    .select()
    .from("producttypeproduct")
    .whereIn("producttype", productTypes);

  return query.then(rows =>
    productTypes.map(nr =>
      rows
        .filter(row => row.productType === nr)
        .map(row => new ProductTypeProduct(row))
    )
  );
};

const getProductFeatureProductByProductFeature = productFeatures => {
  let query = db
    .select()
    .from("productfeatureproduct")
    .whereIn("productfeature", productFeatures);

  return query.then(rows =>
    productFeatures.map(nr =>
      rows
        .filter(row => row.productFeature === nr)
        .map(row => new ProductFeatureProduct(row))
    )
  );
};

export default class ProductRepository {
  productByNrLoader = new DataLoader(getProductByNr, { cache });
  productByProducerNrLoader = new DataLoader(getProductsByProducerNr, {
    cache
  });
  productTypeProductByProductTypeLoader = new DataLoader(
    getProductTypeProductByProductType,
    {
      cache
    }
  );
  productFeatureProductByProductFeatureLoader = new DataLoader(
    getProductFeatureProductByProductFeature,
    { cache }
  );

  // ! DATALOADED
  async get(nr) {
    return this.productByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(Product, "product");
  }

  // ! DATALOADED
  async findBy({ producerNr, productType, productFeature }) {
    if (producerNr) {
      const products = await this.productByProducerNrLoader.load(producerNr);
      // Update nr cache with retreived products
      products.map(product =>
        this.productByNrLoader.prime(product.nr, product)
      );
      return products;
    } else if (productType) {
      let productTypeProducts = await this.productTypeProductByProductTypeLoader.load(
        productType
      );
      return this.productByNrLoader.loadMany(
        productTypeProducts.map(ptp => ptp.product)
      );
    } else if (productFeature) {
      let productFeatureProducts = await this.productFeatureProductByProductFeatureLoader.load(
        productFeature
      );
      return this.productByNrLoader.loadMany(
        productFeatureProducts.map(pfp => pfp.product)
      );
    } else {
      throw Error("Missing argument.");
    }
  }
}
