"use strict";
exports.__esModule = true;
exports.Json = void 0;
var Json;
(function (Json) {
    function assign(dest) {
        var srcs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            srcs[_i - 1] = arguments[_i];
        }
        for (var _a = 0, srcs_1 = srcs; _a < srcs_1.length; _a++) {
            var src = srcs_1[_a];
            for (var k in src) {
                if (typeof src[k] !== 'undefined') {
                    dest[k] = src[k];
                }
            }
        }
        return dest;
    }
    Json.assign = assign;
})(Json = exports.Json || (exports.Json = {}));
