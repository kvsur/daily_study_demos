let list: any[] = ['3'];

let fibonacci: number[] = [1,1,2,3,5,8,13,21];

// fibonacci.push('12'); //类型“string”的参数不能赋给类型“number”的参数
fibonacci.push(Infinity);

interface NumberArray {
    [index: number]: any
}

let arr:NumberArray = [3,3,'3',[3],3,3,3,3,3,3]

interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
};

function arraySum() {
    // let args:[] = arguments; //不能将类型“IArguments”分配给类型“[]
    // let args: any[] = [...arguments];
    let args: IArguments = arguments;
}