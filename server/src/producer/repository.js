import Producer from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class ProducerRepository {
  async get(nr) {
    return getGeneric(nr, Producer, "producer");
  }

  async all() {
    return allGeneric(Producer, "producer");
  }
}
