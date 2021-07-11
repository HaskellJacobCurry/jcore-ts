"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybe = exports.infer = exports.Just = exports.Nothing_ = exports.Nothing = exports.URI = exports.Maybe = void 0;
var common_1 = require("../../Common/common");
var URI = common_1.S('Maybe');
exports.URI = URI;
var Nothing = common_1.create(common_1.Json.assign({ URI: URI }, common_1.create({ tag: 'Nothing' }), common_1.create({
    cata: function (fs) { return fs['Nothing'](); },
})));
exports.Nothing = Nothing;
var Nothing_ = (function () { return common_1.Json.assign({ URI: URI }, common_1.create({ tag: 'Nothing' }), common_1.create({
    cata: function (fs) { return fs['Nothing'](); },
})); });
exports.Nothing_ = Nothing_;
var Just = (function (value) { return common_1.create(common_1.Json.assign({ URI: URI }, common_1.create({ tag: 'Just', value: value }), common_1.create({
    cata: function (fs) { return fs['Just'](value); },
}))); });
exports.Just = Just;
var infer = (function (maybe) { return common_1.reinterpret(maybe); });
exports.infer = infer;
/** maybe :: b -> (a -> b) -> Maybe a -> b */
var maybe = (function (b) { return function (f) { return function (maybeA) { return (maybeA.cata({
    Nothing: function () { return b; },
    Just: function (a) { return f(a); },
})); }; }; });
exports.maybe = maybe;
var Maybe = {
    URI: URI,
    Nothing: Nothing,
    Nothing_: Nothing_,
    Just: Just,
    infer: infer,
    maybe: maybe,
};
exports.Maybe = Maybe;
exports.default = Maybe;
