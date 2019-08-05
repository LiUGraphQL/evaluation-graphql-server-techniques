import _ from "lodash";
import Person from "./model";
import db from "../database";
import { simpleSortRows, allGeneric } from "../helpers";
import DataLoader from "dataloader";
import { cache } from "../config";

const getPersonByNrs = nrs => {
  const uniqueNrs = _.uniq(nrs);
  let query = db
    .select()
    .from("person")
    .whereIn("nr", uniqueNrs);

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
