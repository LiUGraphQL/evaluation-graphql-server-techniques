import _ from "lodash";
import Person from "./model";
import db from "../database";
import { memoize, allGeneric } from "../helpers";

const getPersonByNr = nr => {
  let query = db
    .select()
    .from("person")
    .where("nr", nr);

  return query.then(rows => new Person(rows[0]));
};

export default class PersonRepository {
  memoizedGetPersonByNr = memoize(getPersonByNr);

  async get(nr) {
    return this.memoizedGetPersonByNr(nr);
  }

  async all() {
    return allGeneric(Person, "person");
  }
}
