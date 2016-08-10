import moment from "moment";
moment.locale("ru");

export const formatDate = (date, format = "L") => moment(date).format(format);
export const convertString = (date, format = "DD.MM.YYYY") => moment(date, format, true);

export default moment;
