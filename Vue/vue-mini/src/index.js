import initData from "./initData";

/**
 * Vue 构造函数
 * @param {any} options new Vue(options) 时传递的配置对象 
 */
export default function Vue(options) {
    this._init(options);
}

/**
 * 初始化配置对象
 * @param {*} options 
 */
Vue.prototype._init = function (options) {
    // 将options配置对象挂载到 Vue 实例上
    this._options = options;

    // 初始化 options.data
    // 初始化 data 对象上的各个属性到 Vue 实例
    // 给 data 对象上的各个属性设置响应式能力
    initData(this);
}
