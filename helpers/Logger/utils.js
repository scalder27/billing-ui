import moment from "../../libs/moment";

const lineBreaker = "\n";

export const createLog = (logLevel, params) => ({
    dateTime: moment().format("DD.MM.YYYY hh:mm:ss"),
    level: logLevel,
    location: window.location.href,
    stackTrace: createStackTrace(),
    message: createMessage(params)
});

export const createMessage = (params = []) => {
    return params
        .filter(p => p !== null && p !== undefined)
        .map(p => {
            if (typeof p === "string" || typeof p === "number" || typeof p === "boolean") {
                return p;
            }

            return JSON.stringify(p, null, 2);
        })
        .join(" ");
};

export const createStackTrace = () => {
    let error = new Error();

    if (!error.stack) {
        try {
            throw error;
        } catch (e) {
            if (!e.stack) {
                return null;
            }

            error = e;
        }
    }

    const callsCountFromLogInvocation = 5;
    const editedStack = skipLines(callsCountFromLogInvocation, error.stack);
    return `StackTrace:${lineBreaker}${editedStack}`;
};

export const skipLines = (linesToSkip, text) => {
    let edgeIndex = -1;

    for (let index = 0; index < linesToSkip; index++) {
        edgeIndex = text.indexOf(lineBreaker, edgeIndex) + 1;
        if (edgeIndex === 0 || edgeIndex === text.length) {
            edgeIndex = text.length;
            break;
        }
    }

    return text.substring(edgeIndex);
};
