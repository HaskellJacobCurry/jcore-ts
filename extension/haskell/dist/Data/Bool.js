"use strict";
exports.__esModule = true;
exports.Bool = exports.Show = exports.True = exports.False = void 0;
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
exports.Show = ({
    show: function (bool) { return (bool.cata({
        True: function () { return String_1.String('True'); },
        False: function () { return String_1.String('False'); }
    })); }
});
exports.Bool = ts_toolbelt_1.Json.assign(function (value) { return value ? exports.True : exports.False; }, {
    False: exports.False,
    True: exports.True,
    Show: exports.Show
});
