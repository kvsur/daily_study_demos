const _import = file => import(`./${file}.js`);

_import('delay').then(res => {
    console.log(res.default);
}).catch(e => {
    console.error(e);
})