"use strict";
exports.__esModule = true;
exports.Bind2_ = exports.Bind2 = exports.Bind1 = exports.IBind = exports.Bind = void 0;
var Apply_1 = require("./Apply");
var common_1 = require("../util/common");
var Bind;
(function (Bind_1) {
    Bind_1.Ext = (function (Bind) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply.Ext(Bind); }
        return (common_1.Function.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp
        }); }));
    })()); });
})(Bind || (Bind = {}));
exports.Bind = Bind;
exports.IBind = Bind;
var Bind1;
(function (Bind1) {
    Bind1.Ext = (function (Bind) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply1.Ext(Bind); }
        return (common_1.Function.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp
        }); }));
    })()); });
})(Bind1 || (Bind1 = {}));
exports.Bind1 = Bind1;
var Bind2;
(function (Bind2) {
    Bind2.Ext = (function (Bind) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply2.Ext(Bind); }
        return (common_1.Function.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp
        }); }));
    })()); });
})(Bind2 || (Bind2 = {}));
exports.Bind2 = Bind2;
var Bind2_;
(function (Bind2_) {
    Bind2_.Ext = (function (Bind) { return ((function (ApplyExt) {
        if (ApplyExt === void 0) { ApplyExt = Apply_1.Apply2_.Ext(Bind); }
        return (common_1.Function.define(function (Ext) { return ({
            sequence: ApplyExt.sndAp
        }); }));
    })()); });
})(Bind2_ || (Bind2_ = {}));
exports.Bind2_ = Bind2_;
exports["default"] = Bind;
