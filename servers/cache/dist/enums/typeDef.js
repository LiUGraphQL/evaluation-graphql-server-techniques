"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  enum Code {\n    US\n    UK\n    JP\n    CN\n    DE\n    FR\n    ES\n    RU\n    KR\n    AT\n    GB\n  }\n\n  enum ReviewFieldInput {\n    nr\n    title\n    text\n    reviewDate\n    rating1\n    rating2\n    rating3\n    rating4\n    publishDate\n  }\n\n  enum SortDirection {\n    ASC\n    DESC\n  }\n\n  enum StringCriterion {\n    CONTAINS\n    START_WITH\n    END_WITH\n    EQUALS\n  }\n\n  enum DateCriterion {\n    BEFORE\n    AFTER\n    EQUALS\n  }\n\n  enum OffersSortingField {\n    nr\n    price\n    validFrom\n    validTo\n    deliveryDays\n    offerWebpage\n    publisher\n    publishDate\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServer.gql)(_templateObject());

exports["default"] = _default;