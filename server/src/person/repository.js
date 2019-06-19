import Person from "./model";
import db from "../database";
import { getGeneric, allGeneric } from "../helpers";

export default class PersonRepository {
  async get(nr) {
    return getGeneric(nr, Person, "person");
  }

  async all() {
    return allGeneric(Person, "person");
  }
}
