import moment from 'moment';

export const dateToString = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const dateToDay = (date) => {
  return moment(date).format('M/D');
};

export const dateToTime = (date) => {
  return moment(date).format('HH:mm:ss');
}

export const stringToDate = (str) => {
  return moment(str, 'YYYY-MM-DD HH:mm:ss').toDate();
};

export const mergeDateAndTime = (date, time, short=false) => {
  if (short) {
    return `${dateToString(date).slice(0, 10)} ${time}:00`;
  } else {
    return `${dateToString(date).slice(0, 10)} ${dateToTime(new Date(time))}`;
  }
};

export const weekDay = ['日', '一', '二', '三', '四', '五', '六'];
