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
exports.Tuple = exports.Bifunctor = exports.Apply = exports.Functor = exports.Monoid = exports.Semigroup = exports.Show = void 0;
var Tuple_1 = require("../../DataStructure/Data/Tuple");
var Show_1 = require("../../Typeclass/Data/Show");
var Semigroup_1 = require("../../Typeclass/Data/Semigroup");
var Monoid_1 = require("../../Typeclass/Data/Monoid");
var Functor_1 = require("../../Typeclass/Data/Functor");
var Apply_1 = require("../../Typeclass/Control/Apply");
var Bifunctor_1 = require("../../Typeclass/Data/Bifunctor");
var String_1 = require("../../Instance/Data/String");
var common_1 = require("../../Common/common");
__exportStar(require("../../DataStructure/Data/Tuple"), exports);
/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
var Show = function (_0, _1) { return ((function (ShowFst, ShowSnd) {
    if (ShowFst === void 0) { ShowFst = _0; }
    if (ShowSnd === void 0) { ShowSnd = _1; }
    return (Show_1.IShow.instantiate({
        show: function (tuple) { return ((function (fst, snd) {
            if (fst === void 0) { fst = ShowFst.show(tuple.fst); }
            if (snd === void 0) { snd = ShowSnd.show(tuple.snd); }
            return (common_1.apply(String_1.String('(Tuple '))(function (_) { return common_1.apply(String_1.String.Semigroup.append(_)(String_1.String.fromI(fst))); })(function (_) { return common_1.apply(String_1.String.Semigroup.append(_)(String_1.String(' '))); })(function (_) { return common_1.apply(String_1.String.Semigroup.append(_)(String_1.String.fromI(snd))); })(function (_) { return String_1.String.Semigroup.append(_)(String_1.String(')')); }));
        })()); }
    }));
})()); };
exports.Show = Show;
;
/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
var Semigroup = function (_0, _1) { return ((function (SemigroupFst, SemigroupSnd) {
    if (SemigroupFst === void 0) { SemigroupFst = _0; }
    if (SemigroupSnd === void 0) { SemigroupSnd = _1; }
    return (Semigroup_1.ISemigroup.instantiate({
        append: function (tuple0) { return function (tuple1) { return ((function (fst, snd) {
            if (fst === void 0) { fst = SemigroupFst.append(tuple0.fst)(tuple1.fst); }
            if (snd === void 0) { snd = SemigroupSnd.append(tuple0.snd)(tuple1.snd); }
            return (Tuple_1.Tuple(fst, snd));
        })()); }; }
    }));
})()); };
exports.Semigroup = Semigroup;
/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
var Monoid = function (_0, _1) { return ((function (MonoidFst, MonoidSnd) {
    if (MonoidFst === void 0) { MonoidFst = _0; }
    if (MonoidSnd === void 0) { MonoidSnd = _1; }
    return (Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup(MonoidFst, MonoidSnd)), { mempty: function () { return Tuple_1.Tuple(MonoidFst.mempty(), MonoidSnd.mempty()); } })));
})()); };
exports.Monoid = Monoid;
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
var Functor = Functor_1.Functor2.instantiate({
    URI: Tuple_1.URI,
    fmap: function (f) { return function (tupleA) { return Tuple_1.Tuple(tupleA.fst, f(tupleA.snd)); }; },
});
exports.Functor = Functor;
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
var Apply = function (_) { return ((function (SemigroupT0) {
    if (SemigroupT0 === void 0) { SemigroupT0 = _; }
    return (Apply_1.Apply2C.instantiate(__assign(__assign({}, Functor), { ap: function (tupleF) { return function (tupleA) { return (Tuple_1.Tuple(SemigroupT0.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))); }; }, liftA2: common_1.reinterpret() })));
})()); };
exports.Apply = Apply;
/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
var Bifunctor = Bifunctor_1.Bifunctor2.instantiate({
    URI: Tuple_1.URI,
    bimap: function (f) { return function (g) { return function (_a) {
        var fst = _a.fst, snd = _a.snd;
        return Tuple_1.Tuple(f(fst), g(snd));
    }; }; }
});
exports.Bifunctor = Bifunctor;
var _Tuple = (common_1.Json.assign(Tuple_1.Tuple, {
    Show: Show,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Functor: Functor,
    Apply: Apply,
    Bifunctor: Bifunctor,
}));
exports.Tuple = _Tuple;
exports.default = _Tuple;
