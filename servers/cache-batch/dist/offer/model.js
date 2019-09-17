"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offer = function Offer(args) {
  _classCallCheck(this, Offer);

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
};

exports["default"] = Offer;