function functionSum(x: number, y: number): number {
    return x+y;
}

let myFunctionSum = function (x: number, y: number): number {
    return x + y;
}

let ddd = (x:string) => x;

const fn: (x:number) => void = function(x: number):void {}

let myFunctionSum2: (x: number, y:number) => number = function(x: number, y: number): number { return x + y; }

interface funcitonInterface {
    (x: number, y?: number): number;
}

// 
// let otherFunctionSum: funcitonInterface = function(x: number, y?: number = 100): number { return x+y;} //参数不能同时包含问号和初始化表达式
let otherFunctionSum: funcitonInterface = function(x: number, y: number = 100): number { return x+y;}

function functionPush(array: any[], ...items: any[]) {
    items.forEach(item => array.push(item))
}

function fnReverse(x: number): number;
function fnReverse(x: string): string;
function fnReverse(x: string|number): string|number {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') return x.split('').reverse().join('');
};