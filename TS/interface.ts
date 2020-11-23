interface Person {
    [x: string]: string|number;
    readonly id: string;
    name: string;
    age: number;
}

let tom:Person = {
    // id: 'fdasfsad6t7f9a8sdf', //类型 "{ name: string; age: number; work: string; }" 中缺少属性 "id"，但类型 "Person" 中需要该属性
    id: '7fa9s8df9sd6fgeeased5',
    name: 'tom',
    age: 25,
    work: 'coder',
}

tom.id;
// tom.id = '22222'; //无法分配到 "id" ，因为它是只读属性