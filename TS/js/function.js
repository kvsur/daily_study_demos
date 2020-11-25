function functionSum(x, y) {
    return x + y;
}
var myFunctionSum = function (x, y) {
    return x + y;
};
var ddd = function (x) { return x; };
var fn = function (x) { };
var myFunctionSum2 = function (x, y) { return x + y; };
// 
// let otherFunctionSum: funcitonInterface = function(x: number, y?: number = 100): number { return x+y;} //参数不能同时包含问号和初始化表达式
var otherFunctionSum = function (x, y) {
    if (y === void 0) { y = 100; }
    return x + y;
};
function functionPush(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) { return array.push(item); });
}
function fnReverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string')
        return x.split('').reverse().join('');
}
;
