"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foldable1 = exports.IFoldable = exports.Foldable = void 0;
var Monoid_1 = require("./Monoid");
var Apply_1 = require("../Control/Apply");
var Monad_1 = require("../Control/Monad");
var IUnit_1 = require("./IUnit");
var IInt_1 = require("./IInt");
var IBool_1 = require("./IBool");
var Endo_1 = require("./Monoid/Endo");
var Dual_1 = require("./Monoid/Dual_");
var Sum_1 = require("./Monoid/Sum_");
var Any_1 = require("./Monoid/Any_");
var common_1 = require("../../Common/common");
var Foldable;
(function (Foldable) {
    Foldable.Def = (function (FoldableF) { return ({
        foldMap: function (MonoidG) { return function (f) { return function (foldable) { return ((function (MonoidExtG) {
            if (MonoidExtG === void 0) { MonoidExtG = Monoid_1.Monoid.Ext(MonoidG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return MonoidExtG.mappend(f(a)); }))(function (_) { return _(MonoidG.mempty())(foldable); }));
        })()); }; }; },
        foldr: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Endo_1.Endo.Monoid())(function (_) { return common_1.assign(FoldableF.foldMap(_)(function (_) { return Endo_1.Endo(f(_)); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(_(foldableA))); })(function (_) { return _(b); })); }; }; },
    }); });
    Foldable.Ext = (function (FoldableF) { return (common_1.define(function (Ext) { return ({
        foldl: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Dual_1.Dual.Monoid(Endo_1.Endo.Monoid()))(function (_) { return common_1.assign(FoldableF.foldMap(_)(function (_) { return Dual_1.Dual(Endo_1.Endo(common_1.flip(f)(_))); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(Dual_1.Dual.get(_(foldableA)))); })(function (_) { return _(b); })); }; }; },
        fold: function (Monoid) { return FoldableF.foldMap(Monoid)(common_1.id); },
        length: function (foldableA) { return (common_1.assign(FoldableF.foldMap(Sum_1.Sum.Monoid(IInt_1.IInt.Num)))(function (_) { return common_1.assign(_(function (_) { return Sum_1.Sum(common_1.const_(IInt_1.IInt.Num.one())(_)); })); })(function (_) { return common_1.assign(_(foldableA)); })(Sum_1.Sum.get)); },
        null: function (foldableA) { return (common_1.assign(Ext().length(foldableA))(IInt_1.IInt.Eq.eq(IInt_1.IInt.Num.zero()))); },
        elem: function (EqA) { return function (a) { return function (foldableA) { return (common_1.assign(FoldableF.foldMap(Any_1.Any.Monoid))(function (_) { return common_1.assign(_(function (_) { return Any_1.Any(EqA.eq(a)(_)); })); })(function (_) { return Any_1.Any.get(_(foldableA)); })); }; }; },
        notElem: function (EqA) { return function (_0) { return function (_1) { return IBool_1.IBool.not(Ext().elem(EqA)(_0)(_1)); }; }; },
        traverse_: function (ApplicativeG) { return function (f) { return function (foldableA) { return ((function (ApplyExtG) {
            if (ApplyExtG === void 0) { ApplyExtG = Apply_1.Apply.Ext(ApplicativeG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return function (b) { return ApplyExtG.sndAp(f(a))(b); }; }))(function (_) { return common_1.assign(_(ApplicativeG.pure(IUnit_1.IUnit()))); })(function (_) { return _(foldableA); }));
        })()); }; }; },
        for_: function (ApplicativeG) { return function (_0) { return function (_1) { return Ext().traverse_(ApplicativeG)(_1)(_0); }; }; },
        sequenceA_: function (ApplicativeG) { return function (foldable) { return ((function (ApplyExtG) {
            if (ApplyExtG === void 0) { ApplyExtG = Apply_1.Apply.Ext(ApplicativeG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return function (b) { return ApplyExtG.sndAp(a)(b); }; }))(function (_) { return _(ApplicativeG.pure(IUnit_1.IUnit()))(foldable); }));
        })()); }; },
        foldrM: function (MonadG) { return function (f) { return function (b) { return function (foldableA) { return ((function (MonadExtG) {
            if (MonadExtG === void 0) { MonadExtG = Monad_1.Monad.Ext(MonadG); }
            return (common_1.assign(Ext().foldl(function (g) { return function (a) { return function (b) { return MonadG.bind(f(a)(b))(g); }; }; }))(function (_) { return _(MonadExtG.return)(foldableA)(b); }));
        })()); }; }; }; },
        foldlM: function (MonadG) { return function (f) { return function (b) { return function (foldableA) { return ((function (MonadExtG) {
            if (MonadExtG === void 0) { MonadExtG = Monad_1.Monad.Ext(MonadG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return function (g) { return function (b) { return MonadG.bind(f(b)(a))(g); }; }; }))(function (_) { return _(MonadExtG.return)(foldableA)(b); }));
        })()); }; }; }; },
    }); })); });
    Foldable.instantiate = (function () { return function (_) { return common_1.assign(common_1.merge(Foldable.Def(_), _))(function (_) { return common_1.merge(_, Foldable.Ext(_)); }); }; });
})(Foldable || (Foldable = {}));
exports.Foldable = Foldable;
exports.IFoldable = Foldable;
var Foldable1;
(function (Foldable1) {
    Foldable1.Def = (function (FoldableF) { return ({
        foldMap: function (MonoidG) { return function (f) { return function (foldable) { return ((function (MonoidExtG) {
            if (MonoidExtG === void 0) { MonoidExtG = Monoid_1.Monoid.Ext(MonoidG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return MonoidExtG.mappend(f(a)); }))(function (_) { return _(MonoidG.mempty())(foldable); }));
        })()); }; }; },
        foldr: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Endo_1.Endo.Monoid())(function (_) { return common_1.assign(FoldableF.foldMap(_)(function (_) { return Endo_1.Endo(f(_)); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(_(foldableA))); })(function (_) { return _(b); })); }; }; },
    }); });
    Foldable1.Ext = (function (FoldableF) { return (common_1.define(function (Ext) { return ({
        foldl: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Dual_1.Dual.Monoid(Endo_1.Endo.Monoid()))(function (_) { return common_1.assign(FoldableF.foldMap(_)(function (_) { return Dual_1.Dual(Endo_1.Endo(common_1.flip(f)(_))); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(Dual_1.Dual.get(_(foldableA)))); })(function (_) { return _(b); })); }; }; },
        fold: function (Monoid) { return FoldableF.foldMap(Monoid)(common_1.id); },
        length: function (foldableA) { return (common_1.assign(FoldableF.foldMap(Sum_1.Sum.Monoid(IInt_1.IInt.Num)))(function (_) { return common_1.assign(_(function (_) { return Sum_1.Sum(common_1.const_(IInt_1.IInt.Num.one())(_)); })); })(function (_) { return common_1.assign(_(foldableA)); })(Sum_1.Sum.get)); },
        null: function (foldableA) { return (common_1.assign(Ext().length(foldableA))(IInt_1.IInt.Eq.eq(IInt_1.IInt.Num.zero()))); },
        elem: function (EqA) { return function (a) { return function (foldableA) { return (common_1.assign(FoldableF.foldMap(Any_1.Any.Monoid))(function (_) { return common_1.assign(_(function (_) { return Any_1.Any(EqA.eq(a)(_)); })); })(function (_) { return Any_1.Any.get(_(foldableA)); })); }; }; },
        notElem: function (EqA) { return function (_0) { return function (_1) { return IBool_1.IBool.not(Ext().elem(EqA)(_0)(_1)); }; }; },
        traverse_: function (ApplicativeG) { return function (f) { return function (foldableA) { return ((function (ApplyExtG) {
            if (ApplyExtG === void 0) { ApplyExtG = Apply_1.Apply1.Ext(ApplicativeG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return function (b) { return ApplyExtG.sndAp(f(a))(b); }; }))(function (_) { return common_1.assign(_(ApplicativeG.pure(IUnit_1.IUnit()))); })(function (_) { return _(foldableA); }));
        })()); }; }; },
        for_: function (ApplicativeG) { return function (_0) { return function (_1) { return Ext().traverse_(ApplicativeG)(_1)(_0); }; }; },
        sequenceA_: function (ApplicativeG) { return function (foldable) { return ((function (ApplyExtG) {
            if (ApplyExtG === void 0) { ApplyExtG = Apply_1.Apply1.Ext(ApplicativeG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return function (b) { return ApplyExtG.sndAp(a)(b); }; }))(function (_) { return _(ApplicativeG.pure(IUnit_1.IUnit()))(foldable); }));
        })()); }; },
        foldrM: function (MonadG) { return function (f) { return function (b) { return function (foldableA) { return ((function (MonadExtG) {
            if (MonadExtG === void 0) { MonadExtG = Monad_1.Monad1.Ext(MonadG); }
            return (common_1.assign(Ext().foldl(function (g) { return function (a) { return function (b) { return MonadG.bind(f(a)(b))(g); }; }; }))(function (_) { return _(MonadExtG.return)(foldableA)(b); }));
        })()); }; }; }; },
        foldlM: function (MonadG) { return function (f) { return function (b) { return function (foldableA) { return ((function (MonadExtG) {
            if (MonadExtG === void 0) { MonadExtG = Monad_1.Monad1.Ext(MonadG); }
            return (common_1.assign(FoldableF.foldr(function (a) { return function (g) { return function (b) { return MonadG.bind(f(b)(a))(g); }; }; }))(function (_) { return _(MonadExtG.return)(foldableA)(b); }));
        })()); }; }; }; },
    }); })); });
    Foldable1.instantiate = (function () { return function (_) { return common_1.assign(common_1.merge(Foldable1.Def(_), _))(function (_) { return common_1.merge(_, Foldable1.Ext(_)); }); }; });
})(Foldable1 || (Foldable1 = {}));
exports.Foldable1 = Foldable1;
exports.default = Foldable;
