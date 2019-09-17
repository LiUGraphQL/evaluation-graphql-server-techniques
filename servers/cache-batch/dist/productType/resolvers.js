"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    productType: function productType(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.productType.get(parseInt(nr));
    },
    productTypes: function productTypes(root, _, _ref3) {
      var repository = _ref3.repository;
      return repository.productType.all();
    }
  },
  ProductType: {
    parent: function parent(_ref4, _, _ref5) {
      var parentId = _ref4.parentId;
      var repository = _ref5.repository;
      return repository.productType.get(parentId);
    },
    products: function products(_ref6, _, _ref7) {
      var nr = _ref6.nr;
      var repository = _ref7.repository;
      return repository.product.findBy({
        productType: nr
      });
    }
  }
};
exports["default"] = _default;