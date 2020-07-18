<template>
  <div>
    <div class="row">
      <div class="col-sm">
        <DashboardCompanyUserList />
      </div>
      <div class="col-sm">
        <DashboardCompanyList />
      </div>
    </div>
    <div class="divider"></div>
    <DashboardFounderConsultList />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import DashboardFounderConsultList from './components/DashboardFounderConsultList.vue';
import DashboardCompanyUserList from './components/DashboardCompanyUserList.vue';
import DashboardCompanyList from './components/DashboardCompanyList.vue';

@Component({
  name: 'Dashboard',
  components: {
    DashboardFounderConsultList,
    DashboardCompanyUserList,
    DashboardCompanyList,
  },
})
export default class Dashboard extends BaseComponent {}
</script>
<style lang="scss">
.title {
  margin-bottom: 15px;
}

h5 {
  margin-top: 3px;
}
</style>
