import { AggregateError, isNative, macroTask } from './utils';

function promiseAny(values) {
    return new Promise((resolve, reject)=> {
        if (!isNative(values[Symbol.iterator]))
            return reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));

        let haveAnyResolved = false;

        for (let item of values) {
            if (haveAnyResolved) break;

            try {
                item.then(res => {
                    resolve(res);
                    // 此处不能直接break， 因为跨级了，这里属于 then cb 的作用域块了
                    haveAnyResolved = true;
                }).catch(reason => reason);
            } catch(e) {
                resolve(item);
                break;
            }
        }

        macroTask(() => {
            reject(new AggregateError('All promise is rejected'));
        });
    });
}