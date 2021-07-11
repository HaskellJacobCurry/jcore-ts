"use strict";
exports.__esModule = true;
var LazySequence_1 = require("../../../dist/DataStructure/Clojure/LazySequence");
var Int_1 = require("../../../dist/Instance/Data/Int");
var Unit_1 = require("../../../dist/Instance/Data/Unit");
var Bool_1 = require("../../../dist/Instance/Data/Bool");
var Common_1 = require("../../../dist/Common");
({
    0: function () { return (Common_1.apply({
        lazy: (Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.Ring.add(Int_1.Int(1)))(Int_1.Int(1)))(function (_) { return Common_1.apply(LazySequence_1.LazySequence.filter(Int_1.Int.odd)(_)); })(function (_) { return LazySequence_1.LazySequence.map(Int_1.Int.Ring.mul(Int_1.Int(3)))(_); }))
    })(function (_a) {
        var lazy = _a.lazy;
        return (Common_1.apply(Common_1.trampoline()(function (lazy) { return function (next) { return (Int_1.Int.Ord.lt(lazy.value)(Int_1.Int(45)).cata({
            True: function () { return (console.log({ v: Int_1.Int.Show.show(lazy.value).toString() }),
                next(lazy.next())); },
            False: function () { return (console.log('end'),
                console.log({ v: Int_1.Int.Show.show(lazy.value).toString() }),
                Unit_1.Unit()); }
        })); }; }))(function (_) { return _(lazy); }));
    })); },
    1: function () { return (Common_1.apply({
        lazy: (Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1)))(function (_) { return Common_1.apply(LazySequence_1.LazySequence.filter(Int_1.Int.odd)(_)); })(function (_) { return Common_1.apply(LazySequence_1.LazySequence.map(Int_1.Int.Ring.mul(Int_1.Int(3)))(_)); })(function (_) { return (
        //LazySequence.take(Int(0))(_)
        LazySequence_1.LazySequence.until(function (_) { return Bool_1.Bool.fromI(Int_1.Int.Ord.lt(Int_1.Int(66))(_)); })(_)); }))
    })(function (_a) {
        var lazy = _a.lazy;
        return (Common_1.apply(LazySequence_1.LazySequence.evaluate(function (_) { return (console.log(Int_1.Int.Show.show(_).toString()),
            Unit_1.Unit()); }))(function (_) { return _(lazy); }));
    })); },
    2: function () { return (Common_1.apply(Common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(LazySequence_1.LazySequence.take(Int_1.Int(1e5))))(function (lazy) { return Common_1.apply(LazySequence_1.LazySequence.foldl(Int_1.Int.add)(Int_1.Int(0))(lazy)); })(function (_) { return Common_1.apply(Int_1.Int.Show.show(_)); })(console.log)); }
})[2]();
