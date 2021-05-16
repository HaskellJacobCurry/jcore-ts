"use strict";
exports.__esModule = true;
var Array_1 = require("../../../dist/container/Array_");
console.log(new Array_1.Array([1, 5, 2]).fmap(function (v) { return v * 20; }).foldl(function (acc, v) { return acc + v; }, 0));
console.log(Array_1.Array.foldl()(function (acc, v) { return acc + "-" + v; }, '0')(Array_1.Array.push()([33, 22], new Array_1.Array([1, 5, 2]))
    .reverse()));
