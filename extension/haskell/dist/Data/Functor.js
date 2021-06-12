"use strict";
exports.__esModule = true;
exports.Functor2_ = exports.Functor2 = exports.Functor1 = exports.IFunctor = exports.Functor = void 0;
var IUnit_1 = require("./IUnit");
var common_1 = require("../util/common");
var Functor;
(function (Functor_1) {
    Functor_1.Ext = (function (Functor) { return (common_1.Function.define(function (Ext) { return ({
        lfmap: function (_) { return Functor.fmap(common_1.const_(_)); },
        rfmap: function (_0) { return function (_1) { return Ext().lfmap(_1)(_0); }; },
        ffmap: function (_0) { return function (_1) { return Functor.fmap(_1)(_0); }; },
        "void": Ext().lfmap(IUnit_1.IUnit())
    }); })); });
})(Functor || (Functor = {}));
exports.Functor = Functor;
exports.IFunctor = Functor;
function laws(IFunctor, fa, g, f) {
    if (IFunctor === void 0) { IFunctor = common_1.reinterpret(); }
    if (fa === void 0) { fa = common_1.reinterpret(); }
    if (g === void 0) { g = common_1.reinterpret(); }
    if (f === void 0) { f = common_1.reinterpret(); }
    common_1.id(fa) == IFunctor.fmap(common_1.id)(fa);
    IFunctor.fmap(common_1.compose(f, g))(fa) == common_1.compose(IFunctor.fmap(f), IFunctor.fmap(g))(fa);
}
;
var Functor1;
(function (Functor1) {
    Functor1.Ext = (function (Functor) { return (common_1.Function.define(function (Ext) { return ({
        lfmap: function (_) { return Functor.fmap(common_1.const_(_)); },
        rfmap: function (_0) { return function (_1) { return Ext().lfmap(_1)(_0); }; },
        ffmap: function (_0) { return function (_1) { return Functor.fmap(_1)(_0); }; },
        "void": Ext().lfmap(IUnit_1.IUnit())
    }); })); });
})(Functor1 || (Functor1 = {}));
exports.Functor1 = Functor1;
var Functor2;
(function (Functor2) {
    Functor2.Ext = (function (Functor) { return (common_1.Function.define(function (Ext) { return ({
        lfmap: function (_0) { return function (_1) { return Functor.fmap(common_1.const_(_0))(_1); }; },
        rfmap: function (_0) { return function (_1) { return Ext().lfmap(_1)(_0); }; },
        ffmap: function (_0) { return function (_1) { return Functor.fmap(_1)(_0); }; },
        "void": Ext().lfmap(IUnit_1.IUnit())
    }); })); });
})(Functor2 || (Functor2 = {}));
exports.Functor2 = Functor2;
var Functor2_;
(function (Functor2_) {
    Functor2_.Ext = (function (Functor) { return (common_1.Function.define(function (Ext) { return ({
        lfmap: function (_0) { return function (_1) { return Functor.fmap(common_1.const_(_0))(_1); }; },
        rfmap: function (_0) { return function (_1) { return Ext().lfmap(_1)(_0); }; },
        ffmap: function (_0) { return function (_1) { return Functor.fmap(_1)(_0); }; },
        "void": Ext().lfmap(IUnit_1.IUnit())
    }); })); });
})(Functor2_ || (Functor2_ = {}));
exports.Functor2_ = Functor2_;
exports["default"] = Functor;
