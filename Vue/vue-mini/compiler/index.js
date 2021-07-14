import compileNode from "./compileNode";

export default function mount(vm) {
    /** @type {Element} */
    let el = document.querySelector(vm.$options.el);

    compileNode(Array.from(el.childNodes), vm);
}