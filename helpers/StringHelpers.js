export const isUpperCase = str => str === str.toUpperCase();

export const innKppResolver = (inn, kpp) => {
    let resolvedString = inn;
    resolvedString += kpp ? ` — ${kpp}` : "";

    return resolvedString;
};

export const datesRangeResolver = (beginDate, endDate) => {
    if (!beginDate && !endDate) {
        return null;
    }

    if (!beginDate) {
        return `до ${endDate}`;
    }

    if (!endDate) {
        return beginDate;
    }

    return `${beginDate} — ${endDate}`;
};

export const toLowerFirstLetter = str => {
    if (!str) {
        return "";
    }

    if (str.length === 1) {
        return str.toLowerCase();
    }

    return str.substr(0, 1).toLowerCase() + str.substr(1);
};
