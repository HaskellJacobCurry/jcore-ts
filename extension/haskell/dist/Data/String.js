"use strict";
exports.__esModule = true;
exports.Show = exports.from = exports.String = void 0;
var common_1 = require("../util/common");
var from = (function (string) { return common_1.cast(string)(); });
exports.from = from;
var Show = ({
    show: function (string) { return "\"" + string.toString() + "\""; }
});
exports.Show = Show;
var String = common_1.Json.assign(function (value) { return ({
    toString: function () { return value; }
}); }, {
    from: from,
    Show: Show
});
exports.String = String;
exports["default"] = String;
