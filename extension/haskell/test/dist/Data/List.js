"use strict";
exports.__esModule = true;
var List_1 = require("../../../dist/Data/List");
var Int_1 = require("../../../dist/Data/Int");
var common_1 = require("../../../dist/util/common");
var list = List_1.List.create(common_1.apply(common_1.create([]))(function (acc) {
    for (var i = 0; i < 1e6 + 1; i++) {
        acc[acc.length] = Int_1.Int(i + 1);
    }
    return acc;
}));
common_1.apply(List_1.List.last(list))(function (_) { return common_1.apply(Int_1.Int.Show.show(_).toString()); })(console.log);
