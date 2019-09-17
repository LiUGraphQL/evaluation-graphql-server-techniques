"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Offer {\n    nr: ID!\n    price: Float\n    validFrom: Date\n    validTo: Date\n    deliveryDays: Int\n    offerWebpage: String\n    publisher: Int\n    publishDate: Date\n    product: Product\n    vendor: Vendor\n  }\n\n  type CollectionOfEdgesToOffers {\n    aggregate: AggregateOffers!\n  }\n\n  type AggregateOffers {\n    count: Int!\n    price: PriceAggregationOfOffers!\n  }\n\n  type PriceAggregationOfOffers {\n    sum: Float!\n    avg: Float!\n    max: Float!\n    min: Float!\n  }\n\n  input OfferWhereInput {\n    AND: [OfferWhereInput!]\n    vendor: VendorFieldInput\n  }\n\n  input VendorFieldInput {\n    nr: ID\n    comment: StringMatching\n    publishDate: DateMatching\n  }\n\n  input StringMatching {\n    criterion: StringCriterion\n    pattern: String\n  }\n\n  input DateMatching {\n    criterion: DateCriterion\n    date: Date\n  }\n\n  input OrderFieldInput {\n    orderField1: OffersSortingField\n    orderField2: OffersSortingField\n  }\n\n  extend type Query {\n    offer(nr: ID!): Offer\n    offers(\n      where: OfferWhereInput\n      limit: Int\n      order: [OffersSortingField]\n    ): [Offer]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServer.gql)(_templateObject());

exports["default"] = _default;