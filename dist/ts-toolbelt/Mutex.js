"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Mutex = void 0;
var Semaphore_1 = require("./Semaphore");
var Mutex = /** @class */ (function (_super) {
    __extends(Mutex, _super);
    function Mutex() {
        return _super.call(this, 1) || this;
    }
    return Mutex;
}(Semaphore_1.Semaphore));
exports.Mutex = Mutex;
exports["default"] = Mutex;
