"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.infer = exports.Case = void 0;
var _1 = require(".");
var infer = function (_) { return _1.reinterpret(_); };
exports.infer = infer;
var createCase = (function (key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return (_1.create({
        state: _1.create({ key: key, args: args }),
        _T0: _1.placeholder(),
        cata: function (fs) { return fs[key].apply(fs, args); },
    }));
});
exports.create = createCase;
var Case = _1.Json.assign(createCase, {
    create: createCase,
    infer: infer,
});
exports.Case = Case;
