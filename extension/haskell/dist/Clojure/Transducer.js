"use strict";
exports.__esModule = true;
exports.map = exports.take = exports.filter = exports.Transducer = void 0;
var Reducer_1 = require("./Reducer");
var Reduced_1 = require("./Reduced");
var ITuple_1 = require("../Data/ITuple");
var Int_1 = require("../Data/Int");
var util_1 = require("../util");
var filter = (function () { return function (f) { return function (reducer) { return Reducer_1.Reducer({
    state: reducer.state,
    complete: reducer.complete,
    step: function (s) { return function (acc) { return function (a) { return (f(a).cata({
        True: function () { return reducer.step(s)(acc)(a); },
        False: function () { return ITuple_1.ITuple(s, Reduced_1.Reduced.Continue(acc)); }
    })); }; }; }
}); }; }; });
exports.filter = filter;
var take = (function () { return function (n) { return function (reducer) { return Reducer_1.Reducer({
    state: ITuple_1.ITuple(n, reducer.state),
    complete: function (s) { return reducer.complete(ITuple_1.ITuple.snd(s)); },
    step: function (_a) {
        var n = _a.fst, s = _a.snd;
        return function (acc) { return function (a) { return (Int_1.Int.gt(n)(Int_1.Int(0)).cata({
            False: function () { return ITuple_1.ITuple(ITuple_1.ITuple(n, s), Reduced_1.Reduced(acc)); },
            True: function () { return (util_1.apply((reducer.step(s)(acc)(a)))(function (_a) {
                var s = _a.fst, reduced = _a.snd;
                return ITuple_1.ITuple(ITuple_1.ITuple(Int_1.Int.dec(n), s), reduced);
            })); }
        })); }; };
    }
}); }; }; });
exports.take = take;
var map = (function () { return function (f) { return function (reducer) { return Reducer_1.Reducer({
    state: reducer.state,
    complete: reducer.complete,
    step: function (s) { return function (acc) { return function (a) { return reducer.step(s)(acc)(f(a)); }; }; }
}); }; }; });
exports.map = map;
var partitionBy;
var Transducer = {
    filter: filter,
    take: take,
    map: map
};
exports.Transducer = Transducer;
