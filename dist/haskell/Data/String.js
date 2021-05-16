"use strict";
exports.__esModule = true;
exports.String = void 0;
var ts_toolbelt_1 = require("../../ts-toolbelt");
var String = /** @class */ (function () {
    function String() {
        this._ = '';
    }
    String.prototype.show = function () {
        return this;
    };
    String.prototype.toString = function () {
        return this._;
    };
    return String;
}());
var _String = ((function (String) { return (String); })(ts_toolbelt_1.Json.assign(String, {
    Lift: function (_) { return (function (string) {
        if (string === void 0) { string = new String(); }
        return (string._ = _, string);
    })(); }
})));
exports.String = _String;
exports["default"] = _String;
