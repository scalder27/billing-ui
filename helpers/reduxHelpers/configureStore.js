import {compose, createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import react from "react";

import analyticsMiddleware from "./analyticsMiddleware";
const __DEV__ = process.env.NODE_ENV !== "production";

if (__DEV__) {
    const { whyDidYouUpdate } = require("why-did-you-update");
    whyDidYouUpdate(react, { exclude: [/^Connect\(.*\)$/, "ReactTransitionGroup", "ReactCSSTransitionGroup", "ReactCSSTransitionGroupChild"] });

    const reactPerf = require("react-addons-perf");
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
