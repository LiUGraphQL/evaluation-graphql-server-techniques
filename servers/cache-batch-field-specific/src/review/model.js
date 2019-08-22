export default class Review {
  constructor(args) {
    // Fields
    this.nr = args.nr;
    this.title = args.title;
    this.text = args.text;
    this.reviewDate = args.reviewDate;
    this.rating1 = args.rating1;
    this.rating2 = args.rating2;
    this.rating3 = args.rating3;
    this.rating4 = args.rating4;
    this.publishDate = args.publishDate;

    // Relations
    this.productId = args.product;
    this.reviewerId = args.person;
    // this.producerId = review.producer;
  }
}
