<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-lg-6 mb-5">
        <DashboardGraph />
      </div>
      <div class="col-sm-12 col-lg-6">
        <DashboardCityGraph />
      </div>
    </div>
    <div class="divider"></div>
    <div class="row mt-4">
      <div class="col-sm-12 col-lg-6 mb-4">
        <DashboardCompanyUserList />
      </div>
      <div class="col-sm-12 col-lg-6 mb-4">
        <DashboardCompanyList />
      </div>
    </div>
    <div class="divider my-4"></div>
    <DashboardFounderConsultList />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import DashboardFounderConsultList from './components/DashboardFounderConsultList.vue';
import DashboardCompanyUserList from './components/DashboardCompanyUserList.vue';
import DashboardCompanyList from './components/DashboardCompanyList.vue';
import DashboardGraph from './components/DashboardGraph.vue';
import DashboardCityGraph from './components/DashboardCityGraph.vue';

@Component({
  name: 'Dashboard',
  components: {
    DashboardFounderConsultList,
    DashboardCompanyUserList,
    DashboardCompanyList,
    DashboardGraph,
    DashboardCityGraph,
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
