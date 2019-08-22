import _ from "lodash";
import Review from "./model";
import db from "../database";
import { simpleSortRows } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getReviewByNr = nrs => {
  const uniqueNrs = _.uniq(nrs);
  let query = db
    .select()
    .from("review")
    .whereIn("nr", uniqueNrs);

  // ensure response has rows in correct order
  return query.then(rows => simpleSortRows(rows, nrs, Review));
};

const getReviewByProductNr = nrs => {
  const uniqueNrs = _.uniq(nrs);
  let query = db
    .select()
    .from("review")
    .whereIn("product", uniqueNrs);

  // A loader needs to return items in the correct order, this sorts them.
  return query.then(rows =>
    nrs.map(nr =>
      rows.filter(row => row.product === nr).map(row => new Review(row))
    )
  );
};

const getAllReviews = keys => {
  let query = db.select().from("review");

  return query.then(rows => [rows.map(row => new Review(row))]);
};

export default class ReviewRepository {
  reviewByNrLoader = new DataLoader(getReviewByNr, { cache });
  reviewByProductNrLoader = new DataLoader(getReviewByProductNr, {
    cache
  });
  allReviewLoader = new DataLoader(getAllReviews, { cache });

  // ! DATALOADED
  async get(nr) {
    return this.reviewByNrLoader.load(nr);
  }

  // ! DATALOADED
  async all() {
    let reviews = await this.allReviewLoader.load("all");
    reviews.forEach(review => this.reviewByNrLoader.prime(review.nr, review));
    return reviews;
  }

  // ! DATALOADED
  async sortBy({ productId, field, direction }) {
    let reviews = await this.reviewByProductNrLoader.load(productId);
    // Update the reviewByNrLoader cache
    reviews.forEach(review => this.reviewByNrLoader.prime(review.nr, review));

    const sortByField = (field, direction) => {
      return function(a, b) {
        let comp = 0;
        if (a[field] > b[field]) {
          comp = 1;
        } else if (a[field] < b[field]) {
          comp = -1;
        }
        if (direction === "DESC") {
          return comp * -1;
        }
        return comp;
      };
    };

    if (field) reviews = reviews.sort(sortByField(field, direction));

    return reviews;
  }

  // ! DATALOADED - tho it retrieves all
  async search({ field, criterion, pattern }) {
    let reviews = await this.all();

    switch (criterion) {
      case "CONTAINS":
        reviews = reviews.filter(review => review[field].includes(pattern));
        break;
      case "START_WITH":
        reviews = reviews.filter(review => review[field].startsWith(pattern));
        break;
      case "END_WITH":
        reviews = reviews.filter(review => review[field].endsWith(pattern));
        break;
      case "EQUALS":
        reviews = reviews.filter(review => review[field] === pattern);
        break;
    }

    return reviews;
  }
}
