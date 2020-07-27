import Vue from 'vue';
import { YN } from '@/common';
import { GENDER, APPROVAL_STATUS } from '@/services/shared';
export const StringPipeTransformer = () =>
  Vue.filter('stringTransformer', (value: string): string => {
    if (value === 'ceoKr') {
      return '대표명';
    }
    if (value === 'phone') {
      return '전화번호';
    }
    if (value === 'email') {
      return '이메일';
    }
    if (value === 'address') {
      return '주소';
    }
    if (value === 'website') {
      return '웹사이트';
    }
  });
