"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind2C = exports.Bind2 = exports.Bind1 = exports.IBind = exports.Bind = void 0;
var Apply_1 = require("./Apply");
var common_1 = require("../../Common/common");
var Bind;
(function (Bind) {
    Bind.Ext = (function (BindF) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply.Ext(BindF); }
        return (common_1.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp,
            bindFirst: function (BindA) { return function (f) { return (BindF.bind(BindA)(function (a) { return (BindF.fmap(function (_) { return a; })(f(a))); })); }; }
        }); }));
    })()); });
    Bind.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Bind.Ext(_)); }); }; });
})(Bind || (Bind = {}));
exports.Bind = Bind;
exports.IBind = Bind;
var Bind1;
(function (Bind1) {
    Bind1.Ext = (function (BindF) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply1.Ext(BindF); }
        return (common_1.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp,
            bindFirst: function (BindA) { return function (f) { return (BindF.bind(BindA)(function (a) { return (BindF.fmap(function (_) { return a; })(f(a))); })); }; }
        }); }));
    })()); });
    Bind1.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Bind1.Ext(_)); }); }; });
})(Bind1 || (Bind1 = {}));
exports.Bind1 = Bind1;
var Bind2;
(function (Bind2) {
    Bind2.Ext = (function (Bind) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply2.Ext(Bind); }
        return (common_1.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp,
        }); }));
    })()); });
    Bind2.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Bind2.Ext(_)); }); }; });
})(Bind2 || (Bind2 = {}));
exports.Bind2 = Bind2;
var Bind2C;
(function (Bind2C) {
    Bind2C.Ext = (function (Bind) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply2C.Ext(Bind); }
        return (common_1.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp,
        }); }));
    })()); });
    Bind2C.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Bind2C.Ext(_)); }); }; });
})(Bind2C || (Bind2C = {}));
exports.Bind2C = Bind2C;
exports.default = Bind;
