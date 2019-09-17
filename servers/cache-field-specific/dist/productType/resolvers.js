"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    productType: function productType(root, _ref) {
      var nr = _ref.nr;
      return {
        nr: parseInt(nr)
      };
    },
    productTypes: function productTypes(root, _, _ref2) {
      var repository = _ref2.repository;
      return repository.productType.all();
    }
  },
  ProductType: {
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
                return repository.productType.get(nr);

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
                return repository.productType.get(nr);

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
    parent: function () {
      var _parent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref10, _, _ref11) {
        var nr, repository, _ref12, parent;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref10.nr;
                repository = _ref11.repository;
                _context3.next = 4;
                return repository.productType.get(nr);

              case 4:
                _ref12 = _context3.sent;
                parent = _ref12.parent;
                return _context3.abrupt("return", repository.productType.get(parent));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function parent(_x7, _x8, _x9) {
        return _parent.apply(this, arguments);
      }

      return parent;
    }(),
    products: function products(_ref13, _, _ref14) {
      var nr = _ref13.nr;
      var repository = _ref14.repository;
      return repository.product.findBy({
        productType: nr
      });
    }
  }
};
exports["default"] = _default;