import Vendor from "./model";
import _ from "lodash";
import db from "../database";
import DataLoader from "dataloader";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../config";

const getVendorByNr = nr => {
  let query = db
    .select()
    .from("vendor")
    .where("nr", nr);

  // ensure response has rows in correct order
  return query.then(rows => new Vendor(rows[0]));
};

const getAllVendors = () => {
  let query = db.select().from("vendor");

  return query.then(rows => rows.map(row => new Vendor(row)));
};

export default class VendorRepository {
  // ! DUMB
  async get(nr) {
    return getVendorByNr(nr);
  }

  // ! DUMB
  async all() {
    return getAllVendors();
  }
}
