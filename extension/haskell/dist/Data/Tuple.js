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
exports.Bifunctor = exports.Apply = exports.Functor = exports.Monoid = exports.Semigroup = exports.Show = exports.create = exports.swap = exports.snd = exports.fst = exports.fromI = exports.URI = exports.Tuple = void 0;
var Show_1 = require("./Show");
var Semigroup_1 = require("./Semigroup");
var Monoid_1 = require("./Monoid");
var Functor_1 = require("./Functor");
var Apply_1 = require("../Control/Apply");
var Bifunctor_1 = require("./Bifunctor");
var String_1 = require("./String");
var common_1 = require("../util/common");
exports.URI = common_1.S('Tuple');
var fromI = (function (_a) {
    var fst = _a.fst, snd = _a.snd;
    return create(fst, snd);
});
exports.fromI = fromI;
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
var create = function (fst, snd) { return ({ fst: fst, snd: snd }); };
exports.create = create;
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
            return (Tuple(fst, snd));
        })()); }; }
    }));
})()); };
exports.Semigroup = Semigroup;
/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
var Monoid = function (_0, _1) { return ((function (MonoidFst, MonoidSnd) {
    if (MonoidFst === void 0) { MonoidFst = _0; }
    if (MonoidSnd === void 0) { MonoidSnd = _1; }
    return (Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup(MonoidFst, MonoidSnd)), { mempty: function () { return Tuple(MonoidFst.mempty(), MonoidSnd.mempty()); } })));
})()); };
exports.Monoid = Monoid;
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
var Functor = Functor_1.Functor2.instantiate({
    URI: exports.URI,
    fmap: function (f) { return function (tupleA) { return create(tupleA.fst, f(tupleA.snd)); }; }
});
exports.Functor = Functor;
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
var Apply = function (_) { return ((function (SemigroupT0) {
    if (SemigroupT0 === void 0) { SemigroupT0 = _; }
    return (Apply_1.Apply2_.instantiate(__assign(__assign({}, Functor), { ap: function (tupleF) { return function (tupleA) { return (Tuple(SemigroupT0.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))); }; }, liftA2: common_1.reinterpret() })));
})()); };
exports.Apply = Apply;
/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
var Bifunctor = Bifunctor_1.Bifunctor2.instantiate({
    URI: exports.URI,
    bimap: function (f) { return function (g) { return function (_a) {
        var fst = _a.fst, snd = _a.snd;
        return create(f(fst), g(snd));
    }; }; }
});
exports.Bifunctor = Bifunctor;
var Tuple = common_1.Json.assign(create, {
    fromI: fromI,
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
