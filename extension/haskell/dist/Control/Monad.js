"use strict";
exports.__esModule = true;
exports.Monad2_ = exports.Monad2 = exports.Monad1 = exports.IMonad = exports.Monad = void 0;
var common_1 = require("../util/common");
var Monad;
(function (Monad_1) {
    Monad_1.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
    Monad_1.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad_1.Ext(_)); })); };
})(Monad || (Monad = {}));
exports.Monad = Monad;
exports.IMonad = Monad;
var Monad1;
(function (Monad1) {
    Monad1.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
    Monad1.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad1.Ext(_)); })); };
})(Monad1 || (Monad1 = {}));
exports.Monad1 = Monad1;
var Monad2;
(function (Monad2) {
    Monad2.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
    Monad2.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad2.Ext(_)); })); };
})(Monad2 || (Monad2 = {}));
exports.Monad2 = Monad2;
var Monad2_;
(function (Monad2_) {
    Monad2_.Ext = (function (Monad) { return (common_1.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
    Monad2_.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monad2_.Ext(_)); })); };
})(Monad2_ || (Monad2_ = {}));
exports.Monad2_ = Monad2_;
exports["default"] = Monad;
