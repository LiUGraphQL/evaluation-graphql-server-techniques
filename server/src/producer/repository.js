import Producer from "./model";
import _ from "lodash";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getProducerByNrs = nrs => {
  const uniqueNrs = _.uniq(nrs);
  let query = db
    .select()
    .from("producer")
    .whereIn("nr", uniqueNrs);

  return query.then(rows => simpleSortRows(rows, nrs, Producer));
};

export default class ProducerRepository {
  producerByNrLoader = new DataLoader(getProducerByNrs, { cache });

  async get(nr) {
    return this.producerByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(Producer, "producer");
  }
}
