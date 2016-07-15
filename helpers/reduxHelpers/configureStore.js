import {compose, createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import react from "react";
import reactPerf from "react-addons-perf";
import {whyDidYouUpdate} from "why-did-you-update";

import analyticsMiddleware from "./analyticsMiddleware";
const __DEV__ = process.env.NODE_ENV !== "production";

if (__DEV__) {
    whyDidYouUpdate(react);
    window.ReactPerf = reactPerf;
}

const includeDevTools = () => {
    if (__DEV__ && window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return f => f;
};

const _createStore = (initialState, rootReducer, outerMiddleware = []) => {
    const middleware = [thunk, analyticsMiddleware].concat(outerMiddleware);
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            includeDevTools()
        )
    );
};

export const configureStore = (initialState, rootReducer, rootSaga = null) => {
    if (rootSaga === null) {
        return _createStore(initialState, rootReducer);
    }

    const sagaMiddleware = createSagaMiddleware();
    const store = _createStore(initialState, rootReducer, [sagaMiddleware]);
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
