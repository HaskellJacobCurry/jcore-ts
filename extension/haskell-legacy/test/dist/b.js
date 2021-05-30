"use strict";
exports.__esModule = true;
var Maybe_1 = require("../../dist/Data/Maybe");
var Int_1 = require("../../dist/Data/Int");
var IRing_1 = require("../../dist/Data/IRing");
var ret = Maybe_1.Maybe(Int_1.Int).Just(Int_1.Int.Lift(33)).cata({
    Just: function (a) { return IRing_1.Ring.negate(a); },
    Nothing: function () { return Int_1.Int.Lift(1); }
});
console.log(ret.show().toString());
