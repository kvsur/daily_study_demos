import React, { useState, useEffect } from 'react';

import ReactDom from 'react-dom';

function IncreasingTodoList() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count === 0 ) return;
        const todoList = document.getElementById('todoList');
        const newItem = document.createElement('li');
        newItem.setAttribute('class', 'todo-list-item');

        newItem.innerHTML = `我是第${count}个待办事项`;
        todoList.appendChild(newItem);
    }, [count]);

    return (
        <div>
            <p>当前共计{count}个待办事项</p>
            <ul id='todoList'></ul>
            <button onClick={() => setCount(count+1)}>点我新增待办事项</button>
        </div>
    );
}


ReactDom.render(<IncreasingTodoList />, document.getElementById('root'));
