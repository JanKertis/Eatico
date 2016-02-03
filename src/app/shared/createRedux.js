import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { actions } from 'routex';
import * as reducers from './reducers';
import { promiseMiddleware, actionInterceptorMiddleware } from './middlewares';

/**
 * Creates redux instance
 *
 * @param {Object} initialState
 * @param {Object} routex
 *
 * @returns {redux}
 */
export default function create(initialState, routex) {
    const routexReducer = routex.reducer;
    let dispatch;

    const store = compose(
        routex.store,
        applyMiddleware(
            promiseMiddleware
        )
    )(createStore)(
        combineReducers({...reducers, ...routexReducer}),
        initialState
    );

    dispatch = store.dispatch;

    return store;
}


