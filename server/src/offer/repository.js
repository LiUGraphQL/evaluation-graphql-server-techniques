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
    return query.then(([response]) => response.avg);
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

  // TODO figure out a clever way to solve this issue
  // probably needs to do some recursion here
  async whereInputToSqlQuery(input) {
    // First we want to resolve all the vendors.
    let vendorQuery = db("vendor").select("nr");
    const { vendor, AND, OR, NOT } = input;
    if (vendor) vendorQuery = this.resolveVendorField(vendorQuery, vendor);
    if (AND) vendorQuery = this.resolveAndField(vendorQuery, AND);
    if (OR) vendorQuery = this.resolveOrField(vendorQuery, OR);

    let query = db("offer").where("vendor", "in", vendorQuery);
    return query.then(response => {
      // Response will be all the offers that match
      // the input criterion for the vendors.
      console.log(response);
      console.log(query.toString());

      return null;
    });
  }

  resolveAndField(query, andInput) {
    andInput.forEach(({ vendor }) => {
      query = this.resolveVendorField(query, vendor, "and");
    });
    return query;
  }

  resolveOrField(query, orInput) {
    orInput.forEach(({ vendor }) => {
      query = this.resolveVendorField(query, vendor, "or");
    });
    return query;
  }

  resolveVendorField(query, vendorInput, operator) {
    const { nr, comment, publishDate } = vendorInput;
    switch (operator) {
      case "and":
        if (nr) {
          return query.andWhere({ nr });
        }
      case "or":
        if (nr) {
          return query.orWhere({ nr });
        }
    }
    if (comment) {
      comment.forEach(c => {
        query = this.resolveVendorCommentField(query, c, operator);
      });
    }
    if (publishDate) {
      publishDate.forEach(p => {
        query = this.resolveVendorPublishDateField(query, p, operator);
      });
    }

    return query;
  }

  resolveVendorCommentField(query, comment, operator) {
    const { criterion, pattern } = comment;
    let matchPattern;
    switch (criterion) {
      case "CONTAINS":
        matchPattern = `%${pattern}%`;
        break;
      case "START_WITH":
        matchPattern = `${pattern}%`;
        break;
      case "END_WITH":
        matchPattern = `%${pattern}`;
        break;
      case "EQUALS":
        matchPattern = `${pattern}`;
        break;
    }
    switch (operator) {
      case "and":
        return query.andWhere("comment", "like", matchPattern);
      case "or":
        return query.orWhere("comment", "like", matchPattern);
      default:
        return query.where("comment", "like", matchPattern);
    }
  }

  resolveVendorPublishDateField(query, publishDate) {
    const { criterion, date } = publishDate;
    const column = "publishDate";
    switch (criterion) {
      case "BEFORE":
        return query.where(column, "<", date);
      case "AFTER":
        return query.where(column, ">", date);
      case "EQUALS":
        return query.where(column, pattern);
    }
  }
}
