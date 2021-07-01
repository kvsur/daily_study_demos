/**
 * 响应式数据在页面中每被引用一次就会产生一个watcher，data对象中的每一个属性对应着一个dep 所以 dep与watcher 的关系是一对多
 */

export default function Dep() {
    // 存储当前dep 实例收集的所有的watcher
    this.watchers = [];
}

// 这里的target 是一个静态属性，值是null或者 watcher 实例
// 在实例化Watcher 时进行赋值，待依赖收集完成后在Watcher 中又会被重新赋值为null
Dep.target = null;


Dep.prototype.depend = function() {
    // 已经存在的watcher实例不会重复收集
    if (this.watchers.includes(Dep.target)) return;

    this.watchers.push(Dep.target);
}

// dep 通知收集到的所有watcher 执行更新
Dep.prototype.notify = function() {
    for (let watcher of this.watchers) {
        watcher.update();
    }
}
