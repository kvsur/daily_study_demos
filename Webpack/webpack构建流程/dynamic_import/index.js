import('./delay.js').then(m => {
    console.log(m.default);
}).catch(e => {
    console.error(e);
})