"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Product {\n    nr: ID!\n    label: String\n    comment: String\n    producer: Producer\n    type: ProductType\n    features: [ProductFeature]\n    publishDate: Date\n    reviews(order: ReviewSortingCriterion): [Review]\n    offers(where: OfferWhereInput): [Offer]\n  }\n\n  extend type Query {\n    product(nr: ID!): Product\n    products: [Product]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServer.gql)(_templateObject());

exports["default"] = _default;