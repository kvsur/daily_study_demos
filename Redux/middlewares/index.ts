import { Middleware } from "../applyMiddleware";

export const logger:Middleware = store => next => action => {
    console.log('Current State: ', store.getState());
    console.log('Action: ', action);
    next(action);
    console.log('Next State: ', store.getState());
}

export const exception:Middleware = store => next => action => {
    try {
        next(action);
    } catch (err) {
        console.error('Error Catched, will post to server DB', err);
    }
}

export const timeLogger:Middleware = store => next => action => {
    console.log('Time: ', new Date().getTime());
    next(action);
}