"use strict";
exports.__esModule = true;
exports.Int = exports.Show = void 0;
var String_1 = require("./String");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
exports.Show = ({
    show: function (int) { return String_1.String("" + int.value); }
});
exports.Int = ts_toolbelt_1.Json.assign(function (value) { return ({ value: value }); }, {
    Show: exports.Show
});
