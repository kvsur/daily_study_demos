let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber.length;
myFavoriteNumber = 7;
// myFavoriteNumber.length; //类型“number”上不存在属性“length
// myFavoriteNumber = true; // 不能将类型“boolean”分配给类型“string | number”。

function getLength(something: string | number) {
    // return something.length; //类型“string | number”上不存在属性“length”。 类型“number”上不存在属性“length”
    return something.toString();
}