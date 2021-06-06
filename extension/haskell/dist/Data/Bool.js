"use strict";
exports.__esModule = true;
exports.Show = exports.not = exports.or = exports.and = exports.True = exports.False = exports.Bool = void 0;
var IBool_1 = require("./IBool");
var String_1 = require("./String");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var False = ts_toolbelt_1.Json.assign({ tag: 'False' }, {
    cata: function (fs) { return fs['False'](); },
    not: function () { return True; },
    and: function (other) { return False; },
    or: function (other) { return other; }
});
exports.False = False;
var True = ts_toolbelt_1.Json.assign({ tag: 'True' }, {
    cata: function (fs) { return fs['True'](); },
    not: function () { return False; },
    and: function (other) { return other; },
    or: function (other) { return True; }
});
exports.True = True;
var and = function (bool0) { return function (bool1) { return IBool_1.CBool.and(bool0)(bool1); }; };
exports.and = and;
var or = function (bool0) { return function (bool1) { return IBool_1.CBool.or(bool0)(bool1); }; };
exports.or = or;
var not = function (bool) { return IBool_1.CBool.not(bool); };
exports.not = not;
var Show = ({
    show: function (bool) { return (bool.cata({
        True: function () { return String_1.String('True'); },
        False: function () { return String_1.String('False'); }
    })); }
});
exports.Show = Show;
var Bool = ts_toolbelt_1.Json.assign(function (value) { return value ? True : False; }, {
    and: and,
    or: or,
    not: not,
    False: False,
    True: True,
    Show: Show
});
exports.Bool = Bool;
