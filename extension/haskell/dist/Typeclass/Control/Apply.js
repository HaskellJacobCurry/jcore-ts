"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apply2C = exports.Apply2 = exports.Apply1 = exports.IApply = exports.Apply = void 0;
var common_1 = require("../../Common/common");
var Apply;
(function (Apply_1) {
    Apply_1.Def = (function (ApplyF) { return ({
        ap: function (_0) { return function (_1) { return (ApplyF.liftA2(common_1.id_())(_0)(_1)); }; },
        liftA2: function (f) { return function (applyA) { return function (applyB) { return (common_1.assign(ApplyF.fmap(f)(applyA))(function (_) { return ApplyF.ap(_)(applyB); })); }; }; },
    }); });
    Apply_1.Ext = (function (Apply) { return (common_1.define(function (Ext) { return ({
        fstAp: function (_0) { return function (_1) { return Apply.liftA2(common_1.const_)(_0)(_1); }; },
        sndAp: function (_0) { return function (_1) { return (common_1.assign(Apply.fmap(common_1.const_(common_1.id_()))(_0))(function (_) { return Apply.ap(_)(_1); })); }; },
    }); })); });
    Apply_1.instantiate = (function () { return function (_) { return common_1.assign(common_1.merge(Apply_1.Def(_), _))(function (_) { return common_1.merge(_, Apply_1.Ext(_)); }); }; });
})(Apply || (Apply = {}));
exports.Apply = Apply;
exports.IApply = Apply;
var Apply1;
(function (Apply1) {
    Apply1.Def = (function (Apply) { return ({
        ap: function (_0) { return function (_1) { return (Apply.liftA2(common_1.id_())(_0)(_1)); }; },
        liftA2: function (f) { return function (applyA) { return function (applyB) { return (common_1.assign(Apply.fmap(f)(applyA))(function (_) { return Apply.ap(_)(applyB); })); }; }; },
    }); });
    Apply1.Ext = (function (Apply) { return (common_1.define(function (Ext) { return ({
        fstAp: function (_0) { return function (_1) { return (Apply.liftA2(common_1.const_)(_0)(_1)); }; },
        sndAp: function (_0) { return function (_1) { return (common_1.assign(Apply.fmap(common_1.const_(common_1.id_()))(_0))(function (_) { return Apply.ap(_)(_1); })); }; },
    }); })); });
    Apply1.instantiate = (function () { return function (_) { return common_1.assign(common_1.merge(Apply1.Def(_), _))(function (_) { return common_1.merge(_, Apply1.Ext(_)); }); }; });
})(Apply1 || (Apply1 = {}));
exports.Apply1 = Apply1;
var Apply2;
(function (Apply2) {
    Apply2.Def = (function (Apply) { return ({
        ap: function (_0) { return function (_1) { return (Apply.liftA2(common_1.id)(_0)(_1)); }; },
        liftA2: function (f) { return function (applyA) { return function (applyB) { return (common_1.assign(Apply.fmap(f)(applyA))(function (_) { return Apply.ap(_)(applyB); })); }; }; },
    }); });
    Apply2.Ext = (function (Apply) { return (common_1.define(function (Ext) { return ({
        fstAp: function (_0) { return function (_1) { return (Apply.liftA2(common_1.const_)(_0)(_1)); }; },
        sndAp: function (_0) { return function (_1) { return (common_1.assign(Apply.fmap(common_1.const_(common_1.id_()))(_0))(function (_) { return Apply.ap(_)(_1); })); }; },
    }); })); });
    Apply2.instantiate = (function () { return function (_) { return common_1.assign(common_1.merge(Apply2.Def(_), _))(function (_) { return common_1.merge(_, Apply2.Ext(_)); }); }; });
})(Apply2 || (Apply2 = {}));
exports.Apply2 = Apply2;
var Apply2C;
(function (Apply2C) {
    Apply2C.Def = (function (Apply) { return ({
        ap: function (_0) { return function (_1) { return (Apply.liftA2(common_1.id_())(_0)(_1)); }; },
        liftA2: function (f) { return function (applyA) { return function (applyB) { return (common_1.assign(Apply.fmap(f)(applyA))(function (_) { return Apply.ap(_)(applyB); })); }; }; },
    }); });
    Apply2C.Ext = (function (Apply) { return (common_1.define(function (Ext) { return ({
        fstAp: function (_0) { return function (_1) { return (Apply.liftA2(common_1.const_)(_0)(_1)); }; },
        sndAp: function (_0) { return function (_1) { return (common_1.assign(Apply.fmap(common_1.const_(common_1.id_()))(_0))(function (_) { return Apply.ap(_)(_1); })); }; },
    }); })); });
    Apply2C.instantiate = (function () { return function (_) { return common_1.assign(common_1.merge(Apply2C.Def(_), _))(function (_) { return common_1.merge(_, Apply2C.Ext(_)); }); }; });
})(Apply2C || (Apply2C = {}));
exports.Apply2C = Apply2C;
exports.default = Apply;
