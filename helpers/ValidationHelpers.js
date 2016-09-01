export const validate = (validate, value) => {
    if (typeof validate === "function") {
        return validate(value);
    }

    if (Array.isArray(validate)) {
        let validationResult;

        for (let i = 0; i < validate.length; i++) {
            validationResult = validate[i](value);
            if (!validationResult.isValid) {
                return validationResult;
            }
        }

        return validationResult;
    }

    throw new Error("Wrong type of validation fn " + typeof fn);
};

const Validation = {
    Email: (error = "Неверный формат e-mail") => (value) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return {
            isValid: re.test(value),
            error
        }
    },

    Required: (error = "Поле не должно быть пустым") => (value) => {
        return {
            isValid: value.trim() !== "",
            error
        }
    },

    Anything: () => {
        return {
            isValid: true,
            error: ""
        }
    }
};

export default Validation;
