import { model as Country } from "../country";

export default class Producer {
  constructor(args) {
    this.nr = args.nr;
    this.label = args.label;
    this.comment = args.comment;
    this.homepage = args.homepage;
    this.country = new Country(args.country);
  }
}
