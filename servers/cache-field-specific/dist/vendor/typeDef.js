"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Vendor {\n    nr: ID!\n    label: String\n    comment: String\n    homepage: String\n    country: Country\n    publisher: Int\n    publishDate: Date\n    offers(limit: Int, offset: Int): [Offer]\n    offersConnection: CollectionOfEdgesToOffers\n  }\n\n  extend type Query {\n    vendor(nr: ID!): Vendor\n    vendors: [Vendor]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServer.gql)(_templateObject());

exports["default"] = _default;