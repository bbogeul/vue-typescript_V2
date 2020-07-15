import moment from 'moment';

export const DateFilterPipe = (value: Date | any): string => {
  if (!value) {
    return;
  }
  return moment(String(value)).format('YYYY/MM/DD');
};
