export const getUrlWithQuery = (url, params) => {
    const query = [].concat(Object.keys(params).map((key) => (`${key}=${params[key]}`)));
    return query.length > 0 ? `${url}?${query.join("&")}` : url;
};
