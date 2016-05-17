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
