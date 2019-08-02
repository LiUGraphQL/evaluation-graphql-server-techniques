import Person from "./model";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getPersonByNrs = nrs => {
  let query = db
    .select()
    .from("person")
    .whereIn("nr", nrs);

  return query.then(rows => simpleSortRows(rows, nrs, Person));
};

export default class PersonRepository {
  personByNrLoader = new DataLoader(getPersonByNrs, { cache });

  async get(nr) {
    return this.personByNrLoader.load(nr);
  }

  async all() {
    return allGeneric(Person, "person");
  }
}
