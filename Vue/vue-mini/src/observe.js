import Observer from "./observer";

/**
 * 通过 Observer 类为对象设置响应能力
 * @param {*} value 
 * @returns Observer 实例
 */
export default function observe(value) {
    // 避免无限递归
    if (!value || typeof value !== 'object') return;

    if (value.__ob__) return value.__ob__;

    return new Observer(value);
}