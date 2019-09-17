"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Producer = function Producer(args) {
  _classCallCheck(this, Producer);

  this.nr = args.nr;
  this.label = args.label;
  this.comment = args.comment;
  this.homepage = args.homepage;
  this.country = args.country;
};

exports["default"] = Producer;