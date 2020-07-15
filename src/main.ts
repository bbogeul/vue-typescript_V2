import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '../src/router';
import {
  DevelopmentEnvironment,
  Environment,
  EnvironmentType,
} from '../environments';

let env = new Environment();
if (process.env.NODE_ENV === EnvironmentType.development) {
  console.log(process.env.NODE_ENV);
  env = DevelopmentEnvironment;
}
Vue.config.productionTip = env.productionTip;

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err);
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
