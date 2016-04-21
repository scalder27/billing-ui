export const replaceByIndex = (element: any, elementIndex: int, arr: array) => {
    return [
        ...arr.slice(0, elementIndex),
        element,
        ...arr.slice(elementIndex + 1)
    ];
};

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

export const findIndexAndEntity = (predicate, arr) => {
    const entityIndex = findIndex(predicate, arr);
    if (entityIndex === -1) {
        return [entityIndex, null];
    }

    return [entityIndex, arr[entityIndex]];
};

type Action = {type: string; payload: any};
export const arrayReduceHelper: Array<any> = (elementPredicate: Func, elementReducer: Func, state: Array, action: Action) => {
    const [index, entityState] = findIndexAndEntity(elementPredicate, state);

    if (index === -1) {
        return state;
    }

    const newEntityState = elementReducer(entityState, action);
    return replaceByIndex(newEntityState, index, state);
};
