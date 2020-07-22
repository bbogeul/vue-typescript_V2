import Vue from 'vue';
import { YN } from '@/common';
import { GENDER } from '@/services/shared';
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
    if (value === GENDER.M) {
      return '남성';
    }
    if (value === GENDER.W) {
      return '여성';
    }
  });
