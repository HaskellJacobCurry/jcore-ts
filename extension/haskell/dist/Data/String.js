"use strict";
exports.__esModule = true;
exports.String = exports.Show = void 0;
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
exports.Show = ({
    show: function (string) { return "\"" + string.toString() + "\""; }
});
exports.String = ts_toolbelt_1.Json.assign(function (value) { return ({
    toString: function () { return value; }
}); }, {
    Show: exports.Show
});
exports["default"] = exports.String;
