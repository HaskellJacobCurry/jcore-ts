"use strict";
exports.__esModule = true;
exports.toPopulatable = exports.toPopulatable1 = exports.evaluate = exports.foldl = exports.until = exports.filter = exports.fmap = exports.map = exports.create = exports.LazySequence = void 0;
var Bool_1 = require("../Data/Bool");
var Int_1 = require("../Data/Int");
var Unit_1 = require("../Data/Unit");
var util_1 = require("../util");
var create_ = (function (transform) { return function (seed) { return (util_1.apply(util_1.recurse()(function (value) { return function (makeSequence) { return ({
    value: value,
    done: Bool_1.Bool.False,
    next: function () { return makeSequence(transform(value)); }
}); }; }))(function (_) { return _(seed); })); }; });
exports.create = create_;
var map = (function (f) { return function (lazyA) { return (util_1.apply(util_1.recurse()(function (lazy) { return function (map) { return ({
    value: f(lazy.value),
    done: lazy.done,
    next: function () { return map(lazy.next()); }
}); }; }))(function (_) { return _(lazyA); })); }; });
exports.map = map;
var fmap = map;
exports.fmap = fmap;
var filter = (function (f) { return function (lazyA) { return (util_1.apply(util_1.recurse()(function (lazy) { return function (filter) { return (f(lazy.value).cata({
    False: function () { return filter(lazy.next()); },
    True: function () { return util_1.create({
        value: lazy.value,
        done: lazy.done,
        next: function () { return filter(lazy.next()); }
    }); }
})); }; }))(function (_) { return _(lazyA); })); }; });
exports.filter = filter;
var until = (function (f) { return function (lazyA) { return (util_1.apply(util_1.recurse()(function (lazy) { return function (until) { return (f(lazy.value).cata({
    False: function () { return util_1.create({
        value: lazy.value,
        done: lazy.done,
        next: function () { return until(lazy.next()); }
    }); },
    True: function () { return util_1.create({
        value: lazy.value,
        done: Bool_1.Bool.True,
        next: function () { return lazy.next(); }
    }); }
})); }; }))(function (_) { return _(lazyA); })); }; });
exports.until = until;
var take = (function (n) { return function (lazyA) { return (util_1.apply(util_1.recurse()(function (lazy, n) { return function (take) { return (Int_1.Int.Ord.gt(n)(Int_1.Int(0)).cata({
    False: function () { return util_1.create({
        value: lazy.value,
        done: Bool_1.Bool.True,
        next: function () { return lazy.next(); }
    }); },
    True: function () { return util_1.create({
        value: lazy.value,
        done: lazy.done,
        next: function () { return take(lazy.next(), Int_1.Int.sub(n)(Int_1.Int(1))); }
    }); }
})); }; }))(function (_) { return _(lazyA, n); })); }; });
var foldl = (function (f) { return function (b) { return function (lazyA) { return (util_1.apply(util_1.trampoline()(function (lazy, acc) { return function (next) { return (lazy.done.cata({
    True: function () { return acc; },
    False: function () { return next(lazy.next(), f(acc)(lazy.value)); }
})); }; }))(function (_) { return _(lazyA, b); })); }; }; });
exports.foldl = foldl;
var evaluate = (function (f) { return function (_) { return (foldl(function (_) { return f; })(Unit_1.Unit())(_)); }; });
exports.evaluate = evaluate;
var toPopulatable1 = (function (PopulatableF) { return function (lazyA) { return (foldl(function (acc) { return function (a) { return PopulatableF.populate(a)(acc); }; })(PopulatableF.seed())(lazyA)); }; });
exports.toPopulatable1 = toPopulatable1;
var toPopulatable = toPopulatable1;
exports.toPopulatable = toPopulatable;
var LazySequence = util_1.Json.assign(create_, {
    create: create_,
    map: map,
    fmap: fmap,
    filter: filter,
    until: until,
    take: take,
    foldl: foldl,
    evaluate: evaluate,
    toPopulatable: toPopulatable,
    toPopulatable1: toPopulatable1
});
exports.LazySequence = LazySequence;
