import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '../src/router';
import {
  DevelopmentEnvironment,
  Environment,
  EnvironmentType,
} from '../environments';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueDaumPostcode from 'vue-daum-postcode';

import MainLayout from '../src/modules/_layouts/Layout/MainLayout.layout.vue';
import NonMainLayout from '../src/modules/_layouts/Layout/NonMainLayout.layout.vue';
import SectionTitle from '../src/modules/_components/SectionTitle.vue';
import BaseCard from '../src/modules/_components/BaseCard.vue';
import '@/core/guards/auth-role.guard';

import {
  DatePipeTransformer,
  EnumPipeTransformer,
  StringPipeTransformer,
  ViewPipeTransformer,
  StringDistrictPipeTransformer,
  PhonePipeTransformer,
} from './core';

let env = new Environment();
if (process.env.NODE_ENV === EnvironmentType.development) {
  console.log(process.env.NODE_ENV);
  env = DevelopmentEnvironment;
}
Vue.config.productionTip = env.productionTip;

// import layouts
Vue.component('NonMainLayout', NonMainLayout);
Vue.component('MainLayout', MainLayout);

Vue.component('SectionTitle', SectionTitle);
Vue.component('BaseCard', BaseCard);

// filters
DatePipeTransformer();
EnumPipeTransformer();
StringPipeTransformer();
StringDistrictPipeTransformer();
ViewPipeTransformer();
PhonePipeTransformer();

// bootstrap
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// daum kakao
Vue.use(VueDaumPostcode);

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app');
