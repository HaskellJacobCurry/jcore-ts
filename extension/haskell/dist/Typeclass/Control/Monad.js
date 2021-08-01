"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monad2C = exports.Monad2 = exports.Monad1 = exports.IMonad = exports.Monad = void 0;
var Bind_1 = require("./Bind");
var common_1 = require("../../Common/common");
var Monad;
(function (Monad) {
    Monad.Ext = (function (MonadF) { return ((function (BindExtF) {
        if (BindExtF === void 0) { BindExtF = Bind_1.Bind.Ext(MonadF); }
        return (common_1.define(function (Ext) { return ({
            return: MonadF.pure,
            assign_: function (k) { return function (f) { return function (monadA) { return (MonadF.bind(monadA)(function (a) { return (MonadF.fmap(function (b) { return common_1.merge({}, a, common_1.json(k, b)); })(f(a))); })); }; }; },
            assign: function (monadA) { return function (k) { return function (f) { return (MonadF.bind(monadA)(function (a) { return (MonadF.fmap(function (b) { return common_1.merge({}, a, common_1.json(k, b)); })(f(a))); })); }; }; },
            run: BindExtF.bindFirst,
            Do: function (api) { return function (f) { return f(MonadF.pure({}), api); }; },
        }); }));
    })()); });
    Monad.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Monad.Ext(_)); }); }; });
})(Monad || (Monad = {}));
exports.Monad = Monad;
exports.IMonad = Monad;
var Monad1;
(function (Monad1) {
    Monad1.Ext = (function (MonadF) { return ((function (BindExtF) {
        if (BindExtF === void 0) { BindExtF = Bind_1.Bind1.Ext(MonadF); }
        return (common_1.define(function (Ext) { return ({
            return: MonadF.pure,
            assign_: function (k) { return function (f) { return function (monadA) { return (MonadF.bind(monadA)(function (a) { return (MonadF.fmap(function (b) { return common_1.merge({}, a, common_1.json(k, b)); })(f(a))); })); }; }; },
            assign: function (monadA) { return function (k) { return function (f) { return (MonadF.bind(monadA)(function (a) { return (MonadF.fmap(function (b) { return common_1.merge({}, a, common_1.json(k, b)); })(f(a))); })); }; }; },
            run: BindExtF.bindFirst,
            Do: function (api) { return function (f) { return f(MonadF.pure({}), api); }; },
        }); }));
    })()); });
    Monad1.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Monad1.Ext(_)); }); }; });
})(Monad1 || (Monad1 = {}));
exports.Monad1 = Monad1;
var Monad2;
(function (Monad2) {
    Monad2.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        return: Monad.pure,
    }); })); });
    Monad2.instantiate = (function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad2.Ext(_)); })); });
})(Monad2 || (Monad2 = {}));
exports.Monad2 = Monad2;
var Monad2C;
(function (Monad2C) {
    Monad2C.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        return: Monad.pure,
    }); })); });
    Monad2C.instantiate = (function () { return function (_) { return common_1.assign(_)(function (_) { return common_1.merge(_, Monad2C.Ext(_)); }); }; });
})(Monad2C || (Monad2C = {}));
exports.Monad2C = Monad2C;
exports.default = Monad;
