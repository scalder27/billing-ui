import moment from "moment";
moment.locale("ru");

export const formatDate = (date, format = "L") => moment(date).format(format);

export default moment;
