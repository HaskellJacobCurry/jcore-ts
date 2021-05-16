import {Int} from '../Int'
import {Bool} from '../Bool'

export class RejectionTracker {
	private reason: any;
	private isHandled: Bool;
	private isTracking: Bool;
	private timeout: Int;

	constructor(reason?: any, timeout: Int = 1e2) {
		this.isTracking = false;
		this.resume(this.reason = reason, this.timeout = timeout);
		this.isHandled = true;
	}

	resume(reason?: any, timeout?: Int): void {
		this.reason = reason || this.reason;
		this.timeout = timeout || this.timeout;
		this.isHandled = false;
		if (!this.isTracking) {
			let this_ = this;
			this.isTracking = true;
			setTimeout(() => {
				if (!this_.isHandled) {
					throw new Error(`RejectionTracker::${this_.reason}`);
				}
				this_.isTracking = false;
			}, this_.timeout);
		}
	}

	pause(): void {
		this.isHandled = true;
	}
}
export default RejectionTracker