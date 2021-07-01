"use strict";
exports.__esModule = true;
exports.Transducer = exports.take = exports.filter = exports.map = void 0;
var Int_1 = require("./Int");
var map = (function (f) { return function () { return function (reducer) { return (function (b) { return function (a) { return reducer(b)(f(a)); }; }); }; }; });
exports.map = map;
var filter = (function (f) { return function () { return function (reducer) { return (function (b) { return function (a) { return (f(a).cata({
    False: function () { return b; },
    True: function () { return reducer(b)(a); }
})); }; }); }; }; });
exports.filter = filter;
var take = (function (n) { return function () { return function (reducer) { return (function (b) { return function (a) { return (Int_1.Int.Ord.notLt(n = Int_1.Int.dec(n))(Int_1.Int(0)).cata({
    False: function () { return b; },
    True: function () { return reducer(b)(a); }
})); }; }); }; }; });
exports.take = take;
var Transducer = {
    map: map,
    filter: filter,
    take: take
};
exports.Transducer = Transducer;
