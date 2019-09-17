"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _model = _interopRequireDefault(require("./model"));

var _productFeatureProduct = require("../productFeatureProduct");

var _database = _interopRequireDefault(require("../database"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getProductFeatureByNr = function getProductFeatureByNr(nr) {
  var query = _database["default"].select().from("productfeature").where("nr", nr);

  return query.then(function (rows) {
    return new _model["default"](rows[0]);
  });
};

var getProductFeaturesByNrs = function getProductFeaturesByNrs(nrs) {
  var query = _database["default"].select("nr").from("productfeature").whereIn("nr", nrs);

  return query.then(function (rows) {
    return rows.map(function (_ref) {
      var nr = _ref.nr;
      return {
        nr: nr
      };
    });
  });
};

var getProductFeatureProductsByProductNr = function getProductFeatureProductsByProductNr(productNr) {
  var query = _database["default"].select().from("productfeatureproduct").where("product", productNr);

  return query.then(function (rows) {
    return rows.map(function (row) {
      return new _productFeatureProduct.model(row);
    });
  });
};

var ProductFeatureRepository =
/*#__PURE__*/
function () {
  function ProductFeatureRepository() {
    _classCallCheck(this, ProductFeatureRepository);
  }

  _createClass(ProductFeatureRepository, [{
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
                return _context.abrupt("return", getProductFeatureByNr(nr));

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
                return _context2.abrupt("return", (0, _helpers.allGeneric)(_model["default"], "productfeature"));

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
    key: "byProductNr",
    value: function () {
      var _byProductNr = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref2) {
        var nr, productFeatureProducts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nr = _ref2.nr;
                _context3.next = 3;
                return getProductFeatureProductsByProductNr(nr);

              case 3:
                productFeatureProducts = _context3.sent;
                return _context3.abrupt("return", getProductFeaturesByNrs(productFeatureProducts.map(function (pfp) {
                  return pfp.productFeature;
                })));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function byProductNr(_x2) {
        return _byProductNr.apply(this, arguments);
      }

      return byProductNr;
    }()
  }]);

  return ProductFeatureRepository;
}();

exports["default"] = ProductFeatureRepository;