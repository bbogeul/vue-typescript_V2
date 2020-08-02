import Vue from 'vue';
import { YN } from '@/common';
import { GENDER, APPROVAL_STATUS, COMPANY_USER } from '@/services/shared';
export const EnumPipeTransformer = () =>
  Vue.filter('enumTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === YN.YES) {
      return 'Y';
    }
    if (value === YN.NO) {
      return 'N';
    }
    // 성별
    if (value === GENDER.M) {
      return '남성';
    }
    if (value === GENDER.W) {
      return '여성';
    }
    // 승인 상태
    if (value === APPROVAL_STATUS.APPROVAL) {
      return '승인';
    }
    if (value === APPROVAL_STATUS.NEED_APPROVAL) {
      return '등록 승인 필요';
    }
    if (value === APPROVAL_STATUS.REFUSED) {
      return '거절/반려';
    }
    if (value === APPROVAL_STATUS.UPDATE_APPROVAL) {
      return '수정 승인 필요';
    }
    if (value === APPROVAL_STATUS.RE_REQUEST) {
      return '재요청';
    }

    if (value === COMPANY_USER.ADMIN_COMPANY_USER) {
      return '마스터';
    }
    if (value === COMPANY_USER.NORMAL_COMPANY_USER) {
      return '일반';
    }
  });
