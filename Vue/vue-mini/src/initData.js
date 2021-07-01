import observe from "./observe";
import { proxy } from "./utils";

/**
 * 1、初始化 optins.data
 * 2、代理打他对象的上的各个属性到Vue实例
 * 3、给 data 对象上的各个属性设置响应能力
 * @param {*} vm 
 */
export default function initData(vm) {
    // 获取data 选项
    let { data } = vm.$options;
    // 设置 vm._data 选项 保证它的值肯定是一个对象
    if (!data) {
        vm._data = {};
    } else {
        vm._data = typeof data === 'function' ? data() : data;
    }
    // 代理 将 data 对象上的各个属性代理到 Vue 实例上，支持通过this.xx 的方式访问
    for (let key in vm._data) {
        proxy(vm, '_data', key);
    }

    // 设置响应式
    observe(vm._data);
}