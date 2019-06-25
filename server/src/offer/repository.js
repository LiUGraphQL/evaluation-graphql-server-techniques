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

  async offers({ where, limit, order }) {
    return this.where({ where, limit, order });
  }

  async productOffers({ productNr, where }) {
    return this.where({ where, productNr });
  }

  async where({ where, limit, productNr, order }) {
    // First we want to resolve all the vendors.
    let vendorQuery = db("vendor").select("nr");
    const { vendor, AND, OR, NOT } = where;
    if (vendor) vendorQuery = this.resolveVendorField(vendorQuery, vendor);
    if (AND) vendorQuery = this.resolveAndField(vendorQuery, AND);
    if (OR) vendorQuery = this.resolveOrField(vendorQuery, OR);
    // TODO: NOT - maybe not

    let query = db("offer").where("vendor", "in", vendorQuery);
    if (productNr) query.andWhere("product", productNr);
    if (limit) query.limit(limit);
    if (order) {
      const { orderField1, orderField2 } = order;
      query.orderBy([orderField1, orderField2]);
    }

    return query.then(response => {
      console.log(query.toString());
      return response.map(offer => new Offer(offer));
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
    if (nr) {
      switch (operator) {
        // no need to have a case for "and"
        // since it is used on all cases where
        // operator is not defined
        case "or":
          return query.orWhere({ nr });
        default:
          return query.andWhere({ nr });
      }
    }
    if (comment) {
      return this.resolveVendorCommentField(query, comment, operator);
    }
    if (publishDate) {
      return this.resolveVendorPublishDateField(query, publishDate, operator);
    }
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

  resolveVendorPublishDateField(query, publishDate, operator) {
    const { criterion, date } = publishDate;
    let dateEquality;
    switch (criterion) {
      case "BEFORE":
        dateEquality = "<";
      case "AFTER":
        dateEquality = ">";
      case "EQUALS":
        dateEquality = "=";
    }
    switch (operator) {
      case "AND":
        return query.andWhere("publishDate", dateEquality, date);
      case "OR":
        return query.orWhere("publishDate", dateEquality, date);
    }
  }
}
