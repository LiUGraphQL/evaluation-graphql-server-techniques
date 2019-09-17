"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _dataloader = _interopRequireDefault(require("dataloader"));

var _model = _interopRequireDefault(require("./model"));

var _database = _interopRequireDefault(require("../database"));

var _helpers = require("../helpers");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getOfferByNrs = function getOfferByNrs(nrs) {
  var uniqueNrs = _lodash["default"].uniq(nrs);

  var query = _database["default"].select().from("offer").whereIn("nr", uniqueNrs);

  return query.then(function (rows) {
    return (0, _helpers.simpleSortRows)(rows, nrs, _model["default"]);
  });
};

var getOfferByVendorNr = function getOfferByVendorNr(vendorNrs) {
  var uniqueNrs = _lodash["default"].uniq(vendorNrs);

  var query = _database["default"].select().from("offer").whereIn("vendor", uniqueNrs);

  return query.then(function (rows) {
    return vendorNrs.map(function (nr) {
      return rows.filter(function (row) {
        return row.vendor === nr;
      }).map(function (row) {
        return new _model["default"](row);
      });
    });
  });
};

var OfferRepository =
/*#__PURE__*/
function () {
  function OfferRepository() {
    _classCallCheck(this, OfferRepository);

    _defineProperty(this, "offerByNrLoader", new _dataloader["default"](getOfferByNrs, {
      cache: _config.cache
    }));

    _defineProperty(this, "offerByVendorNrLoader", new _dataloader["default"](getOfferByVendorNr, {
      cache: _config.cache
    }));
  }

  _createClass(OfferRepository, [{
    key: "get",
    // ! DATALOADED
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(nr) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.offerByNrLoader.load(nr));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
    }() // ! DATALOADED

  }, {
    key: "findByVendor",
    value: function () {
      var _findByVendor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var nr, offset, limit, offers;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref.nr, offset = _ref.offset, limit = _ref.limit;
                _context3.next = 3;
                return this.offerByVendorNrLoader.load(nr);

              case 3:
                offers = _context3.sent;
                offers = offset ? offers.slice(offset) : offers;
                offers = limit ? offers.slice(0, limit) : offers;
                return _context3.abrupt("return", offers);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findByVendor(_x2) {
        return _findByVendor.apply(this, arguments);
      }

      return findByVendor;
    }()
  }, {
    key: "offers",
    value: function () {
      var _offers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref2, repos) {
        var where, limit, order, offers;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                where = _ref2.where, limit = _ref2.limit, order = _ref2.order;
                _context4.next = 3;
                return this.where(where, repos);

              case 3:
                offers = _context4.sent;
                offers = limit ? offers.slice(0, limit) : offers;
                offers = order ? _lodash["default"].orderBy(offers, order) : offers;
                return _context4.abrupt("return", offers);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function offers(_x3, _x4) {
        return _offers.apply(this, arguments);
      }

      return offers;
    }()
  }, {
    key: "productOffers",
    value: function () {
      var _productOffers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref3, repos) {
        var where, productNr, offers;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                where = _ref3.where, productNr = _ref3.productNr;
                _context5.next = 3;
                return this.where(where, repos);

              case 3:
                offers = _context5.sent;
                return _context5.abrupt("return", offers.filter(function (offer) {
                  return offer.productId == productNr;
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function productOffers(_x5, _x6) {
        return _productOffers.apply(this, arguments);
      }

      return productOffers;
    }()
  }, {
    key: "where",
    value: function () {
      var _where2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_where, repos) {
        var _this = this;

        var vendors, _ref4, vendorArg, AND, vendorNrs, offers;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return repos.vendor.all();

              case 2:
                vendors = _context6.sent;
                _ref4 = _where || {}, vendorArg = _ref4.vendor, AND = _ref4.AND;

                if (vendorArg) {
                  vendors = this.resolveVendorField(vendors, vendorArg);
                } else if (AND) {
                  AND.forEach(function (_ref5) {
                    var vendorArg = _ref5.vendor;
                    vendors = _this.resolveVendorField(vendors, vendorArg);
                  });
                }

                vendorNrs = vendors.map(function (vendor) {
                  return vendor.nr;
                });
                _context6.next = 8;
                return this.offerByVendorNrLoader.loadMany(vendorNrs);

              case 8:
                offers = _context6.sent;
                return _context6.abrupt("return", offers.flat());

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function where(_x7, _x8) {
        return _where2.apply(this, arguments);
      }

      return where;
    }()
  }, {
    key: "resolveAndField",
    value: function resolveAndField(query, andInput) {
      var _this2 = this;

      andInput.forEach(function (_ref6) {
        var vendor = _ref6.vendor;
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