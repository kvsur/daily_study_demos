import React, { useState, useCallback } from 'react';
import { useLogDispatch, useLogState, LoggerStateProvider, LoggerDispatchProvider } from './useLogs.js';
import composeProviders from './composeProvider.js';

// const LogContext = createContext();
// const LoggerDispatchContext = createContext();
// const LoggerStateContext = createContext();

function LogProvider(props) {
    const [logs, setLogs] = useState([]);
    // const addLog = (log) => setLogs(preLogs => [...preLogs, log]);
    const addLog = useCallback((log) => setLogs(preLogs => [...preLogs, log]), []);

    // return (
    //     // <LogContext.Provider value={{ logs, addLog }}>
    //     //     { children }
    //     // </LogContext.Provider>
    //     <LoggerDispatchProvider value={addLog}>
    //         <LoggerStateProvider value={logs}>
    //             {children}
    //         </LoggerStateProvider>
    //     </LoggerDispatchProvider>
    // );
    return composeProviders({provider: LoggerStateProvider, value: logs}, {provider: LoggerDispatchProvider, value: addLog})(props);

}

function Logger1() {
    const addLog = useLogDispatch();
    console.log('Logger1 rendered');

    return (
        <>
            <p>一个能发日志的组件一</p>
            <button onClick={() => addLog('logger1->' + (+new Date()))}>发日志</button>
        </>
    );
}
function Logger2() {
    const addLog = useLogDispatch();
    console.log('Logger2 rendered');

    return (
        <>
            <p>一个能发日志的组件二</p>
            <button onClick={() => addLog('logger2->' + (+new Date()))}>发日志</button>
        </>
    );
}

function LogPanel() {
    const logs = useLogState();
return logs.map((log, index) => <p key={index}>{log}</p>);
}

export default function App() {
    return (
        <LogProvider>
            {/* 写日志 */}
            <Logger1 />
            <Logger2 />
            {/* 读日志 */}
            <LogPanel />
        </LogProvider>
    )
}
