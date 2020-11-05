// import React, { useState, useContext } from 'react';

// const themeContext = React.createContext();

// function ChildNoTheme() {
//     console.log('不关心皮肤的子组件渲染了');
//     return (<div>我不关心皮肤，皮肤改变的时候别让我重新渲染!</div>);
// }

// function ChildWithTheme() {
//     const theme = useContext(themeContext);
//     return (<div>我是有皮肤的，我的皮肤是{theme}</div>);
// }

// export default function App() {
//     const [theme, setTheme] = useState('light');

//     const onThemeChangeHandle = () => setTheme(theme === 'light' ? 'dark' : 'light');

//     return (
//         <themeContext.Provider value={theme}>
//             <button onClick={onThemeChangeHandle}>改变皮肤</button>
//             <ChildWithTheme />
//             <ChildNoTheme />
//             <ChildNoTheme />
//             <ChildNoTheme />
//             <ChildNoTheme />
//         </themeContext.Provider>
//     );
// }

import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();

function ChildNoTheme() {
    console.log('不关心皮肤的子组件渲染了');
    return (<div>我不关心皮肤，皮肤改变的时候别让我重新渲染!</div>);
}

function ChildWithTheme() {
    const theme = useContext(ThemeContext);
    return (<div>我是有皮肤的，我的皮肤是{theme}</div>);
}

function ThemeApp(props) {
    const [theme, setTheme] = useState('light');

    const onThemeChangeHandle = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={onThemeChangeHandle}>改变皮肤</button>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default function App() {

    return (
        <ThemeApp>
            <ChildWithTheme />
            <ChildNoTheme />
            <ChildNoTheme />
            <ChildNoTheme />
            <ChildNoTheme />
        </ThemeApp>
    );
}