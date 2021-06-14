"use strict";
exports.__esModule = true;
exports.Semigroup = exports.Show = exports.fromI = exports.String = exports.URI = void 0;
var common_1 = require("../util/common");
var URI = common_1.S('String');
exports.URI = URI;
var fromI = (function (string) { return common_1.cast(common_1.Json.assign(string, { URI: URI }))(); });
exports.fromI = fromI;
var Show = ({
    show: function (string) { return "\"" + string.toString() + "\""; }
});
exports.Show = Show;
var Semigroup = ({
    append: function (_0) { return function (_1) { return String("" + _0.value + _1.value); }; }
});
exports.Semigroup = Semigroup;
var String = common_1.Json.assign(function (value) { return ({
    URI: URI,
    value: value,
    toString: function () { return value; }
}); }, {
    URI: URI,
    fromI: fromI,
    Show: Show,
    Semigroup: Semigroup
});
exports.String = String;
exports["default"] = String;
