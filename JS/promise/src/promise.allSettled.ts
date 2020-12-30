Promise.allSettled = function(values: IterableIterator<any>): Promise<any[]> {
    return new Promise((resolve, reject) => {
        try {
            if (!values[Symbol.iterator]) throw new TypeError();
        } catch (e) {
            reject(new TypeError(`${typeof values} is not iterable (cannot read property Symbol(Symbol.iterator))`));
        }

        const results = [];

        for (let item of values) {
            try {
                item.then(res => results.push(res)).catch(reason => results.push(reason));
            } catch (err) {
                results.push(item);
            }
        }

        setTimeout(resolve, 0, results);
    })
}

Promise.allSettled([]).then(res => console.log(res)).catch(reason => console.error(reason));