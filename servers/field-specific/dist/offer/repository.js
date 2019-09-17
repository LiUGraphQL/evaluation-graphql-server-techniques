"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _model = _interopRequireDefault(require("./model"));

var _database = _interopRequireDefault(require("../database"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getOfferByNr = function getOfferByNr(nr) {
  var query = _database["default"].select().from("offer").where("nr", nr);

  return query.then(function (rows) {
    return new _model["default"](rows[0]);
  });
};

var getOfferPricesByNrs = function getOfferPricesByNrs(nrs) {
  var query = _database["default"].select("price").from("offer").whereIn("nr", nrs);

  return query.then(function (rows) {
    return rows.map(function (row) {
      return row.price;
    });
  });
};

var getOffersByVendorNr = function getOffersByVendorNr(vendorNr) {
  var query = _database["default"].select("nr").from("offer").where("vendor", vendorNr);

  return query.then(function (rows) {
    return rows.map(function (_ref) {
      var nr = _ref.nr;
      return {
        nr: nr
      };
    });
  });
}; // ! this needs to return Offers because of offers (order)


var getOffersByVendorNrs = function getOffersByVendorNrs(vendorNrs) {
  var query = _database["default"].select().from("offer").whereIn("vendor", vendorNrs);

  return query.then(function (rows) {
    return rows.map(function (row) {
      return new _model["default"](row);
    });
  });
};

var getOffersByProductNr = function getOffersByProductNr(productNr) {
  var query = _database["default"].select("nr").from("offer").where("product", productNr);

  return query.then(function (rows) {
    return rows.map(function (_ref2) {
      var nr = _ref2.nr;
      return {
        nr: nr
      };
    });
  });
};

var OfferRepository =
/*#__PURE__*/
function () {
  function OfferRepository() {
    _classCallCheck(this, OfferRepository);
  }

  _createClass(OfferRepository, [{
    key: "get",
    // ! DUMB
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(nr) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", getOfferByNr(nr));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "all",
    value: function () {
      var _all = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", (0, _helpers.allGeneric)(_model["default"], "offer"));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
  }, {
    key: "pricesByNrs",
    value: function () {
      var _pricesByNrs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(nrs) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", getOfferPricesByNrs(nrs));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function pricesByNrs(_x2) {
        return _pricesByNrs.apply(this, arguments);
      }

      return pricesByNrs;
    }() // ! DUMB

  }, {
    key: "findByVendor",
    value: function () {
      var _findByVendor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref3) {
        var nr, limit, offset, offers;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                nr = _ref3.nr, limit = _ref3.limit, offset = _ref3.offset;
                _context4.next = 3;
                return getOffersByVendorNr(nr);

              case 3:
                offers = _context4.sent;
                return _context4.abrupt("return", this.limitOffsetOrder({
                  offers: offers,
                  limit: limit,
                  offset: offset
                }));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findByVendor(_x3) {
        return _findByVendor.apply(this, arguments);
      }

      return findByVendor;
    }()
  }, {
    key: "limitOffsetOrder",
    value: function limitOffsetOrder(_ref4) {
      var offers = _ref4.offers,
          limit = _ref4.limit,
          offset = _ref4.offset,
          order = _ref4.order;
      offers = offset ? offers.slice(offset) : offers;
      offers = limit ? offers.slice(0, limit) : offers;
      offers = order ? _lodash["default"].orderBy(offers, order) : offers;
      return offers;
    }
  }, {
    key: "offers",
    value: function () {
      var _offers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref5, repos) {
        var where, limit, order, vendorNrs, offers;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                where = _ref5.where, limit = _ref5.limit, order = _ref5.order;
                _context5.next = 3;
                return this.where(where, repos);

              case 3:
                vendorNrs = _context5.sent;
                _context5.next = 6;
                return getOffersByVendorNrs(vendorNrs);

              case 6:
                offers = _context5.sent;
                offers = this.limitOffsetOrder({
                  offers: offers,
                  limit: limit,
                  order: order
                });
                return _context5.abrupt("return", offers.map(function (_ref6) {
                  var nr = _ref6.nr;
                  return {
                    nr: nr
                  };
                }));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function offers(_x4, _x5) {
        return _offers.apply(this, arguments);
      }

      return offers;
    }() // ? With field-specific all selects except the last one
    // ? only gets the nrs, so this becomes a little cumbersome here.

  }, {
    key: "productOffers",
    value: function () {
      var _productOffers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref7, repos) {
        var where, productNr, vendorNrsPromise, offersByProductPromise, vendorNrs, offersByVendor, offersByProduct;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                where = _ref7.where, productNr = _ref7.productNr;
                vendorNrsPromise = this.where(where, repos);
                offersByProductPromise = getOffersByProductNr(productNr);
                _context6.next = 5;
                return vendorNrsPromise;

              case 5:
                vendorNrs = _context6.sent;
                _context6.next = 8;
                return getOffersByVendorNrs(vendorNrs);

              case 8:
                offersByVendor = _context6.sent;
                _context6.next = 11;
                return offersByProductPromise;

              case 11:
                offersByProduct = _context6.sent;
                offersByVendor = offersByVendor.map(function (_ref8) {
                  var nr = _ref8.nr;
                  return {
                    nr: nr
                  };
                });
                return _context6.abrupt("return", _lodash["default"].intersectionBy(offersByProduct, offersByVendor, "nr"));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function productOffers(_x6, _x7) {
        return _productOffers.apply(this, arguments);
      }

      return productOffers;
    }() // ! DUMB
    // ? returns vendorNrs.

  }, {
    key: "where",
    value: function () {
      var _where2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_where, repos) {
        var _this = this;

        var vendors, _ref9, vendorArg, AND, vendorNrs;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return repos.vendor.all();

              case 2:
                vendors = _context7.sent;
                _ref9 = _where || {}, vendorArg = _ref9.vendor, AND = _ref9.AND;

                if (vendorArg) {
                  vendors = this.resolveVendorField(vendors, vendorArg);
                } else if (AND) {
                  AND.forEach(function (_ref10) {
                    var vendorArg = _ref10.vendor;
                    vendors = _this.resolveVendorField(vendors, vendorArg);
                  });
                }

                vendorNrs = vendors.map(function (vendor) {
                  return vendor.nr;
                });
                return _context7.abrupt("return", vendorNrs);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function where(_x8, _x9) {
        return _where2.apply(this, arguments);
      }

      return where;
    }()
  }, {
    key: "resolveAndField",
    value: function resolveAndField(query, andInput) {
      var _this2 = this;

      andInput.forEach(function (_ref11) {
        var vendor = _ref11.vendor;
        query = _this2.resolveVendorField(query, vendor);
      });
      return query;
    }
  }, {
    key: "resolveVendorField",
    value: function resolveVendorField(vendors, vendorArg) {
      var nr = vendorArg.nr,
          comment = vendorArg.comment,
          publishDate = vendorArg.publishDate;

      if (nr) {
        vendors = vendors.filter(function (vendor) {
          return vendor.nr == nr;
        });
      } else if (comment) {
        vendors = this.resolveVendorCommentField(vendors, comment);
      } else if (publishDate) {
        vendors = this.resolveVendorPublishDateField(vendors, publishDate);
      }

      return vendors;
    }
  }, {
    key: "resolveVendorCommentField",
    value: function resolveVendorCommentField(vendors, comment) {
      var criterion = comment.criterion,
          pattern = comment.pattern;

      switch (criterion) {
        case "CONTAINS":
          vendors = vendors.filter(function (vendor) {
            return vendor.comment.includes(pattern);
          });
          break;

        case "START_WITH":
          vendors = vendors.filter(function (vendor) {
            return vendor.comment.startsWith(pattern);
          });
          break;

        case "END_WITH":
          vendors = vendors.filter(function (vendor) {
            return vendor.comment.endsWith(pattern);
          });
          break;

        case "EQUALS":
          vendors = vendors.filter(function (vendor) {
            return vendor.comment === pattern;
          });
          break;
      }

      return vendors;
    }
  }, {
    key: "resolveVendorPublishDateField",
    value: function resolveVendorPublishDateField(vendors, publishDate) {
      var criterion = publishDate.criterion,
          date = publishDate.date;

      switch (criterion) {
        case "BEFORE":
          vendors = vendors.filter(function (vendor) {
            return Date.parse(vendor.publishDate) < Date.parse(date);
          });
          break;

        case "AFTER":
          vendors = vendors.filter(function (vendor) {
            return Date.parse(vendor.publishDate) > Date.parse(date);
          });
          break;

        case "EQUALS":
          vendors = vendors.filter(function (vendor) {
            return Date.parse(vendor.publishDate) === Date.parse(date);
          });
          break;
      }

      return vendors;
    }
  }]);

  return OfferRepository;
}();

exports["default"] = OfferRepository;