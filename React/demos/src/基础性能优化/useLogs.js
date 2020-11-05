import { createContext, useContext } from 'react'

const LoggerStateContext = createContext();
const LoggerDispatchContext = createContext();

export const LoggerStateProvider = LoggerStateContext.Provider;
export const LoggerDispatchProvider = LoggerDispatchContext.Provider;

export function useLogState() {
    const context = useContext(LoggerStateContext);

    if (context === undefined) {
        throw new Error();
    }
    return context;
}

export function useLogDispatch() {
    const context = useContext(LoggerDispatchContext);

    if (context === undefined) {
        throw new Error();
    }

    return context;
}
