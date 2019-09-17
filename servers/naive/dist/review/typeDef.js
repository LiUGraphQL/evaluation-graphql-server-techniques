"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Review {\n    nr: ID!\n    title: String\n    text: String\n    reviewDate: Date\n    rating1: Int\n    rating2: Int\n    rating3: Int\n    rating4: Int\n    publishDate: Date\n    reviewer: Person\n    reviewFor: Product\n  }\n\n  input ReviewSortingCriterion {\n    field: ReviewFieldInput\n    direction: SortDirection\n  }\n\n  extend type Query {\n    review(nr: ID!): Review\n    reviews: [Review]\n    reviewSearch(\n      field: ReviewFieldInput!\n      criterion: StringCriterion!\n      pattern: String!\n    ): [Review]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServer.gql)(_templateObject());

exports["default"] = _default;