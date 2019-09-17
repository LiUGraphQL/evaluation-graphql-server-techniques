import Vendor from "./model";
import _ from "lodash";
import db from "../database";
import DataLoader from "dataloader";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../config";

const getVendorByNr = nrs => {
  const uniqueNrs = _.uniq(nrs);
  let query = db
    .select()
    .from("vendor")
    .whereIn("nr", uniqueNrs);

  // ensure response has rows in correct order
  return query.then(rows => simpleSortRows(rows, nrs, Vendor));
};

const getAllVendors = keys => {
  let query = db.select().from("vendor");

  return query.then(rows => {
    const res = rows.map(row => new Vendor(row));
    const arr = [];
    keys.forEach(el => {
      arr.push(res);
    });
    return arr;
  });
};

export default class VendorRepository {
  vendorByNrLoader = new DataLoader(getVendorByNr, { cache });
  allVendorLoader = new DataLoader(getAllVendors, { cache });

  // ! DATALOADED
  async get(nr) {
    return this.vendorByNrLoader.load(nr);
  }

  // ! DATALOADED
  async all() {
    let vendors = await this.allVendorLoader.load("all");
    vendors.forEach(vendor => this.vendorByNrLoader.prime(vendor.nr, vendor));
    return vendors;
  }
}
