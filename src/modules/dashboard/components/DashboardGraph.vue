<template>
  <div style="height: 400px">
    <DashboardChart
      v-if="founderConsultGraph"
      :chartData="founderConsultGraph"
      :options="options"
      :styles="{ height: '400px' }"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import DashboardService from '../../../services/dashboard.service';
import DashboardChart from '../add-on/DashboardChart.vue';

@Component({
  components: {
    DashboardChart,
  },
})
export default class DashboardGraph extends Vue {
  private founderConsultGraph = null;
  private options = null;

  getGraph() {
    DashboardService.dashboardGraph().subscribe(res => {
      console.log(res.data);
      this.options = { responsive: true, maintainAspectRatio: false };
      this.founderConsultGraph = res.data;
    });
  }

  mounted() {
    this.getGraph();
  }
}
</script>
