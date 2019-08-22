import Producer from "./model";
import _ from "lodash";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getProducerByNr = nr => {
  let query = db
    .select()
    .from("producer")
    .where("nr", nr);

  return query.then(rows => new Producer(rows[0]));
};

export default class ProducerRepository {
  async get(nr) {
    return getProducerByNr(nr);
  }

  async all() {
    return allGeneric(Producer, "producer");
  }
}
