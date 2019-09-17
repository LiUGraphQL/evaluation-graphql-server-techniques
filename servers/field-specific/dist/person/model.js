"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(_ref) {
  var nr = _ref.nr,
      name = _ref.name,
      mbox_sha1sum = _ref.mbox_sha1sum,
      country = _ref.country;

  _classCallCheck(this, Person);

  this.nr = nr;
  this.name = name;
  this.mbox_sha1sum = mbox_sha1sum;
  this.country = country;
};

exports["default"] = Person;