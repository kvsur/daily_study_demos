import Watcher from '../src/watcher';

/**
 * 编译文本节点
 * @param {Element} node 节点
 * @param {*} vm Vue实例
 */
export default function compileTextNode(node, vm) {
    // <span>{{ key }}</span>
    const key = RegExp.$1.trim();

    // 当响应数据更新时，dep通知 watcher 执行 update 函数，cb会被调用
    function cb() {
        node.textContent = JSON.stringify(vm[key])
    }

    // 实例化 Watcher，执行 cb， 触发 getter，进行依赖收集
    new Watcher(cb);
}

