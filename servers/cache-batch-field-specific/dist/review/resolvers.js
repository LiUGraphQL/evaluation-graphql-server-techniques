"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    review: function review(root, _ref) {
      var nr = _ref.nr;
      return {
        nr: parseInt(nr)
      };
    },
    reviews: function reviews(root, args, _ref2) {
      var repository = _ref2.repository;
      return repository.review.all();
    },
    reviewSearch: function () {
      var _reviewSearch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(root, _ref3, _ref4) {
        var field, criterion, pattern, repository, reviews;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                field = _ref3.field, criterion = _ref3.criterion, pattern = _ref3.pattern;
                repository = _ref4.repository;
                _context.next = 4;
                return repository.review.search({
                  field: field,
                  criterion: criterion,
                  pattern: pattern
                });

              case 4:
                reviews = _context.sent;
                return _context.abrupt("return", reviews.map(function (_ref5) {
                  var nr = _ref5.nr;
                  return {
                    nr: nr
                  };
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function reviewSearch(_x, _x2, _x3) {
        return _reviewSearch.apply(this, arguments);
      }

      return reviewSearch;
    }()
  },
  Review: {
    nr: function nr(_ref6) {
      var _nr = _ref6.nr;
      return _nr;
    },
    title: function () {
      var _title = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref7, _, _ref8) {
        var nr, repository, _ref9, title;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nr = _ref7.nr;
                repository = _ref8.repository;
                _context2.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref9 = _context2.sent;
                title = _ref9.title;
                return _context2.abrupt("return", title);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function title(_x4, _x5, _x6) {
        return _title.apply(this, arguments);
      }

      return title;
    }(),
    text: function () {
      var _text = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref10, _, _ref11) {
        var nr, repository, _ref12, text;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref10.nr;
                repository = _ref11.repository;
                _context3.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref12 = _context3.sent;
                text = _ref12.text;
                return _context3.abrupt("return", text);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function text(_x7, _x8, _x9) {
        return _text.apply(this, arguments);
      }

      return text;
    }(),
    reviewDate: function () {
      var _reviewDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref13, _, _ref14) {
        var nr, repository, _ref15, reviewDate;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                nr = _ref13.nr;
                repository = _ref14.repository;
                _context4.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref15 = _context4.sent;
                reviewDate = _ref15.reviewDate;
                return _context4.abrupt("return", reviewDate);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function reviewDate(_x10, _x11, _x12) {
        return _reviewDate.apply(this, arguments);
      }

      return reviewDate;
    }(),
    rating1: function () {
      var _rating = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref16, _, _ref17) {
        var nr, repository, _ref18, rating1;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                nr = _ref16.nr;
                repository = _ref17.repository;
                _context5.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref18 = _context5.sent;
                rating1 = _ref18.rating1;
                return _context5.abrupt("return", rating1);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function rating1(_x13, _x14, _x15) {
        return _rating.apply(this, arguments);
      }

      return rating1;
    }(),
    rating2: function () {
      var _rating2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref19, _, _ref20) {
        var nr, repository, _ref21, rating2;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                nr = _ref19.nr;
                repository = _ref20.repository;
                _context6.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref21 = _context6.sent;
                rating2 = _ref21.rating2;
                return _context6.abrupt("return", rating2);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function rating2(_x16, _x17, _x18) {
        return _rating2.apply(this, arguments);
      }

      return rating2;
    }(),
    rating3: function () {
      var _rating3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref22, _, _ref23) {
        var nr, repository, _ref24, rating3;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                nr = _ref22.nr;
                repository = _ref23.repository;
                _context7.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref24 = _context7.sent;
                rating3 = _ref24.rating3;
                return _context7.abrupt("return", rating3);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function rating3(_x19, _x20, _x21) {
        return _rating3.apply(this, arguments);
      }

      return rating3;
    }(),
    rating4: function () {
      var _rating4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref25, _, _ref26) {
        var nr, repository, _ref27, rating4;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                nr = _ref25.nr;
                repository = _ref26.repository;
                _context8.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref27 = _context8.sent;
                rating4 = _ref27.rating4;
                return _context8.abrupt("return", rating4);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function rating4(_x22, _x23, _x24) {
        return _rating4.apply(this, arguments);
      }

      return rating4;
    }(),
    publishDate: function () {
      var _publishDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(_ref28, _, _ref29) {
        var nr, repository, _ref30, publishDate;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                nr = _ref28.nr;
                repository = _ref29.repository;
                _context9.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref30 = _context9.sent;
                publishDate = _ref30.publishDate;
                return _context9.abrupt("return", publishDate);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function publishDate(_x25, _x26, _x27) {
        return _publishDate.apply(this, arguments);
      }

      return publishDate;
    }(),
    reviewer: function () {
      var _reviewer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(_ref31, _, _ref32) {
        var nr, repository, _ref33, reviewer;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                nr = _ref31.nr;
                repository = _ref32.repository;
                _context10.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref33 = _context10.sent;
                reviewer = _ref33.reviewer;
                return _context10.abrupt("return", {
                  nr: reviewer
                });

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function reviewer(_x28, _x29, _x30) {
        return _reviewer.apply(this, arguments);
      }

      return reviewer;
    }(),
    reviewFor: function () {
      var _reviewFor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(_ref34, _, _ref35) {
        var nr, repository, _ref36, product;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                nr = _ref34.nr;
                repository = _ref35.repository;
                _context11.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref36 = _context11.sent;
                product = _ref36.product;
                return _context11.abrupt("return", {
                  nr: product
                });

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function reviewFor(_x31, _x32, _x33) {
        return _reviewFor.apply(this, arguments);
      }

      return reviewFor;
    }()
  }
};
exports["default"] = _default;