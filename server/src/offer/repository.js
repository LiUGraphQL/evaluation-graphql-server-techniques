import Offer from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class OfferRepository {
  async get(nr) {
    return getGeneric(nr, Offer, "offer");
  }

  async all() {
    return allGeneric(Offer, "offer");
  }

  async findBy({ nr: vendorNr, limit, offset }) {
    const limitDefined = typeof limit !== "undefined" && limit !== null;
    const offsetDefined = typeof offset !== "undefined" && offset !== null;

    let query = db
      .select()
      .from("offer")
      .where({ vendor: vendorNr });
    if (limitDefined) query.limit(limit);
    if (offsetDefined) query.offset(offset);

    return query.then(response => response.map(offer => new Offer(offer)));
  }

  async countBy({ nr: vendorId }) {
    let query = db("offer")
      .count("nr as count")
      .where({ vendor: vendorId });
    return query.then(([response]) => response.count);
  }

  async avgBy({ nr: vendorId }) {
    let query = db("offer")
      .avg({ avg: "price" })
      .where({ vendor: vendorId });
    return query.then(([respnse]) => response.avg);
  }

  async sumBy({ nr: vendorId }) {
    let query = db("offer")
      .sum("price as sum")
      .where({ vendor: vendorId });
    return query.then(([response]) => response.sum);
  }

  async maxBy({ nr: vendorId }) {
    let query = db("offer")
      .max("price as max")
      .where({ vendor: vendorId })
      .from("offer");
    return query.then(([response]) => response.max);
  }

  async minBy({ nr: vendorId }) {
    let query = db("offer")
      .min("price as min")
      .where({ vendor: vendorId })
      .from("offer");
    return query.then(([response]) => response.min);
  }

  whereHelper(query, where) {
    if (where.AND) {
    } else if (where.OR) {
    } else if (where.NOT) {
    }
  }

  // TODO figure out a clever way to solve this issue
  // probably needs to do some recursion here
  async where(where) {
    let query = db("offer");
    query = this.whereHelper(query, where);
  }
}
