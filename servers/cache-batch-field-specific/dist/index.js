"use strict";

require("core-js");

require("regenerator-runtime/runtime");

var _apolloServer = require("apollo-server");

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _context2 = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"],
  context: function context() {
    return (0, _context2["default"])();
  } // engine: process.env.ENGINE_API_KEY

});
server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("Server ready at ".concat(url));
});