"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _model = _interopRequireDefault(require("./model"));

var _database = _interopRequireDefault(require("../database"));

var _helpers = require("../helpers");

var _dataloader = _interopRequireDefault(require("dataloader"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getReviewByNr = function getReviewByNr(nrs) {
  var uniqueNrs = _lodash["default"].uniq(nrs);

  var query = _database["default"].select().from("review").whereIn("nr", uniqueNrs); // ensure response has rows in correct order


  return query.then(function (rows) {
    return (0, _helpers.simpleSortRows)(rows, nrs, _model["default"]);
  });
};

var getReviewByProductNr = function getReviewByProductNr(nrs) {
  var uniqueNrs = _lodash["default"].uniq(nrs);

  var query = _database["default"].select().from("review").whereIn("product", uniqueNrs); // A loader needs to return items in the correct order, this sorts them.


  return query.then(function (rows) {
    return nrs.map(function (nr) {
      return rows.filter(function (row) {
        return row.product === nr;
      }).map(function (row) {
        return new _model["default"](row);
      });
    });
  });
};

var getAllReviews = function getAllReviews(keys) {
  var query = _database["default"].select().from("review");

  return query.then(function (rows) {
    return [rows.map(function (row) {
      return new _model["default"](row);
    })];
  });
};

var ReviewRepository =
/*#__PURE__*/
function () {
  function ReviewRepository() {
    _classCallCheck(this, ReviewRepository);

    _defineProperty(this, "reviewByNrLoader", new _dataloader["default"](getReviewByNr, {
      cache: _config.cache
    }));

    _defineProperty(this, "reviewByProductNrLoader", new _dataloader["default"](getReviewByProductNr, {
      cache: _config.cache
    }));

    _defineProperty(this, "allReviewLoader", new _dataloader["default"](getAllReviews, {
      cache: _config.cache
    }));
  }

  _createClass(ReviewRepository, [{
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
                return _context.abrupt("return", this.reviewByNrLoader.load(nr));

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
    }() // ! DATALOADED

  }, {
    key: "all",
    value: function () {
      var _all = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var reviews;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.allReviewLoader.load("all");

              case 2:
                reviews = _context2.sent;
                reviews.forEach(function (review) {
                  return _this.reviewByNrLoader.prime(review.nr, review);
                });
                return _context2.abrupt("return", reviews);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }() // ! DATALOADED

  }, {
    key: "sortBy",
    value: function () {
      var _sortBy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var _this2 = this;

        var productId, field, direction, reviews, sortByField;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                productId = _ref.productId, field = _ref.field, direction = _ref.direction;
                _context3.next = 3;
                return this.reviewByProductNrLoader.load(productId);

              case 3:
                reviews = _context3.sent;
                // Update the reviewByNrLoader cache
                reviews.forEach(function (review) {
                  return _this2.reviewByNrLoader.prime(review.nr, review);
                });

                sortByField = function sortByField(field, direction) {
                  return function (a, b) {
                    var comp = 0;

                    if (a[field] > b[field]) {
                      comp = 1;
                    } else if (a[field] < b[field]) {
                      comp = -1;
                    }

                    if (direction === "DESC") {
                      return comp * -1;
                    }

                    return comp;
                  };
                };

                if (field) reviews = reviews.sort(sortByField(field, direction));
                return _context3.abrupt("return", reviews);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sortBy(_x2) {
        return _sortBy.apply(this, arguments);
      }

      return sortBy;
    }() // ! DATALOADED - tho it retrieves all

  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref2) {
        var field, criterion, pattern, reviews;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                field = _ref2.field, criterion = _ref2.criterion, pattern = _ref2.pattern;
                _context4.next = 3;
                return this.all();

              case 3:
                reviews = _context4.sent;
                _context4.t0 = criterion;
                _context4.next = _context4.t0 === "CONTAINS" ? 7 : _context4.t0 === "START_WITH" ? 9 : _context4.t0 === "END_WITH" ? 11 : _context4.t0 === "EQUALS" ? 13 : 15;
                break;

              case 7:
                reviews = reviews.filter(function (review) {
                  return review[field].includes(pattern);
                });
                return _context4.abrupt("break", 15);

              case 9:
                reviews = reviews.filter(function (review) {
                  return review[field].startsWith(pattern);
                });
                return _context4.abrupt("break", 15);

              case 11:
                reviews = reviews.filter(function (review) {
                  return review[field].endsWith(pattern);
                });
                return _context4.abrupt("break", 15);

              case 13:
                reviews = reviews.filter(function (review) {
                  return review[field] === pattern;
                });
                return _context4.abrupt("break", 15);

              case 15:
                return _context4.abrupt("return", reviews);

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function search(_x3) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }]);

  return ReviewRepository;
}();

exports["default"] = ReviewRepository;