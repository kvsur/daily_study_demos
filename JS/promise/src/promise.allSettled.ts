import { isNative, macroTask } from "./utils";

function promiseAllSellted(values) {
    return new Promise((resolve, reject) => {
        if (!isNative(values[Symbol.iterator]))
            return reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));

        const results = [];

        for (let item of values) {
            try {
                item.then(res => results.push(res)).catch(reason => results.push(reason));
            } catch (err) {
                Promise.resolve().then(() => { results.push(item) });
            }
        }

        macroTask(() => resolve(results));
        
    });
}