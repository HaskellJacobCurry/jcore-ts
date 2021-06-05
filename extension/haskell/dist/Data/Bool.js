"use strict";
exports.__esModule = true;
exports.Bool = exports.Show = exports.not = exports.or = exports.and = exports.True = exports.False = void 0;
var IBool_1 = require("./IBool");
var String_1 = require("./String");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
exports.False = ts_toolbelt_1.Json.assign({ tag: 'False' }, {
    cata: function (fs) { return fs['False'](); },
    not: function () { return exports.True; },
    and: function (other) { return exports.False; },
    or: function (other) { return other; }
});
exports.True = ts_toolbelt_1.Json.assign({ tag: 'True' }, {
    cata: function (fs) { return fs['True'](); },
    not: function () { return exports.False; },
    and: function (other) { return other; },
    or: function (other) { return exports.True; }
});
exports.and = function (bool0) { return function (bool1) { return IBool_1.CBool.and(bool0)(bool1); }; };
exports.or = function (bool0) { return function (bool1) { return IBool_1.CBool.or(bool0)(bool1); }; };
exports.not = function (bool) { return IBool_1.CBool.not(bool); };
exports.Show = ({
    show: function (bool) { return (bool.cata({
        True: function () { return String_1.String('True'); },
        False: function () { return String_1.String('False'); }
    })); }
});
exports.Bool = ts_toolbelt_1.Json.assign(function (value) { return value ? exports.True : exports.False; }, {
    and: exports.and,
    or: exports.or,
    not: exports.not,
    False: exports.False,
    True: exports.True,
    Show: exports.Show
});
