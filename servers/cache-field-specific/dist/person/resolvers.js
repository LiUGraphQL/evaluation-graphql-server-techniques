"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    person: function person(root, _ref) {
      var nr = _ref.nr;
      return {
        nr: parseInt(nr)
      };
    },
    persons: function persons(root, args, _ref2) {
      var repository = _ref2.repository;
      return repository.person.all();
    }
  },
  Person: {
    nr: function nr(_ref3) {
      var _nr = _ref3.nr;
      return _nr;
    },
    name: function () {
      var _name = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref4, _, _ref5) {
        var nr, repository, _ref6, name;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                nr = _ref4.nr;
                repository = _ref5.repository;
                _context.next = 4;
                return repository.person.get(nr);

              case 4:
                _ref6 = _context.sent;
                name = _ref6.name;
                return _context.abrupt("return", name);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function name(_x, _x2, _x3) {
        return _name.apply(this, arguments);
      }

      return name;
    }(),
    mbox_sha1sum: function () {
      var _mbox_sha1sum = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref7, _, _ref8) {
        var nr, repository, _ref9, mbox_sha1sum;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nr = _ref7.nr;
                repository = _ref8.repository;
                _context2.next = 4;
                return repository.person.get(nr);

              case 4:
                _ref9 = _context2.sent;
                mbox_sha1sum = _ref9.mbox_sha1sum;
                return _context2.abrupt("return", mbox_sha1sum);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function mbox_sha1sum(_x4, _x5, _x6) {
        return _mbox_sha1sum.apply(this, arguments);
      }

      return mbox_sha1sum;
    }(),
    country: function () {
      var _country = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref10, _, _ref11) {
        var nr, repository, _ref12, country;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref10.nr;
                repository = _ref11.repository;
                _context3.next = 4;
                return repository.person.get(nr);

              case 4:
                _ref12 = _context3.sent;
                country = _ref12.country;
                return _context3.abrupt("return", country);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function country(_x7, _x8, _x9) {
        return _country.apply(this, arguments);
      }

      return country;
    }()
  }
};
exports["default"] = _default;