import Review from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class ReviewRepository {
  async get(nr) {
    return getGeneric(nr, Review, "review");
  }

  async all() {
    return allGeneric(Review, "review");
  }

  async sortBy({ productId, field, direction }) {
    const fieldDefined = typeof field !== "undefined" && field !== null;
    const directionDefined =
      typeof direction !== "undefined" && direction !== null;

    let query = db("review").where({ product: productId });

    if (fieldDefined && directionDefined) {
      query.orderBy(field, direction);
    } else if (fieldDefined) {
      query.orderBy(field);
    }

    return query.then(response => response.map(review => new Review(review)));
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
