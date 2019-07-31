import Review from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../helpers";

const sortRows = (rows, nrs, model) => {
  return nrs.map(
    nr =>
      new model(
        rows.find(row => row.nr === nr || new Error(`Row not found: ${nr}`))
      )
  );
};

const getReviewByNr = nrs => {
  let query = db
    .select()
    .from("review")
    .whereIn("nr", nrs);

  // ensure response has rows in correct order
  return query.then(rows => sortRows(rows, nrs, Review));
};

const getReviewByProductNr = nrs => {
  let query = db
    .select()
    .from("review")
    .whereIn("product", nrs);

  return query.then(rows => {
    return nrs.map(nr =>
      rows
        .filter(row => row.product === nr)
        .map(row => {
          return new Review(row);
        })
    );
  });
};

export const reviewByNrLoader = new DataLoader(getReviewByNr, { cache });
export const reviewByProductNrLoader = new DataLoader(getReviewByProductNr, {
  cache
});

export default class ReviewRepository {
  async get(nr) {
    return reviewByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(Review, "review");
  }

  async sortBy({ productId, field, direction }) {
    let reviews = await reviewByProductNrLoader.load(productId);
    reviews.forEach(review =>
      reviewByNrLoader.prime(review.nr, new Review(review))
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
