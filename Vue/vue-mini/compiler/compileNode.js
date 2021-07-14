import compileAttribute from "./compileAttribte";
import compileTextNode from "./compileTextNode";

/**
 * 递归编译整棵节点树
 * @param {Element[]} nodes 节点
 * @param {*} vm VUe 实例
 */
export default function compileNode(nodes, vm) {
    for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        // 处理元素节点
        if (node.nodeType === 1) {
            // 编译元素上的属性节点
            compileAttribute(node, vm);
            // 递归编译下面的子节点
            compileNode(Array.from(node.childNodes));
        } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
            // 编译文本节点
            compileTextNode(node, vm);
        }
    }
}
