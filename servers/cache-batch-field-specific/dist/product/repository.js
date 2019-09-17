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

var _dataloader = _interopRequireDefault(require("dataloader"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getProductByNr = function getProductByNr(nrs) {
  var uniqueNrs = _lodash["default"].uniq(nrs);

  var query = _database["default"].select().from("product").whereIn("nr", uniqueNrs);

  return query.then(function (rows) {
    return (0, _helpers.simpleSortRows)(rows, nrs, _model["default"]);
  });
};

var getProductsByProducerNr = function getProductsByProducerNr(producerNrs) {
  var uniqueNrs = _lodash["default"].uniq(producerNrs);

  var query = _database["default"].select().from("product").whereIn("producer", uniqueNrs);

  return query.then(function (rows) {
    return producerNrs.map(function (nr) {
      return rows.filter(function (row) {
        return row.producer === nr;
      }).map(function (row) {
        return new _model["default"](row);
      });
    });
  });
};

var getProductTypeProductByProductType = function getProductTypeProductByProductType(productTypes) {
  var uniqueNrs = _lodash["default"].uniq(productTypes);

  var query = _database["default"].select().from("producttypeproduct").whereIn("producttype", uniqueNrs);

  return query.then(function (rows) {
    return productTypes.map(function (nr) {
      return rows.filter(function (row) {
        return row.productType === nr;
      }).map(function (row) {
        return new _productTypeProduct.model(row);
      });
    });
  });
};

var getProductFeatureProductByProductFeature = function getProductFeatureProductByProductFeature(productFeatures) {
  var uniqueNrs = _lodash["default"].uniq(productFeatures);

  var query = _database["default"].select().from("productfeatureproduct").whereIn("productfeature", uniqueNrs);

  return query.then(function (rows) {
    return productFeatures.map(function (nr) {
      return rows.filter(function (row) {
        return row.productFeature === nr;
      }).map(function (row) {
        return new _productFeatureProduct.model(row);
      });
    });
  });
};

var ProductRepository =
/*#__PURE__*/
function () {
  function ProductRepository() {
    _classCallCheck(this, ProductRepository);

    _defineProperty(this, "productByNrLoader", new _dataloader["default"](getProductByNr, {
      cache: _config.cache
    }));

    _defineProperty(this, "productByProducerNrLoader", new _dataloader["default"](getProductsByProducerNr, {
      cache: _config.cache
    }));

    _defineProperty(this, "productTypeProductByProductTypeLoader", new _dataloader["default"](getProductTypeProductByProductType, {
      cache: _config.cache
    }));

    _defineProperty(this, "productFeatureProductByProductFeatureLoader", new _dataloader["default"](getProductFeatureProductByProductFeature, {
      cache: _config.cache
    }));
  }

  _createClass(ProductRepository, [{
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
                return _context.abrupt("return", this.productByNrLoader.load(nr));

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
    }() // ! DATALOADED

  }, {
    key: "findBy",
    value: function () {
      var _findBy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var _this = this;

        var producerNr, productType, productFeature, products, productTypeProducts, productFeatureProducts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                producerNr = _ref.producerNr, productType = _ref.productType, productFeature = _ref.productFeature;

                if (!producerNr) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 4;
                return this.productByProducerNrLoader.load(producerNr);

              case 4:
                products = _context3.sent;
                // Update nr cache with retreived products
                products.map(function (product) {
                  return _this.productByNrLoader.prime(product.nr, product);
                });
                return _context3.abrupt("return", products);

              case 9:
                if (!productType) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 12;
                return this.productTypeProductByProductTypeLoader.load(productType);

              case 12:
                productTypeProducts = _context3.sent;
                return _context3.abrupt("return", this.productByNrLoader.loadMany(productTypeProducts.map(function (ptp) {
                  return ptp.product;
                })));

              case 16:
                if (!productFeature) {
                  _context3.next = 23;
                  break;
                }

                _context3.next = 19;
                return this.productFeatureProductByProductFeatureLoader.load(productFeature);

              case 19:
                productFeatureProducts = _context3.sent;
                return _context3.abrupt("return", this.productByNrLoader.loadMany(productFeatureProducts.map(function (pfp) {
                  return pfp.product;
                })));

              case 23:
                throw Error("Missing argument.");

              case 24:
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