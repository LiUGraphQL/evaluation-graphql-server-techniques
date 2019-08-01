import Review from "./model";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getReviewByNr = nrs => {
  let query = db
    .select()
    .from("review")
    .whereIn("nr", nrs);

  // ensure response has rows in correct order
  return query.then(rows => simpleSortRows(rows, nrs, Review));
};

const getReviewByProductNr = nrs => {
  let query = db
    .select()
    .from("review")
    .whereIn("product", nrs);

  // A loader needs to return items in the correct order, this sorts them.
  return query.then(rows =>
    nrs.map(nr =>
      rows.filter(row => row.product === nr).map(row => new Review(row))
    )
  );
};

export default class ReviewRepository {
  reviewByNrLoader = new DataLoader(getReviewByNr, { cache });
  reviewByProductNrLoader = new DataLoader(getReviewByProductNr, {
    cache
  });

  // ! DATALOADED
  async get(nr) {
    return this.reviewByNrLoader.load(nr);
  }

  // ? DONT DATALOAD - Not used by query templates
  async all() {
    return allGeneric(Review, "review");
  }

  // ! DATALOADED
  async sortBy({ productId, field, direction }) {
    let reviews = await this.reviewByProductNrLoader.load(productId);
    // Update the reviewByNrLoader cache
    reviews.forEach(review =>
      this.reviewByNrLoader.prime(review.nr, new Review(review))
    );

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

  // TODO: Can I DataLoad this? Its very sql-specific.
  async search({ field, criterion, pattern }) {
    let query = db("review");
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
    query.where(field, "like", matchPattern);
    return query.then(response => response.map(review => new Review(review)));
  }
}
