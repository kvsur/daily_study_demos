export function isNative(Ctor: any): boolean {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

export function macroTask(cb) {
    const channel = new MessageChannel();

    channel.port1.onmessage = cb;
    channel.port2.postMessage(1);
}

export class AggregateError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}