"use strict";
exports.__esModule = true;
var List_1 = require("../../../dist/Instance/Data/List");
var Int_1 = require("../../../dist/Instance/Data/Int");
var Maybe_1 = require("../../../dist/Instance/Data/Maybe");
var Tuple_1 = require("../../../dist/Instance/Data/Tuple");
var LazySequence_1 = require("../../../dist/DataStructure/Clojure/LazySequence");
var common_1 = require("../../../dist/Common/common");
({
    0: function () { return (common_1.apply(List_1.List.create(common_1.apply(common_1.create([]))(function (acc) {
        for (var i = 0; i < 1e1; i++) {
            acc[acc.length] = Int_1.Int(i + 1);
        }
        return acc;
    })))(function (list) { return common_1.apply(List_1.List.Foldable.foldl(Int_1.Int.Ring.add)(Int_1.Int(0))(list)); })(function (_) { return common_1.apply(Int_1.Int.Show.show(_).toString()); })(console.log)); },
    1: function () { return (common_1.apply(common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(0))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(9))(_)); })(function (_) { return common_1.apply(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable)(_)); })(function (list) { return List_1.List.snoc(list)(Int_1.Int(101)); }))(function (list) { return (common_1.apply(List_1.List.unsnoc(list))(function (_) { return common_1.apply(Maybe_1.Maybe.Show(Tuple_1.Tuple.Show(List_1.List.Show(Int_1.Int.Show), Int_1.Int.Show)).show(_).toString()); })(console.log)); })); },
    'shiftN': function () { return (common_1.apply((common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(1e5))(_)); })(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable))))(function (list) { return common_1.apply(List_1.List.shiftN(Int_1.Int(1e5 - 2))(list)); })(function (_) { return common_1.apply(Maybe_1.Maybe.Show(List_1.List.Show(Int_1.Int.Show)).show(_).toString()); })(console.log)); },
    'index': function () { return (common_1.apply((common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(1e1))(_)); })(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable))))(function (list) { return common_1.apply(List_1.List.index(Int_1.Int(15))(list)); })(function (_) { return common_1.apply(Maybe_1.Maybe.Show(Int_1.Int.Show).show(_).toString()); })(console.log)); },
    'find': function () { return (common_1.apply((common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(1e1))(_)); })(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable))))(function (list) { return common_1.apply(List_1.List.find_(function (a) { return Int_1.Int.notGt(a)(Int_1.Int(4)); })(list)); })(function (_) { return common_1.apply(Maybe_1.Maybe.show(Tuple_1.Tuple.Show(Int_1.Int.Show, Int_1.Int.Show))(_).toString()); })(console.log)); },
    'merge': function () { return (common_1.apply({
        list0: (common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(2e1))(_)); })(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable))),
        list1: (common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(function (_) { return common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(15))(_)); })(LazySequence_1.LazySequence.toPopulatable(List_1.List.Populatable)))
    })(function (_a) {
        var list0 = _a.list0, list1 = _a.list1;
        return common_1.apply(List_1.List.merge(common_1.flip(Int_1.Int.compare))(list0)(list1));
    })(function (_) { return common_1.apply(List_1.List.show(Int_1.Int.Show)(_).toString()); })(console.log)); },
    'sortBy': function () { return (common_1.apply({
        list0: List_1.List.create([3, 6, 1, -1, 11, 9].map(Int_1.Int))
    })(function (_a) {
        var list0 = _a.list0;
        return common_1.apply(List_1.List.sortBy(common_1.flip(Int_1.Int.compare))(list0));
    })(function (_) { return common_1.apply(List_1.List.show(Int_1.Int.Show)(_).toString()); })(console.log)); }
})['sortBy']();
