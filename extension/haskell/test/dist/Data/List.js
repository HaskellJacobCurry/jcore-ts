"use strict";
exports.__esModule = true;
var List_1 = require("../../../dist/Data/List");
var Int_1 = require("../../../dist/Data/Int");
var Maybe_1 = require("../../../dist/Data/Maybe");
var Tuple_1 = require("../../../dist/Data/Tuple");
var LazySequence_1 = require("../../../dist/Clojure/LazySequence");
var common_1 = require("../../../dist/util/common");
var list0 = List_1.List.create(common_1.apply(common_1.create([]))(function (acc) {
    for (var i = 0; i < 1e1; i++) {
        acc[acc.length] = Int_1.Int(i + 1);
    }
    return acc;
}));
var list = (common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(0))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(9))(_)); })(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable)));
list = List_1.List.snoc(list)(Int_1.Int(101));
({
    0: function () { return (common_1.apply(List_1.List.Foldable.foldl(Int_1.Int.Ring.add)(Int_1.Int(0))(list))(function (_) { return common_1.apply(Int_1.Int.Show.show(_).toString()); })(console.log)); },
    1: function () { return (common_1.apply(List_1.List.unsnoc(list))(function (_) { return common_1.apply(Maybe_1.Maybe.Show(Tuple_1.Tuple.Show(List_1.List.Show(Int_1.Int.Show), Int_1.Int.Show)).show(_).toString()); })(console.log)); }
})['1']();
