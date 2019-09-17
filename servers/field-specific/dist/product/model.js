"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function Product(args) {
  _classCallCheck(this, Product);

  // Fields
  this.nr = args.nr;
  this.label = args.label;
  this.comment = args.comment;
  this.publishDate = args.publishDate;
  this.producer = args.producer;
};

exports["default"] = Product;