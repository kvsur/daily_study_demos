import React, { useState } from 'react';

function Son() {
    console.log('child rendered');

    return <div>Son</div>;
}

function Parent(props) {
    const [count, setCount] = useState(0);

    return (
        <div onClick={() => { setCount(count + 1) }}>
            count: {count}
            <br />
            {/* <Son /> */}
            {props.children}
        </div>
    );
}

function App() {
    return (
        <Parent>
            <Son />
        </Parent>
    );
}

export default App;
