export default class Producer {
  constructor(args) {
    console.log(args);
    this.nr = args.nr;
    this.label = args.label;
    this.comment = args.comment;
    this.homepage = args.homepage;
    this.country = args.country;
  }
}
