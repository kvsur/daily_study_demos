import Dep from "./dep";

/**
 * 
 * @param {*} cb 回调函数，负责更新DOM的回调函数
 */
export default function Watcher(cb) {
    // 对cb 进行备份
    this._cb = cb;
    // 将Dep 的最新watcher 赋值为当前watcher
    Dep.target = this;
    // 执行 cb，cb函数中会发生 vm.xx 的属性读取，进行依赖收集
    cb();
    // 依赖收集完成之后 Dep.target 重置为null 放置重复收集
    Dep.target = null;
}


/**
 * 响应数据更新时， dep 通知 watcher 执行 update 方法
 * 让update 方法执行 this._cb 函数更新DOM
 */
Watcher.prototype.update = function() {
    this._cb();
}
