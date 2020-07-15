import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '../src/router';
import {
  DevelopmentEnvironment,
  Environment,
  EnvironmentType,
} from '../environments';
import MainLayout from '../src/modules/_layouts/Layout/MainLayout.layout.vue';
import NonMainLayout from '../src/modules/_layouts/Layout/NonMainLayout.layout.vue';
import moment from 'moment';

let env = new Environment();
if (process.env.NODE_ENV === EnvironmentType.development) {
  console.log(process.env.NODE_ENV);
  env = DevelopmentEnvironment;
}
Vue.config.productionTip = env.productionTip;

// import layouts
Vue.component('NonMainLayout', NonMainLayout);
Vue.component('MainLayout', MainLayout);

// filters
Vue.filter('dateFilter', (value: Date | string): string => {
  if (!value) {
    return;
  }
  return moment(String(value)).format('YYYY/MM/DD hh:mm A');
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
