import { Action, State } from "./createStore";

export type Reducer = (state: State, action: Action) => State;

export interface Reducers {
    [x: string]: Reducer;
}

export function combineReducers(reducers: Reducers): Reducer {
    const keys = Object.keys(reducers);

    return function combination(state: State, action: Action) {
        const nextState: State = {};

        state = state || nextState;

        keys.forEach(key => {
            const reducer = reducers[key];
            const oldBranchState = state[key];
            const newBranchState = reducer(oldBranchState, action);

            nextState[key] = newBranchState;
        });
        
        return nextState;
    }
}