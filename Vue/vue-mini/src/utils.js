/**
 * 
 * @param {*} target 目标对象，比如 vm
 * @param {*} sourceKey 原始key，比如 _data
 * @param {*} key 代理原始值对象上指定的属性 比如_data.show
 */
export function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        // target.key 的读取操作实际上返回的是 target.sourceKey.key
        get() {
            return target[sourceKey][key];
        },

        set(newVal) {
            target[sourceKey][key] = newVal;
        }
    });
}

export class Emitor {
    constructor(self) {
        this.eventMap = new Map();
        this.self = self;
    }

    on(eventName, cb, once = fasle) {
        if (!eventName || typeof cb !== 'function') throw new Error('error args');
        const events = this.eventMap.get(eventName) || this._initCbs();
        once && events.once.push(cb) || events.push(cb);
        this.eventMap.set(eventName, events)
    }

    once(eventName, cb) {
        this.on(eventName, cb)
    }

    _initCbs() {
        const cbs = [];
        cbs.once = [];
        return cbs;
    }

    emit(eventName, ...args) {
        const events = this.eventMap.get(eventName);
        if (events) {
            events.once.push(...events);
            events.once.forEach(cb => cb.call(this.self, ...args))
            events.once = [];
        }
    }
}

export function debounceSimple(fn, time) {
    let timer = null;

    return function debounceInner(...args) {
        clearTimeout(timer);
        const ctx = this;
        timer = setTimeout(() => {
            timer = null;
            fn.apply(ctx, args);
        }, time);
    }
}

/**
 * 1.事件第一次触发时，timer是null，调用later， 若immediate为true，那么立即调用fn.apply(this, params);
 *   如果immediate为false，那么过time之后setTimeout回调执行的时候调用fn.apply(this, params)
 * 2.事件第二次触发时，如果timer已经重置为null（即setTimeout的倒计时已经结束），那么接下来的流程与第一次触发一样，
 *   若timer不为null（即倒计时还未结束），则清空timer定时（clearTimeout），重新开始及时
 * @param {*} fn 
 * @param {*} time 
 * @param {*} immediate 为true时，表示函数在每个等待延时的开始被调用，为false时，表示函数在每个延时的结束被调用
 * @returns 
 */
export function debounceComplex(fn, time, immediate = true) {
    let timer, result;

    const later = (ctx, args) => setTimeout(() => {
        timer = null;
        // 如果 immediate 为false则在这里执行 fn
        if (!immediate) {
            result = fn.apply(ctx, args);
            ctx = args = null;
        }
    }, time);

    const debounced = function(...params) {
        if (!timer) {
            timer = later(this, params);
            // 如果immediate为tru则在这里执行fn
            if (immediate) {
                result = fn.apply(this, params);
            }
        } else {
            clearTimeout(timers);
            timer = later(this, params);
        }

        // 这里返回的result根据immediate决定， false的话是上一次的执行的结果
        return result;
    }

    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null;
    }

    return debounced;
}

export function throttleSimple(fn, time) {
    let pre = +new Date;

    return function throttleInner(...args) {
        let result;
        if ((+new Date) - pre >= time) {
            pre = +new Date;
            result = fn.apply(this, args);
        }

        return result;
    }
}

/**
 * 
 * @param {Function} fn 
 * @param {number} time 
 * @param {{leading: boolean, trailing: boolean}} options 禁用第一次首先执行 传递 leading: false, 禁用最后一次执行 传递 trailing: false
 */
export function throttleComplex(fn, time, options) {
    let timer, result;
    let pre = 0;
    
    const later = (ctx, args, laterTime) => setTimeout(() => {
        pre = options.leading ? 0 : (+new Date);
        timer = null;
        result = fn.apply(ctx, args);
    }, laterTime);

    const throttled = function(...args) {
        const now = +new Date;
        if (!pre && !options.leading) {
            pre = now;
        }
        const remaining = time - (now - pre);
        if (remaining <= 0 || remaining > time) {
            pre = now;
            clearTimeout(timer);
            timer = null;
            result = fn.apply(this, args);
        } else {
            timer = later(this, args, remaining);
        }

        return result;
    }

    throttled.cancel = function() {
        clearTimeout(timer);
        pre = 0;
        timer = result = null;
    }

    return throttled;
}

/**
 * 深拷贝最简单的实现是使用 JSON.parse(JSON.stringify(obj))
 */
export function deepClone(obj, hash = new WeakMap) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    // 处理简单类型
    if (obj === null || typeof obj !== 'object') return obj;
    // 防止无限递归引用问题
    if(hash.hash(obj)) return hash.get(obj);

    const target = new obj.constructor();
    hash.set(obj, t);
    for(let key in obj) {
        // 递归进行处理
        if (obj.hasOwnProperty(key)) target[key] = deepClone(obj[key], hash);
    }
    return target;
}

export const curry = (fn, ...args) => args.length < fn.length ? (...arguments) => curry(fn, ...args, ...arguments) : fn(...args);
