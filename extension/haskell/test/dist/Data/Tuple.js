"use strict";
exports.__esModule = true;
var Tuple_1 = require("../../../dist/Instance/Data/Tuple");
var String_1 = require("../../../dist/Instance/Data/String");
var Int_1 = require("../../../dist/Instance/Data/Int");
console.log(Tuple_1.Tuple.Show(Int_1.Int.Show, String_1.String.Show).show(Tuple_1.Tuple.Bifunctor.lmap(function (fst) { return Int_1.Int.Semiring.add(fst)(Int_1.Int.Semiring.one()); })(Tuple_1.Tuple(Int_1.Int(31), String_1.String('shit')))).toString());
