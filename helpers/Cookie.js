const cookie = {
    get: key => {
        cookie._checkKeyValid(key);
        const pattern = new RegExp("(?:^|; )" + key + "=([^;]*)");
        const matches = document.cookie.match(pattern);
        return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
    },

    set: (key, value, options) => {
        cookie._checkKeyValid(key);
        document.cookie = cookie._generateCookieString(key, value, options);
    },

    delete: key => {
        cookie.set(key, "", { expires: -1 });
    },

    _generateCookieString: (key, value, options = {}) => {
        if (value === undefined || value === null) {
            throw new Error("Invalid value passed: " + encodeURIComponent(value));
        }

        const cookieValue = encodeURIComponent(JSON.stringify(value));
        let cookieString = key + "=" + cookieValue;
        let cookieOptions = { ...options };
        let expires = cookieOptions.expires;

        if (expires && typeof expires === "number") {
            let date = new Date();
            date.setTime(date.getTime() + expires * 1000);
            expires = cookieOptions.expires = date;
        }
        if (expires && expires.toUTCString) {
            cookieOptions.expires = expires.toUTCString();
        }

        for (const propName in cookieOptions) {
            if (cookieOptions.hasOwnProperty(propName)) {
                cookieString += "; " + propName;
                const propValue = cookieOptions[propName];
                if (propValue !== true) {
                    cookieString += "=" + propValue;
                }
            }
        }

        return cookieString;
    },

    _checkKeyValid: key => {
        if (typeof key !== "string") {
            throw new Error("Cookie key should be a string");
        }

        return true;
    }
};

export default cookie;
