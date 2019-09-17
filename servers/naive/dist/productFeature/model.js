"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductFeature = function ProductFeature(args) {
  _classCallCheck(this, ProductFeature);

  // Fields
  this.nr = args.nr;
  this.label = args.label;
  this.comment = args.comment;
};

exports["default"] = ProductFeature;