"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    product: function product(root, _ref) {
      var nr = _ref.nr;
      return {
        nr: parseInt(nr)
      };
    },
    products: function products(root, args, _ref2) {
      var repository = _ref2.repository;
      return repository.product.all();
    }
  },
  Product: {
    nr: function nr(_ref3) {
      var _nr = _ref3.nr;
      return _nr;
    },
    label: function () {
      var _label = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref4, _, _ref5) {
        var nr, repository, _ref6, label;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                nr = _ref4.nr;
                repository = _ref5.repository;
                _context.next = 4;
                return repository.product.get(nr);

              case 4:
                _ref6 = _context.sent;
                label = _ref6.label;
                return _context.abrupt("return", label);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function label(_x, _x2, _x3) {
        return _label.apply(this, arguments);
      }

      return label;
    }(),
    comment: function () {
      var _comment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref7, _, _ref8) {
        var nr, repository, _ref9, comment;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nr = _ref7.nr;
                repository = _ref8.repository;
                _context2.next = 4;
                return repository.product.get(nr);

              case 4:
                _ref9 = _context2.sent;
                comment = _ref9.comment;
                return _context2.abrupt("return", comment);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function comment(_x4, _x5, _x6) {
        return _comment.apply(this, arguments);
      }

      return comment;
    }(),
    producer: function () {
      var _producer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref10, _, _ref11) {
        var nr, repository, _ref12, producer;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref10.nr;
                repository = _ref11.repository;
                _context3.next = 4;
                return repository.product.get(nr);

              case 4:
                _ref12 = _context3.sent;
                producer = _ref12.producer;
                return _context3.abrupt("return", {
                  nr: producer
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function producer(_x7, _x8, _x9) {
        return _producer.apply(this, arguments);
      }

      return producer;
    }(),
    type: function () {
      var _type = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref13, _, _ref14) {
        var nr, repository, productType;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                nr = _ref13.nr;
                repository = _ref14.repository;
                _context4.next = 4;
                return repository.productType.findBy({
                  product: nr
                });

              case 4:
                productType = _context4.sent;
                return _context4.abrupt("return", {
                  nr: productType.nr
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function type(_x10, _x11, _x12) {
        return _type.apply(this, arguments);
      }

      return type;
    }(),
    features: function () {
      var _features = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref15, _, _ref16) {
        var nr, repository, productFeatures;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                nr = _ref15.nr;
                repository = _ref16.repository;
                _context5.next = 4;
                return repository.productFeature.findBy({
                  product: nr
                });

              case 4:
                productFeatures = _context5.sent;
                return _context5.abrupt("return", productFeatures.map(function (_ref17) {
                  var nr = _ref17.nr;
                  return {
                    nr: nr
                  };
                }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function features(_x13, _x14, _x15) {
        return _features.apply(this, arguments);
      }

      return features;
    }(),
    reviews: function () {
      var _reviews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref18, _ref19, _ref20) {
        var nr, order, repository, _ref21, field, direction, reviews;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                nr = _ref18.nr;
                order = _ref19.order;
                repository = _ref20.repository;
                _ref21 = order || {}, field = _ref21.field, direction = _ref21.direction;
                _context6.next = 6;
                return repository.review.sortBy({
                  productId: nr,
                  field: field,
                  direction: direction
                });

              case 6:
                reviews = _context6.sent;
                return _context6.abrupt("return", reviews.map(function (_ref22) {
                  var nr = _ref22.nr;
                  return {
                    nr: nr
                  };
                }));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function reviews(_x16, _x17, _x18) {
        return _reviews.apply(this, arguments);
      }

      return reviews;
    }(),
    offers: function () {
      var _offers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref23, _ref24, _ref25) {
        var nr, where, repository, offers;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                nr = _ref23.nr;
                where = _ref24.where;
                repository = _ref25.repository;
                _context7.next = 5;
                return repository.offer.productOffers({
                  where: where,
                  productNr: nr
                }, repository);

              case 5:
                offers = _context7.sent;
                return _context7.abrupt("return", offers.map(function (_ref26) {
                  var nr = _ref26.nr;
                  return {
                    nr: nr
                  };
                }));

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function offers(_x19, _x20, _x21) {
        return _offers.apply(this, arguments);
      }

      return offers;
    }()
  }
};
exports["default"] = _default;