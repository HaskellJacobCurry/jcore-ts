"use strict";
exports.__esModule = true;
exports.curry = exports.strictCurry = void 0;
var Array_1 = require("../../dependency/dist/container/Array");
exports.strictCurry = function (f) { return (f.length == 0 ?
    f :
    function (a) { return ((function strictCurry(args) {
        if (args === void 0) { args = new Array_1.Array([a]); }
        if (args.size() == f.length) {
            return f.apply(null, args.unlift());
        }
        else {
            return function (a) { return strictCurry(args.push_(a)); };
        }
    })()); }); };
exports.curry = function (f) { return (f.length == 0 ?
    f :
    function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return ((function curry(args) {
            if (args === void 0) { args = new Array_1.Array(as); }
            if (args.size() == f.length) {
                return f.apply(null, args.unlift());
            }
            else {
                return function () {
                    var as = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        as[_i] = arguments[_i];
                    }
                    return curry(args.push(as));
                };
            }
        })());
    }); };
