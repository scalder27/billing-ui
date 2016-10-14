export const replaceByIndex = (element, elementIndex, arr) => {
    if (elementIndex < 0 || elementIndex > arr.length - 1) {
        return arr;
    }

    return [
        ...arr.slice(0, elementIndex),
        element,
        ...arr.slice(elementIndex + 1)
    ];
};

export const omitEntityByIndex = (elementIndex, arr) => [
    ...arr.slice(0, elementIndex),
    ...arr.slice(elementIndex + 1)
];

export const findIndex = (predicate, arr = []) => {
    if (Array.prototype.findIndex) {
        return Array.prototype.findIndex.call(arr, predicate);
    }

    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            return i;
        }
    }

    return -1;
};

export const findEntity = (predicate, arr) => {
    const entityIndex = findIndex(predicate, arr);
    if (entityIndex === -1) {
        return null;
    }

    return arr[entityIndex];
};

export const findIndexAndEntity = (predicate, arr) => {
    const entityIndex = findIndex(predicate, arr);
    if (entityIndex === -1) {
        return [entityIndex, null];
    }

    return [entityIndex, arr[entityIndex]];
};

export const arrayReduceHelper = (elementPredicate, elementReducer, state, action) => {
    const [index, entityState] = findIndexAndEntity(elementPredicate, state);

    if (index === -1) {
        return state;
    }

    const newEntityState = elementReducer(entityState, action);
    return replaceByIndex(newEntityState, index, state);
};

export const updateImmutableArrayByKey = (oldArray, newArray, key) => {
    const oldArrayHashmap = oldArray.reduce((result, item) => {
        result[item[key]] = item;
        return result;
    }, {});

    if (oldArray.length === newArray.length && newArray.every((item) => oldArrayHashmap[item[key]])) {
        return oldArray;
    }

    return newArray.map((item) => oldArrayHashmap[item[key]] || item);
};

export const filterObjectKeys = (obj, filterKeys) => {
    if (filterKeys.some(filterKey => obj[filterKey] !== undefined)) {
        const objCopy = { ...obj };
        filterKeys.forEach(filterKey => {
            if (objCopy.hasOwnProperty(filterKey)) {
                delete objCopy[filterKey];
            }
        });

        return objCopy;
    }

    return obj;
};
