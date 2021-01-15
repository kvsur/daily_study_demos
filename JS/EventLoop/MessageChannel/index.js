const channel = new MessageChannel();
const { port1, port2 } = channel;

window.addEventListener('message', res => {
    console.log(res, 'window message');
})

port1.onmessage = res => {
    console.log(res, 'message channel message ');
}

queueMicrotask(() => {

    requestAnimationFrame(() => {
        console.log('requestAnimationFrame messge');
    });

    setTimeout(() => {
        console.log('settimeout message');   
    });

    window.postMessage('', '*');
    port2.postMessage('');
})
