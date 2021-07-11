"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bool = exports.Show = void 0;
var Bool_1 = require("../../DataStructure/Data/Bool");
var String_1 = require("../../DataStructure/Data/String");
var Show_1 = require("../../Typeclass/Data/Show");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/Bool"), exports);
var Show = Show_1.IShow.instantiate({
    show: function (bool) { return (bool.cata({
        True: function () { return String_1.String('True'); },
        False: function () { return String_1.String('False'); },
    })); }
});
exports.Show = Show;
var _Bool = (Common_1.Json.assign(Bool_1.Bool, {
    Show: Show,
}));
exports.Bool = _Bool;
exports.default = _Bool;
