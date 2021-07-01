import Worker from './worker.js';

const sendbtn = document.getElementById('sendbtn');
const worker = new Worker();

sendbtn.onclick = e => {
    worker.postMessage({
        time: +new Date
    });
}


worker.onmessage = function (event) {
    console.log(event);
}