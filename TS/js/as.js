function isCat(animal) {
    if (typeof animal.run === 'function') {
        return true;
    }
    return false;
}
function isApiError(error) {
    if (typeof error.code === 'number')
        return true;
    return false;
}
// window.foo = 1; //类型“Window & typeof globalThis”上不存在属性“foo”
window.foo = 1;
// function getCacheData(key: string): any {
//     return (window as any).cache[key];
// }
// const tomCat = getCacheData('tome') as Cat;
// tomCat.run();
function getCacheData(key) {
    return window.cache[key];
}
var tomCat = getCacheData('tom');
tomCat.run();
