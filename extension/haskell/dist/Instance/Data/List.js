"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.Populatable = exports.Foldable = exports.Show = exports.populate = exports.seed = exports.foldr = exports.foldl = exports.foldMap = exports.show = void 0;
var List_1 = require("../../DataStructure/Data/List");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var Foldable_1 = require("../../Typeclass/Data/Foldable");
var Populatable_1 = require("../../Typeclass/Data/Populatable");
var Show_1 = require("../../Typeclass/Data/Show");
var Monoid_1 = require("../../Typeclass/Data/Monoid");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/List"), exports);
var show = (function (ShowA) { return function (listA) { return (Common_1.apply(Common_1.recurse()(function (list) { return function (show) { return (list.cata({
    Nil: function () { return String_1.String('Nil'); },
    Cons: function (head, tail) { return (Common_1.apply(String_1.String('(Cons '))(function (_) { return Common_1.apply(String_1.String.append(_)(String_1.String.fromI(ShowA.show(head)))); })(function (_) { return Common_1.apply(String_1.String.append(_)(String_1.String(' '))); })(function (_) { return Common_1.apply(String_1.String.append(_)(show(tail))); })(function (_) { return String_1.String.append(_)(String_1.String(')')); })); }
})); }; }))(function (_) { return _(listA); })); }; });
exports.show = show;
exports.show = show = function (ShowA) { return function (listA) { return (Common_1.apply(Common_1.trampoline()(function (list, done, acc, cont) { return function (show) { return (done.cata({
    True: function () { return cont(acc); },
    False: function () { return (list.cata({
        Nil: function () { return cont(String_1.String('Nil')); },
        Cons: function (head, tail) { return (show(tail, done, acc, function (acc) { return (Common_1.apply(String_1.String('(Cons '))(function (_) { return Common_1.apply(String_1.String.append(_)(String_1.String.fromI(ShowA.show(head)))); })(function (_) { return Common_1.apply(String_1.String.append(_)(String_1.String(' '))); })(function (_) { return Common_1.apply(String_1.String.append(_)(acc)); })(function (_) { return Common_1.apply(String_1.String.append(_)(String_1.String(')'))); })(function (acc) { return show(list, Bool_1.Bool.True, acc, cont); })); })); }
    })); }
})); }; }))(function (_) { return _(listA, Bool_1.Bool.False, String_1.String.mempty(), function (_) { return _; }); })); }; };
var foldMap = (function (MonoidG) { return function (f) { return function (listA) { return (Common_1.apply({
    MonoidExtG: Monoid_1.Monoid.Ext(MonoidG),
})(function (_a) {
    var MonoidExtG = _a.MonoidExtG;
    return Common_1.apply(Common_1.recurse()(function (acc, listA) { return function (foldMap) { return (listA.cata({
        Nil: function () { return acc; },
        Cons: function (head, tail) { return Common_1.apply(MonoidExtG.mappend(acc)(f(head)))(function (_) { return foldMap(_, tail); }); },
    })); }; }));
})(function (_) { return _(MonoidG.mempty(), listA); })); }; }; });
exports.foldMap = foldMap;
exports.foldMap = foldMap = function (MonoidG) { return function (f) { return function (listA) { return (Common_1.apply({
    MonoidExtG: Monoid_1.Monoid.Ext(MonoidG),
})(function (_a) {
    var MonoidExtG = _a.MonoidExtG;
    return Common_1.apply(Common_1.trampoline()(function (acc, listA) { return function (foldMap) { return (listA.cata({
        Nil: function () { return acc; },
        Cons: function (head, tail) { return Common_1.apply(MonoidExtG.mappend(acc)(f(head)))(function (_) { return foldMap(_, tail); }); },
    })); }; }));
})(function (_) { return _(MonoidG.mempty(), listA); })); }; }; };
var foldl = (function (f) { return function (b) { return function (listA) { return (Common_1.apply(Common_1.trampoline()(function (acc, listA) { return function (foldl) { return (listA.cata({
    Nil: function () { return acc; },
    Cons: function (head, tail) { return foldl(f(acc)(head), tail); },
})); }; }))(function (_) { return _(b, listA); })); }; }; });
exports.foldl = foldl;
var foldr = (function (f) { return function (b) { return function (listA) { return (Common_1.apply((List_1.List.reverse(listA)))(foldl(function (b) { return function (a) { return f(a)(b); }; })(b))); }; }; });
exports.foldr = foldr;
var seed = (function () { return List_1.List.Nil; });
exports.seed = seed;
var populate = (function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return function (listA) { return (foldr(List_1.List.cons)(listA)(List_1.List(as))); };
});
exports.populate = populate;
/** show :: (Show a) => Show (List a) => List a -> String */
var Show = function (_) { return Show_1.IShow.instantiate()(Common_1.create({
    show: show(_),
})); };
exports.Show = Show;
var Foldable = Foldable_1.Foldable1.instantiate()(Common_1.create({
    URI: List_1.URI,
    foldMap: foldMap,
    foldr: Common_1.placeholder(),
}));
exports.Foldable = Foldable;
Foldable.foldl = foldl;
Foldable.foldr = foldr;
var Populatable = Populatable_1.Populatable1.instantiate()(Common_1.create({
    URI: List_1.URI,
    seed: seed,
    populate: populate,
}));
exports.Populatable = Populatable;
var _List = (Common_1.Json.assign(List_1.List, {
    Show: Show,
    Foldable: Foldable,
    Populatable: Populatable,
    show: show,
    foldMap: foldMap,
    foldl: foldl,
    foldr: foldr,
    seed: seed,
    populate: populate,
}));
exports.List = _List;
exports.default = _List;
