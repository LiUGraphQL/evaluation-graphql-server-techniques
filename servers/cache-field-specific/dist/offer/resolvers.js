"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    offer: function offer(root, _ref) {
      var nr = _ref.nr;
      return {
        nr: parseInt(nr)
      };
    },
    offers: function () {
      var _offers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(root, _ref2, _ref3) {
        var where, limit, order, repository;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                where = _ref2.where, limit = _ref2.limit, order = _ref2.order;
                repository = _ref3.repository;
                return _context.abrupt("return", repository.offer.offers({
                  where: where,
                  limit: limit,
                  order: order
                }, repository));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function offers(_x, _x2, _x3) {
        return _offers.apply(this, arguments);
      }

      return offers;
    }()
  },
  Offer: {
    nr: function () {
      var _nr2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref4) {
        var _nr;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _nr = _ref4.nr;
                return _context2.abrupt("return", _nr);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function nr(_x4) {
        return _nr2.apply(this, arguments);
      }

      return nr;
    }(),
    price: function () {
      var _price = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref5, _, _ref6) {
        var nr, repository, _ref7, price;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref5.nr;
                repository = _ref6.repository;
                _context3.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref7 = _context3.sent;
                price = _ref7.price;
                return _context3.abrupt("return", price);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function price(_x5, _x6, _x7) {
        return _price.apply(this, arguments);
      }

      return price;
    }(),
    validFrom: function () {
      var _validFrom = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref8, _, _ref9) {
        var nr, repository, _ref10, validFrom;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                nr = _ref8.nr;
                repository = _ref9.repository;
                _context4.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref10 = _context4.sent;
                validFrom = _ref10.validFrom;
                return _context4.abrupt("return", validFrom);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function validFrom(_x8, _x9, _x10) {
        return _validFrom.apply(this, arguments);
      }

      return validFrom;
    }(),
    validTo: function () {
      var _validTo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref11, _, _ref12) {
        var nr, repository, _ref13, validTo;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                nr = _ref11.nr;
                repository = _ref12.repository;
                _context5.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref13 = _context5.sent;
                validTo = _ref13.validTo;
                return _context5.abrupt("return", validTo);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function validTo(_x11, _x12, _x13) {
        return _validTo.apply(this, arguments);
      }

      return validTo;
    }(),
    deliveryDays: function () {
      var _deliveryDays = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref14, _, _ref15) {
        var nr, repository, _ref16, deliveryDays;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                nr = _ref14.nr;
                repository = _ref15.repository;
                _context6.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref16 = _context6.sent;
                deliveryDays = _ref16.deliveryDays;
                return _context6.abrupt("return", deliveryDays);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deliveryDays(_x14, _x15, _x16) {
        return _deliveryDays.apply(this, arguments);
      }

      return deliveryDays;
    }(),
    offerWebpage: function () {
      var _offerWebpage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref17, _, _ref18) {
        var nr, repository, _ref19, offerWebpage;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                nr = _ref17.nr;
                repository = _ref18.repository;
                _context7.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref19 = _context7.sent;
                offerWebpage = _ref19.offerWebpage;
                return _context7.abrupt("return", offerWebpage);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function offerWebpage(_x17, _x18, _x19) {
        return _offerWebpage.apply(this, arguments);
      }

      return offerWebpage;
    }(),
    publisher: function () {
      var _publisher = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref20, _, _ref21) {
        var nr, repository, _ref22, publisher;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                nr = _ref20.nr;
                repository = _ref21.repository;
                _context8.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref22 = _context8.sent;
                publisher = _ref22.publisher;
                return _context8.abrupt("return", publisher);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function publisher(_x20, _x21, _x22) {
        return _publisher.apply(this, arguments);
      }

      return publisher;
    }(),
    publishDate: function () {
      var _publishDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(_ref23, _, _ref24) {
        var nr, repository, _ref25, publishDate;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                nr = _ref23.nr;
                repository = _ref24.repository;
                _context9.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref25 = _context9.sent;
                publishDate = _ref25.publishDate;
                return _context9.abrupt("return", publishDate);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function publishDate(_x23, _x24, _x25) {
        return _publishDate.apply(this, arguments);
      }

      return publishDate;
    }(),
    product: function () {
      var _product = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(_ref26, _, _ref27) {
        var nr, repository, _ref28, productId;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                nr = _ref26.nr;
                repository = _ref27.repository;
                _context10.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref28 = _context10.sent;
                productId = _ref28.productId;
                return _context10.abrupt("return", repository.product.get(productId));

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function product(_x26, _x27, _x28) {
        return _product.apply(this, arguments);
      }

      return product;
    }(),
    vendor: function () {
      var _vendor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(_ref29, _, _ref30) {
        var nr, repository, _ref31, vendorId;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                nr = _ref29.nr;
                repository = _ref30.repository;
                _context11.next = 4;
                return repository.offer.get(nr);

              case 4:
                _ref31 = _context11.sent;
                vendorId = _ref31.vendorId;
                return _context11.abrupt("return", repository.vendor.get(vendorId));

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function vendor(_x29, _x30, _x31) {
        return _vendor.apply(this, arguments);
      }

      return vendor;
    }()
  },
  CollectionOfEdgesToOffers: {
    aggregate: function aggregate(_ref32, _, _ref33) {
      var nr = _ref32.nr;
      var repository = _ref33.repository;
      return repository.offer.findByVendor({
        nr: nr
      });
    }
  },
  AggregateOffers: {
    count: function count(offerNrs) {
      return offerNrs.length;
    },
    price: function price(offerNrs, _, _ref34) {
      var repository = _ref34.repository;
      return repository.offer.pricesByNrs(offerNrs.map(function (offer) {
        return offer.nr;
      }));
    }
  },
  PriceAggregationOfOffers: {
    avg: function avg(prices) {
      var sum = sumPrices(prices);
      return sum / prices.length;
    },
    sum: function sum(prices) {
      return sumPrices(prices);
    },
    max: function max(prices) {
      return Math.max.apply(Math, _toConsumableArray(prices));
    },
    min: function min(prices) {
      return Math.min.apply(Math, _toConsumableArray(prices));
    }
  }
};
exports["default"] = _default;

var sumPrices = function sumPrices(prices) {
  return prices.reduce(function (curr, accu) {
    return curr + accu;
  }, 0);
};