export const validate = (value, validateFunction) => {
    if (typeof validateFunction === "function") {
        return validateFunction(value);
    }

    if (Array.isArray(validateFunction)) {
        let validationResult;

        for (let i = 0; i < validateFunction.length; i++) {
            validationResult = validateFunction[i](value);
            if (!validationResult.isValid) {
                return validationResult;
            }
        }

        return validationResult;
    }

    throw new Error("Wrong type of validation validateFunction " + typeof validateFunction);
};

const Validation = {
    Email: (error = "Неверный формат e-mail") => (value) => {
        var re = /^[\W]*([a-zA-Zа-яА-Я+\-.%]+@[a-zA-Zа-яА-Я\-.]+\.[a-zA-Zа-яА-Я]{2,4}[\W]*[,;]{1}[\W]*)*([a-zA-Zа-яА-Я+\-.%]+@[a-zA-Zа-яА-Я\-.]+\.[a-zA-Zа-яА-Я]{2,4})[\W]*$/;

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
