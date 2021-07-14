import Watcher from "../src/watcher";

/**
 * 编译属性节点
 * @param {Element} node
 * @param {*} vm 
 */
export default function compileAttribute(node, vm) {
    // 将类数组格式的属性节点转换为数组
    const attrs = Array.from(node.attributes);
    // 遍历属性数组
    for (let attr of attrs) {
        const { name, value } = attr;
        if (name.match(/v-on:click/)) {
            compileVOnClick(node, value, vm);
        } else if (name.match(/v-bind:(.*)/)) {
            compileVBind(node, value, vm);
        } else if (name.match(/v-model/)) {
            compileVModel(node, value, vm);
        }
    }
}

/**
 * 编译 v-on:click 指令
 * @param {Element} node 节点
 * @param {*} method 方法名
 * @param {*} vm Vue 实例
 */
function compileVOnClick(node, method, vm) {
    node.addEventListener('click', function(...args) {
        vm.$options.methods[method].apply(vm, args);
    })
}

/**
 * 编译 V-bind 指令
 * @param {Element} node 节点
 * @param {*} attrValue 属性值
 * @param {*} vm Vue 实例
 */
function compileVBind(node, attrValue, vm) {
    // 属性名称
    const attrName = RegExp.$1;
    // 移除模板中的 v-bing 属性
    node.removeAttribute(`v-bind:${attrName}`);
    // 当属性值发生变化的时候，重新执行回调函数
    function cb() {
        node.setAttribute(attrName, vm[attrName]);
    }

    // 实例化 Watcher， 当属性值发生变化的时候，dep 通知 watcher 执行 update 方法， cb 被执行，重新更新属性值
    new Watcher(cb);
}

/**
 * 编译 v-model 指令
 * @param {Element} node 节点
 * @param {*} key v-model 属性的值
 * @param {*} vm Vue实例
 */
function compileVModel(node, key, vm) {
    // 节点标签名、类型
    let { tagName, type } = node;
    tagName = tagName.toLowerCase();

    if (tagName === 'input' && ['text', 'search', 'number', 'password', 'email', 'tel', 'color', 'date', 'range'].includes(type)) {
        node.value = vm[key];
        node.addEventListener('input', function() {
            vm[key] = node.value;
        })
    } else if (tagName === 'input' && type === 'checkbox') {
        node.checked = vm[key];
        node.addEventListener('change', function() {
            vm[key] = node.checked;
        })
    } else if (tagName === 'input' && type === 'radio') {
        node.checked = vm[key] === node.value;
        node.addEventListener('change', function() {
            vm[key] = node.value;
        })
    } else if (tagName === 'select') {
        node.value = vm[key];
        node.addEventListener('change', function() {
            vm[key] = node.value;
        })
    }
}
