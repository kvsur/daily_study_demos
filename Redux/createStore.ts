import { Reducer } from "./combineReducers";

export interface State {
    [x: string]: any;
}

export interface Store {
    subscribe: (listener: Fn) => void;
    dispatch: (action: Action) => void;
    getState: () => State;
}


export interface Action {
    type: string | symbol;
    [x: string]: any
}

export type Fn = () => void;
export function createStore(reducer: Reducer ,initState?: State): Store {
    let state = initState;
    let listeners: Array<Fn> = [];

    function subscribe(listener: Fn) {
        listeners.push(listener);

        return function() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    function dispatch(action: Action) {
        // state = newState;
        state = reducer(state, action)

        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    function getState(): State {
        return state;
    }

    dispatch({ type: Symbol() });

    return {
        subscribe,
        getState,
        dispatch
    };
}
