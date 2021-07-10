"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.False = exports.True = exports.or = exports.and = exports.not = exports.IBool = void 0;
var common_1 = require("../../Common/common");
var not = (function (bool) { return common_1.cast(bool.not())(); });
exports.not = not;
var and = (function (bool0) { return function (bool1) { return common_1.cast(bool0.and(bool1))(); }; });
exports.and = and;
var or = (function (bool0) { return function (bool1) { return common_1.cast(bool0.or(bool1))(); }; });
exports.or = or;
var True = {
    cata: function (fs) { return fs['True'](); },
    not: function () { return False; },
    and: function (_) { return _; },
    or: function (_) { return True; },
};
exports.True = True;
var False = {
    cata: function (fs) { return fs['False'](); },
    not: function () { return True; },
    and: function (_) { return False; },
    or: function (_) { return _; },
};
exports.False = False;
var IBool = common_1.Json.assign(function (value) { return value ? True : False; }, {
    not: not,
    and: and,
    or: or,
    True: True,
    False: False,
});
exports.IBool = IBool;
exports.default = IBool;
