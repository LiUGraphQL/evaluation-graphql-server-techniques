"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Review = function Review(args) {
  _classCallCheck(this, Review);

  // Fields
  this.nr = args.nr;
  this.title = args.title;
  this.text = args.text;
  this.reviewDate = args.reviewDate;
  this.rating1 = args.rating1;
  this.rating2 = args.rating2;
  this.rating3 = args.rating3;
  this.rating4 = args.rating4;
  this.publishDate = args.publishDate; // Relations

  this.productId = args.product;
  this.reviewerId = args.person; // this.producerId = review.producer;
};

exports["default"] = Review;