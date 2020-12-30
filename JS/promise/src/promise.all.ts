Promise.all = function(values: IterableIterator<any>):Promise<any[]> {
    return new Promise((resolve, reject) => {
        try {
            if (!values[Symbol.iterator]) throw new TypeError();
        } catch (e) {
            reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));
        }

        const results = <any>[];
        let haveAnyReject = false;

        for (let item of values) {
            if (haveAnyReject) break;
            try {
                item.then(res => results.push(res)).catch(reason => {
                    haveAnyReject = true;
                    reject(reason);
                });
            } catch (err) {
                if (Object.is(err, NaN)) break;
                else results.push(item);
            }
        }

        setTimeout(resolve, 0, results);
        // queueMicrotask(() => resolve(results));
    });
}

Promise.all([1,2,3, new Promise((_, rej) => rej('test'))]).then(res => console.log(res)).catch(reason => console.log('catch', reason));
