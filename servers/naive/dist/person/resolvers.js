"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    person: function person(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.person.get(parseInt(nr));
    },
    persons: function persons(root, args, _ref3) {
      var repository = _ref3.repository;
      return repository.person.all();
    }
  },
  Person: {
    country: function country(_ref4) {
      var _country = _ref4.country;
      return _country;
    }
  }
};
exports["default"] = _default;