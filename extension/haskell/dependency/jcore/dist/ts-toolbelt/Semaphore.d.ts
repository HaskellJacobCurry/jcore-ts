import { Promise } from './Promise';
import { Int } from './Int';
export declare class Semaphore {
    private availability;
    private queueResolve;
    constructor(concurrency: Int);
    acquire(): Promise<Semaphore.Release>;
    private isLocked;
    private dispatch;
}
export declare namespace Semaphore {
    type Release = Promise.Resolve<void>;
    interface Resolve {
        (release: Release): void;
    }
    interface Acquire {
        (): Promise<Release>;
    }
}
export default Semaphore;
