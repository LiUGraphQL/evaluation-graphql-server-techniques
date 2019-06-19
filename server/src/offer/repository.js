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

  async countBy({ nr: vendorId, first, after }) {
    const firstDefined = typeof first !== "undefined" && first !== null;
    const afterDefined = typeof after !== "undefined" && after !== null;

    let query = db.count("nr as count").from(function() {
      this.select()
        .where({ vendor: vendorId })
        .from("offer");
      if (firstDefined) this.limit(first);
      if (afterDefined) this.andWhere("publishDate", ">", after);
      this.as("inner");
    });

    return query.then(([response]) => response.count);
  }

  async sumBy({ nr: vendorId, first, after }) {
    const firstDefined = typeof first !== "undefined" && first !== null;
    const afterDefined = typeof after !== "undefined" && after !== null;

    let query = db.sum("price as sum").from(function() {
      this.select()
        .where({ vendor: vendorId })
        .from("offer");
      if (firstDefined) this.limit(first);
      if (afterDefined) this.andWhere("publishDate", ">", after);
      this.as("inner");
    });

    return query.then(([response]) => response.sum);
  }

  async maxBy({ nr: vendorId, first, after }) {
    const firstDefined = typeof first !== "undefined" && first !== null;
    const afterDefined = typeof after !== "undefined" && after !== null;

    let query = db.max("price as max").from(function() {
      this.select()
        .where({ vendor: vendorId })
        .from("offer");
      if (firstDefined) this.limit(first);
      if (afterDefined) this.andWhere("publishDate", ">", after);
      this.as("inner");
    });

    return query.then(([response]) => response.max);
  }

  async minBy({ nr: vendorId, first, after }) {
    const firstDefined = typeof first !== "undefined" && first !== null;
    const afterDefined = typeof after !== "undefined" && after !== null;

    let query = db.min("price as min").from(function() {
      this.select()
        .where({ vendor: vendorId })
        .from("offer");
      if (firstDefined) this.limit(first);
      if (afterDefined) this.andWhere("publishDate", ">", after);
      this.as("inner");
    });

    return query.then(([response]) => response.min);
  }

  // TODO figure out a clever way to solve this issue
  // probably needs to do some recursion here
  async where(where) {}
}
