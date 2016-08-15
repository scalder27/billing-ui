import { isUpperCase } from "./StringHelpers";

export const addValueByKey = (key, value, obj) => {
    obj[key] = value;
    return obj;
};

export const justConstants = (obj = {}) =>
    Object.keys(obj)
        .filter(isUpperCase)
        .reduce((result, key) => addValueByKey(key, obj[key], result), {});

export const enumInfoMapper = (descriptions = {}) => type => {
    const description = descriptions[type];
    if (description !== undefined) {
        return description;
    }

    return type;
};

export const updateImmutableHashmap = (oldObj, newObj) => {
    return Object.keys(newObj).reduce((result, key) => {
        result[key] = oldObj[key] || newObj[key];
        return result;
    }, {})
}
