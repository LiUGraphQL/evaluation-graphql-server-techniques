import Vendor from "./model";
import db from "../database";
import DataLoader from "dataloader";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../config";

const getVendorByNr = nrs => {
  let query = db
    .select()
    .from("vendor")
    .whereIn("nr", nrs);

  // ensure response has rows in correct order
  return query.then(rows => simpleSortRows(rows, nrs, Vendor));
};

export default class VendorRepository {
  vendorByNrLoader = new DataLoader(getVendorByNr, { cache });

  // ! DATALOADED
  async get(nr) {
    return this.vendorByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(Vendor, "vendor");
  }
}
