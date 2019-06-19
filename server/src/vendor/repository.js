import Vendor from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class VendorRepository {
  async get(nr) {
    return getGeneric(nr, Vendor, "vendor");
  }

  async all() {
    return allGeneric(Vendor, "vendor");
  }
}
