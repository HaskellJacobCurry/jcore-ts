"use strict";
exports.__esModule = true;
var compose_1 = require("../../../dist/common/compose");
var f = (compose_1.compose(function (a) { return [a]; }, function (a) { return "" + a; }, function (a) { return a * 2; }));
var v = f(3);
console.log(v);
