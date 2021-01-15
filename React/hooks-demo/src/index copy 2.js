import React, { useState } from 'react';

// let isMounted = false;

function PersonalInfoComponent() {
    let name, age, career, setName, setCareer;

    // console.log('isMounted', isMounted);

    // if(!isMounted) {
        [name, setName] = useState('kvsur');

        [age] = useState(100);

        
        // isMounted = true;
    // }
    [career, setCareer] = useState('我是一个前端，爱吃小熊饼干');

    console.log('career', career);

    return (
        <div className='personnalInfo'>
            <p>姓名：{name}</p>
            <p>年龄：{age}</p>
            <p>职业：{career}</p>

            <button onClick={_ => setName('李成' + Math.random().toString(36).slice(2))}>修改姓名</button>
        </div>
    );
}

export default PersonalInfoComponent;
