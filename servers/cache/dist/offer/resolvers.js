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
    offer: function offer(root, _ref, _ref2) {
      var nr = _ref.nr;
      var repository = _ref2.repository;
      return repository.offer.get(parseInt(nr));
    },
    offers: function () {
      var _offers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(root, _ref3, _ref4) {
        var where, limit, order, repository;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                where = _ref3.where, limit = _ref3.limit, order = _ref3.order;
                repository = _ref4.repository;
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
    product: function product(_ref5, _, _ref6) {
      var productId = _ref5.productId;
      var repository = _ref6.repository;
      return repository.product.get(productId);
    },
    vendor: function vendor(_ref7, _, _ref8) {
      var vendorId = _ref7.vendorId;
      var repository = _ref8.repository;
      return repository.vendor.get(vendorId);
    }
  },
  CollectionOfEdgesToOffers: {
    aggregate: function aggregate(vendorNr, _, _ref9) {
      var repository = _ref9.repository;
      return repository.offer.findByVendor({
        nr: vendorNr
      });
    }
  },
  AggregateOffers: {
    count: function count(offers) {
      return offers.length;
    },
    price: function price(offers) {
      return offers;
    }
  },
  PriceAggregationOfOffers: {
    avg: function avg(offers) {
      var prices = getPricesFromOffers(offers);
      var sum = sumPrices(prices);
      return sum / offers.length;
    },
    sum: function sum(offers) {
      var prices = getPricesFromOffers(offers);
      return sumPrices(prices);
    },
    max: function max(offers) {
      var prices = getPricesFromOffers(offers);
      return Math.max.apply(Math, _toConsumableArray(prices));
    },
    min: function min(offers) {
      var prices = getPricesFromOffers(offers);
      return Math.min.apply(Math, _toConsumableArray(prices));
    }
  }
};
exports["default"] = _default;

var getPricesFromOffers = function getPricesFromOffers(offers) {
  return offers.map(function (offer) {
    return offer.price;
  });
};

var sumPrices = function sumPrices(prices) {
  return prices.reduce(function (curr, accu) {
    return curr + accu;
  }, 0);
};