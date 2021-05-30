"use strict";
exports.__esModule = true;
exports.RejectionTracker = void 0;
var RejectionTracker = /** @class */ (function () {
    function RejectionTracker(reason, timeout) {
        if (timeout === void 0) { timeout = 1e2; }
        this.isTracking = false;
        this.resume(this.reason = reason, this.timeout = timeout);
        this.isHandled = true;
    }
    RejectionTracker.prototype.resume = function (reason, timeout) {
        this.reason = reason || this.reason;
        this.timeout = timeout || this.timeout;
        this.isHandled = false;
        if (!this.isTracking) {
            var this_1 = this;
            this.isTracking = true;
            setTimeout(function () {
                if (!this_1.isHandled) {
                    throw new Error("RejectionTracker::" + this_1.reason);
                }
                this_1.isTracking = false;
            }, this_1.timeout);
        }
    };
    RejectionTracker.prototype.pause = function () {
        this.isHandled = true;
    };
    return RejectionTracker;
}());
exports.RejectionTracker = RejectionTracker;
exports["default"] = RejectionTracker;
