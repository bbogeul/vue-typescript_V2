import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '../src/router';
import { DevelopmentEnvironment, Environment } from '../environments';
import CoreuiVue, { CButton, CSidebar } from '@coreui/vue';

let env = new Environment();
if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  env = DevelopmentEnvironment;
}
Vue.config.productionTip = env.productionTip;
Vue.use(CoreuiVue);

Vue.component('CButton', CButton);
Vue.component('CSidebar', CSidebar);
// global export
export default {
  components: {
    CButton,
    CSidebar,
  },
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
