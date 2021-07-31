"use strict";
exports.__esModule = true;
var Array_1 = require("../../../dist/Instance/Mutable/Array");
var Int_1 = require("../../../dist/Instance/Data/Int");
var Tuple_1 = require("../../../dist/Instance/Data/Tuple");
var LazySequence_1 = require("../../../dist/DataStructure/Clojure/LazySequence");
var Common_1 = require("../../../dist/Common");
Array_1.Array.Monad.Do(function (Do) { return (Common_1.apply(Do)(function (_) { return Common_1.apply(Array_1.Array.Monad.assign(_)('a')(function () { return (LazySequence_1.LazySequence.range(Int_1.Int(-2), Int_1.Int(6))(Array_1.Array.Populatable)); })); })(function (_) { return Common_1.apply(Array_1.Array.Monad.assign(_)('b')(function (_a) {
    var a = _a.a;
    return (LazySequence_1.LazySequence.range(Int_1.Int(-1), Int_1.Int(5))(Array_1.Array.Populatable));
})); })(function (_) { return Common_1.apply(Array_1.Array.Monad.bind(_)(function (_a) {
    var a = _a.a, b = _a.b;
    return (Int_1.Int.eq(Int_1.Int.add(a)(b))(Int_1.Int(3)).cata({
        True: function () { return Array_1.Array.singleton(Tuple_1.Tuple(a, b)); },
        False: function () { return Array_1.Array.empty(); }
    }));
})); })(function (_) { return Array_1.Array.Monad.run(_)(function (_) { return (console.log(Tuple_1.Tuple.Show(Int_1.Int.Show, Int_1.Int.Show).show(_).toString()),
    Array_1.Array.empty()); }); })); });
