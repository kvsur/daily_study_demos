/**
 * 
 * @param {*} target 目标对象，比如 vm
 * @param {*} sourceKey 原始key，比如 _data
 * @param {*} key 代理原始值对象上指定的属性 比如_data.show
 */
export function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        // target.key 的读取操作实际上返回的是 target.sourceKey.key
        get() {
            return target[sourceKey][key];
        },

        set(newVal) {
            target[sourceKey][key] = newVal;
        }
    });
} 