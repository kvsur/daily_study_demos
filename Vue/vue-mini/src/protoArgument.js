/**
 * 通过拦截数组的特殊的七个方法来实现数组劫持
 */

// 获取数组的默认原型
const arrayProto = Array.prototype;
// 以默认原型对象为原型创建一个新的对象
const arrayMethods = Object.create(arrayProto);

// 为什么是七个方法呢？ 因为只有这个七个方法会改变数组本身，像slice concat 等其他方法都会返回一个新的数组，不会改动数组本身
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

methodsToPatch.forEach(method => {
    Object.defineProperty(arrayMethods, method, {
        value: function(...args) {
            // 首先要完成该方法的本质工作，接下去再实现响应式的能力
            const reflect = arrayProto[method].apply(this, args);

            // 新增的元素
            let inserted = [];

            switch(method) {
                case 'push':
                case 'unshift':
                    inserted = [...args];
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }
            // 如果数组有新增的元素，则对新增元素进行响应式处理
            inserted.length && this.__ob__.observeArray(inserted);
            // 通知依赖更新
            this.__ob__.dep.notify();

            return reflect;
        },
        configurable: true,
        writable: true,
        enumerable: true
    })
});

export default function protoArgument(arr) {
    // Object.setPrototypeOf(arr, arrayMethods);
    arr.__proto__ = arrayMethods;
}
