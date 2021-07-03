"use strict";
exports.__esModule = true;
exports.create = exports.infer = exports.Case = void 0;
var util_1 = require("../util");
var infer = function (_) { return util_1.reinterpret(_); };
exports.infer = infer;
var createCase = (function (key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return (util_1.create({
        state: util_1.create({ key: key, args: args }),
        _T0: util_1.placeholder(),
        cata: function (fs) { return fs[key].apply(fs, args); }
    }));
});
exports.create = createCase;
var Case = util_1.Json.assign(createCase, {
    create: createCase,
    infer: infer
});
exports.Case = Case;
