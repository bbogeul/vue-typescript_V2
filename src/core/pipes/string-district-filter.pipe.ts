import Vue from 'vue';
export const StringDistrictPipeTransformer = () =>
  Vue.filter('stringDistrictTransformer', (value: string): string => {
    if (value === 'nameKr') {
      return '지점명';
    }
    if (value === 'nameEng') {
      return '지점명(영문)';
    }
    if (value === 'address') {
      return '지점 주소';
    }
  });
