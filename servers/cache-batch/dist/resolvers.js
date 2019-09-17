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

var _country = require("./country");

var _default = [_product.resolvers, _person.resolvers, _review.resolvers, _productType.resolvers, _productFeature.resolvers, _producer.resolvers, _offer.resolvers, _vendor.resolvers, _country.resolvers];
exports["default"] = _default;