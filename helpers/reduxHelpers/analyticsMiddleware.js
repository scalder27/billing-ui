import GoogleAnalytics from "./../GoogleAnalytics";

const analyticsMiddleware = (store) => (dispatch) => (action) => {
    const { meta: { ga } = {}} = action;

    if (ga) {
        const { category, action, label } = ga;
        GoogleAnalytics.triggerEventAsync(category, action, label);
    }

    return dispatch(action);
};

export default analyticsMiddleware;
