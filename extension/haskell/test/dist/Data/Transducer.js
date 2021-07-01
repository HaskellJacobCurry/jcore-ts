"use strict";
exports.__esModule = true;
var Transducer_1 = require("../../../dist/Data/Transducer");
var Bool_1 = require("../../../dist/Data/Bool");
var Int_1 = require("../../../dist/Data/Int");
var util_1 = require("../../../dist/util");
var f = function (reducer) { return function (b, a) { return reducer(b)(a); }; };
util_1.apply(Array.apply(void 0, Array(1e1)).map(function (_, i) { return i + 1; })
    .reduce(util_1.apply(util_1.compose(Transducer_1.Transducer.filter(function (a) { return Bool_1.Bool(a % 2 == 0); })(), Transducer_1.Transducer.map(function (a) { return a * 2; })(), Transducer_1.Transducer.take(Int_1.Int(2))())(function (b) { return function (a) { return (b.push(a), b); }; }))(function (_) { return f(_); }), []))(function (_) { return (console.log({ _: _ })); });
