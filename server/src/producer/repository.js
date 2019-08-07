import Producer from "./model";
import _ from "lodash";
import db from "../database";
import { memoize, allGeneric } from "../helpers";

const getProducerByNr = nr => {
  let query = db
    .select()
    .from("producer")
    .where("nr", nr);

  return query.then(rows => new Producer(rows[0]));
};

export default class ProducerRepository {
  memoizedGetProducerByNr = memoize(getProducerByNr);

  async get(nr) {
    return this.memoizedGetProducerByNr(nr);
  }

  async all() {
    return allGeneric(Producer, "producer");
  }
}
