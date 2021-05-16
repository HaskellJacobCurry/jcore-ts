"use strict";
exports.__esModule = true;
exports.Int = void 0;
var String_1 = require("./String");
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Int = /** @class */ (function () {
    function Int() {
        var _this = this;
        this.construct = Int;
        this._ = 0;
        this.show = function () { return String_1.String.Lift("" + _this._); };
    }
    return Int;
}());
var Int_ = ((function (Int) { return (Int); })(ts_toolbelt_1.Json.assign(Int, {
    Lift: function (_) { return (function (int) {
        if (int === void 0) { int = new Int(); }
        return (int._ = _, int);
    })(); }
})));
exports.Int = Int_;
exports["default"] = Int_;
