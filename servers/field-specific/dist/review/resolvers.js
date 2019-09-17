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
        nr: nr
      };
    },
    reviews: function reviews(root, args, _ref2) {
      var repository = _ref2.repository;
      return repository.review.all();
    },
    reviewSearch: function reviewSearch(root, _ref3, _ref4) {
      var field = _ref3.field,
          criterion = _ref3.criterion,
          pattern = _ref3.pattern;
      var repository = _ref4.repository;
      return repository.review.search({
        field: field,
        criterion: criterion,
        pattern: pattern
      });
    }
  },
  Review: {
    nr: function nr(_ref5) {
      var _nr = _ref5.nr;
      return _nr;
    },
    title: function () {
      var _title = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref6, _, _ref7) {
        var nr, repository, _ref8, title;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                nr = _ref6.nr;
                repository = _ref7.repository;
                _context.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref8 = _context.sent;
                title = _ref8.title;
                return _context.abrupt("return", title);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function title(_x, _x2, _x3) {
        return _title.apply(this, arguments);
      }

      return title;
    }(),
    text: function () {
      var _text = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref9, _, _ref10) {
        var nr, repository, _ref11, text;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nr = _ref9.nr;
                repository = _ref10.repository;
                _context2.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref11 = _context2.sent;
                text = _ref11.text;
                return _context2.abrupt("return", text);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function text(_x4, _x5, _x6) {
        return _text.apply(this, arguments);
      }

      return text;
    }(),
    reviewDate: function () {
      var _reviewDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref12, _, _ref13) {
        var nr, repository, _ref14, reviewDate;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref12.nr;
                repository = _ref13.repository;
                _context3.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref14 = _context3.sent;
                reviewDate = _ref14.reviewDate;
                return _context3.abrupt("return", reviewDate);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function reviewDate(_x7, _x8, _x9) {
        return _reviewDate.apply(this, arguments);
      }

      return reviewDate;
    }(),
    rating1: function () {
      var _rating = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref15, _, _ref16) {
        var nr, repository, _ref17, rating1;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                nr = _ref15.nr;
                repository = _ref16.repository;
                _context4.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref17 = _context4.sent;
                rating1 = _ref17.rating1;
                return _context4.abrupt("return", rating1);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function rating1(_x10, _x11, _x12) {
        return _rating.apply(this, arguments);
      }

      return rating1;
    }(),
    rating2: function () {
      var _rating2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref18, _, _ref19) {
        var nr, repository, _ref20, rating2;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                nr = _ref18.nr;
                repository = _ref19.repository;
                _context5.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref20 = _context5.sent;
                rating2 = _ref20.rating2;
                return _context5.abrupt("return", rating2);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function rating2(_x13, _x14, _x15) {
        return _rating2.apply(this, arguments);
      }

      return rating2;
    }(),
    rating3: function () {
      var _rating3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref21, _, _ref22) {
        var nr, repository, _ref23, rating3;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                nr = _ref21.nr;
                repository = _ref22.repository;
                _context6.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref23 = _context6.sent;
                rating3 = _ref23.rating3;
                return _context6.abrupt("return", rating3);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function rating3(_x16, _x17, _x18) {
        return _rating3.apply(this, arguments);
      }

      return rating3;
    }(),
    rating4: function () {
      var _rating4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref24, _, _ref25) {
        var nr, repository, _ref26, rating4;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                nr = _ref24.nr;
                repository = _ref25.repository;
                _context7.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref26 = _context7.sent;
                rating4 = _ref26.rating4;
                return _context7.abrupt("return", rating4);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function rating4(_x19, _x20, _x21) {
        return _rating4.apply(this, arguments);
      }

      return rating4;
    }(),
    publishDate: function () {
      var _publishDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref27, _, _ref28) {
        var nr, repository, _ref29, publishDate;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                nr = _ref27.nr;
                repository = _ref28.repository;
                _context8.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref29 = _context8.sent;
                publishDate = _ref29.publishDate;
                return _context8.abrupt("return", publishDate);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function publishDate(_x22, _x23, _x24) {
        return _publishDate.apply(this, arguments);
      }

      return publishDate;
    }(),
    reviewer: function () {
      var _reviewer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(_ref30, _, _ref31) {
        var nr, repository, _ref32, reviewer;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                nr = _ref30.nr;
                repository = _ref31.repository;
                _context9.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref32 = _context9.sent;
                reviewer = _ref32.reviewer;
                return _context9.abrupt("return", repository.person.get(reviewer));

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function reviewer(_x25, _x26, _x27) {
        return _reviewer.apply(this, arguments);
      }

      return reviewer;
    }(),
    reviewFor: function () {
      var _reviewFor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(_ref33, _, _ref34) {
        var nr, repository, _ref35, product;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                nr = _ref33.nr;
                repository = _ref34.repository;
                _context10.next = 4;
                return repository.review.get(nr);

              case 4:
                _ref35 = _context10.sent;
                product = _ref35.product;
                return _context10.abrupt("return", repository.product.get(product));

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function reviewFor(_x28, _x29, _x30) {
        return _reviewFor.apply(this, arguments);
      }

      return reviewFor;
    }()
  }
};
exports["default"] = _default;