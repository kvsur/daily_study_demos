interface Cat {
    name: string;
    run(): void;
}

interface Fish {
    name: string;
    swim(): void;
}

function isCat(animal: Cat|Fish):boolean {
    if (typeof (animal as Cat).run === 'function') {
        return true;
    } 
    return false;
}

interface ApiError extends Error {
    code: number;
}

interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') return true;
    return false;
}

// window.foo = 1; //类型“Window & typeof globalThis”上不存在属性“foo”
(window as any).foo = 1;

// function getCacheData(key: string): any {
//     return (window as any).cache[key];
// }

// const tomCat = getCacheData('tome') as Cat;
// tomCat.run();

function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

const tomCat = getCacheData<Cat>('tom');

tomCat.run();
