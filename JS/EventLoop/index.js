/**
 * 1. 
 * 整个脚本会作为宏任务
 * callStack:[]
 * macrotask:[script]
 * microtask: []
 *     ⬇️
 * callStack:[script]
 * macrotask:[]
 * microtask: []
 */
export default function fn() {

    /** 
     * 2. 
     * callStack:[script, console.log]
     * macrotask:[]
     * microtask: []
    */
    console.log('1 start');
    
    /** 
     * 3. 
     * callStack:[script, setTimeout]
     * macrotask:[setTimeout-cb-1]
     * microtask: []
    */
    // setTimeout-cb-1
    setTimeout(function() {

        /** 
         * 20. 
         * callStack:[setTimeout-cb-1,queueMicrotask]
         * macrotask:[setTimeout-cb-2]
         * microtask: [then-cb-1, queueMicrotask-cb]
        */

        queueMicrotask(() => {
            /** 
             * 24. 
             * callStack:[setTimeout-cb-1,queueMicrotask-cb,console.log]
             * macrotask:[setTimeout-cb-2, setTimeout-cb-3]
             * microtask: [then-cb-1]
            */
            console.log('8 microtask');
        });
        /** 
         * 25. 
         * callStack:[setTimeout-cb-1]
         * macrotask:[setTimeout-cb-2, setTimeout-cb-3]
         * microtask: [then-cb-1]
        */

        /** 
         * 21. 
         * callStack:[setTimeout-cb-1,setTimeout]
         * macrotask:[setTimeout-cb-2, setTimeout-cb-3]
         * microtask: [then-cb-1, queueMicrotask-cb]
        */
        // setTimeout-cb-3
        setTimeout(() => {
            /** 
             * 32. 
             * callStack:[setTimeout-cb-3, console.log]
             * macrotask:[]
             * microtask: []
            */
            console.log('10 timeout')
            
            /** 
             * 32. 
             * callStack:[setTimeout-cb-3]
             * macrotask:[]
             * microtask: []
            */
        }, 0);
        /** 
         * 34. 
         * callStack:[]
         * macrotask:[]
         * microtask: []
        */


        /** 
         * 22. 
         * callStack:[setTimeout-cb-1,console.log]
         * macrotask:[setTimeout-cb-2, setTimeout-cb-3]
         * microtask: [then-cb-1, queueMicrotask-cb]
        */
        console.log('7 timeout');

        /** 
         * 23. 
         * callStack:[setTimeout-cb-1]
         * macrotask:[setTimeout-cb-2, setTimeout-cb-3]
         * microtask: [then-cb-1, queueMicrotask-cb] then-cb-1 还是不可执行
        */


    /** 
     * 26. 
     * callStack:[]
     * macrotask:[setTimeout-cb-2, setTimeout-cb-3]
     * microtask: [then-cb-1]
    */
    });

    /** 
     * 4. 
     * callStack:[script, queueMicrotask]
     * macrotask:[setTimeout-cb-1]
     * microtask: [queueMicrotask-cb]
    */
    queueMicrotask(function() {

        /** 
         * 10. 
         * callStack:[queueMicrotask-cb，requestAnimationFrame]
         * macrotask: [requestAnimationFrame-cb]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [then-cb-1]
        */
        requestAnimationFrame(() => {
            /** 
             * 16. 
             * callStack:[requestAnimationFrame-cb,console.log]
             * macrotask: []
             * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
             * microtask: [then-cb-1]
            */
            console.log('5 animation');

            /** 
             * 17. 
             * callStack:[requestAnimationFrame-cb,queueMicrotask]
             * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
             * microtask: [then-cb-1, queueMicrotask-cb]
            */
            queueMicrotask(() => {
                /** 
                 * 18. 
                 * callStack:[requestAnimationFrame-cb,queueMicrotask,queueMicrotask-cb, console.log]
                 * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
                 * microtask: [then-cb-1]
                */
                console.log('6 microtask');
            });

            /** 
             * 19. 
             * callStack:[requestAnimationFrame-cb]
             * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
             * microtask: [then-cb-1]
            */
        });

        /** 
         * 20. 
         * callStack:[]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [then-cb-1] then-cb-1 不可执行
        */

        /** 
         * 11. 
         * callStack:[queueMicrotask-cb, console.log]
         * macrotask: [requestAnimationFrame-cb]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [then-cb-1]
        */
        console.log('3 microtask');

        /** 
         * 12. 
         * callStack:[queueMicrotask-cb, Promise.resolve, then-body]
         * macrotask: [requestAnimationFrame-cb]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [then-cb-1, then-cb-2]
        */
        // then-cb-2
        Promise.resolve().then(() => {
            /** 
             * 13. 
             * callStack:[queueMicrotask-cb,then-cb-2, console.log]
             * macrotask: [requestAnimationFrame-cb]
             * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
             * microtask: [then-cb-1]
            */
            console.log('4 microtask');
        }
        /** 
         * 14. 
         * callStack:[queueMicrotask-cb]
         * macrotask: [requestAnimationFrame-cb]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [then-cb-1]
        */
        );

    /** 
     * 12-1. 
     * callStack:[queueMicrotask-cb]
     * macrotask: [requestAnimationFrame-cb]
     * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
     * microtask: [then-cb-1, then-cb-2]
     * 此时微任务队列还是不为空，需要继续执行，这里看到then-cb-1还不是resolved状态，不可执行，则会执行 then-cb-2
    */

   /** 
     * 15. 
     * callStack:[]
     * macrotask: [requestAnimationFrame-cb]
     * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
     * microtask: [then-cb-1] 虽然微任务队列不为空，但是then-cb-1还是不可执行，进入下一轮 loop了
    */
    });

    /** 
     * 5. 
     * callStack:[script, Promise-body]
     * macrotask:[setTimeout-cb-1]
     * microtask: [queueMicrotask-cb]
    */
    new Promise((res, rej) => {

        /** 
         * 6. 
         * callStack:[script, Promise-body, setTimeout]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [queueMicrotask-cb]
        */
        // setTimeout-cb-2
        setTimeout(() => {
            /** 
             * 27. 
             * callStack:[setTimeout-cb-2, queueMicrotask]
             * macrotask:[setTimeout-cb-3]
             * microtask: [then-cb-1, queueMicrotask-cb]
            */
            queueMicrotask(() => {
                /** 
                 * 28. 
                 * callStack:[setTimeout-cb-2,queueMicrotask-cb]
                 * macrotask:[setTimeout-cb-3]
                 * microtask: [then-cb-1]
                */
                res('9 resolve');
            })
        }, 0);

        /** 
         * 29. 
         * callStack:[]
         * macrotask:[setTimeout-cb-3]
         * microtask: [then-cb-1]
         * 这时候then-cb-1对应的promise 状态是 resolved 可执行
        */

        /** 
         * 7. 
         * callStack:[script, Promise-body, setTimeout, console.log]
         * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
         * microtask: [queueMicrotask-cb]
        */
        console.log('2 promise directly');

    /** 
     * 8. 
     * callStack:[script, Promise-body, setTimeout, then-body]
     * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
     * microtask: [queueMicrotask-cb, then-cb-1]
    */
    // then-cb-1
    }).then(res => {
        /** 
         * 30. 
         * callStack:[then-cb-1, console.log]
         * macrotask:[setTimeout-cb-3]
         * microtask: []
        */
        console.log(res);
    });

    /** 
     * 31. 
     * callStack:[]
     * macrotask:[setTimeout-cb-3]
     * microtask: []
    */

    /** 
     * 9. 
     * callStack:[]
     * macrotask:[setTimeout-cb-1,setTimeout-cb-2]
     * microtask: [queueMicrotask-cb, then-cb-1]
     * script 最后执行完毕，但是此时微任务不是空，需要继续执行
    */
}