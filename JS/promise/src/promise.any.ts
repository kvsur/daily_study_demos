class MyAggregateError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

Promise.any = function(values: IterableIterator<any>) {
    return new Promise((resolve, reject) => {
        try {
            if (!values[Symbol.iterator]) throw new TypeError();
        } catch (e) {
            reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));
        }

        let haveAnyResolved = false;

        for(let item of values) {
            if (haveAnyResolved) break;

            try {
                item.then(res => {
                    resolve(res);
                    // 此处不能直接break， 因为跨级了，这里属于 then cb 的作用域块了
                    haveAnyResolved = true;
                }).catch(reason => reason);
            } catch (err) {
                resolve(item);
                break;
            }
        }


        setTimeout(reject, 0, new MyAggregateError('All promise is rejected'));
    });
}

Promise.any([Promise.reject(1), 2, Promise.resolve(3)]).then(res => {
    console.log(res);
}).catch(reason => {
    console.error(reason)
})