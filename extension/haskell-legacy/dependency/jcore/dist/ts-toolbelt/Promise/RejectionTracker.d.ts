import { Int } from '../Int';
export declare class RejectionTracker {
    private reason;
    private isHandled;
    private isTracking;
    private timeout;
    constructor(reason?: any, timeout?: Int);
    resume(reason?: any, timeout?: Int): void;
    pause(): void;
}
export default RejectionTracker;
