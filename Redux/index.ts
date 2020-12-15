import { combineReducers } from "./combineReducers";
import { Action, createStore, State } from "./createStore";

const counter = {
    count: 0
};
const info = {
    name: 'kvsur',
    description: 'A Smarter Coder'
};

function counterReducer(state: State, action: Action) {
    state = state || counter;
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}

function InfoReducer(state: State, action: Action) {
    state = state || info;
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    counter: counterReducer,
    info: InfoReducer
});

let store = createStore(reducer);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
    type: 'INCREMENT'
});

/*修改 name*/
store.dispatch({
    type: 'SET_NAME',
    name: 'A Lazy Programer'
});