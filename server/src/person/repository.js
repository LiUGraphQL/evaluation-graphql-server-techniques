import _ from "lodash";
import Person from "./model";
import db from "../database";
import { allGeneric } from "../helpers";

const getPersonByNr = nr => {
  let query = db
    .select()
    .from("person")
    .where("nr", nr);

  return query.then(rows => new Person(rows[0]));
};

export default class PersonRepository {
  async get(nr) {
    return getPersonByNr(nr);
  }

  async all() {
    return allGeneric(Person, "person");
  }
}
