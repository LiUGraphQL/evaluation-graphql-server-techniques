"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    productFeature: function productFeature(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.productFeature.get(praseInt(nr));
    },
    productFeatures: function productFeatures(root, _, _ref3) {
      var repository = _ref3.repository;
      return repository.productFeature.all();
    }
  },
  ProductFeature: {
    products: function products(_ref4, _, _ref5) {
      var nr = _ref4.nr;
      var repository = _ref5.repository;
      return repository.product.findBy({
        productFeature: nr
      });
    }
  }
};
exports["default"] = _default;