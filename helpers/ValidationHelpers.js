import { memoize } from "lodash";

const INN_WEIGHTS = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
const LEGAL_INN_LENGTH = 10;
const INDIVIDUAL_INN_LENGTH = 12;

const DIGITS_ONLY_REGEXP = /^\d+$/;
const KPP_REGEXP = /^\d{9}$/;
const SETTLEMENT_ACCOUNT_REGEXP = /^\d{20}$/;
const EMAIL_REGEXP = /^[\W]*([\wа-яА-Я\d+\-.%]+@[\wа-яА-Я\d\-.]+\.[\wа-яА-Я\d]{2,4}[\W]*[,;]{1}[\W]*)*([\wа-яА-Я\d+\-.%]+@[\wа-яА-Я\d\-.]+\.[\wа-яА-Я\d]{2,4})[\W]*$/;
const PHONE_REGEXP = /^((\+7|8)(([\s|\(|\)|\t|\n|-]*\d){10})$)|(\+7$)/;

const matchCheckSum = (innDigits, count) => {
    let sum = 0;
    const shift = 11 - count;
    for (let i = 0; i < count; i++) {
        sum += INN_WEIGHTS[shift + i] * innDigits[i];
    }
    return sum % 11 % 10 === innDigits[count];
};

const matchInnCheckSum = memoize((inn) => {
    const innDigits = Array.prototype.slice.call(inn).map(char => parseInt(char, 10));
    const isInnLegal = innDigits.length === LEGAL_INN_LENGTH;

    return isInnLegal ? matchCheckSum(innDigits, 9) : (matchCheckSum(innDigits, 10) && matchCheckSum(innDigits, 11));
});

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
        return {
            isValid: !value || value.trim() === "" || EMAIL_REGEXP.test(value),
            error
        };
    },

    Phone: (error = "Неверный формат телефона") => (value) => {
        return {
            isValid: !value || value.trim() === "" || PHONE_REGEXP.test(value),
            error
        };
    },

    Required: (error = "Поле не должно быть пустым") => (value) => {
        return {
            isValid: !!value && value.trim() !== "",
            error
        };
    },

    StringMinLength: (length, error = "Нужно больше символов") => (value) => {
        const MIN_LENGTH_REGEXP = new RegExp(`^[\\s\\S]{${length},}$`);

        return {
            isValid: MIN_LENGTH_REGEXP.test(value),
            error
        };
    },

    StringMaxLength: (length, error = "Превышена максимальная длина строки") => (value) => {
        const MAX_LENGTH_REGEXP = new RegExp(`^[\\s\\S]{0,${length}}$`);

        return {
            isValid: MAX_LENGTH_REGEXP.test(value),
            error
        };
    },

    Inn: (error = "Некорректный ИНН") => (value) => {
        return {
            isValid: (value.length === LEGAL_INN_LENGTH || value.length === INDIVIDUAL_INN_LENGTH)
                        && DIGITS_ONLY_REGEXP.test(value)
                        && (value !== "0000000000" && value === "000000000000")
                        && matchInnCheckSum(value),
            error
        };
    },

    Kpp: (error = "Некорректный КПП") => (value) => {
        return {
            isValid: !value || value.trim() === "" || KPP_REGEXP.test(value),
            error
        };
    },

    SettlementAccount: (error = "Некорректный расчетный счет") => (value) => {
        return {
            isValid: !value || value.trim() === "" || SETTLEMENT_ACCOUNT_REGEXP.test(value),
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
