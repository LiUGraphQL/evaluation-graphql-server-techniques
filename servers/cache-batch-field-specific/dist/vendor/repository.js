"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("./model"));

var _lodash = _interopRequireDefault(require("lodash"));

var _database = _interopRequireDefault(require("../database"));

var _dataloader = _interopRequireDefault(require("dataloader"));

var _helpers = require("../helpers");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getVendorByNr = function getVendorByNr(nrs) {
  var uniqueNrs = _lodash["default"].uniq(nrs);

  var query = _database["default"].select().from("vendor").whereIn("nr", uniqueNrs); // ensure response has rows in correct order


  return query.then(function (rows) {
    return (0, _helpers.simpleSortRows)(rows, nrs, _model["default"]);
  });
};

var getAllVendors = function getAllVendors(keys) {
  var query = _database["default"].select().from("vendor");

  return query.then(function (rows) {
    var res = rows.map(function (row) {
      return new _model["default"](row);
    });
    var arr = [];
    keys.forEach(function (el) {
      arr.push(res);
    });
    return arr;
  });
};

var VendorRepository =
/*#__PURE__*/
function () {
  function VendorRepository() {
    _classCallCheck(this, VendorRepository);

    _defineProperty(this, "vendorByNrLoader", new _dataloader["default"](getVendorByNr, {
      cache: _config.cache
    }));

    _defineProperty(this, "allVendorLoader", new _dataloader["default"](getAllVendors, {
      cache: _config.cache
    }));
  }

  _createClass(VendorRepository, [{
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
                return _context.abrupt("return", this.vendorByNrLoader.load(nr));

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

        var vendors;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.allVendorLoader.load("all");

              case 2:
                vendors = _context2.sent;
                vendors.forEach(function (vendor) {
                  return _this.vendorByNrLoader.prime(vendor.nr, vendor);
                });
                return _context2.abrupt("return", vendors);

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
    }()
  }]);

  return VendorRepository;
}();

exports["default"] = VendorRepository;