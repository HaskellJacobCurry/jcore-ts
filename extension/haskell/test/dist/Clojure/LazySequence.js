"use strict";
exports.__esModule = true;
var LazySequence_1 = require("../../../dist/Instance/Clojure/LazySequence");
var Int_1 = require("../../../dist/Instance/Data/Int");
var Unit_1 = require("../../../dist/Instance/Data/Unit");
var Bool_1 = require("../../../dist/Instance/Data/Bool");
var Tuple_1 = require("../../../dist/Instance/Data/Tuple");
var Array_1 = require("../../../dist/Instance/Mutable/Array");
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
    2: function () { return (Common_1.apply(Common_1.apply((LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(1))))(LazySequence_1.LazySequence.take(Int_1.Int(1e5))))(function (lazy) { return Common_1.apply(LazySequence_1.LazySequence.foldl(Int_1.Int.add)(Int_1.Int(0))(lazy)); })(function (_) { return Common_1.apply(Int_1.Int.Show.show(_)); })(console.log)); },
    concat_: function () { return (Common_1.apply({
        front: Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.dec)(Int_1.Int(55)))(LazySequence_1.LazySequence.until(Int_1.Int.gt(Int_1.Int(45)))),
        tail: Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(0)))(LazySequence_1.LazySequence.until(Int_1.Int.lt(Int_1.Int(15))))
    })(function (_) { return Common_1.apply(Common_1.apply(_)(function (_a) {
        var front = _a.front, tail = _a.tail;
        return Common_1.merge(_, {
            merged: LazySequence_1.LazySequence.concat_(tail)(front)
        });
    })); })(function (_a) {
        var front = _a.front, tail = _a.tail, merged = _a.merged;
        return (Common_1.apply(Array_1.Array([front, tail, merged]))(Array_1.Array.reduce(function () { return function (_) { return function (lazy) { return (console.log('----'),
            LazySequence_1.LazySequence.evaluate(function (_) { return (console.log(Int_1.Int.Show.show(_).toString()),
                Unit_1.Unit()); })(lazy),
            _); }; }; })(Unit_1.Unit())));
    })); },
    concat: function () { return (Common_1.apply([
        Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.dec)(Int_1.Int(55)))(LazySequence_1.LazySequence.until(Int_1.Int.gt(Int_1.Int(45)))),
        Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(0)))(LazySequence_1.LazySequence.until(Int_1.Int.lt(Int_1.Int(15)))), (Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(0)))(Common_1.apply_(LazySequence_1.LazySequence.until(Int_1.Int.lt(Int_1.Int(25)))))(LazySequence_1.LazySequence.filter(Int_1.Int.even))), (Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.dec)(Int_1.Int(85)))(Common_1.apply_(LazySequence_1.LazySequence.filter(Int_1.Int.odd)))(LazySequence_1.LazySequence.until(Int_1.Int.gt(Int_1.Int(70))))),
    ])(function (lazys) { return Common_1.apply(Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(0)))(function (_) { return Common_1.apply(LazySequence_1.LazySequence.take(Int_1.Int(lazys.length))(_)); })(function (_) { return LazySequence_1.LazySequence.map(function (i) { return lazys[i.value]; })(_); })); })(Common_1.apply_(LazySequence_1.LazySequence.concat))(LazySequence_1.LazySequence.evaluate(function (_) { return (console.log(Int_1.Int.Show.show(_).toString()),
        Unit_1.Unit()); }))); },
    MDo: function () { return (LazySequence_1.LazySequence.Monad.Do(LazySequence_1.LazySequence.Monad)(function (Do, _a) {
        var assign = _a.assign, bind = _a.bind, run = _a.run;
        return (Common_1.apply(Do)(function (_) { return Common_1.apply(assign(_)('a')(function () { return (Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(-7)))(LazySequence_1.LazySequence.until(Int_1.Int.lt(Int_1.Int(9))))); })); })(function (_) { return Common_1.apply(assign(_)('b')(function (_a) {
            var a = _a.a;
            return (Common_1.apply(LazySequence_1.LazySequence(Int_1.Int.inc)(Int_1.Int(-2)))(LazySequence_1.LazySequence.until(Int_1.Int.lt(Int_1.Int(15)))));
        })); })(function (_) { return Common_1.apply(bind(_)(function (_a) {
            var a = _a.a, b = _a.b;
            return (Int_1.Int.eq(Int_1.Int.add(a)(b))(Int_1.Int(4)).cata({
                True: function () { return LazySequence_1.LazySequence.singleton(Tuple_1.Tuple(a, b)); },
                False: function () { return LazySequence_1.LazySequence.empty(); }
            }));
        })); })(function (_) { return run(_)(function (_) { return (console.log(Tuple_1.Tuple.Show(Int_1.Int.Show, Int_1.Int.Show).show(_).toString()),
            LazySequence_1.LazySequence.empty()); }); }));
    })); }
})['MDo']();
