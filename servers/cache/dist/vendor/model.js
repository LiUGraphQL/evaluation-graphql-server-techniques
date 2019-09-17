"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _country = require("../country");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vendor = function Vendor(args) {
  _classCallCheck(this, Vendor);

  // Fields
  this.nr = args.nr;
  this.label = args.label;
  this.comment = args.comment;
  this.homepage = args.homepage;
  this.country = new _country.model(args.country);
  this.publisher = args.publisher;
  this.publishDate = args.publishDate;
};

exports["default"] = Vendor;