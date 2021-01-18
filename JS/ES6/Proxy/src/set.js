/** 利用proxy set 对设置的值进行验证 */
// let validator = {
//     set(obj, prop, value) {
//         if (prop === 'age') {
//             if (!Number.isInteger(value)) {
//                 throw new TypeError('This age is not an integer');
//             }
//             if (value > 200) {
//                 throw new RangeError('This age out of range valid');
//             }
//             return Reflect.set(obj, prop, value);
//         }
//     }
// }
// let person = new Proxy({}, validator);
// person.age = 20;
// console.log(person.age);
// person.age = 'young'; // TypeError
// person.age = 300; // RangeError
/** 利用 proxy set 对私有属性进行限制 */
// function hasProp(obj: object | null, key): boolean {
//     if (obj === Object.prototype || obj === null) return false;
//     if(obj.hasOwnProperty(key)) return true;
//     return hasProp(Object.getPrototypeOf(obj), key);
// }
// function validatePrivate(obj:object, key, aciton) {
//     if (key.toString().startsWith("_") && hasProp(obj, key)) {
//         throw new Error(`Cannot ${aciton} a prop set private`);
//     }
// }
// const privatePropObj = new Proxy({_private: 12, public: 13}, {
//     set(obj, key, value) {
//         validatePrivate(obj, key, 'set');
//         return Reflect.set(obj, key, value);
//     },
//     get(obj, prop) {
//         validatePrivate(obj, prop, 'get');
//         return Reflect.get(obj, prop);
//     }
// });
// privatePropObj.public;
// privatePropObj._private;
// privatePropObj.public = 14;
// privatePropObj._private = 15;
/** 验证 set 方法的第四个参数 */
// const set4param = { name: '' };
// const set4proxy = new Proxy({}, {
//     set(target, prop, value, receiver) {
//         return Reflect.set(target, prop, receiver, receiver);
//     }
// });
// Object.setPrototypeOf(set4param, set4proxy);
// set4param.name = 'foo';
// console.log(set4param.name === <unknown>set4param);
/** proxy 对于 writable 为false的属性是不可操作的 */
var obj = {};
Object.defineProperty(obj, 'foo', {
    value: 'foo',
    writable: false
});
var proxyd = new Proxy(obj, {
    set: function (target, prop, value, receiver) {
        return target[prop] = value;
    }
});
proxyd.foo = 12;
console.log(proxyd.foo);
