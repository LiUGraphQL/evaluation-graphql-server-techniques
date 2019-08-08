import _ from "lodash";
import Offer from "./model";
import db from "../database";
import { memoize, allGeneric } from "../helpers";

const getOfferByNr = nr => {
  let query = db
    .select()
    .from("offer")
    .where("nr", nr);

  return query.then(rows => new Offer(rows[0]));
};

const getOfferPricesByNrs = nrs => {
  let query = db
    .select("price")
    .from("offer")
    .whereIn("nr", nrs);

  return query.then(rows => rows.map(row => row.price));
};

const getOffersByVendorNr = vendorNr => {
  let query = db
    .select("nr")
    .from("offer")
    .where("vendor", vendorNr);

  return query.then(rows => rows.map(({ nr }) => ({ nr })));
};

// ! this needs to return Offers because of offers (order)
const getOffersByVendorNrs = vendorNrs => {
  let query = db
    .select()
    .from("offer")
    .whereIn("vendor", vendorNrs);

  return query.then(rows => rows.map(row => new Offer(row)));
};

const getOffersByProductNr = productNr => {
  let query = db
    .select("nr")
    .from("offer")
    .where("product", productNr);

  return query.then(rows => rows.map(({ nr }) => ({ nr })));
};

export default class OfferRepository {
  memoizedGetOfferByNr = memoize(getOfferByNr);
  memoizedGetOfferPricesByNrs = memoize(getOfferPricesByNrs);
  memoizedGetOffersByVendorNr = memoize(getOffersByVendorNr);
  memoizedGetOffersByVendorNrs = memoize(getOffersByVendorNrs);
  memoizedGetOffersByProductNr = memoize(getOffersByProductNr);

  // ! DUMB
  async get(nr) {
    return this.memoizedGetOfferByNr(nr);
  }

  async all() {
    return allGeneric(Offer, "offer");
  }

  async pricesByNrs(nrs) {
    return this.memoizedGetOfferPricesByNrs(nrs);
  }

  // ! DUMB
  async findByVendor({ nr, limit, offset }) {
    const offers = await this.memoizedGetOffersByVendorNr(nr);
    return this.limitOffsetOrder({ offers, limit, offset });
  }

  limitOffsetOrder({ offers, limit, offset, order }) {
    offers = offset ? offers.slice(offset) : offers;
    offers = limit ? offers.slice(0, limit) : offers;
    offers = order ? _.orderBy(offers, order) : offers;

    return offers;
  }

  async offers({ where, limit, order }, repos) {
    const vendorNrs = await this.where(where, repos);
    let offers = await this.memoizedGetOffersByVendorNrs(vendorNrs);
    offers = this.limitOffsetOrder({ offers, limit, order });
    return offers.map(({ nr }) => ({ nr }));
  }

  // ? With field-specific all selects except the last one
  // ? only gets the nrs, so this becomes a little cumbersome here.
  async productOffers({ where, productNr }, repos) {
    const vendorNrsPromise = this.where(where, repos);
    const offersByProductPromise = this.memoizedGetOffersByProductNr(productNr);
    const vendorNrs = await vendorNrsPromise;
    let offersByVendor = await this.memoizedGetOffersByVendorNrs(vendorNrs);
    const offersByProduct = await offersByProductPromise;
    offersByVendor = offersByVendor.map(({ nr }) => ({ nr }));
    return _.intersectionBy(offersByProduct, offersByVendor, "nr");
  }

  // ! DUMB
  // ? returns vendorNrs.
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

    return vendorNrs;
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
