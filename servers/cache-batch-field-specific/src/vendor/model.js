import { model as Country } from "../country";

export default class Vendor {
  constructor(args) {
    // Fields
    this.nr = args.nr;
    this.label = args.label;
    this.comment = args.comment;
    this.homepage = args.homepage;
    this.country = new Country(args.country);
    this.publisher = args.publisher;
    this.publishDate = args.publishDate;
  }
}
