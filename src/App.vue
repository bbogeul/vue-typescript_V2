<template>
  <div id="app" class="page-content">
    <component :is="layout"></component>
  </div>
</template>
<script lang="ts">
import BaseComponent from './core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
})
export default class extends BaseComponent {
  // get layout
  get layout() {
    return this.$route.meta.layout;
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  background-color: #f1f1f1;
  padding: 10px 0 40px;
}
.btn {
  font-size: 12px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: grey;
  margin-bottom: 10px;
}
.badge {
  font-size: 11px;
}

h4 {
  font-size: 18px;
}
h5 {
  font-size: 16px;
}

.div-center {
  margin: 0;
}

.highlighted {
  background-color: orange;
  border-color: orange;
  color: #fff;
}

select {
  font: inherit;
}

.table {
  margin-bottom: 0;
  th,
  td {
    vertical-align: middle;
    text-align: center;
  }
  thead {
    th {
      border-top: 0;
      border-bottom: 0;
    }
  }
  .empty-data {
    height: 100px;
  }
}
</style>
