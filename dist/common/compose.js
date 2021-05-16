"use strict";
exports.__esModule = true;
exports.compose = void 0;
var Array_1 = require("../../dependency/dist/container/Array");
function compose() {
    var fs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fs[_i] = arguments[_i];
    }
    return (function (fs) {
        var sz = fs.size();
        if (sz == 0) {
            return (function (_) { return _; });
        }
        else if (sz == 1) {
            return fs._at(0);
        }
        else {
            return (function (_) { return fs.foldr(function (f, acc) { return f(acc); }, _); });
        }
    })(new Array_1.Array(fs));
}
exports.compose = compose;
exports["default"] = compose;
