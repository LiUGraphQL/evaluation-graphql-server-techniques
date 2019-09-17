"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _knex = _interopRequireDefault(require("knex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _knex["default"]({
  client: "mysql2",
  connection: {
    host: "database",
    user: "test",
    password: "pass",
    database: "benchmark"
  },
  pool: {
    min: 1,
    max: 10
  }
});

exports["default"] = _default;