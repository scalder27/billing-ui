import moment from "moment";
moment.locale("ru");

export const formatDate = (date, format = "L") => moment(date).format(format);
export const convertISOString = (date) => convertString(date, moment.ISO_8601);
export const convertString = (date, format = "DD.MM.YYYY") => moment(date, format, true);
export const convertToISO = (date) => {
    const momentDate = moment(date, moment.ISO_8601);
    momentDate.isValid()
        ? momentDate.toISOString()
        : convertString(date).toISOString();
};

export default moment;
