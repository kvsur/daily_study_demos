import { Reducers } from "./combineReducers";
import { Action, CreateStore, Dispatch, State, Store } from "./createStore";

export type Middleware = (store: Partial<Store>) => (next: Dispatch) => (action: Action) => void;
export type RCSF = (oldCreateStore: CreateStore) => CreateStore;

export const applyMiddlewares = (...middlewares: Middleware[]) => {

    const rewriteCreateStoreFn:RCSF = (oldCreateStore) => {
        const newCreateStore: CreateStore = (reducer, initState) => {
            const store = oldCreateStore(reducer, initState);
            let dispatch = store.dispatch;
            const simpleStore = {
                getState: store.getState
            };
            const middlewaresWithStore = middlewares.map(middleware => middleware(simpleStore));
            middlewaresWithStore.reverse().forEach(middleware => {
                dispatch = middleware(dispatch);
            });

            store.dispatch = dispatch;
            return store;
        }

        return newCreateStore;
    }
    return rewriteCreateStoreFn;
};