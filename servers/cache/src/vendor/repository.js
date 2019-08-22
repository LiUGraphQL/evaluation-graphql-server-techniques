import Vendor from "./model";
import _ from "lodash";
import db from "../database";
import { memoize } from "../helpers";

const getVendorByNr = nr => {
  let query = db
    .select()
    .from("vendor")
    .where("nr", nr);

  return query.then(rows => new Vendor(rows[0]));
};

const getAllVendors = args => {
  let query = db.select().from("vendor");

  return query.then(rows => rows.map(row => new Vendor(row)));
};

export default class VendorRepository {
  memoizedGetVendorByNr = memoize(getVendorByNr);
  memoizedGetAllVendors = memoize(getAllVendors);

  // ! DUMB
  async get(nr) {
    return this.memoizedGetVendorByNr(nr);
  }

  // ! DUMB
  async all() {
    return this.memoizedGetAllVendors("all");
  }
}
