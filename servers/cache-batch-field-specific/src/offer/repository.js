import _ from "lodash";
import DataLoader from "dataloader";
import Offer from "./model";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import { cache } from "../helpers";

const getOfferByNrs = nrs => {
  const uniqueNrs = _.uniq(nrs);
  let query = db
    .select()
    .from("offer")
    .whereIn("nr", uniqueNrs);

  return query.then(rows => simpleSortRows(rows, nrs, Offer));
};

const getOfferByVendorNr = vendorNrs => {
  const uniqueNrs = _.uniq(vendorNrs);
  let query = db
    .select()
    .from("offer")
    .whereIn("vendor", uniqueNrs);

  return query.then(rows => {
    return vendorNrs.map(nr =>
      rows.filter(row => row.vendor === nr).map(row => new Offer(row))
    );
  });
};

const getAllOffers = keys => {
  let query = db.select().from("offer");

  return query.then(rows => [rows.map(row => new Offer(row))]);
};

export default class OfferRepository {
  offerByNrLoader = new DataLoader(getOfferByNrs, { cache });
  allOfferLoader = new DataLoader(getAllOffers, { cache });
  offerByVendorNrLoader = new DataLoader(getOfferByVendorNr, { cache });

  // ! DATALOADED
  async get(nr) {
    return this.offerByNrLoader.load(nr);
  }

  async all() {
    let offers = await this.allOfferLoader.load("all");
    offers.forEach(offer => this.offerByNrLoader.prime(offer.nr, offer));
    return offers;
  }

  // ! DATALOADED
  async findByVendor({ nr, offset, limit }) {
    let offers = await this.offerByVendorNrLoader.load(nr);

    offers = offset ? offers.slice(offset) : offers;
    offers = limit ? offers.slice(0, limit) : offers;

    return offers;
  }

  async offers({ where, limit, order }, repos) {
    let offers;
    if (where) {
      offers = await this.where(where, repos);
    } else {
      offers = await this.all();
    }

    offers = limit ? offers.slice(0, limit) : offers;
    offers = order ? _.orderBy(offers, order) : offers;

    return offers;
  }

  async productOffers({ where, productNr }, repos) {
    let offers = await this.where(where, repos);
    return offers.filter(offer => offer.product == productNr);
  }

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

    let offers = await this.offerByVendorNrLoader.loadMany(vendorNrs);
    offers = offers.flat();
    offers.forEach(offer => this.offerByNrLoader.prime(offer.nr, offer));
    return offers;
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
