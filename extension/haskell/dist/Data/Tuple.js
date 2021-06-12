"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Bifunctor = exports.Apply = exports.Functor = exports.Monoid = exports.Semigroup = exports.Show = exports.swap = exports.snd = exports.fst = exports.URI = exports.Tuple = void 0;
var Apply_1 = require("../Control/Apply");
var Bifunctor_1 = require("./Bifunctor");
var String_1 = require("./String");
var common_1 = require("../util/common");
exports.URI = common_1.S('Tuple');
/** fst :: Tuple a b -> a */
var fst = function (tuple) { return tuple.fst; };
exports.fst = fst;
/** snd :: Tuple a b -> b */
var snd = function (tuple) { return tuple.snd; };
exports.snd = snd;
/** swap :: Tuple a b -> Tuple b a */
var swap = function (_a) {
    var fst = _a.fst, snd = _a.snd;
    return Tuple(snd, fst);
};
exports.swap = swap;
/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
var Show = (function (ShowFst, ShowSnd) { return ({
    show: function (tuple) { return ((function (fst, snd) {
        if (fst === void 0) { fst = ShowFst.show(tuple.fst); }
        if (snd === void 0) { snd = ShowSnd.show(tuple.snd); }
        return (String_1.String("Tuple(" + fst + "," + snd + ")"));
    })()); }
}); });
exports.Show = Show;
/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
var Semigroup = (function (SemigroupFst, SemigroupSnd) { return ({
    append: function (tuple0) { return function (tuple1) { return ((function (fst, snd) {
        if (fst === void 0) { fst = SemigroupFst.append(tuple0.fst)(tuple1.fst); }
        if (snd === void 0) { snd = SemigroupSnd.append(tuple0.snd)(tuple1.snd); }
        return (Tuple(fst, snd));
    })()); }; }
}); });
exports.Semigroup = Semigroup;
/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
var Monoid = (function (MonoidFst, MonoidSnd) { return (__assign(__assign({}, Semigroup(MonoidFst, MonoidSnd)), { mempty: function () { return Tuple(MonoidFst.mempty(), MonoidSnd.mempty()); } })); });
exports.Monoid = Monoid;
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
var Functor = {
    URI: exports.URI,
    fmap: function (f) { return function (tupleA) { return Tuple(tupleA.fst, f(tupleA.snd)); }; }
};
exports.Functor = Functor;
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
var Apply = (function (Semigroup) { return ((function (Apply) { return (common_1.Json.assign(Apply, Apply_1.Apply2_.Ext(Apply))); })(__assign(__assign({}, Functor), { ap: function (tupleF) { return function (tupleA) { return (Tuple(Semigroup.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))); }; } }))); });
exports.Apply = Apply;
/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
var Bifunctor = ((function (Bifunctor) { return (common_1.Json.assign(Bifunctor, Bifunctor_1.Bifunctor2.Ext(Bifunctor))); })({
    bimap: function (f) { return function (g) { return function (_a) {
        var fst = _a.fst, snd = _a.snd;
        return Tuple(f(fst), g(snd));
    }; }; }
}));
exports.Bifunctor = Bifunctor;
var Tuple = common_1.Json.assign(function (fst, snd) { return ({ fst: fst, snd: snd }); }, {
    fst: fst,
    snd: snd,
    swap: swap,
    Show: Show,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Functor: Functor,
    Apply: Apply,
    Bifunctor: Bifunctor
});
exports.Tuple = Tuple;
exports["default"] = Tuple;
