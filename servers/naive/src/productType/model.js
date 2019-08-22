export default class ProductType {
  constructor(args) {
    // Fields
    this.nr = args.nr;
    this.label = args.label;
    this.comment = args.comment;
    this.parentId = args.parent;
  }
}
