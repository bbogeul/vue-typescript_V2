import moment from 'moment';
import Vue from 'vue';

export const datePipe = () =>
  Vue.filter('dateFilter', (value: Date | string): string => {
    if (!value) {
      return;
    }
    return moment(String(value)).format('YYYY/MM/DD hh:mm A');
  });
