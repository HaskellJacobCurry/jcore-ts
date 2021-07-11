"use strict";
exports.__esModule = true;
var Ordering_1 = require("../../../dist/Instance/Data/Ordering");
var Bool_1 = require("../../../dist/Instance/Data/Bool");
var ts_toolbelt_1 = require("../../../dependency/jcore/dist/ts-toolbelt");
console.log(Bool_1.Bool.Show.show(ts_toolbelt_1.cast(Ordering_1.Ordering.Ord.between(Ordering_1.Ordering.LT)(Ordering_1.Ordering.GT)(Ordering_1.Ordering.GT))()).toString());
