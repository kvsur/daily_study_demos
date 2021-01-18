"use strict";
// var obj = new Proxy({a: 12}, {
//     get(target, prop, receiver) {
//         console.log(`getting ${prop}`);
//         return Reflect.get(target, prop, receiver);
//     },
//     set(target, prop, value, recerver) {
//         console.log(`setting ${prop}`);
//         return Reflect.set(target, prop, value, recerver);
//     }
// })
// obj.count = 1;
// obj.count++;
// console.log(obj.count)
/****************** */
// var proxy = new Proxy({}, {
//     get() {
//         return 35;
//     }
// });
// var obj = Object.create(proxy);
// console.log(obj.age);
/****************** */
// function FN(x, y) {
//     return x + y;
// }
// var FProxy = new Proxy(FN, {
//     get(target, name) {
//         if (name === 'prototype') {
//             return this.__proto__;
//         }
//         return `Hello, ${name}`;
//     },
//     apply(target, thisBinding, args) {
//         return args[0];
//     },
//     construct(target, args) {
//         return { value: [...args]}
//     }
// })
// console.log(FProxy(1,2));
// console.log(new FProxy(1,2,3,4));
// console.log(FProxy.name === 'Hello, name');
// console.log(FProxy.prototype === Object.prototype)
/************* */
// function createArray(...elements) {
//     let target = [...elements];
//     return new Proxy(target, {
//         get(origin, key, receiver) {
//             const index = Number(key);
//             if (index < 0) {
//                 key = String(origin.length + index);
//             }
//             return Reflect.get(origin, key, receiver);
//         }
//     })
// }
// const arr = createArray(1,2,3,4,5,6,5,5,5,2,3,4,45,66,8);
// console.log(arr['length'], arr[-2])
/************* */
// const dom = new Proxy({}, {
//     get(target, tagName, receiver) {
//         return function(attrs, ...children) {
//             const element = document.createElement(tagName);
//             // const attrKeys = Object.keys(attrs);
//             for (let [key, value] of Object.entries(attrs)) {
//                 element.setAttribute(key, value)
//             }
//             for (let child of children) {
//                 if (typeof child === 'string') {
//                     child = document.createTextNode(child);
//                 }
//                 element.appendChild(child);
//             }
//             return element;
//         }
//     }
// });
// const div = dom.div({
//     id: 'container',
//     class: 'container',
//     style: 'color: red;'
// },
// dom.a({href: 'https://github.com/kvsur'}, 'Github Kvsur'),
// dom.h1({style: 'color: grey'}, dom.span({}, 'Hello world'))
// );
// document.body.appendChild(div);
/********* */
var target = Object.defineProperty({}, 'foo', {
    configurable: false,
    writable: false
});
var proxy = new Proxy(target, {
    get: function (target, key) {
        // return 35; // TypeError 
        return undefined; // Check
    }
});
console.log(proxy.foo);
