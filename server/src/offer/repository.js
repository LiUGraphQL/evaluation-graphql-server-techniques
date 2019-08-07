import _ from "lodash";
import Offer from "./model";
import db from "../database";
import { allGeneric } from "../helpers";
import { memoize } from "../helpers";

const getOfferByNr = nr => {
  let query = db
    .select()
    .from("offer")
    .where("nr", nr);

  return query.then(rows => new Offer(rows[0]));
};

const getOffersByVendorNr = vendorNr => {
  let query = db
    .select()
    .from("offer")
    .where("vendor", vendorNr);

  return query.then(rows => rows.map(row => new Offer(row)));
};

const getOffersByVendorNrs = vendorNrs => {
  let query = db
    .select()
    .from("offer")
    .whereIn("vendor", vendorNrs);

  return query.then(rows => rows.map(row => new Offer(row)));
};

export default class OfferRepository {
  memoizedGetOfferByNr = memoize(getOfferByNr);
  memoizedGetOffersByVendorNr = memoize(getOffersByVendorNr);
  memoizedGetOffersByVendorNrs = memoize(getOffersByVendorNrs);

  // ! DUMB
  async get(nr) {
    return this.memoizedGetOfferByNr(nr);
  }

  async all() {
    return allGeneric(Offer, "offer");
  }

  // ! DUMB
  async findByVendor({ nr, offset, limit }) {
    let offers = await this.memoizedGetOffersByVendorNr(nr);

    offers = offset ? offers.slice(offset) : offers;
    offers = limit ? offers.slice(0, limit) : offers;

    return offers;
  }

  async offers({ where, limit, order }, repos) {
    let offers = await this.where(where, repos);

    offers = limit ? offers.slice(0, limit) : offers;
    offers = order ? _.orderBy(offers, order) : offers;

    return offers;
  }

  async productOffers({ where, productNr }, repos) {
    let offers = await this.where(where, repos);
    return offers.filter(offer => offer.productId == productNr);
  }

  // ! DUMB
  async where(where, repos) {
    let vendors = await repos.vendor.all();

    const { vendor: vendorArg, AND } = where || {};

    if (vendorArg) {
      vendors = this.resolveVendorField(vendors, vendorArg);
    } else if (AND) {
      AND.forEach(({ vendor: vendorArg }) => {
        vendors = this.resolveVendorField(vendors, vendorArg);
      });
    }
    const vendorNrs = vendors.map(vendor => vendor.nr);

    return this.memoizedGetOffersByVendorNrs(vendorNrs);
  }

  resolveAndField(query, andInput) {
    andInput.forEach(({ vendor }) => {
      query = this.resolveVendorField(query, vendor);
    });
    return query;
  }

  resolveVendorField(vendors, vendorArg) {
    const { nr, comment, publishDate } = vendorArg;
    if (nr) {
      vendors = vendors.filter(vendor => vendor.nr == nr);
    } else if (comment) {
      vendors = this.resolveVendorCommentField(vendors, comment);
    } else if (publishDate) {
      vendors = this.resolveVendorPublishDateField(vendors, publishDate);
    }
    return vendors;
  }

  resolveVendorCommentField(vendors, comment) {
    const { criterion, pattern } = comment;
    switch (criterion) {
      case "CONTAINS":
        vendors = vendors.filter(vendor => vendor.comment.includes(pattern));
        break;
      case "START_WITH":
        vendors = vendors.filter(vendor => vendor.comment.startsWith(pattern));
        break;
      case "END_WITH":
        vendors = vendors.filter(vendor => vendor.comment.endsWith(pattern));
        break;
      case "EQUALS":
        vendors = vendors.filter(vendor => vendor.comment === pattern);
        break;
    }

    return vendors;
  }

  resolveVendorPublishDateField(vendors, publishDate) {
    const { criterion, date } = publishDate;
    switch (criterion) {
      case "BEFORE":
        vendors = vendors.filter(
          vendor => Date.parse(vendor.publishDate) < Date.parse(date)
        );
        break;
      case "AFTER":
        vendors = vendors.filter(
          vendor => Date.parse(vendor.publishDate) > Date.parse(date)
        );
        break;
      case "EQUALS":
        vendors = vendors.filter(
          vendor => Date.parse(vendor.publishDate) === Date.parse(date)
        );
        break;
    }

    return vendors;
  }
}
