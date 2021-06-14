"use strict";
exports.__esModule = true;
exports.Monad2_ = exports.Monad2 = exports.Monad1 = exports.IMonad = exports.Monad = void 0;
var common_1 = require("../util/common");
var Monad;
(function (Monad_1) {
    Monad_1.Ext = (function (Monad) { return (common_1.Function.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
})(Monad || (Monad = {}));
exports.Monad = Monad;
exports.IMonad = Monad;
var Monad1;
(function (Monad1) {
    Monad1.Ext = (function (Monad) { return (common_1.Function.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
})(Monad1 || (Monad1 = {}));
exports.Monad1 = Monad1;
var Monad2;
(function (Monad2) {
    Monad2.Ext = (function (Monad) { return (common_1.Function.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
})(Monad2 || (Monad2 = {}));
exports.Monad2 = Monad2;
var Monad2_;
(function (Monad2_) {
    Monad2_.Ext = (function (Monad) { return (common_1.Function.define(function (Ext) { return ({
        "return": Monad.pure
    }); })); });
})(Monad2_ || (Monad2_ = {}));
exports.Monad2_ = Monad2_;
exports["default"] = Monad;
