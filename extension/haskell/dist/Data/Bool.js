"use strict";
exports.__esModule = true;
exports.Show = exports.not = exports.or = exports.and = exports.create = exports.fromI = exports.True = exports.False = exports.Bool = void 0;
var IBool_1 = require("./IBool");
var Show_1 = require("./Show");
var String_1 = require("./String");
var common_1 = require("../util/common");
var False = common_1.create(common_1.Json.assign(common_1.create({ tag: 'False' }), common_1.create({
    cata: function (fs) { return fs['False'](); },
    not: function () { return True; },
    and: function (_) { return False; },
    or: function (_) { return _; }
})));
exports.False = False;
var True = common_1.create(common_1.Json.assign(common_1.create({ tag: 'True' }), common_1.create({
    cata: function (fs) { return fs['True'](); },
    not: function () { return False; },
    and: function (_) { return _; },
    or: function (_) { return True; }
})));
exports.True = True;
var fromI = (function (bool) { return (bool.cata({
    True: function () { return True; },
    False: function () { return False; }
})); });
exports.fromI = fromI;
var create_ = (function (value) { return value ? True : False; });
exports.create = create_;
var and = (function (bool0) { return function (bool1) { return IBool_1.IBool.and(bool0)(bool1); }; });
exports.and = and;
var or = (function (bool0) { return function (bool1) { return IBool_1.IBool.or(bool0)(bool1); }; });
exports.or = or;
var not = (function (bool) { return IBool_1.IBool.not(bool); });
exports.not = not;
var Show = Show_1.IShow.instantiate({
    show: function (bool) { return (bool.cata({
        True: function () { return String_1.String('True'); },
        False: function () { return String_1.String('False'); }
    })); }
});
exports.Show = Show;
var Bool = common_1.Json.assign(create_, {
    fromI: fromI,
    and: and,
    or: or,
    not: not,
    False: False,
    True: True,
    Show: Show
});
exports.Bool = Bool;
exports["default"] = Bool;
