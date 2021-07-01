import defineReactive from "./defineReactive";
import observe from "./observe";
import protoArgument from "./protoArgument";

export default function Observer(value) {
    this.dep = new Dep();
    
    Object.defineProperty(value, '__ob__', {
        value: this,
        // enumerable 设置为false 禁止被枚举出来
        // 可以在递归设置数据响应式的时候跳过__ob__
        // 将响应式对象stringify的时候也不会有__ob__属性
        enumerable: false,
        writable: true,
        configurable: true
    });

    if (Array.isArray(value)) {
        // 数组的响应式特殊处理
        protoArgument(value);
        this.observeArray(value);
    } else {
        this.walk(value);
    }
}

// 遍历数组的每一个元素，为它们设置响应式
// 这里主要是为了处理数组的项是对象的情况，以达到 this.arr[index].key 是响应式的目的
Observer.prototype.observeArray = function(arr) {
    for (let item of arr) {
        observe(item);
    }
}

// 遍历对象的每一个属性，为这些属性设置 getter setter 拦截
Observer.prototype.walk = function(obj) {
    for (let key in obj) {
        defineReactive(obj, key, obj[key]);
    }
}