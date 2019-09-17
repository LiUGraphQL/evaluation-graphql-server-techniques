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

var getReviewByNr = function getReviewByNr(nr) {
  var query = _database["default"].select().from("review").where("nr", nr);

  return query.then(function (rows) {
    return new _model["default"](rows[0]);
  });
};

var getReviewsByProductNr = function getReviewsByProductNr(productNr) {
  var query = _database["default"].select().from("review").where("product", productNr);

  return query.then(function (rows) {
    return rows.map(function (row) {
      return new _model["default"](row);
    });
  });
};

var getAllReviews = function getAllReviews() {
  var query = _database["default"].select().from("review");

  return query.then(function (rows) {
    return rows.map(function (row) {
      return new _model["default"](row);
    });
  });
};

var ReviewRepository =
/*#__PURE__*/
function () {
  function ReviewRepository() {
    _classCallCheck(this, ReviewRepository);
  }

  _createClass(ReviewRepository, [{
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
                return _context.abrupt("return", getReviewByNr(nr));

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
    }() // ! DUMB

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
                return _context2.abrupt("return", getAllReviews());

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
    }() // ! DUMB

  }, {
    key: "sortBy",
    value: function () {
      var _sortBy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var productNr, field, direction, reviews, sortByField;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                productNr = _ref.productId, field = _ref.field, direction = _ref.direction;
                _context3.next = 3;
                return getReviewsByProductNr(productNr);

              case 3:
                reviews = _context3.sent;

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

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function sortBy(_x2) {
        return _sortBy.apply(this, arguments);
      }

      return sortBy;
    }() // ! DUMB

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