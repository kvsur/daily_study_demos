import {isNative, macroTask} from './utils';

function promiseAll(values) {
    return new Promise((resolve, reject) => {

        if (!isNative(values[Symbol.iterator]))
            return reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));

        const results = [];
        let haveAnyReject = false;

        for (let item of values) {
            // 如果在结束循环之前的其中任何一个触发了reject 则break；
            if (haveAnyReject) break;
            try {
                item.then(res => results.push(res)).catch(reason => {
                    haveAnyReject = true;
                    reject(reason);
                });
            } catch (err) {
                Promise.resolve().then(() => { results.push(item) });
            }
        }

        // setTimeout(resolve, 0, results);
        // queueMicrotask(() => resolve(results));

        !haveAnyReject && macroTask(() => resolve(results));
    });
}
