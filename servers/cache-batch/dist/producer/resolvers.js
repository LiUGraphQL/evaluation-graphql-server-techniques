"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    producer: function producer(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.producer.get(parseInt(nr));
    },
    producers: function producers(root, args, _ref3) {
      var repository = _ref3.repository;
      return repository.producer.all();
    }
  },
  Producer: {
    products: function products(_ref4, _, _ref5) {
      var nr = _ref4.nr;
      var repository = _ref5.repository;
      return repository.product.findBy({
        producerNr: nr
      });
    }
  }
};
exports["default"] = _default;