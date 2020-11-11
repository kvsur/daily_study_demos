在数学和计算机科学中，<b style="color:red">高阶函数</b>是至少满足下列一个条件的函数：
- 接受一个或多个函数作为输入；
- 输出一个函数；


### <b>组合函数</b>
组合函数就是将两个或者两个以上的函数组合成一个新的函数的过程：

```js
function composeFn(f,g) {
    return function(x) {
        return f(g(x));
    }
}
```

**组合函数的实现**

```js
function compose(...fns) {
    return function(...args) {
        return fns.reduce(function(arg, fn) {
            return fn(arg);
        }, args);
    }
}
```

<b style="color:red">composeFn</b> 有一个最佳实践就是中间件和洋葱模型的应用：

```js
function compose(middleware) {
    return function(context, next) {
        let index = -1;
        return dispatch(0);

        function dispatch(i) {
            if (i <= index>) {
                return Promise.reject(new Error('next() called multiple times'));
            }
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();

            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i+1)));
            } catch(err) {
                return Promise.reject(err);
            }
        }
    }
}
```