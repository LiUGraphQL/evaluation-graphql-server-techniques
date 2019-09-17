"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

var _enums = require("./enums");

var _product = require("./product");

var _person = require("./person");

var _review = require("./review");

var _productType = require("./productType");

var _productFeature = require("./productFeature");

var _country = require("./country");

var _producer = require("./producer");

var _offer = require("./offer");

var _vendor = require("./vendor");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query\n\n  scalar Date\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDef = (0, _apolloServer.gql)(_templateObject());
var _default = [typeDef, _enums.typeDef, _product.typeDef, _person.typeDef, _review.typeDef, _productType.typeDef, _productFeature.typeDef, _country.typeDef, _producer.typeDef, _offer.typeDef, _vendor.typeDef];
exports["default"] = _default;