"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    vendor: function vendor(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.vendor.get(parseInt(nr));
    },
    vendors: function vendors(root, _, _ref3) {
      var repository = _ref3.repository;
      return repository.vendor.all();
    }
  },
  Vendor: {
    offers: function offers(_ref4, _ref5, _ref6) {
      var nr = _ref4.nr;
      var limit = _ref5.limit,
          offset = _ref5.offset;
      var repository = _ref6.repository;
      return repository.offer.findByVendor({
        nr: nr,
        limit: limit,
        offset: offset
      });
    },
    offersConnection: function offersConnection(_ref7) {
      var vendorNr = _ref7.nr;
      return vendorNr;
    }
  }
};
exports["default"] = _default;