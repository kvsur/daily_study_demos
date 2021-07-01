import { isNative } from "./utils";

function promiseRace(values) {
    return new Promise((resolve, reject) => {
        if (!isNative(values[Symbol.iterator]))
            return reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));

        for(let item of values) {
            try {
                item.then(res => resolve(res)).catch(reason => reject(reason));
            } catch (err) {
                Promise.resolve().then(() => resolve(item));
            }
        }
        
    });
}