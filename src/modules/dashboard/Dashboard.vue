<template>
  <div>
    <button class="btn btn-primary float-right">더 보기</button>
    <DashboardFounderConsultList />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import DashboardFounderConsultList from './components/DashboardFounderConsultList.vue';

@Component({
  name: 'Dashboard',
  components: {
    DashboardFounderConsultList,
  },
})
export default class Dashboard extends BaseComponent {}
</script>
<style lang="scss" scoped></style>
