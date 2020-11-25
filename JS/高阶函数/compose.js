function compose(middleware) {
    return function (context, next) {
        let index = -1; // 定义当前将要调用的middlewar中的index
        return dispatch(0);

        function dispatch(i) {
            if (i <= index) // outofbound
                return Promise.reject(new Error('next() called multiple times'));

            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next; // 获取当前middleware
            if (!fn) return Promise.resolve(); // fn不存在时直接返回即可

            try {
                // 调用当前 middleware ，next = dispatch.bind(null, i+1) -> middleware 的下一个
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || 1));
}

const arr = [];
const stack = [];

stack.push(async (context, next) => {
    arr.push(1);
    await wait(1);
    await next();
    await wait(1);
    arr.push(6);
});

stack.push(async (context, next) => {
    arr.push(2);
    await wait(1);
    await next();
    await wait(1);
    arr.push(5);
});

stack.push(async (context, next) => {
    arr.push(3);
    await wait(1);
    await next();
    await wait(1);
    arr.push(4);
});

(async function() {
    await compose(stack)({});
})();