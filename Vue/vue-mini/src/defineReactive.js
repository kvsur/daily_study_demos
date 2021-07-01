import Dep from "./dep";
import observe from "./observe";

export default function defineReactive(obj, key, value) {
    // 递归调用 ovserve 处理 val 任然是对象的情况
    const childOb = observe(value);

    const dep = new Dep();

    Object.defineProperty(obj, key, {
        // 当 通过 obj.key 读取行为，会被get 拦截处理
        get() {
            if (Dep.target) {
                dep.depend();

                // 如果存在子 ob，则一起完成依赖收集
                if (childOb) {
                    childOb.dep.depend();
                }
            }
            console.log(`defineReactive getter: key = ${key}`)
            return value;
        },
        // obj.key = xx 赋值操作时 会被set拦截
        set(newVal) {
            console.log(`defineReactive setter: key = ${newVal}`);

            if (newVal === value) return;

            value = newVal;
            // 这里针对最新的值不是基础类型的情况，比如 newVal 是对象或者数组
            observe(value);
            // 数据更新, 让dep通知自己收集的所有watcher 执行 udpate 方法
            dep.notify();
        }
    })
}