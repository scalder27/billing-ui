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
        const re = /^[\W]*([\wа-яА-Я\d+\-.%]+@[\wа-яА-Я\d\-.]+\.[\wа-яА-Я\d]{2,4}[\W]*[,;]{1}[\W]*)*([\wа-яА-Я\d+\-.%]+@[\wа-яА-Я\d\-.]+\.[\wа-яА-Я\d]{2,4})[\W]*$/;

        return {
            isValid: value.trim() === "" || re.test(value),
            error
        };
    },

    Required: (error = "Поле не должно быть пустым") => (value) => {
        return {
            isValid: value.trim() !== "",
            error
        };
    },

    StringMinLength: (length, error = "Нужно больше символов") => (value) => {
        const re = new RegExp(`^[\\s\\S]{${length},}$`);

        return {
            isValid: re.test(value),
            error
        };
    },

    StringMaxLength: (length, error = "Превышена максимальная длина строки") => (value) => {
        const re = new RegExp(`^[\\s\\S]{0,${length}}$`);

        return {
            isValid: re.test(value),
            error
        };
    },

    Kpp: (error = "Некорректный КПП") => (value) => {
        const re = /^(\d{9})?$/;

        return {
            isValid: re.test(value),
            error
        };
    },

    SettlementAccount: (error = "Некорректный расчетный счет") => (value) => {
        const re = /^(\d{20})?$/;

        return {
            isValid: re.test(value),
            error
        };
    },

    Anything: () => () => {
        return {
            isValid: true,
            error: ""
        };
    }
};

export default Validation;
