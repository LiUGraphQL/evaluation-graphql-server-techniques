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
    let query = db
      .select()
      .from("offer")
      .where({ vendor: vendorNr });
    if (limit) query.limit(limit);
    if (offset) query.offset(offset);

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
    const { vendor, AND } = where || {}; // || {} if where is undefined
    if (vendor) vendorQuery = this.resolveVendorField(vendorQuery, vendor);
    if (AND) vendorQuery = this.resolveAndField(vendorQuery, AND);

    let query = db("offer");
    if (vendor) query.where("vendor", "in", vendorQuery);
    if (productNr) query.andWhere("product", productNr);
    if (limit) query.limit(limit);
    if (order) query.orderBy(order);

    return query.then(response => {
      return response.map(offer => new Offer(offer));
    });
  }

  resolveAndField(query, andInput) {
    andInput.forEach(({ vendor }) => {
      query = this.resolveVendorField(query, vendor);
    });
    return query;
  }

  resolveVendorField(query, vendorInput) {
    const { nr, comment, publishDate } = vendorInput;
    if (nr) {
      return query.andWhere({ nr });
    }
    if (comment) {
      return this.resolveVendorCommentField(query, comment);
    }
    if (publishDate) {
      return this.resolveVendorPublishDateField(query, publishDate);
    }
  }

  resolveVendorCommentField(query, comment) {
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
    return query.andWhere("comment", "like", matchPattern);
  }

  resolveVendorPublishDateField(query, publishDate) {
    const { criterion, date } = publishDate;
    let dateEquality;
    switch (criterion) {
      case "BEFORE":
        dateEquality = "<";
        break;
      case "AFTER":
        dateEquality = ">";
        break;
      case "EQUALS":
        dateEquality = "=";
        break;
    }
    return query.andWhere("publishDate", dateEquality, date);
  }
}
