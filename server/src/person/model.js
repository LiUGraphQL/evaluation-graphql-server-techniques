import { model as Country } from "../country";

export default class Person {
  constructor({ nr, name, mbox_sha1sum, country }) {
    this.nr = nr;
    this.name = name;
    this.mbox_sha1sum = mbox_sha1sum;
    this.country = new Country(country);
  }
}
