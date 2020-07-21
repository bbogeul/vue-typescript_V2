import Vue from 'vue';
import { YN } from '@/common';
export const EnumPipeTransformer = () =>
  Vue.filter('enumTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === YN.YES) {
      return 'Yes';
    }
    if (value === YN.NO) {
      return 'No';
    }
  });
