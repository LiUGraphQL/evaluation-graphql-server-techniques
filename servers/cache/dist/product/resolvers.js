"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    product: function product(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.product.get(parseInt(nr));
    },
    products: function products(root, args, _ref3) {
      var repository = _ref3.repository;
      return repository.product.all();
    }
  },
  Product: {
    producer: function producer(_ref4, args, _ref5) {
      var _producer = _ref4.producer;
      var repository = _ref5.repository;
      return repository.producer.get(_producer);
    },
    type: function type(_ref6, _, _ref7) {
      var nr = _ref6.nr;
      var repository = _ref7.repository;
      return repository.productType.findBy({
        product: nr
      });
    },
    features: function features(_ref8, _, _ref9) {
      var nr = _ref8.nr;
      var repository = _ref9.repository;
      return repository.productFeature.findBy({
        product: nr
      });
    },
    reviews: function reviews(_ref10, _ref11, _ref12) {
      var nr = _ref10.nr;
      var order = _ref11.order;
      var repository = _ref12.repository;

      // using || {} because order might be undefined which otherwise will throw an error.
      var _ref13 = order || {},
          field = _ref13.field,
          direction = _ref13.direction;

      return repository.review.sortBy({
        productId: nr,
        field: field,
        direction: direction
      });
    },
    offers: function offers(_ref14, _ref15, _ref16) {
      var nr = _ref14.nr;
      var where = _ref15.where;
      var repository = _ref16.repository;
      return repository.offer.productOffers({
        where: where,
        productNr: nr
      }, repository);
    }
  }
};
exports["default"] = _default;