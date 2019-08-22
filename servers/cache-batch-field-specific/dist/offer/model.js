export default class Offer {
  constructor(args) {
    // Fields
    this.nr = args.nr;
    this.price = args.price;
    this.validFrom = args.validFrom;
    this.validTo = args.validTo;
    this.deliveryDays = args.deliveryDays;
    this.offerWebpage = args.offerWebpage;
    this.publisher = args.publisher;
    this.publishDate = args.publishDate; // Relations

    this.productId = args.product;
    this.vendorId = args.vendor;
  }

}