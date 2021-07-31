"use strict";
exports.__esModule = true;
var Array_1 = require("./Array");
var Common_1 = require("../../Common");
Common_1.chain(Common_1.placeholder())(function (next) { return function (_) { return next(Array_1.Array([1, 3, 22])); }; })(function (next) { return function (_) { return next(Array_1.Array.map(function (i) { return function (a) { return [a * 3]; }; })(_)); }; })(function (next) { return function (_) { return console.log(_); }; });
