"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Query: {
    review: function review(root, _ref, _ref2, info) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.review.get(parseInt(nr));
    },
    reviews: function reviews(root, args, _ref3) {
      var repository = _ref3.repository;
      return repository.review.all();
    },
    reviewSearch: function reviewSearch(root, _ref4, _ref5) {
      var field = _ref4.field,
          criterion = _ref4.criterion,
          pattern = _ref4.pattern;
      var repository = _ref5.repository;
      return repository.review.search({
        field: field,
        criterion: criterion,
        pattern: pattern
      });
    }
  },
  Review: {
    reviewer: function reviewer(_ref6, _, _ref7) {
      var reviewerId = _ref6.reviewerId;
      var repository = _ref7.repository;
      return repository.person.get(reviewerId);
    },
    reviewFor: function reviewFor(_ref8, _, _ref9) {
      var productId = _ref8.productId;
      var repository = _ref9.repository;
      return repository.product.get(productId);
    }
  }
};
exports["default"] = _default;