console.log(self);

self.sessionStorage.setItem('work-item', +new Date)

const socket = new WebSocket('wss://znkftest.wewecall.com:10081/customerCalloutSocket');

socket.onopen = function () {
    socket.send('{"messageType":"customerCalloutLogin","companyCode":"81010735","terminalType":"pc","customerId":81010769}	');
}

socket.onmessage = function(e) {
    self.postMessage(e.data);
}

setInterval(() => {
    socket.send('{"messageType":"ping"}');
}, 9000);

self.onmessage = function(event) {
    self.postMessage(event.data)
}