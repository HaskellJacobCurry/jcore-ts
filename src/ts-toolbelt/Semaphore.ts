import {Promise} from './Promise'
import {PromiseCapability} from './PromiseCapability'
import {Int} from './Int'
import {Queue} from '../../dependency/dist/container/Queue'

export class Semaphore {
	private availability: Int;
	private queueResolve: Queue<Semaphore.Resolve>;

	constructor(concurrency: Int) {
		this.availability = concurrency;
		this.queueResolve = new Queue();
	}

	acquire(): Promise<Semaphore.Release> {
		let capability = new PromiseCapability<Semaphore.Release>();
		this.queueResolve.enqueue_(capability.resolve);
		if (!(this.isLocked())) {
			this.dispatch();
		}
		return capability.promise;
	}

	private isLocked() {
		return !(0 < this.availability);
	}

	private dispatch() {
		let this_ = this;
		if (this.queueResolve.size() != 0) {
			let resolve = this.queueResolve._dequeue();
			this.availability--;
			resolve(() => {
				this_.availability++;
				this_.dispatch();
			});
		}
	}
}
export namespace Semaphore {
	export type Release = Promise.Resolve<void>;
	export interface Resolve {
		(release: Release): void;
	}
	export interface Acquire {
		(): Promise<Release>;
	}
}
export default Semaphore