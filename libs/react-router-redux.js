import routerMiddleware from "react-router-redux/src/middleware";
import syncHistoryWithStore from "react-router-redux/src/sync";
import { LOCATION_CHANGE, routerReducer } from "react-router-redux/src/reducer";
import { CALL_HISTORY_METHOD, push, replace, go, goBack, goForward, routerActions } from "react-router-redux/src/actions";

export {
    LOCATION_CHANGE,
    CALL_HISTORY_METHOD,
    syncHistoryWithStore,
    routerReducer,
    routerMiddleware,
    routerActions,
    push,
    replace,
    go,
    goBack,
    goForward
};
