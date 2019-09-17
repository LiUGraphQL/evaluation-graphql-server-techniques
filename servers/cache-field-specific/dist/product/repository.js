"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("./model"));

var _lodash = _interopRequireDefault(require("lodash"));

var _productTypeProduct = require("../productTypeProduct");

var _productFeatureProduct = require("../productFeatureProduct");

var _database = _interopRequireDefault(require("../database"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getProductByNr = function getProductByNr(nr) {
  var query = _database["default"].select().from("product").where("nr", nr);

  return query.then(function (rows) {
    return new _model["default"](rows[0]);
  });
};

var getProductsByNrs = function getProductsByNrs(nrs) {
  var query = _database["default"].select("nr").from("product").whereIn("nr", nrs);

  return query.then(function (rows) {
    return rows.map(function (_ref) {
      var nr = _ref.nr;
      return {
        nr: nr
      };
    });
  });
};

var getProductsByProducerNr = function getProductsByProducerNr(producerNr) {
  var query = _database["default"].select("nr").from("product").where("producer", producerNr);

  return query.then(function (rows) {
    return rows.map(function (_ref2) {
      var nr = _ref2.nr;
      return {
        nr: nr
      };
    });
  });
};

var getProductTypeProductsByProductType = function getProductTypeProductsByProductType(productTypeNr) {
  var query = _database["default"].select().from("producttypeproduct").where("producttype", productTypeNr);

  return query.then(function (rows) {
    return rows.map(function (row) {
      return new _productTypeProduct.model(row);
    });
  });
};

var getProductFeatureProductsByProductFeature = function getProductFeatureProductsByProductFeature(productFeaturesNr) {
  var query = _database["default"].select().from("productfeatureproduct").where("productfeature", productFeaturesNr);

  return query.then(function (rows) {
    return rows.map(function (row) {
      return new _productFeatureProduct.model(row);
    });
  });
};

var ProductRepository =
/*#__PURE__*/
function () {
  function ProductRepository() {
    _classCallCheck(this, ProductRepository);

    _defineProperty(this, "memoizedGetProductByNr", (0, _helpers.memoize)(getProductByNr));

    _defineProperty(this, "memoizedGetProductsByNrs", (0, _helpers.memoize)(getProductsByNrs));

    _defineProperty(this, "memoizedGetProductsByProducerNr", (0, _helpers.memoize)(getProductsByProducerNr));

    _defineProperty(this, "memoizedGetProductTypeProductsByProductType", (0, _helpers.memoize)(getProductTypeProductsByProductType));

    _defineProperty(this, "memoizedGetProductFeatureProductsByProductFeature", (0, _helpers.memoize)(getProductFeatureProductsByProductFeature));
  }

  _createClass(ProductRepository, [{
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
                return _context.abrupt("return", this.memoizedGetProductByNr(nr));

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
                return _context2.abrupt("return", (0, _helpers.allGeneric)(_model["default"], "product"));

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
    key: "findBy",
    value: function () {
      var _findBy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref3) {
        var producerNr, productType, productFeature, productTypeProducts, productFeatureProducts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                producerNr = _ref3.producerNr, productType = _ref3.productType, productFeature = _ref3.productFeature;

                if (!producerNr) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", this.memoizedGetProductsByProducerNr(producerNr));

              case 5:
                if (!productType) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 8;
                return this.memoizedGetProductTypeProductsByProductType(productType);

              case 8:
                productTypeProducts = _context3.sent;
                return _context3.abrupt("return", this.memoizedGetProductsByNrs(productTypeProducts.map(function (ptp) {
                  return ptp.product;
                })));

              case 12:
                if (!productFeature) {
                  _context3.next = 19;
                  break;
                }

                _context3.next = 15;
                return this.memoizedGetProductFeatureProductsByProductFeature(productFeature);

              case 15:
                productFeatureProducts = _context3.sent;
                return _context3.abrupt("return", this.memoizedGetProductsByNrs(productFeatureProducts.map(function (pfp) {
                  return pfp.product;
                })));

              case 19:
                throw Error("Missing argument.");

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findBy(_x2) {
        return _findBy.apply(this, arguments);
      }

      return findBy;
    }()
  }]);

  return ProductRepository;
}();

exports["default"] = ProductRepository;