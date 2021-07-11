"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monad2C = exports.Monad2 = exports.Monad1 = exports.IMonad = exports.Monad = void 0;
var common_1 = require("../../Common/common");
var Monad;
(function (Monad_1) {
    Monad_1.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        return: Monad.pure,
    }); })); });
    Monad_1.instantiate = (function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad_1.Ext(_)); })); });
})(Monad || (Monad = {}));
exports.Monad = Monad;
exports.IMonad = Monad;
var Monad1;
(function (Monad1) {
    Monad1.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        return: Monad.pure,
    }); })); });
    Monad1.instantiate = (function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad1.Ext(_)); })); });
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
    Monad2C.instantiate = (function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad2C.Ext(_)); })); });
})(Monad2C || (Monad2C = {}));
exports.Monad2C = Monad2C;
exports.default = Monad;
