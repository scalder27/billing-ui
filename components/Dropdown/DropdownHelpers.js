export const getScrollTopMenu = (scrollTop, topOption, heightOption, heightMenu) => {
    if (topOption - scrollTop < 0) {
        return topOption;
    }

    if (topOption + heightOption - scrollTop > heightMenu) {
        return topOption + heightOption - heightMenu;
    }

    return scrollTop;
};

export const getSiblingOptions = (optionValues, activeOption) => {
    const indexActiveOption = optionValues.indexOf(activeOption);
    const lastIndex = optionValues.length - 1;

    let previous = optionValues[indexActiveOption - 1];
    if (indexActiveOption === -1 || indexActiveOption === 0) {
        previous = optionValues[lastIndex]
    }

    let next = optionValues[indexActiveOption + 1];
    if (indexActiveOption === -1 || indexActiveOption === lastIndex) {
        next = optionValues[0]
    }


    return {
        previous: previous,
        next: next,
        first: optionValues[0],
        last: optionValues[lastIndex]
    }
};
