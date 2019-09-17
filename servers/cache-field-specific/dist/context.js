"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _product = require("./product");

var _person = require("./person");

var _review = require("./review");

var _productType = require("./productType");

var _productFeature = require("./productFeature");

var _producer = require("./producer");

var _offer = require("./offer");

var _vendor = require("./vendor");

var _default = function _default() {
  return {
    repository: {
      product: new _product.repository(),
      person: new _person.repository(),
      review: new _review.repository(),
      productType: new _productType.repository(),
      productFeature: new _productFeature.repository(),
      producer: new _producer.repository(),
      offer: new _offer.repository(),
      vendor: new _vendor.repository()
    }
  };
};

exports["default"] = _default;